import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowRight } from "lucide-react";
import { GUIDES_IN_ORDER, SITE_ORIGIN } from "@/lib/guideMeta";
import {
  GUIDES,
  GUIDE_CATEGORIES,
  GUIDE_FALLBACK_IMAGE,
  guideCardImage,
  guideCardSrcSet,
  type GuideCategory,
} from "@/lib/guidesIndex";

const pexels = (id: string, w = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fm=webp&w=${w}`;
const pexelsSrcSet = (id: string, widths: number[]) =>
  widths.map((w) => `${pexels(id, w)} ${w}w`).join(", ");

const HERO_ID = "1340116";
const heroImage = pexels(HERO_ID, 1600);
const heroSrcSet = pexelsSrcSet(HERO_ID, [768, 1200, 1600, 2000]);

const Guides = () => {
  const [activeCategory, setActiveCategory] = useState<GuideCategory>("All");

  const visibleGuides =
    activeCategory === "All"
      ? GUIDES
      : GUIDES.filter((g) => g.category === activeCategory);

  const collectionUrl = `${SITE_ORIGIN}/guides`;
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": collectionUrl,
    url: collectionUrl,
    name: "Guides — kitchen techniques and reference",
    description:
      "Practical kitchen guides from Stir & Simmer — techniques, reference and the craft behind great home cooking.",
    isPartOf: { "@type": "WebSite", name: "Stir & Simmer", url: SITE_ORIGIN },
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: GUIDES_IN_ORDER.length,
      itemListElement: GUIDES_IN_ORDER.map((g, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: g.url,
        name: g.name,
      })),
    },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_ORIGIN}/` },
      { "@type": "ListItem", position: 2, name: "Guides", item: collectionUrl },
    ],
  };

  return (
    <Layout>
      <Helmet>
        <title>Guides — kitchen techniques and reference | Stir & Simmer</title>
        <meta
          name="description"
          content="Practical kitchen guides from Stir & Simmer — techniques, reference and the craft behind great home cooking."
        />
        <link rel="canonical" href={collectionUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Stir & Simmer" />
        <meta property="og:url" content={collectionUrl} />
        <meta property="og:title" content="Guides — kitchen techniques and reference | Stir & Simmer" />
        <meta property="og:description" content="Practical kitchen guides from Stir & Simmer — techniques, reference and the craft behind great home cooking." />
        <meta property="og:image" content="https://stirandsimmer.co.uk/og-image-1200x630.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Warm spices, herbs and cookware arranged on a dark rustic surface" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Guides — kitchen techniques and reference | Stir & Simmer" />
        <meta name="twitter:description" content="Practical kitchen guides from Stir & Simmer — techniques, reference and the craft behind great home cooking." />
        <meta name="twitter:image" content="https://stirandsimmer.co.uk/og-image-1200x630.jpg" />
        <link rel="preload" as="image" href={heroImage} imageSrcSet={heroSrcSet} imageSizes="100vw" fetchPriority="high" />
        <script type="application/ld+json">{JSON.stringify(collectionJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>


      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            srcSet={heroSrcSet}
            sizes="100vw"
            alt="Warm spices, herbs and cookware arranged on a dark rustic surface"
            fetchPriority="high"
            decoding="async"
            width={1600}
            height={900}
            className="w-full h-full object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-warm-dark/85 via-warm-dark/65 to-warm-dark/90" />
        </div>
        <div className="relative container mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-32 max-w-3xl text-warm-dark-foreground">
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase mb-4 text-warm-cream-muted">Guides</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight mb-5">
            Kitchen guides
          </h1>
          <p className="text-lg md:text-xl text-warm-cream-muted max-w-2xl">
            Techniques, reference and the craft behind great home cooking — explained simply.
          </p>
        </div>
      </section>

      {/* Category filter */}
      <div className="border-b border-border bg-background sticky top-0 z-10">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-5xl">
          <div
            role="tablist"
            aria-label="Filter guides by category"
            className="flex gap-2 md:gap-3 overflow-x-auto py-4 -mx-1 px-1 scrollbar-none"
          >
            {GUIDE_CATEGORIES.map((cat) => {
              const active = cat === activeCategory;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveCategory(cat)}
                  className={
                    "whitespace-nowrap rounded-full border px-4 py-2 text-xs md:text-sm tracking-wide uppercase transition-colors " +
                    (active
                      ? "bg-warm-dark text-warm-dark-foreground border-warm-dark"
                      : "bg-background text-muted-foreground border-border hover:text-foreground hover:border-foreground/40")
                  }
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Guide cards */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-5xl">
        {visibleGuides.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">
            No guides in this category yet.
          </p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {visibleGuides.map((g) => (
              <li key={g.slug}>
                <Link
                  to={`/guides/${g.slug}`}
                  className="group relative block overflow-hidden border border-warm-dark/20 aspect-[3/2] md:aspect-[4/3] transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
                >
                  <img
                    src={guideCardImage(g, 800)}
                    srcSet={guideCardSrcSet(g)}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    alt={g.imageAlt}
                    loading="lazy"
                    decoding="async"
                    width={600}
                    height={400}
                    onError={(e) => {
                      const img = e.currentTarget;
                      if (img.src === GUIDE_FALLBACK_IMAGE) return;
                      img.srcset = "";
                      img.src = GUIDE_FALLBACK_IMAGE;
                    }}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-warm-dark/95 via-warm-dark/60 to-warm-dark/25 transition-opacity duration-500 group-hover:from-warm-dark group-hover:via-warm-dark/70"
                  />
                  <div className="absolute inset-0 p-6 md:p-7 flex flex-col justify-end text-warm-dark-foreground">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-warm-cream-muted mb-3">
                      {g.eyebrow}
                    </p>
                    <h2 className="font-display text-xl md:text-2xl mb-3 leading-tight transition-transform duration-500 group-hover:translate-x-1">
                      {g.title}
                    </h2>
                    <p className="text-sm leading-relaxed text-warm-cream-muted mb-5 line-clamp-3">
                      {g.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.2em] uppercase text-warm-cream-muted group-hover:text-warm-dark-foreground transition-colors">
                      Read the guide
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
};

export default Guides;
