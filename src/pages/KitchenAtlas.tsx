import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { WORLD_MAP_PATH } from "@/assets/world-map-path";
import { supabase } from "@/integrations/supabase/client";


type RegionDef = {
  id: string;
  name: string;
  emoji: string;
  bg: string; // hex
  available: boolean;
  description?: string;
  challenge?: string;
  regionTags?: string[]; // cuisine_region tags to match
  collectionLink?: string;
};

const REGIONS: RegionDef[] = [
  {
    id: "uk",
    name: "United Kingdom",
    emoji: "🇬🇧",
    bg: "hsl(var(--region-uk))",
    available: true,
    description: "Honest, seasonal and deeply comforting. The foundation of everything.",
    challenge:
      "This week — cook a classic British fish dish. Try our [Fish Finger Butty](/recipes/fish-finger-butty-with-lemon-mayonnaise) or [Cider Battered Prawns](/recipes/cider-battered-prawns-with-aubergine-salad).",
    regionTags: ["british"],
  },
  {
    id: "italy",
    name: "Italy",
    emoji: "🇮🇹",
    bg: "hsl(var(--region-italy))",
    available: true,
    description: "Pasta, sauces and the art of simplicity. Italy feeds the soul.",
    challenge:
      "This week — cook a pasta dish entirely from scratch. Find our [Italian recipes](/recipes/italian) and challenge yourself.",
    regionTags: ["italian"],
  },
  {
    id: "france",
    name: "France",
    emoji: "🇫🇷",
    bg: "hsl(var(--region-france))",
    available: true,
    description: "Classical techniques that underpin all of western cooking.",
    challenge:
      "This week — make a classic French sauce from scratch. Browse our [French recipe collection](/recipes/french) to find your starting point.",
    regionTags: ["french"],
  },
  {
    id: "asia",
    name: "South and Southeast Asia",
    emoji: "🌶️",
    bg: "hsl(var(--region-asia))",
    available: true,
    description: "Bold spices, fragrant herbs and layers of warmth and depth.",
    challenge:
      "This week — cook a curry entirely from scratch using whole spices, no jars. Find your recipe in our [Asian collection](/recipes/asian).",
    regionTags: ["indian", "asian"],
  },
  {
    id: "japan",
    name: "Japan",
    emoji: "🇯🇵",
    bg: "hsl(var(--region-japan))",
    available: false,
    description:
      "Precision, balance and the art of umami. Japanese cooking at its finest.",
    challenge:
      "Coming soon — master the art of ramen, sushi and teriyaki.",
  },
  {
    id: "mexico",
    name: "Mexico",
    emoji: "🇲🇽",
    bg: "hsl(var(--region-mexico))",
    available: true,
    description:
      "Vibrant, smoky and deeply satisfying. The bold flavours of Mexican cooking.",
    challenge:
      "This week — make tacos from scratch. Try our [Battered Prawn Tacos](/recipes/battered-prawn-tacos) for a crisp, fresh take.",
    regionTags: ["mexican"],
  },
];

// Approximate map positions (% of map area) for the markers.
// Positions in % of map area, derived from equirectangular projection
// fitted to a 1000x500 viewBox (matches WORLD_MAP_PATH).
const MAP_POSITIONS: Record<string, { top: string; left: string }> = {
  uk: { top: "21.4%", left: "49.97%" },
  france: { top: "22.8%", left: "50.67%" },
  italy: { top: "26.7%", left: "53.47%" },
  asia: { top: "41.6%", left: "75%" },
  japan: { top: "30.2%", left: "88.8%" },
  mexico: { top: "39.2%", left: "22.5%" },
};

const scrollToRegion = (id: string) => {
  const el = document.getElementById(`region-${id}`);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const KitchenAtlas = () => {

  return (
    <Layout>
      <Helmet>
        <title>The Kitchen Atlas — explore world cuisines and cooking challenges | Stir & Simmer</title>
        <meta
          name="description"
          content="Explore six world cuisine regions and discover occasional cooking challenges — all linked to tried and tested recipes on Stir & Simmer."
        />
        <link rel="canonical" href="https://stirandsimmer.co.uk/kitchen-atlas" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://stirandsimmer.co.uk/kitchen-atlas" />
        <meta property="og:title" content="The Kitchen Atlas | Stir & Simmer" />
        <meta property="og:description" content="Explore six world cuisine regions and discover occasional cooking challenges — all linked to tried and tested recipes on Stir & Simmer." />
        <meta property="og:image" content="https://stirandsimmer.co.uk/og-image.jpg" />
        <meta property="og:site_name" content="Stir & Simmer" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The Kitchen Atlas | Stir & Simmer" />
        <meta name="twitter:description" content="Explore six world cuisine regions and discover occasional cooking challenges — all linked to tried and tested recipes on Stir & Simmer." />
        <meta name="twitter:image" content="https://stirandsimmer.co.uk/og-image.jpg" />
      </Helmet>

      <PageHero
        title="Kitchen Atlas"
        subtitle="Every recipe, organised by cuisine, ingredient and occasion."
        imageId="1640774"
        imageAlt="A flatlay of dishes and ingredients from cuisines around the world"
      />

      {/* Divider between hero and map */}
      <div aria-hidden className="w-full h-px bg-white/90" />

      {/* MAP */}
      <section className="py-8 md:py-16 bg-[hsl(var(--atlas-map-bg))]">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div
            role="group"
            aria-label="World map showing available cuisine regions"
            aria-describedby="kitchen-atlas-map-description"
            className="relative mx-auto rounded-xl overflow-hidden block bg-[hsl(var(--atlas-map-surface))]"
            style={{
              maxWidth: "1100px",
              aspectRatio: "2 / 1",
              backgroundImage:
                "radial-gradient(circle at 20% 40%, hsl(var(--atlas-marker) / 0.08), transparent 40%), radial-gradient(circle at 60% 60%, hsl(var(--atlas-marker) / 0.06), transparent 45%), radial-gradient(circle at 80% 30%, hsl(var(--atlas-marker) / 0.05), transparent 40%)",
            }}
          >
            <p id="kitchen-atlas-map-description" className="sr-only">
              An interactive world map with markers for six cuisine regions: United Kingdom, France, Italy, South and Southeast Asia, Japan and Mexico. Active markers jump to the matching region section below; Japan is marked as coming soon. The same regions are listed as links in the grid further down the page.
            </p>
            {/* World map silhouette (equirectangular, 1000x500 viewBox) */}
            <svg
              viewBox="0 0 1000 500"
              preserveAspectRatio="xMidYMid meet"
              className="absolute inset-0 w-full h-full"
              aria-hidden="true"
            >
              <path
                d={WORLD_MAP_PATH}
                fill="hsl(var(--atlas-map-land))"
                stroke="hsl(var(--atlas-map-land-stroke))"
                strokeWidth="0.6"
                strokeLinejoin="round"
              />
            </svg>

            {/* Markers */}
            {REGIONS.map((r) => {
              const pos = MAP_POSITIONS[r.id];
              if (!pos) return null;
              return (
                <button
                  key={r.id}
                  onClick={() => r.available && scrollToRegion(r.id)}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ top: pos.top, left: pos.left, cursor: r.available ? "pointer" : "not-allowed" }}
                  aria-label={r.available ? `Jump to ${r.name}` : `${r.name} — coming soon`}
                  aria-disabled={r.available ? undefined : true}
                >
                  <span
                    className="block rounded-full bg-[hsl(var(--atlas-marker))] motion-safe:animate-pulse"
                    style={{
                      width: "16px",
                      height: "16px",
                      boxShadow: "0 0 18px 4px hsl(var(--atlas-marker) / 0.55)",
                      opacity: r.available ? 1 : 0.55,
                    }}
                  />
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* REGION CARD GRID — light section */}
      <section className="bg-background py-10 md:py-14 border-b border-border">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4">
            {REGIONS.map((r) =>
              r.available ? (
                <Link
                  key={r.id}
                  to={`/recipes/region/${r.id}`}
                  className="text-left rounded-lg p-3 md:p-5 bg-card border border-border overflow-hidden transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer block"
                  style={{ borderTop: `4px solid ${r.bg}` }}
                >
                  <div className="text-xl md:text-3xl mb-1.5 md:mb-2">{r.emoji}</div>
                  <div className="font-display text-xs md:text-lg leading-tight text-foreground">
                    {r.name}
                  </div>
                  <div className="text-[10px] md:text-xs mt-1.5 md:mt-2 text-muted-foreground">
                    Explore →
                  </div>
                </Link>
              ) : (
                <div
                  key={r.id}
                  aria-disabled="true"
                  className="text-left rounded-lg p-3 md:p-5 bg-card border border-border overflow-hidden cursor-not-allowed opacity-60"
                  style={{ borderTop: `4px solid ${r.bg}` }}
                >
                  <div className="text-xl md:text-3xl mb-1.5 md:mb-2">{r.emoji}</div>
                  <div className="font-display text-xs md:text-lg leading-tight text-foreground">
                    {r.name}
                  </div>
                  <div className="text-[10px] md:text-xs mt-1.5 md:mt-2 text-muted-foreground">
                    Coming soon
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>
      {/* REGION SECTIONS — light */}
      <div className="bg-background">
        {REGIONS.map((region) => (
          <RegionSection key={region.id} region={region} />
        ))}
      </div>
    </Layout>
  );
};

const REGION_BUTTON_LABEL: Record<string, string> = {
  uk: "Explore all United Kingdom recipes",
  italy: "Explore all Italian recipes",
  france: "Explore all French recipes",
  asia: "Explore all South and Southeast Asian recipes",
  mexico: "Explore all Mexican recipes",
};

// Render markdown-style [label](href) links inline. External URLs open in a
// new tab; internal paths use react-router for client-side navigation.
const renderChallenge = (text: string) => {
  const parts: (string | JSX.Element)[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    const [, label, href] = match;
    const isInternal = href.startsWith("/");
    if (isInternal) {
      parts.push(
        <Link key={key++} to={href} className="underline underline-offset-2 hover:opacity-80">
          {label}
        </Link>,
      );
    } else {
      parts.push(
        <a
          key={key++}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:opacity-80"
        >
          {label}
        </a>,
      );
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
};

const RegionSection = ({ region }: { region: RegionDef }) => {
  const disabled = !region.available;

  const { data: liveChallenge } = useQuery({
    queryKey: ["region-challenge", region.id],
    enabled: !disabled,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("region_challenges")
        .select("challenge")
        .eq("region_id", region.id)
        .maybeSingle();
      if (error) throw error;
      return data?.challenge ?? null;
    },
  });

  const challengeText = liveChallenge ?? region.challenge;

  return (
    <section
      id={`region-${region.id}`}
      className="scroll-mt-24 py-5 md:py-6 bg-background border-b border-border border-l-4"
      style={{ borderLeftColor: region.bg, opacity: disabled ? 0.55 : 1 }}
      aria-disabled={disabled || undefined}
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-baseline gap-3 mb-2 flex-wrap">
          <span className="text-2xl">{region.emoji}</span>
          <h2 className="font-display text-3xl md:text-4xl text-foreground">
            {region.name}
          </h2>
          {disabled && (
            <span className="text-xs uppercase tracking-widest font-semibold text-muted-foreground border border-border rounded-full px-2.5 py-1">
              Coming soon
            </span>
          )}
        </div>
        <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-3xl">
          {region.description}
        </p>

        {disabled ? (
          <span
            className="inline-flex items-center justify-center w-full md:w-auto whitespace-normal md:whitespace-nowrap text-base rounded-md px-8 py-3 font-medium border border-border bg-muted text-muted-foreground cursor-not-allowed select-none"
            aria-disabled="true"
          >
            Coming soon
          </span>
        ) : (
          <Button
            asChild
            size="lg"
            className="w-full md:w-auto whitespace-normal md:whitespace-nowrap text-base"
          >
            <Link to={`/recipes/region/${region.id}`}>
              {REGION_BUTTON_LABEL[region.id] ?? `Explore all ${region.name} recipes`}{" "}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        )}

        {/* Challenge callout — warm-soft surface */}
        <div
          className={`mt-8 rounded-lg p-5 md:p-6 border border-border ${
            disabled ? "bg-warm-soft/60" : "bg-warm-soft"
          }`}
        >
          <p className="text-xs uppercase tracking-widest font-semibold mb-1 text-muted-foreground">
            Challenge
          </p>
          <p className="text-base md:text-lg text-foreground">
            {renderChallenge(challengeText)}
          </p>
        </div>
      </div>
    </section>
  );
};

export default KitchenAtlas;
