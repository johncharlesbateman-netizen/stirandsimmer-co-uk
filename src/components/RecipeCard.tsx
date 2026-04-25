import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Tables } from "@/integrations/supabase/types";
import { categoryLabels } from "@/lib/recipe-utils";

interface RecipeCardProps {
  recipe: Tables<"recipes">;
  className?: string;
  floatDelay?: number;
}

const floatClasses = [
  "floating-item",
  "floating-item-delay-1",
  "floating-item-delay-2",
  "floating-item-delay-3",
  "floating-item-delay-4",
  "floating-item-delay-5",
];

const RecipeCard = ({ recipe, className, floatDelay = 0 }: RecipeCardProps) => {
  const floatClass = floatClasses[floatDelay % floatClasses.length];

  return (
    <Link
      to={`/recipes/${recipe.slug}`}
      className={cn("group block", floatClass, className)}
    >
      <article className="space-y-4">
        <div className="aspect-[4/3] overflow-hidden bg-muted relative">
          <img
            src={recipe.image_url || "/placeholder.svg"}
            alt={recipe.title}
            loading="lazy"
            className="w-full h-full object-cover editorial-image"
          />
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />
        </div>

        <div className="space-y-2">
          <p className="micro-caption">{categoryLabels[recipe.category]}</p>
          <h3 className="font-display text-xl md:text-2xl">{recipe.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {recipe.description}
          </p>
        </div>
      </article>
    </Link>
  );
};

export default RecipeCard;
