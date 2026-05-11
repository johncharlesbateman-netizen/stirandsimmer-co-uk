import { useParams, Navigate, Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import RecipeCard from "@/components/RecipeCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { MEAL_TYPES, MealType, isMealType } from "@/lib/meal-types";

type Recipe = Tables<"recipes">;

type RegionDef = {
  id: string;
  name: string;
  emoji: string;
  description: string;
  regionTags: string[];
  /** Adjective form used in section headings, e.g. "British". */
  adjective: string;
  seoTitle: string;
  seoDescription: string;
};

type SectionKey = MealType | "quick";

const MEAL_TYPE_PLURAL: Record<MealType, string> = {
  mains: "mains",
  lunch: "lunches",
  dessert: "desserts",
  snack: "snacks",
};

const SECTION_PLURAL: Record<SectionKey, string> = {
  mains: "mains",
  quick: "quick meals",
  lunch: "lunches",
  dessert: "desserts",
  snack: "snacks",
};

// Order in which sections render on the page.
const SECTION_ORDER: SectionKey[] = ["mains", "quick", "lunch", "dessert"];

const isSectionKey = (v: unknown): v is SectionKey =>
  v === "quick" || isMealType(v);

const MEAL_SECTION_MIN = 2;
const MEAL_SECTION_MAX = 6;

const totalTime = (r: Recipe) =>
  (r.prep_time_minutes ?? 0) + (r.cook_time_minutes ?? 0);

const isQuickMeal = (r: Recipe) => {
  const t = totalTime(r);
  return t > 0 && t <= 30;
};

const REGIONS: Record<string, RegionDef> = {
  uk: {
    id: "uk",
    name: "United Kingdom",
    emoji: "🇬🇧",
    description:
      "Honest, seasonal and deeply comforting British cooking — pies, roasts, puddings and the foundation of everything.",
    regionTags: ["british"],
    adjective: "British",
    seoTitle: "British recipes — The Kitchen Atlas | Stir & Simmer",
    seoDescription:
      "British recipes from The Kitchen Atlas — honest, seasonal and deeply comforting. Pies, roasts, puddings and more.",
  },
  italy: {
    id: "italy",
    name: "Italy",
    emoji: "🇮🇹",
    description:
      "Pasta, sauces and the art of simplicity. Italian cooking that feeds the soul.",
    regionTags: ["italian"],
    adjective: "Italian",
    seoTitle: "Italian recipes — The Kitchen Atlas | Stir & Simmer",
    seoDescription:
      "Italian recipes from The Kitchen Atlas — pasta, risotto, sauces and the art of simplicity. Tried and tested in a real kitchen.",
  },
  france: {
    id: "france",
    name: "France",
    emoji: "🇫🇷",
    description:
      "Classical techniques that underpin all of western cooking — sauces, braises, patisserie and bistro classics.",
    regionTags: ["french"],
    adjective: "French",
    seoTitle: "French recipes — The Kitchen Atlas | Stir & Simmer",
    seoDescription:
      "French recipes from The Kitchen Atlas — classical techniques, mother sauces, braises, patisserie and bistro classics.",
  },
  asia: {
    id: "asia",
    name: "South and Southeast Asia",
    emoji: "🌶️",
    description:
      "Bold spices, fragrant herbs and layers of warmth and depth — curries, stir fries and slow-simmered classics from across the region.",
    regionTags: ["indian", "asian"],
    adjective: "South and Southeast Asian",
    seoTitle:
      "South and Southeast Asian recipes — The Kitchen Atlas | Stir & Simmer",
    seoDescription:
      "South and Southeast Asian recipes from The Kitchen Atlas — curries, stir fries and bold, fragrant cooking from across the region.",
  },
};

const RegionPage = () => {
  const { regionId } = useParams<{ regionId: string }>();
  const [searchParams] = useSearchParams();
  const mealParamRaw = searchParams.get("meal");
  const mealFilter: MealType | null = isMealType(mealParamRaw)
    ? mealParamRaw
    : null;
  const region = regionId ? REGIONS[regionId] : undefined;

  const { data: recipes, isLoading } = useQuery({
    queryKey: ["recipes", "region-page"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Recipe[];
    },
  });

  if (!region) {
    return <Navigate to="/kitchen-atlas" replace />;
  }

  const filtered = (recipes ?? []).filter((r) => {
    const tags = (r.cuisine_region as string[] | null) ?? [];
    return region.regionTags.some((t) => tags.includes(t));
  });

  const recipesByMeal: Record<MealType, Recipe[]> = {
    mains: [],
    lunch: [],
    dessert: [],
    snack: [],
  };
  for (const r of filtered) {
    const mts = ((r.meal_types as string[] | null) ?? []).filter(isMealType);
    for (const mt of mts) recipesByMeal[mt].push(r);
  }

  // Sections actually rendered (>= MEAL_SECTION_MIN recipes).
  const renderedSections: { meal: MealType; recipes: Recipe[] }[] =
    MEAL_TYPES.map((m) => ({ meal: m, recipes: recipesByMeal[m] })).filter(
      (s) => s.recipes.length >= MEAL_SECTION_MIN,
    );

  // Recipes already shown above the fold (limited to MEAL_SECTION_MAX per section).
  const shownIds = new Set<string>();
  for (const s of renderedSections) {
    for (const r of s.recipes.slice(0, MEAL_SECTION_MAX)) shownIds.add(r.id);
  }
  // General "more" section: anything in this region not in a rendered section,
  // plus the overflow from rendered sections (those are reachable via "See all").
  const generalRecipes = filtered.filter((r) => !shownIds.has(r.id));

  // When ?meal=… is set, render a single flat grid filtered by that meal type.
  const mealFiltered = mealFilter
    ? filtered.filter((r) =>
        ((r.meal_types as string[] | null) ?? []).includes(mealFilter),
      )
    : null;

  const canonicalUrl = `https://stirandsimmer.co.uk/recipes/region/${region.id}`;

  return (
    <Layout>
      <Helmet>
        <title>{region.seoTitle}</title>
        <meta name="description" content={region.seoDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={region.seoTitle} />
        <meta property="og:description" content={region.seoDescription} />
      </Helmet>

      <section className="py-10 md:py-14 border-b border-border">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <Breadcrumbs
            className="mb-4"
            items={[
              { label: "Home", href: "/" },
              { label: "Kitchen Atlas", href: "/kitchen-atlas" },
              { label: region.name },
            ]}
          />
          <Link
            to="/kitchen-atlas"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> Back to The Kitchen Atlas
          </Link>
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-3xl md:text-4xl">{region.emoji}</span>
            <h1 className="heading-display">{region.name} recipes</h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl">
            {region.description}
          </p>
        </div>
      </section>

      <section className="py-10 md:py-14">
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
          ) : filtered.length > 0 ? (
            mealFiltered && mealFilter ? (
              <>
                <Link
                  to={`/recipes/region/${region.id}`}
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
                >
                  <ArrowLeft className="w-4 h-4" /> All {region.adjective} recipes
                </Link>
                <h2 className="heading-section mb-2">
                  {region.adjective} {MEAL_TYPE_PLURAL[mealFilter]}
                </h2>
                <p className="text-sm text-muted-foreground mb-8">
                  {mealFiltered.length}{" "}
                  {mealFiltered.length === 1 ? "recipe" : "recipes"}
                </p>
                {mealFiltered.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    {mealFiltered.map((recipe, index) => (
                      <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        floatDelay={index}
                        showMeta
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    No {region.adjective} {MEAL_TYPE_PLURAL[mealFilter]} yet.
                  </p>
                )}
              </>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-10">
                  {filtered.length}{" "}
                  {filtered.length === 1 ? "recipe" : "recipes"}
                </p>
                {renderedSections.map((section) => {
                  const visible = section.recipes.slice(0, MEAL_SECTION_MAX);
                  const hasMore = section.recipes.length > MEAL_SECTION_MAX;
                  return (
                    <div key={section.meal} className="mb-14 md:mb-20">
                      <div className="flex items-end justify-between gap-4 mb-6 md:mb-8">
                        <h2 className="heading-section">
                          {region.adjective} {MEAL_TYPE_PLURAL[section.meal]}
                        </h2>
                        {hasMore && (
                          <Link
                            to={`/recipes/region/${region.id}?meal=${section.meal}`}
                            className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-muted-foreground transition-colors whitespace-nowrap"
                          >
                            See all {region.adjective}{" "}
                            {MEAL_TYPE_PLURAL[section.meal]}
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                        {visible.map((recipe, index) => (
                          <RecipeCard
                            key={recipe.id}
                            recipe={recipe}
                            floatDelay={index}
                            showMeta
                          />
                        ))}
                      </div>
                      {hasMore && (
                        <div className="mt-6 md:hidden">
                          <Link
                            to={`/recipes/region/${region.id}?meal=${section.meal}`}
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
                          >
                            See all {region.adjective}{" "}
                            {MEAL_TYPE_PLURAL[section.meal]}
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                })}
                {generalRecipes.length > 0 && (
                  <div>
                    {renderedSections.length > 0 && (
                      <h2 className="heading-section mb-6 md:mb-8">
                        More {region.adjective} recipes
                      </h2>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                      {generalRecipes.map((recipe, index) => (
                        <RecipeCard
                          key={recipe.id}
                          recipe={recipe}
                          floatDelay={index}
                          showMeta
                        />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )
          ) : (
            <div className="text-center py-16">
              <p className="heading-section text-muted-foreground mb-3">
                No recipes here yet
              </p>
              <p className="text-muted-foreground mb-6">
                We're adding new {region.name} recipes all the time — check
                back soon.
              </p>
              <Link
                to="/kitchen-atlas"
                className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
              >
                ← Back to The Kitchen Atlas
              </Link>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default RegionPage;
