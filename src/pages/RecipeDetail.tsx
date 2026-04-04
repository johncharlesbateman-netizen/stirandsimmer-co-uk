import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Clock, Users, Leaf, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { categoryLabels } from "@/lib/recipe-utils";
import { scaleIngredients } from "@/lib/ingredient-scaler";
import ServingScaler from "@/components/ServingScaler";
import ShoppingList from "@/components/ShoppingList";

const RecipeDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();

  const { data: recipe, isLoading } = useQuery({
    queryKey: ["recipe", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .eq("slug", slug!)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-20">
          <div className="animate-pulse space-y-8">
            <div className="h-4 w-32 bg-muted rounded" />
            <div className="h-10 w-2/3 bg-muted rounded" />
            <div className="aspect-[16/9] bg-muted" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!recipe) {
    return (
      <Layout>
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-20 text-center">
          <h1 className="heading-editorial mb-4">Recipe not found</h1>
          <Link to="/recipes" className="text-muted-foreground hover:text-foreground transition-colors">
            ← Back to recipes
          </Link>
        </div>
      </Layout>
    );
  }

  const ingredients = recipe.ingredients as string[];
  const instructions = recipe.instructions as string[];
  const totalTime = (recipe.prep_time_minutes || 0) + (recipe.cook_time_minutes || 0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    description: recipe.description,
    ...(recipe.image_url && { image: recipe.image_url }),
    ...(recipe.prep_time_minutes && { prepTime: `PT${recipe.prep_time_minutes}M` }),
    ...(recipe.cook_time_minutes && { cookTime: `PT${recipe.cook_time_minutes}M` }),
    ...(totalTime > 0 && { totalTime: `PT${totalTime}M` }),
    ...(recipe.servings && { recipeYield: `${recipe.servings} servings` }),
    recipeCategory: categoryLabels[recipe.category],
    recipeIngredient: ingredients,
    recipeInstructions: instructions.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      text: step,
    })),
    author: {
      "@type": "Organization",
      name: "Great Food Recipes",
      url: "https://greatfoodrecipes.co.uk",
    },
    datePublished: recipe.created_at,
    dateModified: recipe.updated_at,
  };

  const pageUrl = `https://greatfoodrecipes.co.uk/recipes/${recipe.slug}`;
  const shareUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/og-recipe?slug=${recipe.slug}`;

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({ title: "Link copied!", description: "Share this link on social media for a rich preview." });
    } catch {
      toast({ title: "Couldn't copy", description: shareUrl, variant: "destructive" });
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>{recipe.title} — Great Food Recipes</title>
        <meta name="description" content={recipe.description} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={recipe.title} />
        <meta property="og:description" content={recipe.description} />
        <meta property="og:url" content={pageUrl} />
        {recipe.image_url && <meta property="og:image" content={recipe.image_url} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={recipe.title} />
        <meta name="twitter:description" content={recipe.description} />
        {recipe.image_url && <meta name="twitter:image" content={recipe.image_url} />}
        <link rel="canonical" href={pageUrl} />
      </Helmet>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Back Link & Share */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 pt-8 flex items-center justify-between">
        <Link
          to="/recipes"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Recipes
        </Link>
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <Share2 className="w-4 h-4" />
          Share
        </button>
      </div>

      {/* Hero */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-4xl">
            <p className="micro-caption mb-4">{categoryLabels[recipe.category]}</p>
            <h1 className="heading-display mb-6">{recipe.title}</h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              {recipe.description}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              {recipe.prep_time_minutes && (
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Prep: {recipe.prep_time_minutes} min
                </span>
              )}
              {recipe.cook_time_minutes && (
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Cook: {recipe.cook_time_minutes} min
                </span>
              )}
              {totalTime > 0 && (
                <span className="font-medium text-foreground">
                  Total: {totalTime} min
                </span>
              )}
              {recipe.servings && (
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Serves {recipe.servings}
                </span>
              )}
              {recipe.is_seasonal && (
                <span className="flex items-center gap-2 text-accent">
                  <Leaf className="w-4 h-4" />
                  Seasonal
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Image */}
      {recipe.image_url && (
        <section className="pb-12">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <div className="max-w-4xl aspect-[16/9] overflow-hidden bg-muted">
              <img
                src={recipe.image_url}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="pb-20 md:pb-32">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 max-w-4xl">
            {/* Ingredients */}
            <div className="md:col-span-4">
              <h2 className="heading-section mb-6 pb-4 border-b border-border">
                Ingredients
              </h2>
              <ul className="space-y-3">
                {ingredients.map((item, i) => (
                  <li
                    key={i}
                    className="text-sm text-muted-foreground pl-4 border-l-2 border-border"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <ShoppingList ingredients={ingredients} />
            </div>

            {/* Instructions */}
            <div className="md:col-span-8">
              <h2 className="heading-section mb-6 pb-4 border-b border-border">
                Method
              </h2>
              <ol className="space-y-6">
                {instructions.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="font-display text-2xl text-muted-foreground/40 flex-shrink-0 w-8">
                      {i + 1}
                    </span>
                    <p className="text-muted-foreground leading-relaxed pt-1">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>

              {/* Tips */}
              {recipe.tips && (
                <div className="mt-12 p-6 bg-secondary border border-border">
                  <p className="micro-caption mb-3">Chef's Tips</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {recipe.tips}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RecipeDetail;
