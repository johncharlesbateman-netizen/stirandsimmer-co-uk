import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";

type RegionDef = {
  id: string;
  name: string;
  emoji: string;
  bg: string; // hex
  available: boolean;
  description?: string;
  /** Path to open when the user clicks Explore. Defaults to /recipes/region/:id. */
  href?: string;
};

const REGIONS: RegionDef[] = [
  {
    id: "uk",
    name: "United Kingdom",
    emoji: "🇬🇧",
    bg: "hsl(var(--region-uk))",
    available: true,
    description: "Honest, seasonal and deeply comforting. The foundation of everything.",
    href: "/kitchen-atlas/united-kingdom",
  },
  {
    id: "italy",
    name: "Italy",
    emoji: "🇮🇹",
    bg: "hsl(var(--region-italy))",
    available: true,
    description: "Pasta, sauces and the art of simplicity. Italy feeds the soul.",
    href: "/kitchen-atlas/italy",
  },
  {
    id: "france",
    name: "France",
    emoji: "🇫🇷",
    bg: "hsl(var(--region-france))",
    available: true,
    description: "Classical techniques that underpin all of western cooking.",
    href: "/kitchen-atlas/france",
  },
  {
    id: "spain",
    name: "Spain",
    emoji: "🇪🇸",
    bg: "hsl(var(--region-spain))",
    available: true,
    description:
      "Bold flavours, beautiful simplicity and the art of sharing. The soul of Spanish cooking.",
    href: "/kitchen-atlas/spain",
  },
  {
    id: "india",
    name: "India",
    emoji: "🇮🇳",
    bg: "hsl(var(--region-india))",
    available: true,
    description: "Bold spices, fragrant herbs and layers of warmth and depth.",
    href: "/kitchen-atlas/india",
  },
  {
    id: "thailand",
    name: "Thailand",
    emoji: "🇹🇭",
    bg: "hsl(var(--region-thailand))",
    available: true,
    description:
      "Fragrant, fiery and beautifully balanced — the sweet, sour, salty, spicy heart of Thai cooking.",
    href: "/kitchen-atlas/thailand",
  },
  {
    id: "mediterranean",
    name: "Mediterranean",
    emoji: "🌊",
    bg: "hsl(var(--region-mediterranean))",
    available: true,
    description:
      "The shared table around one sea — olive oil, vegetables, fish and herbs from southern Europe and North Africa.",
    href: "/kitchen-atlas/mediterranean",
  },
  {
    id: "middleeast",
    name: "Middle East",
    emoji: "🥙",
    bg: "hsl(var(--region-middleeast))",
    available: true,
    description:
      "Warm spices, slow-cooked meats, fresh herbs and the deep hospitality of Middle Eastern cooking.",
    href: "/kitchen-atlas/middle-east",
  },
  {
    id: "mexico",
    name: "Mexico",
    emoji: "🇲🇽",
    bg: "hsl(var(--region-mexico))",
    available: true,
    description:
      "Vibrant, smoky and deeply satisfying. The bold flavours of Mexican cooking.",
    href: "/kitchen-atlas/mexico",
  },
];

const REGION_BUTTON_LABEL: Record<string, string> = {
  uk: "Read the British cuisine guide",
  italy: "Read the Italian cuisine guide",
  france: "Read the French cuisine guide",
  spain: "Read the Spanish cuisine guide",
  india: "Read the Indian cuisine guide",
  thailand: "Read the Thai cuisine guide",
  mediterranean: "Read the Mediterranean cuisine guide",
  middleeast: "Read the Middle Eastern cuisine guide",
  mexico: "Read the Mexican cuisine guide",
};

const regionHref = (r: RegionDef) => r.href ?? `/recipes/region/${r.id}`;



const KitchenAtlas = () => {
  return (
    <Layout>
      <Helmet>
        <title>The Kitchen Atlas — explore world cuisines | Stir & Simmer</title>
        <meta
          name="description"
          content="Explore world cuisine regions and the recipes behind them — Italian, French, British, Spanish, Indian, Thai and more, all tried and tested at Stir & Simmer."
        />
        <link rel="canonical" href="https://stirandsimmer.co.uk/kitchen-atlas" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://stirandsimmer.co.uk/kitchen-atlas" />
        <meta property="og:title" content="The Kitchen Atlas | Stir & Simmer" />
        <meta property="og:description" content="Explore world cuisine regions and the recipes behind them — all tried and tested on Stir & Simmer." />
        <meta property="og:image" content="https://stirandsimmer.co.uk/og-image.jpg" />
        <meta property="og:site_name" content="Stir & Simmer" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The Kitchen Atlas | Stir & Simmer" />
        <meta name="twitter:description" content="Explore world cuisine regions and the recipes behind them — all tried and tested on Stir & Simmer." />
        <meta name="twitter:image" content="https://stirandsimmer.co.uk/og-image.jpg" />
      </Helmet>

      <PageHero
        title="Kitchen Atlas"
        subtitle="Every recipe, explored by cuisine and ingredient — discover the traditions behind the food you love."
        imageId="1640774"
        imageAlt="A flatlay of dishes and ingredients from cuisines around the world"
      />

      {/* REGION CARD GRID — light section */}
      <section className="bg-background py-10 md:py-14 border-b border-border">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4">
            {REGIONS.map((r) =>
              r.available ? (
                <Link
                  key={r.id}
                  to={regionHref(r)}
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

const RegionSection = ({ region }: { region: RegionDef }) => {
  const disabled = !region.available;
  const href = regionHref(region);

  return (
    <section
      id={`region-${region.id}`}
      className="scroll-mt-24 py-5 md:py-6 bg-background border-b border-border border-l-4"
      style={{ borderLeftColor: region.bg, opacity: disabled ? 0.55 : 1 }}
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
            <Link to={href}>
              {REGION_BUTTON_LABEL[region.id] ?? `Explore all ${region.name} recipes`}{" "}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        )}
      </div>
    </section>
  );
};

export default KitchenAtlas;
