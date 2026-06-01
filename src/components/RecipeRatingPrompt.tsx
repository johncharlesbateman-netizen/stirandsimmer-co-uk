import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface RecipeRatingPromptProps {
  recipeId: string;
}

interface RatingRow {
  rating: number;
  user_id: string;
}

/**
 * Prominent, friendly rating prompt placed below the recipe method.
 *
 * Visibility rules:
 * - Hidden once the signed-in user has already rated this recipe.
 * - (Author exclusion is not applicable — recipes have no per-user author;
 *   they are managed by site admins via the admin_emails allow-list.)
 *
 * NOTE: schema.org/AggregateRating microdata lives on the existing
 * <RecipeRating> in the recipe header — do NOT duplicate it here, or
 * Google will see two aggregate ratings on the same Recipe.
 */
const RecipeRatingPrompt = ({ recipeId }: RecipeRatingPromptProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [hover, setHover] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [showSignInHint, setShowSignInHint] = useState(false);

  const { data: ratings = [] } = useQuery<RatingRow[]>({
    queryKey: ["recipe-ratings", recipeId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("recipe_ratings")
        .select("rating, user_id")
        .eq("recipe_id", recipeId);
      if (error) throw error;
      return (data ?? []) as RatingRow[];
    },
    enabled: !!recipeId,
  });

  const { average, count, userRating } = useMemo(() => {
    const c = ratings.length;
    const avg = c ? ratings.reduce((s, r) => s + r.rating, 0) / c : 0;
    const own = user ? ratings.find((r) => r.user_id === user.id)?.rating ?? 0 : 0;
    return { average: avg, count: c, userRating: own };
  }, [ratings, user]);

  // Hide once the signed-in user has rated — they can still amend their
  // rating from the compact widget in the recipe header.
  if (user && userRating > 0) return null;

  const submit = async (value: number) => {
    if (!user) {
      setShowSignInHint(true);
      return;
    }
    if (submitting) return;
    setSubmitting(true);
    const { error } = await supabase
      .from("recipe_ratings")
      .upsert(
        { recipe_id: recipeId, user_id: user.id, rating: value },
        { onConflict: "recipe_id,user_id" },
      );
    setSubmitting(false);
    if (error) {
      toast({
        title: "Couldn't save rating",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Thanks for rating!",
      description: `You rated this ${value} out of 5.`,
    });
    queryClient.invalidateQueries({ queryKey: ["recipe-ratings", recipeId] });
  };

  const display = hover; // big stars only fill on hover before submit

  return (
    <aside
      className="no-print mt-12 pt-10 pb-2 border-t border-border text-center"
      aria-label="Rate this recipe"
    >
      <p className="text-base md:text-lg text-foreground/90 max-w-xl mx-auto">
        Made this recipe? Leave a rating and let others know how it went.
      </p>

      <div
        className="mt-5 flex items-center justify-center gap-1 md:gap-2"
        onMouseLeave={() => setHover(0)}
        role={user ? "radiogroup" : undefined}
        aria-label={user ? "Rate this recipe out of 5 stars" : undefined}
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            role={user ? "radio" : undefined}
            aria-checked={user ? userRating === n : undefined}
            aria-label={`${n} ${n === 1 ? "star" : "stars"}`}
            disabled={submitting}
            onMouseEnter={() => setHover(n)}
            onFocus={() => setHover(n)}
            onBlur={() => setHover(0)}
            onClick={() => submit(n)}
            className="p-1 rounded transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
          >
            <Star
              width={40}
              height={40}
              strokeWidth={1.4}
              className={cn(
                "transition-colors",
                n <= display
                  ? "text-accent fill-current"
                  : "text-muted-foreground/40",
              )}
            />
          </button>
        ))}
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        {count > 0 ? (
          <>
            <span className="font-medium text-foreground">
              {average.toFixed(1)}
            </span>{" "}
            out of 5 · {count} {count === 1 ? "rating" : "ratings"}
          </>
        ) : (
          <span className="italic">Be the first to rate this recipe.</span>
        )}
      </p>

      {!user && showSignInHint && (
        <p className="mt-4 text-sm text-muted-foreground">
          Sign in to leave a rating — it only takes a moment.{" "}
          <Link
            to="/auth"
            className="underline underline-offset-4 text-foreground hover:text-accent transition-colors"
          >
            Sign in
          </Link>
        </p>
      )}
    </aside>
  );
};

export default RecipeRatingPrompt;
