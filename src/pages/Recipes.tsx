import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import RecipeCard from "@/components/RecipeCard";
import { supabase } from "@/integrations/supabase/client";
import { categoryLabels, allCategories } from "@/lib/recipe-utils";
import { Database } from "@/integrations/supabase/types";
import { cn } from "@/lib/utils";

type RecipeCategory = Database["public"]["Enums"]["recipe_category"];

const Recipes = () => {
  const [activeCategory, setActiveCategory] = useState<RecipeCategory | "all">("all");

  const { data: recipes, isLoading } = useQuery({
    queryKey: ["recipes", activeCategory],
    queryFn: async () => {
      let query = supabase
        .from("recipes")
        .select("*")
        .order("created_at", { ascending: false });

      if (activeCategory !== "all") {
        query = query.eq("category", activeCategory);
      }

      const { data, error } = await query;
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
      <section className="section-breathing border-b border-border">
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

      {/* Category Filters */}
      <section className="py-8 border-b border-border sticky top-20 z-40 bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveCategory("all")}
              className={cn(
                "px-4 py-2 text-sm tracking-wider uppercase border transition-colors duration-300",
                activeCategory === "all"
                  ? "bg-foreground text-background border-foreground"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-foreground"
              )}
            >
              All
            </button>
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-2 text-sm tracking-wider uppercase border transition-colors duration-300",
                  activeCategory === cat
                    ? "bg-foreground text-background border-foreground"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-foreground"
                )}
              >
                {categoryLabels[cat]}
              </button>
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
