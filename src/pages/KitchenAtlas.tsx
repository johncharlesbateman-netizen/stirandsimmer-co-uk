import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";

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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {REGIONS.map((r) =>
              r.available ? (
                <Link
                  key={r.id}
                  to={regionHref(r)}
                  className="group flex flex-col text-left rounded-xl p-5 md:p-6 bg-card border border-border overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-primary/30 cursor-pointer"
                  style={{ borderTop: `4px solid ${r.bg}` }}
                >
                  <div className="text-3xl md:text-4xl mb-3">{r.emoji}</div>
                  <div className="font-display text-lg md:text-xl leading-tight text-foreground">
                    {r.name}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed flex-1">
                    {r.description}
                  </p>
                  <div className="mt-4 text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                    Read the guide <span aria-hidden="true">→</span>
                  </div>
                </Link>
              ) : (
                <div
                  key={r.id}
                  aria-disabled="true"
                  className="flex flex-col text-left rounded-xl p-5 md:p-6 bg-card border border-border overflow-hidden cursor-not-allowed opacity-60"
                  style={{ borderTop: `4px solid ${r.bg}` }}
                >
                  <div className="text-3xl md:text-4xl mb-3">{r.emoji}</div>
                  <div className="font-display text-lg md:text-xl leading-tight text-foreground">
                    {r.name}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed flex-1">
                    {r.description}
                  </p>
                  <div className="mt-4 text-sm font-medium text-muted-foreground">
                    Coming soon
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default KitchenAtlas;
