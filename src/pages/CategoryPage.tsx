import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import RecipeCard from "@/components/RecipeCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { supabase } from "@/integrations/supabase/client";
import {
  categoryLabels,
  categoryDescriptions,
  categoryMetaDescriptions,
  categorySlugs,
} from "@/lib/recipe-utils";

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


const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = slug ? categorySlugs[slug] : undefined;

  const { data: recipes, isLoading } = useQuery({
    queryKey: ["recipes", category],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .eq("category", category!)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!category,
  });

  if (!category) {
    return <Navigate to="/recipes" replace />;
  }

  const label = categoryLabels[category];
  const description = categoryDescriptions[category];
  const recipeCount = recipes?.length ?? 0;

  const seoTitle = `${label} Recipes | Stir & Simmer`;
  const baseDesc = categoryMetaDescriptions[category];
  // Insert dynamic count when available, while staying within ~155 chars.
  const seoDescription = (() => {
    if (!recipeCount) return baseDesc;
    const withCount = `Browse ${recipeCount} ${label.toLowerCase()} recipes — ${baseDesc.replace(/^[^—]+—\s*/, "")}`;
    return withCount.length <= 155 ? withCount : baseDesc;
  })();
  const canonicalUrl = `https://stirandsimmer.co.uk/recipes/category/${slug}`;
  const ogImage = categoryImages[category] || "https://stirandsimmer.co.uk/og-image.jpg";

  return (
    <Layout>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>

      {/* Header */}
      <section className="py-12 md:py-16 border-b border-border">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <Breadcrumbs
            className="mb-4"
            items={[
              { label: "Home", href: "/" },
              { label: "Recipes", href: "/recipes" },
              { label: `${label} Recipes` },
            ]}
          />
          <h1 className="heading-display mb-6">{label} Recipes</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">{description}</p>
        </div>
      </section>

      {/* Browse All Link */}
      <section className="py-6 border-b border-border">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <Link
            to="/recipes"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors editorial-link"
          >
            ← Browse All Recipes
          </Link>
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
          ) : recipes && recipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {recipes.map((recipe, index) => (
                <RecipeCard key={recipe.id} recipe={recipe} floatDelay={index} showMeta />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="heading-section text-muted-foreground mb-4">No {label.toLowerCase()} recipes yet</p>
              <p className="text-muted-foreground">Recipes are being added — check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default CategoryPage;
