import { useState, useMemo, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Clock, Users, Leaf, Share2, ExternalLink } from "lucide-react";
import { supermarketLogos } from "@/lib/supermarket-logos";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { categoryLabels } from "@/lib/recipe-utils";
import { scaleIngredients } from "@/lib/ingredient-scaler";
import ServingScaler from "@/components/ServingScaler";
import IngredientList from "@/components/IngredientList";

const RecipeDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  const [servings, setServings] = useState<number | null>(null);
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());

  // Scroll to top and reset state when navigating to a new recipe
  useEffect(() => {
    window.scrollTo(0, 0);
    setServings(null);
    setCheckedIngredients(new Set());
  }, [slug]);

  const toggleIngredient = (index: number) => {
    setCheckedIngredients((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

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

  const baseServings = recipe?.servings || 2;
  const currentServings = servings ?? baseServings;
  const scaleFactor = currentServings / baseServings;

  const ingredients = (recipe?.ingredients as string[]) || [];
  const instructions = (recipe?.instructions as string[]) || [];
  const scaledIngredients = scaleIngredients(ingredients, baseServings, currentServings);

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
            {/* Ingredients — order-2 on mobile (after image+info), order-1 on md */}
            <div className="md:col-span-4 order-1 md:order-1">
              <h2 className="heading-section mb-6 pb-4 border-b border-border">
                Ingredients
              </h2>
              <ServingScaler
                servings={currentServings}
                baseServings={baseServings}
                onChange={setServings}
              />
              <IngredientList
                ingredients={scaledIngredients}
                checkedIngredients={checkedIngredients}
                onToggle={toggleIngredient}
              />
            </div>

            {/* Instructions */}
            <div className="md:col-span-8 order-2 md:order-2">
              <h2 className="heading-section mb-6 pb-4 border-b border-border">
                Method
              </h2>
              <ol className="space-y-6">
                {(() => {
                  let stepNum = 0;
                  return instructions.map((step, i) => {
                    const isHeader = /^(for the |for |the )/i.test(step.trim()) && step.trim().split(" ").length <= 6;
                    if (isHeader) {
                      return (
                        <li key={i} className="pt-4 first:pt-0">
                          <span className="text-base font-semibold text-foreground">
                            {step.replace(/:$/, "")}
                          </span>
                        </li>
                      );
                    }
                    stepNum++;
                    return (
                      <li key={i} className="flex gap-4">
                        <span className="font-display text-2xl text-muted-foreground/40 flex-shrink-0 w-8">
                          {stepNum}
                        </span>
                        <p className="text-muted-foreground leading-relaxed pt-1">
                          {step}
                        </p>
                      </li>
                    );
                  });
                })()}
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

            {/* Supermarket Cards */}
            <div className="md:col-span-12 order-3">
              <h2 className="heading-section mb-6 pb-4 border-b border-border">
                Shop the Ingredients
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {([
                  { name: "Tesco", id: "tesco" as const, url: "https://www.tesco.com/" },
                  { name: "Sainsbury's", id: "sainsburys" as const, url: "https://www.sainsburys.co.uk/" },
                  { name: "ASDA", id: "asda" as const, url: "https://www.asda.com/" },
                  { name: "Waitrose", id: "waitrose" as const, url: "https://www.waitrose.com/" },
                  { name: "Morrisons", id: "morrisons" as const, url: "https://www.morrisons.com/" },
                  { name: "Aldi", id: "aldi" as const, url: "https://www.aldi.co.uk/" },
                  { name: "Lidl", id: "lidl" as const, url: "https://www.lidl.co.uk/" },
                  { name: "Booths", id: "booths" as const, url: "https://www.booths.co.uk/" },
                  { name: "Ocado", id: "ocado" as const, url: "https://www.ocado.com/" },
                ]).map((market) => (
                  <a
                    key={market.name}
                    href={market.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 p-5 border border-border hover:border-muted-foreground/40 hover:bg-secondary hover:shadow-sm transition-all duration-200 text-center group last:col-span-2 last:max-w-[50%] last:mx-auto md:last:col-span-1 md:last:max-w-none"
                  >
                    <img src={supermarketLogos[market.id]} alt={market.name} className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-200" loading="lazy" width={40} height={40} />
                    <span className="text-sm font-semibold text-foreground">{market.name}</span>
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                      Shop now <ExternalLink className="w-3 h-3" />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>
    </Layout>
  );
};

export default RecipeDetail;
