import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Clock, Users, Leaf } from "lucide-react";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { categoryLabels } from "@/lib/recipe-utils";

const RecipeDetail = () => {
  const { slug } = useParams<{ slug: string }>();

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

  return (
    <Layout>
      {/* Back Link */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 pt-8">
        <Link
          to="/recipes"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Recipes
        </Link>
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
