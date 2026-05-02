import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import Layout from "@/components/Layout";
import RecipeCard from "@/components/RecipeCard";
import FloatingMealPlannerButton from "@/components/FloatingMealPlannerButton";
import { supabase } from "@/integrations/supabase/client";
import { categoryLabels, categoryToSlug, allCategories } from "@/lib/recipe-utils";

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

type FilterCategory = typeof allCategories[number] | null;

// Categories shown as large image tiles (the visual primary filter).
const PRIMARY_CATEGORIES: typeof allCategories[number][] = [
  "chicken",
  "beef",
  "lamb",
  "pork",
  "seafood",
  "pasta",
];

// Categories shown as text chips beneath the tiles (secondary filters).
const SECONDARY_CATEGORIES: typeof allCategories[number][] = [
  "spicy",
  "lunch_suggestions",
  "sweets",
];

const Recipes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterCategory>(null);
  const [showAll, setShowAll] = useState(false);

  const INITIAL_VISIBLE = 12;

  // Reset "show all" whenever the filter or search changes.
  const setActiveFilterAndReset = (next: FilterCategory) => {
    setActiveFilter(next);
    setShowAll(false);
  };
  const setSearchQueryAndReset = (next: string) => {
    setSearchQuery(next);
    setShowAll(false);
  };

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

  const matchesSearch = useMemo(() => {
    if (!recipes) return [];
    const q = searchQuery.toLowerCase().trim();

    return recipes.filter((recipe) => {
      // Search filter
      if (q) {
        const ingredients = (recipe.ingredients as string[]) || [];
        const haystack = [
          recipe.title,
          recipe.description,
          categoryLabels[recipe.category],
          ...ingredients,
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      // Category filter
      if (activeFilter && recipe.category !== activeFilter) return false;

      return true;
    });
  }, [recipes, searchQuery, activeFilter]);

  // Count recipes per category (respecting search query)
  const categoryCounts = useMemo(() => {
    if (!recipes) return {} as Record<string, number>;
    const q = searchQuery.toLowerCase().trim();
    const counts: Record<string, number> = {};

    for (const cat of allCategories) {
      counts[cat] = recipes.filter((recipe) => {
        if (recipe.category !== cat) return false;
        if (q) {
          const ingredients = (recipe.ingredients as string[]) || [];
          const haystack = [
            recipe.title,
            recipe.description,
            categoryLabels[recipe.category],
            ...ingredients,
          ]
            .join(" ")
            .toLowerCase();
          if (!haystack.includes(q)) return false;
        }
        return true;
      }).length;
    }
    return counts;
  }, [recipes, searchQuery]);

  const hasActiveFilters = searchQuery.trim() !== "" || activeFilter !== null;

  const clearAll = () => {
    setSearchQuery("");
    setActiveFilter(null);
  };

  return (
    <Layout>
      <Helmet>
        <title>Recipes — Great Food Recipes</title>
        <meta
          name="description"
          content="Browse over 100 free recipes — chicken, beef, lamb, seafood, pasta, sweets and more. Fresh ingredients, bold flavours, simple instructions."
        />
        <link rel="canonical" href="https://www.greatfoodrecipes.co.uk/recipes" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.greatfoodrecipes.co.uk/recipes" />
        <meta property="og:title" content="Recipes — Great Food Recipes" />
        <meta property="og:description" content="Browse over 100 free recipes — chicken, beef, lamb, seafood, pasta, sweets and more. Fresh ingredients, bold flavours, simple instructions." />
        <meta property="og:image" content={categoryChicken} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Recipes — Great Food Recipes" />
        <meta name="twitter:description" content="Browse over 100 free recipes — chicken, beef, lamb, seafood, pasta, sweets and more. Fresh ingredients, bold flavours, simple instructions." />
        <meta name="twitter:image" content={categoryChicken} />
      </Helmet>

      {/* Header */}
      <section className="py-12 md:py-16 border-b border-border">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <p className="micro-caption mb-4">Free Recipes</p>
          <h1 className="heading-display mb-6">Recipes</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Over 100 recipes using local and seasonal produce. From quick
            lunches to indulgent sweets, there's something for every table.
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-8 md:py-10 border-b border-border">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 space-y-6">
          {/* Search bar */}
          <div className="flex max-w-lg gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by ingredient, name or keyword…"
                value={searchQuery}
                onChange={(e) => setSearchQueryAndReset(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQueryAndReset("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              onClick={() => {/* search is live */}}
              className="px-5 py-2.5 bg-foreground text-background text-sm font-bold tracking-wide hover:bg-foreground/90 transition-colors shrink-0"
            >
              Search
            </button>
          </div>

          {/* Primary visual category tiles */}
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
              Browse by main ingredient
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
              {PRIMARY_CATEGORIES.map((cat) => {
                const count = categoryCounts[cat] || 0;
                const isActive = activeFilter === cat;
                const img = categoryImages[cat];
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(isActive ? null : cat)}
                    aria-pressed={isActive}
                    className={`group relative aspect-square overflow-hidden rounded-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 ${
                      isActive
                        ? "ring-2 ring-foreground shadow-lg"
                        : "ring-1 ring-border hover:ring-foreground/40"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className={`absolute inset-0 transition-colors ${
                        isActive
                          ? "bg-gradient-to-t from-black/85 via-black/40 to-black/20"
                          : "bg-gradient-to-t from-black/75 via-black/30 to-transparent group-hover:from-black/80"
                      }`}
                      aria-hidden
                    />
                    <div className="absolute inset-x-0 bottom-0 p-3 md:p-4 text-left text-white">
                      <div className="font-display text-lg md:text-xl leading-tight">
                        {categoryLabels[cat]}
                      </div>
                      <div className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/80 mt-0.5">
                        {count} {count === 1 ? "recipe" : "recipes"}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Secondary text chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground mr-1">
              Also browse
            </span>
            <button
              onClick={() => setActiveFilter(null)}
              className={`px-3 py-1.5 text-xs tracking-wider uppercase font-medium border transition-colors ${
                activeFilter === null
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background text-muted-foreground border-border hover:border-muted-foreground/40"
              }`}
            >
              All{recipes ? ` (${matchesSearch.length})` : ""}
            </button>
            {SECONDARY_CATEGORIES.map((cat) => {
              const count = categoryCounts[cat] || 0;
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(isActive ? null : cat)}
                  className={`px-3 py-1.5 text-xs tracking-wider uppercase font-medium border transition-colors ${
                    isActive
                      ? "bg-foreground text-background border-foreground"
                      : "bg-background text-muted-foreground border-border hover:border-muted-foreground/40"
                  }`}
                >
                  {categoryLabels[cat]}{" "}
                  <span className={isActive ? "text-background/70" : "text-muted-foreground/50"}>
                    ({count})
                  </span>
                </button>
              );
            })}
            {hasActiveFilters && (
              <button
                onClick={clearAll}
                className="px-3 py-1.5 text-xs tracking-wider uppercase font-medium text-accent hover:text-accent/80 transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Recipe Grid */}
      <section className="py-12 md:py-16">
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
          ) : matchesSearch.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {matchesSearch.map((recipe, index) => (
                <RecipeCard key={recipe.id} recipe={recipe} floatDelay={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="heading-section text-muted-foreground mb-4">
                No recipes found
              </p>
              <p className="text-muted-foreground mb-6">
                Try a different search term or clear your filters.
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearAll}
                  className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      <FloatingMealPlannerButton />
    </Layout>
  );
};

export default Recipes;
