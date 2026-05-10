import { useEffect, useMemo, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Lock, Clock, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import NewsletterSignup from "@/components/NewsletterSignup";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { optimisedImage } from "@/lib/image-utils";
import { WORLD_MAP_PATH } from "@/assets/world-map-path";

type Recipe = Tables<"recipes">;

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
    bg: "#1a3a5c",
    available: true,
    description: "Honest, seasonal and deeply comforting. The foundation of everything.",
    challenge:
      "This week — cook a classic British fish dish. Try our Fish Finger Butty or Cider Battered Prawns.",
    regionTags: ["british"],
  },
  {
    id: "italy",
    name: "Italy",
    emoji: "🇮🇹",
    bg: "#8B3A2A",
    available: true,
    description: "Pasta, sauces and the art of simplicity. Italy feeds the soul.",
    challenge:
      "This week — cook a pasta dish entirely from scratch. Find our Italian recipes and challenge yourself.",
    regionTags: ["italian"],
  },
  {
    id: "france",
    name: "France",
    emoji: "🇫🇷",
    bg: "#1a3a7c",
    available: true,
    description: "Classical techniques that underpin all of western cooking.",
    challenge:
      "This week — make a classic French sauce from scratch. Browse our French recipe collection to find your starting point.",
    regionTags: ["french"],
  },
  {
    id: "asia",
    name: "South & Southeast Asia",
    emoji: "🌶️",
    bg: "#5c1a3a",
    available: true,
    description: "Bold spices, fragrant herbs and layers of warmth and depth.",
    challenge:
      "This week — cook a curry entirely from scratch using whole spices, no jars. Find your recipe in our Asian collection.",
    regionTags: ["indian", "asian"],
  },
  {
    id: "japan",
    name: "Japan",
    emoji: "🇯🇵",
    bg: "#7c1a1a",
    available: false,
  },
  {
    id: "mexico",
    name: "Mexico",
    emoji: "🇲🇽",
    bg: "#1a5c2a",
    available: false,
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
  const { data: recipes = [] } = useQuery({
    queryKey: ["kitchen-atlas-recipes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Recipe[];
    },
  });

  const recipesByRegion = useMemo(() => {
    const map: Record<string, Recipe[]> = {};
    for (const region of REGIONS) {
      if (!region.regionTags) continue;
      map[region.id] = recipes.filter((r) => {
        const tags = (r.cuisine_region as string[] | null) ?? [];
        return region.regionTags!.some((t) => tags.includes(t));
      });
    }
    return map;
  }, [recipes]);

  return (
    <Layout>
      <Helmet>
        <title>The Kitchen Atlas — explore world cuisines and weekly cooking challenges | Stir & Simmer</title>
        <meta
          name="description"
          content="Explore six world cuisine regions and discover weekly cooking challenges — all linked to tried and tested recipes on Stir & Simmer."
        />
        <link rel="canonical" href="https://stirandsimmer.co.uk/kitchen-atlas" />
        <meta property="og:title" content="The Kitchen Atlas | Stir & Simmer" />
        <meta property="og:description" content="Explore six world cuisine regions and discover weekly cooking challenges." />
      </Helmet>

      {/* HERO */}
      <section
        className="relative w-full"
        style={{ backgroundColor: "#1a0e00" }}
      >
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28 text-center">
          <p className="micro-caption mb-4" style={{ color: "#C97B1A" }}>
            New
          </p>
          <h1 className="heading-display mb-6" style={{ color: "#f5e9d7" }}>
            The Kitchen Atlas
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto"
            style={{ color: "#d9c7a8" }}
          >
            Explore the world through food. Six cuisine regions, dozens of
            recipes, one challenge at a time.
          </p>
          <div
            className="mx-auto mt-8 h-px w-24"
            style={{ backgroundColor: "#C97B1A" }}
            aria-hidden
          />
        </div>
      </section>

      {/* MAP */}
      <section style={{ backgroundColor: "#120a00" }} className="py-12 md:py-16">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div
            className="relative mx-auto rounded-xl overflow-hidden hidden md:block"
            style={{
              backgroundColor: "#1a0e00",
              maxWidth: "1100px",
              aspectRatio: "2 / 1",
              backgroundImage:
                "radial-gradient(circle at 20% 40%, rgba(201,123,26,0.08), transparent 40%), radial-gradient(circle at 60% 60%, rgba(201,123,26,0.06), transparent 45%), radial-gradient(circle at 80% 30%, rgba(201,123,26,0.05), transparent 40%)",
            }}
          >
            {/* World map silhouette (equirectangular, 1000x500 viewBox) */}
            <svg
              viewBox="0 0 1000 500"
              preserveAspectRatio="xMidYMid meet"
              className="absolute inset-0 w-full h-full"
              aria-hidden
            >
              <path
                d={WORLD_MAP_PATH}
                fill="#3a2410"
                stroke="#5a3a18"
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
                  onClick={() => scrollToRegion(r.id)}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ top: pos.top, left: pos.left }}
                  aria-label={`Jump to ${r.name}`}
                >
                  <span
                    className="block rounded-full animate-pulse"
                    style={{
                      width: "16px",
                      height: "16px",
                      backgroundColor: "#C97B1A",
                      boxShadow: "0 0 18px 4px rgba(201,123,26,0.55)",
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

      {/* WEEKLY CHALLENGE BANNER */}
      <section
        className="w-full py-10 md:py-14"
        style={{ backgroundColor: "#C97B1A", color: "#1a0e00" }}
      >
        <div className="container mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-widest font-semibold mb-2 opacity-80">
              This week's challenge
            </p>
            <h2 className="font-display text-2xl md:text-3xl mb-3">
              Cook 3 Italian classics this week
            </h2>
            <p className="text-base md:text-lg">
              Carbonara, Arrabbiata or Ribollita — find all three on Stir &
              Simmer and challenge yourself to cook them all before Sunday.
            </p>
          </div>
          <Link
            to="/recipes/region/italy"
            className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-3 rounded-md font-medium transition-colors"
            style={{ backgroundColor: "#1a0e00", color: "#f5e9d7" }}
          >
            Browse Italian recipes <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* REGION SECTIONS — light */}
      <div className="bg-background">
        {REGIONS.filter((r) => r.available).map((region) => (
          <RegionSection key={region.id} region={region} />
        ))}

        {/* COMING SOON PANELS */}
        <section className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {REGIONS.filter((r) => !r.available).map((r) => (
              <div
                key={r.id}
                className="rounded-lg p-8 text-center bg-card border border-border"
                style={{ borderTop: `4px solid ${r.bg}`, opacity: 0.85 }}
              >
                <Lock className="w-6 h-6 mx-auto mb-3 text-muted-foreground" />
                <div className="text-3xl mb-2">{r.emoji}</div>
                <h3 className="font-display text-xl mb-2 text-foreground">{r.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Coming soon — more regions launching shortly
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* FOOTER CTA */}
      <section
        className="w-full py-16 md:py-20"
        style={{ backgroundColor: "#1a0e00" }}
      >
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <NewsletterSignup
            eyebrow="Weekly Challenge"
            headline="Never miss a challenge"
            description="Get this week's culinary challenge delivered to your inbox every Monday morning."
          />
        </div>
      </section>
    </Layout>
  );
};

const REGION_BUTTON_LABEL: Record<string, string> = {
  uk: "Explore all United Kingdom recipes",
  italy: "Explore all Italian recipes",
  france: "Explore all French recipes",
  asia: "Explore all South & Southeast Asian recipes",
};

const RegionSection = ({ region }: { region: RegionDef }) => {
  return (
    <section
      id={`region-${region.id}`}
      className="scroll-mt-24 py-12 md:py-16 bg-background border-b border-border border-l-4"
      style={{ borderLeftColor: region.bg }}
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-baseline gap-3 mb-2">
          <span className="text-2xl">{region.emoji}</span>
          <h2 className="font-display text-3xl md:text-4xl text-foreground">
            {region.name}
          </h2>
        </div>
        <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-3xl">
          {region.description}
        </p>

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

        {/* Challenge callout — light warm amber */}
        <div
          className="mt-8 rounded-lg p-5 md:p-6 border border-border"
          style={{ backgroundColor: "#FDF3E7" }}
        >
          <p className="text-xs uppercase tracking-widest font-semibold mb-1 text-muted-foreground">
            Challenge
          </p>
          <p className="text-base md:text-lg text-foreground">{region.challenge}</p>
        </div>
      </div>
    </section>
  );
};

export default KitchenAtlas;
