import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import { CUISINE_GUIDES_BY_SLUG } from "@/lib/cuisine-guides";

type RegionDef = {
  id: string;
  /** Slug into CUISINE_GUIDES_BY_SLUG — used to pull the hero image. */
  slug: string;
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
    slug: "united-kingdom",
    name: "United Kingdom",
    emoji: "🇬🇧",
    bg: "hsl(var(--region-uk))",
    available: true,
    description: "Honest, seasonal and deeply comforting. The foundation of everything.",
    href: "/kitchen-atlas/united-kingdom",
  },
  {
    id: "italy",
    slug: "italy",
    name: "Italy",
    emoji: "🇮🇹",
    bg: "hsl(var(--region-italy))",
    available: true,
    description: "Pasta, sauces and the art of simplicity. Italy feeds the soul.",
    href: "/kitchen-atlas/italy",
  },
  {
    id: "france",
    slug: "france",
    name: "France",
    emoji: "🇫🇷",
    bg: "hsl(var(--region-france))",
    available: true,
    description: "Classical techniques that underpin all of western cooking.",
    href: "/kitchen-atlas/france",
  },
  {
    id: "spain",
    slug: "spain",
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
    slug: "india",
    name: "India",
    emoji: "🇮🇳",
    bg: "hsl(var(--region-india))",
    available: true,
    description: "Bold spices, fragrant herbs and layers of warmth and depth.",
    href: "/kitchen-atlas/india",
  },
  {
    id: "thailand",
    slug: "thailand",
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
    slug: "mediterranean",
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
    slug: "middle-east",
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
    slug: "mexico",
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
const pexelsImage = (id: string, w = 800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fm=webp&w=${w}`;
const regionImage = (r: RegionDef) => {
  const guide = CUISINE_GUIDES_BY_SLUG[r.slug];
  return guide ? pexelsImage(guide.imageId, 800) : null;
};


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
        imageId="678414"
        imageAlt="An overhead flat lay of spices from around the world — cinnamon sticks, star anise, turmeric, fennel and poppy seeds"
      />

      {/* REGION CARD GRID — light section */}
      <section className="bg-background py-10 md:py-14 border-b border-border">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {REGIONS.map((r) => {
              const img = regionImage(r);
              const cardBase =
                "group relative flex flex-col text-left rounded-xl overflow-hidden border border-border min-h-[280px] md:min-h-[320px]";
              const interactive =
                "transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-primary/40 cursor-pointer";

              const inner = (
                <>
                  {/* Background image */}
                  {img ? (
                    <img
                      src={img}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="absolute inset-0"
                      style={{ background: r.bg }}
                    />
                  )}
                  {/* Dark gradient overlay */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/30"
                  />
                  {/* Content */}
                  <div className="relative flex flex-col h-full p-5 md:p-6 text-white">
                    <div className="text-3xl md:text-4xl mb-3 drop-shadow">{r.emoji}</div>
                    <div className="font-display text-lg md:text-xl leading-tight">
                      {r.name}
                    </div>
                    <p className="text-sm text-white/85 mt-2 leading-relaxed flex-1">
                      {r.description}
                    </p>
                    {r.available ? (
                      <div className="mt-4 text-sm font-medium text-white flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                        Read the guide <span aria-hidden="true">→</span>
                      </div>
                    ) : (
                      <div className="mt-4 text-sm font-medium text-white/70">
                        Coming soon
                      </div>
                    )}
                  </div>
                </>
              );

              return r.available ? (
                <Link key={r.id} to={regionHref(r)} className={`${cardBase} ${interactive}`}>
                  {inner}
                </Link>
              ) : (
                <div
                  key={r.id}
                  aria-disabled="true"
                  className={`${cardBase} cursor-not-allowed opacity-70`}
                >
                  {inner}
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </Layout>
  );
};

export default KitchenAtlas;
