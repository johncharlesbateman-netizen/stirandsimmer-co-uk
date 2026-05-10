import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";
import RecipeCard from "@/components/RecipeCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { getTileBySlug } from "@/lib/recipe-tiles";

type Recipe = Tables<"recipes">;

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const tile = getTileBySlug(slug);

  const { data: recipes, isLoading } = useQuery({
    queryKey: ["recipes", "tile", "all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Recipe[];
    },
  });

  if (!tile) {
    return <Navigate to="/recipes" replace />;
  }

  const filtered = (recipes ?? []).filter(tile.filter);
  const canonicalUrl = `https://stirandsimmer.co.uk/recipes/${tile.slug}`;

  return (
    <Layout>
      <Helmet>
        <title>{tile.seoTitle}</title>
        <meta name="description" content={tile.seoDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={tile.seoTitle} />
        <meta property="og:description" content={tile.seoDescription} />
      </Helmet>

      {/* Header */}
      <section className="py-10 md:py-14 border-b border-border">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <Breadcrumbs
            className="mb-4"
            items={[
              { label: "Home", href: "/" },
              { label: "Recipes", href: "/recipes" },
              { label: tile.label },
            ]}
          />
          <Link
            to="/recipes"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> Back to all categories
          </Link>
          <h1 className="heading-display mb-4">
            {tile.slug === "all" ? "All recipes" : `${tile.label} recipes`}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            {tile.description}
          </p>
        </div>
      </section>

      {/* Recipe grid */}
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
            <>
              <p className="text-sm text-muted-foreground mb-8">
                {filtered.length}{" "}
                {filtered.length === 1 ? "recipe" : "recipes"}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                {filtered.map((recipe, index) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    floatDelay={index}
                    showMeta
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <p className="heading-section text-muted-foreground mb-3">
                No recipes here yet
              </p>
              <p className="text-muted-foreground mb-6">
                We're adding new {tile.label.toLowerCase()} recipes all the
                time — check back soon.
              </p>
              <Link
                to="/recipes"
                className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
              >
                ← Back to all categories
              </Link>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default CategoryPage;
