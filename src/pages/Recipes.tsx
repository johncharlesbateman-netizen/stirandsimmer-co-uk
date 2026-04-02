import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import RecipeCard from "@/components/RecipeCard";
import { supabase } from "@/integrations/supabase/client";
import { categoryLabels, categoryToSlug, allCategories } from "@/lib/recipe-utils";
import { cn } from "@/lib/utils";

import categoryChicken from "@/assets/category-chicken.jpg";
import categoryBeef from "@/assets/category-beef.jpg";
import categoryLamb from "@/assets/category-lamb.jpg";
import categoryPork from "@/assets/category-pork.jpg";
import categorySpicy from "@/assets/category-spicy.jpg";
import categorySeafood from "@/assets/category-seafood.jpg";
import categoryLunch from "@/assets/category-lunch.jpg";
import categorySweets from "@/assets/category-sweets.jpg";
import categoryPasta from "@/assets/category-pasta.jpg";

const categoryImages: Record<string, string> = {
  chicken: categoryChicken,
  beef: categoryBeef,
  lamb: categoryLamb,
  pork: categoryPork,
  spicy: categorySpicy,
  seafood: categorySeafood,
  lunch_suggestions: categoryLunch,
  sweets: categorySweets,
  pasta: categoryPasta,
};

const Recipes = () => {
  const { data: recipes, isLoading } = useQuery({
    queryKey: ["recipes", "all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <Layout>
      <Helmet>
        <title>Recipes — Great Food Recipes</title>
        <meta name="description" content="Browse over 100 free recipes — chicken, beef, lamb, seafood, pasta, sweets and more. Fresh ingredients, bold flavours, simple instructions." />
        <link rel="canonical" href="https://greatfoodrecipes.co.uk/recipes" />
      </Helmet>
      {/* Header */}
      <section className="py-12 md:py-16 border-b border-border">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <p className="micro-caption mb-4">Free Recipes</p>
          <h1 className="heading-display mb-6">
            Recipes
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Over 100 recipes using local and seasonal produce — all completely free. 
            From quick lunches to indulgent sweets, there's something for every table.
          </p>
        </div>
      </section>

      {/* Category Grid */}
      <section className="py-8 md:py-10 border-b border-border">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {/* All - active on this page */}
            <div
              className="relative aspect-square overflow-hidden ring-2 ring-foreground ring-offset-2 ring-offset-background"
            >
              <div className="absolute inset-0 bg-foreground" />
              <span className="relative z-10 flex items-center justify-center h-full text-sm tracking-[0.2em] uppercase font-medium text-background">
                All
              </span>
            </div>

            {allCategories.map((cat) => (
              <Link
                key={cat}
                to={`/recipes/category/${categoryToSlug[cat]}`}
                className="relative aspect-square overflow-hidden group transition-all duration-300 opacity-80 hover:opacity-100"
              >
                <img
                  src={categoryImages[cat]}
                  alt={categoryLabels[cat]}
                  loading="lazy"
                  width={640}
                  height={640}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
                <span className="relative z-10 flex items-center justify-center h-full text-sm tracking-[0.2em] uppercase font-medium text-white drop-shadow-md">
                  {categoryLabels[cat]}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recipe Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-4 animate-pulse">
                  <div className="aspect-[4/3] bg-muted" />
                  <div className="h-3 w-20 bg-muted rounded" />
                  <div className="h-6 w-3/4 bg-muted rounded" />
                  <div className="h-4 w-full bg-muted rounded" />
                </div>
              ))}
            </div>
          ) : recipes && recipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {recipes.map((recipe, index) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  floatDelay={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="heading-section text-muted-foreground mb-4">
                No recipes yet
              </p>
              <p className="text-muted-foreground">
                Recipes are being added — check back soon!
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Recipes;
