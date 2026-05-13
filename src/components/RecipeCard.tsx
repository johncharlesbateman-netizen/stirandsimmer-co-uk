import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Clock, ChefHat } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tables } from "@/integrations/supabase/types";
import { categoryLabels, deriveDifficulty } from "@/lib/recipe-utils";
import { optimisedImage, responsiveSrcSet } from "@/lib/image-utils";
import { buildRecipeAltText } from "@/lib/seo";

interface RecipeCardProps {
  recipe: Tables<"recipes">;
  className?: string;
  floatDelay?: number;
  /** Show prep time and difficulty meta row under the description. */
  showMeta?: boolean;
  /** Show the internal tile-category label (e.g. "Pasta Heaven"). Off on region pages. */
  showCategory?: boolean;
}

const floatClasses = [
  "floating-item",
  "floating-item-delay-1",
  "floating-item-delay-2",
  "floating-item-delay-3",
  "floating-item-delay-4",
  "floating-item-delay-5",
];

const RecipeCard = ({ recipe, className, floatDelay = 0, showMeta = false, showCategory = true }: RecipeCardProps) => {
  const floatClass = floatClasses[floatDelay % floatClasses.length];
  const prep = recipe.prep_time_minutes || 0;
  const stepCount = Array.isArray(recipe.instructions) ? recipe.instructions.length : 0;
  const difficulty = deriveDifficulty(recipe.prep_time_minutes, recipe.cook_time_minutes, stepCount);
  const transformedSrc = recipe.image_url
    ? optimisedImage(recipe.image_url, { width: 800 })
    : "/placeholder.svg";
  const transformedSrcSet = recipe.image_url
    ? responsiveSrcSet(recipe.image_url, [400, 600, 800, 1200]) || undefined
    : undefined;
  const [imageSrc, setImageSrc] = useState(transformedSrc);
  const [imageSrcSet, setImageSrcSet] = useState<string | undefined>(transformedSrcSet);

  // eslint-disable-next-line no-console
  console.log("[RecipeCard]", {
    id: recipe?.id,
    slug: recipe?.slug,
    title: recipe?.title,
    category: recipe?.category,
    hasImageUrl: !!recipe?.image_url,
    rawImageUrl: recipe?.image_url,
    transformedSrc,
    transformedSrcSet,
    hasDescription: !!recipe?.description,
    descriptionLen: recipe?.description?.length ?? 0,
  });

  useEffect(() => {
    setImageSrc(transformedSrc);
    setImageSrcSet(transformedSrcSet);
  }, [transformedSrc, transformedSrcSet]);

  const handleImageError = () => {
    // eslint-disable-next-line no-console
    console.warn("[RecipeCard] image error", {
      slug: recipe?.slug,
      attemptedSrc: imageSrc,
      rawImageUrl: recipe?.image_url,
    });
    if (recipe.image_url && imageSrc !== recipe.image_url) {
      setImageSrc(recipe.image_url);
      setImageSrcSet(undefined);
      return;
    }

    setImageSrc("/placeholder.svg");
    setImageSrcSet(undefined);
  };

  return (
    <Link
      to={`/recipes/${recipe.slug}`}
      className={cn("group block", floatClass, className)}
    >
      <article className="space-y-4">
        <div className="aspect-[4/3] overflow-hidden bg-muted relative">
          <img
            src={imageSrc}
            srcSet={imageSrcSet}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            alt={buildRecipeAltText(recipe.title, (recipe.ingredients as string[] | null) ?? [])}
            loading="lazy"
            decoding="async"
            width={800}
            height={600}
            onError={handleImageError}
            className="w-full h-full object-cover editorial-image"
          />
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />
        </div>

        <div className="space-y-2">
          {showCategory && <p className="micro-caption">{categoryLabels[recipe.category]}</p>}
          <h3 className="font-display text-xl md:text-2xl">{recipe.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {recipe.description}
          </p>
          {showMeta && (prep > 0 || stepCount > 0) && (
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-muted-foreground">
              {prep > 0 && (
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                  {prep} min prep
                </span>
              )}
              <span className="inline-flex items-center gap-1.5">
                <ChefHat className="w-3.5 h-3.5" aria-hidden="true" />
                {difficulty}
              </span>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
};

export default RecipeCard;
