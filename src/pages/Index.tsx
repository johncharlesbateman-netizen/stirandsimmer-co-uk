import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import MealPlannerPromo from "@/components/MealPlannerPromo";
import { BookOpen, Map, CalendarDays, UtensilsCrossed, ArrowRight } from "lucide-react";
import RecipeCard from "@/components/RecipeCard";
import { collections } from "@/lib/collections";
import { Tables } from "@/integrations/supabase/types";

import { supabase } from "@/integrations/supabase/client";

const FEATURED_SLUGS = [
  "butter-chicken",
  "spaghetti-bolognese",
  "best-coq-au-vin",
  "pan-fried-salmon-with-pea-citrus-crush",
  "panna-cotta-with-raspberry-compote",
  "prawn-and-chorizo-rice",
];

const heroPexelsBase = "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&fm=webp";
const heroImage = `${heroPexelsBase}&w=1280`;
const heroImageSrcSet = [480, 768, 1024, 1280, 1600]
  .map((w) => `${heroPexelsBase}&w=${w} ${w}w`)
  .join(", ");
const heroImageSizes = "(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1600px";

// Fallback values used until the live count loads (and if the query ever fails).
const FALLBACK_RECIPE_COUNT = 114;


const Index = () => {
  const [recipeCount, setRecipeCount] = useState<number>(FALLBACK_RECIPE_COUNT);
  const [featured, setFeatured] = useState<Tables<"recipes">[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { count, error } = await supabase
        .from("recipes")
        .select("*", { count: "exact", head: true });
      if (!cancelled && !error && typeof count === "number" && count > 0) {
        setRecipeCount(count);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .in("slug", FEATURED_SLUGS);
      if (!cancelled && !error && data) {
        const ordered = FEATURED_SLUGS
          .map((s) => data.find((r) => r.slug === s))
          .filter((r): r is Tables<"recipes"> => Boolean(r));
        setFeatured(ordered);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const collectionCount = collections.length;

  return (
    <Layout>
      <Helmet>
        <title>Stir & Simmer | Real Recipes for UK Home Cooks</title>
        <link rel="preconnect" href="https://images.pexels.com" crossOrigin="" />
        <link rel="preload" as="image" href={heroImage} imageSrcSet={heroImageSrcSet} imageSizes="100vw" fetchPriority="high" />
        <meta name="description" content="Over 118 tried-and-tested recipes for UK home cooks. No cheffy techniques, no obscure ingredients — just honest food that works. Grams, Celsius, supermarket ingredients." />
        <meta name="keywords" content="recipes, easy recipes, dinner recipes, dessert recipes, quick meals" />
        <link rel="canonical" href="https://stirandsimmer.co.uk/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://stirandsimmer.co.uk/" />
        <meta property="og:title" content="Stir & Simmer | Real Recipes for UK Home Cooks" />
        <meta property="og:description" content="Over 118 tried-and-tested recipes for UK home cooks. No cheffy techniques, no obscure ingredients — just honest food that works. Grams, Celsius, supermarket ingredients." />
        <meta property="og:image" content={heroImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Stir & Simmer | Real Recipes for UK Home Cooks" />
        <meta name="twitter:description" content="Over 118 tried-and-tested recipes for UK home cooks. No cheffy techniques, no obscure ingredients — just honest food that works. Grams, Celsius, supermarket ingredients." />
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
          "description": "A UK recipe site built for people who love good food but live real lives",
          "sameAs": ["https://www.instagram.com/stirandsimmeruk"]
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
              className="group inline-flex items-center gap-2 tracking-[0.2em] uppercase text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              style={{ fontSize: "13px" }}
            >
              <span className="underline-offset-4 group-hover:underline">
                Browse all {recipeCount} tried-and-tested recipes
              </span>
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in" style={{ animationDelay: "1.2s", animationFillMode: "forwards" }}>
          <div className="w-px h-16 bg-primary-foreground/50 animate-pulse" />
        </div>
      </section>

      <div className="h-px bg-border" aria-hidden />

      {/* Featured Recipes */}
      {featured.length > 0 && (
        <section
          className="py-16 md:py-24"
          aria-labelledby="featured-recipes-heading"
          style={{ backgroundColor: "#2C2416", color: "#F5EAD8" }}
        >
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <div className="text-center mb-12 md:mb-16">
              <p className="micro-caption mb-4" style={{ color: "#C4A97A" }}>Featured</p>
              <h2
                id="featured-recipes-heading"
                className="heading-editorial"
                style={{ color: "#F5EAD8" }}
              >
                Recipes worth making
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 [&_h3]:text-[#F5EAD8] [&_.micro-caption]:text-[#C4A97A] [&_p]:text-[#F5EAD8]/75">
              {featured.map((recipe, i) => (
                <RecipeCard key={recipe.id} recipe={recipe} floatDelay={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="h-px bg-border" aria-hidden />

      {/* Explore the site */}
      <section
        className="py-16 md:py-24"
        aria-labelledby="explore-heading"
        style={{ backgroundColor: "#2C2416", color: "#F5EAD8" }}
      >
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center mb-12 md:mb-16">
            <p className="micro-caption mb-4" style={{ color: "#C4A97A" }}>Explore</p>
            <h2 id="explore-heading" className="heading-editorial" style={{ color: "#F5EAD8" }}>
              Find your way around
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { to: "/recipes", icon: UtensilsCrossed, title: "Recipes", desc: "Browse every tried-and-tested recipe on the site." },
              { to: "/meal-planner", icon: CalendarDays, title: "Meal Planner", desc: "Plan your week and build a shopping list in minutes." },
              { to: "/guides", icon: BookOpen, title: "Guides", desc: "Master the techniques behind the recipes you love." },
              { to: "/kitchen-atlas", icon: Map, title: "Kitchen Atlas", desc: "Travel the world's cuisines from your own kitchen." },
            ].map(({ to, icon: Icon, title, desc }) => (
              <Link
                key={to}
                to={to}
                className="group block p-8 transition-all hover:shadow-lg"
                style={{
                  backgroundColor: "#3D3322",
                  border: "1px solid rgba(245,234,216,0.15)",
                  color: "#F5EAD8",
                }}
              >
                <Icon className="w-7 h-7 mb-5 transition-colors" strokeWidth={1.5} style={{ color: "#C4A97A" }} />
                <h3 className="font-display text-2xl mb-2" style={{ color: "#F5EAD8" }}>{title}</h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(245,234,216,0.75)" }}>{desc}</p>
                <span className="inline-flex items-center gap-1.5 text-xs tracking-[0.2em] uppercase" style={{ color: "#C4A97A" }}>
                  Explore
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default Index;
