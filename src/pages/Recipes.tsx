import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import FloatingMealPlannerButton from "@/components/FloatingMealPlannerButton";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { RECIPE_TILES } from "@/lib/recipe-tiles";

type Recipe = Tables<"recipes">;
const Recipes = () => {
  const { data: recipes = [] } = useQuery({
    queryKey: ["recipes", "counts-only"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("recipes")
        .select(
          "id, category, cuisine_region, prep_time_minutes, cook_time_minutes, title, description"
        )
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as unknown as Recipe[];
    },
  });

  const counts: Record<string, number> = {};
  for (const tile of RECIPE_TILES) {
    counts[tile.slug] = recipes.filter(tile.filter).length;
  }
  const total = recipes.length;
  const allTile = RECIPE_TILES[0]; // "all"
  const otherTiles = RECIPE_TILES.slice(1);

  return (
    <Layout>
      <Helmet>
        <title>All recipes — browse by category | Stir & Simmer</title>
        <meta
          name="description"
          content="Browse over 100 free recipes by category — chicken, beef, lamb, fish and seafood, pork, pasta, quick meals and more."
        />
        <link rel="canonical" href="https://www.stirandsimmer.co.uk/recipes" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.stirandsimmer.co.uk/recipes" />
        <meta property="og:title" content="All recipes — browse by category | Stir & Simmer" />
        <meta property="og:description" content="Browse over 100 free recipes by category — chicken, beef, lamb, fish and seafood, pork, pasta, quick meals and more." />
      </Helmet>

      {/* Header */}
      <section className="py-12 md:py-16 border-b border-border">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <p className="micro-caption mb-4">Free Recipes</p>
          <h1 className="heading-display mb-6">Recipes</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Pick a category to dive in. Over {total} free recipes
            using local and seasonal produce — from quick lunches to indulgent
            sweets.
          </p>
        </div>
      </section>

      {/* Tile grid */}
      <section className="py-10 md:py-14">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          {/* Featured "All Recipes" banner tile */}
          <Link
            to={`/recipes/${allTile.slug}`}
            className="group block rounded-xl p-6 md:p-8 mb-4 md:mb-6 transition-transform hover:-translate-y-0.5"
            style={{ backgroundColor: "#1a0e00", color: "#f5e9d7" }}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 md:gap-5">
                <span className="text-3xl md:text-4xl" aria-hidden>
                  {allTile.emoji}
                </span>
                <div>
                  <div className="font-display text-xl md:text-2xl leading-tight">
                    Browse all {total} recipes
                  </div>
                  <div className="text-sm md:text-base opacity-80 mt-1">
                    Every recipe in one place — newest first.
                  </div>
                </div>
              </div>
              <ArrowRight
                className="w-5 h-5 md:w-6 md:h-6 shrink-0 transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </div>
          </Link>

          {/* Category tiles — 2 cols mobile, 4 cols desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {otherTiles.map((tile) => {
              const count = counts[tile.slug] ?? 0;
              return (
                <Link
                  key={tile.slug}
                  to={`/recipes/${tile.slug}`}
                  className="group rounded-xl p-5 md:p-6 min-h-[140px] md:min-h-[170px] flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-0.5"
                  style={{ backgroundColor: "#1a0e00", color: "#f5e9d7" }}
                >
                  <span
                    className="text-3xl md:text-4xl mb-3"
                    aria-hidden
                  >
                    {tile.emoji}
                  </span>
                  <div className="font-display text-base md:text-lg leading-tight">
                    {tile.label}
                  </div>
                  <div
                    className="text-xs md:text-sm mt-2"
                    style={{ color: "#a99270" }}
                  >
                    {count === 0
                      ? "Coming soon"
                      : `${count} ${count === 1 ? "recipe" : "recipes"}`}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <FloatingMealPlannerButton />
    </Layout>
  );
};

export default Recipes;
