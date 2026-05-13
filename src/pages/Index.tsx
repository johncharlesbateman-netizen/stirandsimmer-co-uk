import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import collectionsTeaser from "@/assets/collections-teaser.webp";
import collectionsTeaser800 from "@/assets/collections-teaser-800.webp";
import collectionsTeaser1200 from "@/assets/collections-teaser-1200.webp";
import MealPlannerPromo from "@/components/MealPlannerPromo";
import { collections } from "@/lib/collections";
import { useRecipeCount } from "@/hooks/useRecipeCount";

const heroPexelsBase = "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&fm=webp";
const heroImage = `${heroPexelsBase}&w=1280`;
const heroImageSrcSet = [480, 768, 1024, 1280, 1600]
  .map((w) => `${heroPexelsBase}&w=${w} ${w}w`)
  .join(", ");
const heroImageSizes = "(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1600px";

const Index = () => {
  const { data: liveCount } = useRecipeCount();
  const recipeCount = liveCount ?? null;

  const collectionCount = collections.length;

  return (
    <Layout>
      <Helmet>
        <title>Stir & Simmer | Delicious Recipes for Every Occasion</title>
        <link rel="preconnect" href="https://images.pexels.com" crossOrigin="" />
        <link rel="preload" as="image" href={heroImage} imageSrcSet={heroImageSrcSet} imageSizes="100vw" fetchPriority="high" />
        <meta name="description" content="Discover easy, flavour-packed recipes for every occasion. From quick weeknight dinners to impressive desserts — Stir & Simmer has something for everyone." />
        <meta name="keywords" content="recipes, easy recipes, dinner recipes, dessert recipes, quick meals" />
        <link rel="canonical" href="https://stirandsimmer.co.uk/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://stirandsimmer.co.uk/" />
        <meta property="og:title" content="Stir & Simmer | Delicious Recipes for Every Occasion" />
        <meta property="og:description" content="Discover easy, flavour-packed recipes for every occasion. From quick weeknight dinners to impressive desserts — Stir & Simmer has something for everyone." />
        <meta property="og:image" content={heroImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Stir & Simmer | Delicious Recipes for Every Occasion" />
        <meta name="twitter:description" content="Discover easy, flavour-packed recipes for every occasion. From quick weeknight dinners to impressive desserts — Stir & Simmer has something for everyone." />
        <meta name="twitter:image" content={heroImage} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Stir & Simmer",
          "url": "https://stirandsimmer.co.uk",
          "description": "Curated recipes crafted with fresh ingredients, bold flavours, and a whole lot of love.",
          "publisher": {
            "@type": "Organization",
            "name": "Stir & Simmer",
            "url": "https://stirandsimmer.co.uk"
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://stirandsimmer.co.uk/recipes?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Stir & Simmer",
          "url": "https://stirandsimmer.co.uk",
          "description": "A UK recipe site with free curated recipes for every occasion."
        })}</script>
      </Helmet>
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden" style={{ marginTop: '-5rem' }}>
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            srcSet={heroImageSrcSet}
            sizes="100vw"
            alt="Rustic table laid with freshly cooked dishes, herbs and warm natural light"
            fetchPriority="high"
            decoding="async"
            width={1600}
            height={1067}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-primary-foreground px-6 max-w-4xl">
          <p 
            className="text-sm md:text-base tracking-[0.3em] uppercase mb-4 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
          >
            Stir & Simmer
          </p>
          <h1 
            className="font-display mb-6 opacity-0 animate-fade-in leading-tight"
            style={{ animationDelay: "0.4s", animationFillMode: "forwards", fontSize: "clamp(2rem, 5vw, 3rem)" }}
          >
            Your kitchen. The world's cuisines.
          </h1>
          <div
            className="mt-10 flex flex-col items-center gap-4 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}
          >
            <Link
              to="/recipes"
              className="tracking-[0.2em] uppercase text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              style={{ fontSize: "13px" }}
            >
              {recipeCount !== null ? `${recipeCount} tried-and-tested recipes` : "Tried-and-tested recipes"}
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in" style={{ animationDelay: "1.2s", animationFillMode: "forwards" }}>
          <div className="w-px h-16 bg-primary-foreground/50 animate-pulse" />
        </div>
      </section>

      <div className="h-2 bg-background" aria-hidden />


      {/* Collections Teaser */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={collectionsTeaser1200}
            srcSet={`${collectionsTeaser800} 800w, ${collectionsTeaser1200} 1200w, ${collectionsTeaser} 1600w`}
            sizes="100vw"
            alt="A warm, atmospheric table set with pasta, salad, bread and wine"
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            width={1600}
            height={821}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/75" />
        </div>
        <div className="relative container mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-36 text-center text-primary-foreground">
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase mb-6 opacity-90">
            Recipes
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-5 leading-tight max-w-3xl mx-auto">
            Discover our Recipes
          </h2>
          <p className="text-base md:text-lg font-body max-w-2xl mx-auto mb-10 text-primary-foreground/90 leading-relaxed italic">
            Browse our full collection of tried-and-tested recipes from around the world.
          </p>
          <Link
            to="/recipes"
            className="inline-block px-10 py-4 bg-background text-foreground text-sm tracking-wider uppercase hover:opacity-90 transition-opacity"
          >
            Discover our Recipes
          </Link>
        </div>
      </section>

      <div className="h-2 bg-background" aria-hidden />

      {/* Weekly Meal Planner Promo */}
      <MealPlannerPromo />

      {/* CTA Section */}
      <section className="bg-secondary/50 border-y border-border">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20 text-center">
          <h2 className="heading-editorial mb-5">Got a question? We'd love to help</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Whether you need advice on a recipe, a cooking tip, or just want to chat about food — drop us a line.
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-4 bg-foreground text-background text-sm tracking-wider uppercase hover:opacity-80 transition-opacity"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
