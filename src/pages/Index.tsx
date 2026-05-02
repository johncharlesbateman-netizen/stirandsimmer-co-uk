import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import collectionsTeaser from "@/assets/collections-teaser.jpg";
import MealPlannerPromo from "@/components/MealPlannerPromo";
import { collections } from "@/lib/collections";
import { supabase } from "@/integrations/supabase/client";

const heroImage = "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1920";

// Fallback values used until the live count loads (and if the query ever fails).
const FALLBACK_RECIPE_COUNT = 114;


const Index = () => {
  const [recipeCount, setRecipeCount] = useState<number>(FALLBACK_RECIPE_COUNT);

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

  // Round down to a friendly milestone (e.g. 114 -> "110+") for the hero copy.
  const roundedRecipes = Math.floor(recipeCount / 10) * 10;
  const collectionCount = collections.length;

  return (
    <Layout>
      <Helmet>
        <title>Great Food Recipes — Editorial Food Photography Portfolio</title>
        <meta name="description" content="An editorial food photography portfolio — natural light, considered styling and visual stories crafted for restaurants, brands and editorial titles." />
        <meta name="keywords" content="editorial food photography, food photography portfolio, food stylist" />
        <link rel="canonical" href="https://www.greatfoodrecipes.co.uk/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.greatfoodrecipes.co.uk/" />
        <meta property="og:title" content="Great Food Recipes — Editorial Food Photography Portfolio" />
        <meta property="og:description" content="An editorial food photography portfolio — natural light, considered styling and visual stories crafted for restaurants, brands and editorial titles." />
        <meta property="og:image" content={heroImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Great Food Recipes — Editorial Food Photography Portfolio" />
        <meta name="twitter:description" content="An editorial food photography portfolio — natural light, considered styling and visual stories crafted for restaurants, brands and editorial titles." />
        <meta name="twitter:image" content={heroImage} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Great Food Recipes",
          "url": "https://www.greatfoodrecipes.co.uk",
          "description": "Curated recipes crafted with fresh ingredients, bold flavours, and a whole lot of love.",
          "publisher": {
            "@type": "Organization",
            "name": "Great Food Recipes",
            "url": "https://www.greatfoodrecipes.co.uk"
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.greatfoodrecipes.co.uk/recipes?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })}</script>
      </Helmet>
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden" style={{ marginTop: '-5rem' }}>
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Food photography hero"
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
            Great Food Recipes
          </p>
          <h1 
            className="font-display text-4xl md:text-6xl lg:text-7xl mb-6 opacity-0 animate-fade-in leading-tight"
            style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
          >
            Recipes that bring people together around the table
          </h1>
          <p
            className="text-lg md:text-xl font-body tracking-wide opacity-0 animate-fade-in max-w-2xl mx-auto"
            style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
          >
            Curated recipes crafted with fresh ingredients, bold flavours, and a whole lot of love.
          </p>

          <div
            className="mt-10 flex flex-col items-center gap-4 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}
          >
            <Link
              to="/recipes"
              className="inline-block px-10 py-4 bg-background text-foreground text-sm tracking-wider uppercase hover:opacity-90 transition-opacity"
            >
              Explore all {roundedRecipes}+ recipes
            </Link>
            <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-primary-foreground/80">
              Over {roundedRecipes} tried-and-tested recipes · free to browse
            </p>
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
            src={collectionsTeaser}
            alt="A warm, atmospheric table set with pasta, salad, bread and wine"
            className="w-full h-full object-cover"
            loading="lazy"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/75" />
        </div>
        <div className="relative container mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-36 text-center text-primary-foreground">
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase mb-6 opacity-90">
            Meal Ideas
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-5 leading-tight max-w-3xl mx-auto">
            Discover Your Next Favourite Meal
          </h2>
          <p className="text-base md:text-lg font-body max-w-2xl mx-auto mb-4 text-primary-foreground/90 leading-relaxed italic">
            Handpicked recipes grouped by ingredient, occasion and cuisine — find exactly what you're looking for.
          </p>
          <p className="text-sm md:text-base font-body max-w-2xl mx-auto mb-10 text-primary-foreground/75 leading-relaxed">
            From weeknight suppers to romantic dinners, we've curated the perfect collection for every occasion.
          </p>
          <Link
            to="/collections"
            className="inline-block px-10 py-4 bg-background text-foreground text-sm tracking-wider uppercase hover:opacity-90 transition-opacity"
          >
            Explore Meal Ideas
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
