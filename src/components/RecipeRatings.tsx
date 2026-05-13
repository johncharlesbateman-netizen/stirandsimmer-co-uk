import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  recipeId: string;
}

interface RatingStats {
  average: number;
  count: number;
}

const StarRow = ({
  value,
  size = 20,
  interactive = false,
  onChange,
  hover,
  onHover,
}: {
  value: number;
  size?: number;
  interactive?: boolean;
  onChange?: (n: number) => void;
  hover?: number;
  onHover?: (n: number) => void;
}) => {
  const display = hover ?? value;
  return (
    <div
      className="flex items-center gap-0.5"
      onMouseLeave={() => interactive && onHover?.(0)}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          disabled={!interactive}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
          onClick={() => interactive && onChange?.(n)}
          onMouseEnter={() => interactive && onHover?.(n)}
          className={cn(
            "transition-colors",
            interactive && "cursor-pointer hover:scale-110",
            !interactive && "cursor-default",
          )}
        >
          <Star
            size={size}
            className={cn(
              n <= display
                ? "fill-primary text-primary"
                : "fill-transparent text-muted-foreground",
            )}
          />
        </button>
      ))}
    </div>
  );
};

const RecipeRatings = ({ recipeId }: Props) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const qc = useQueryClient();
  const [pending, setPending] = useState(0);
  const [hover, setHover] = useState(0);

  // All ratings (used to compute stats client-side; lightweight: 1 row per rating).
  const { data: ratings } = useQuery({
    queryKey: ["recipe-ratings", recipeId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("recipe_ratings")
        .select("rating, user_id")
        .eq("recipe_id", recipeId);
      if (error) throw error;
      return data ?? [];
    },
  });

  const stats: RatingStats = {
    average: ratings?.length
      ? Math.round((ratings.reduce((s, r) => s + r.rating, 0) / ratings.length) * 10) / 10
      : 0,
    count: ratings?.length ?? 0,
  };

  const myRating = user
    ? ratings?.find((r) => r.user_id === user.id)?.rating ?? 0
    : 0;

  const submit = useMutation({
    mutationFn: async (rating: number) => {
      if (!user) throw new Error("Not signed in");
      const { error } = await supabase
        .from("recipe_ratings")
        .upsert(
          { recipe_id: recipeId, user_id: user.id, rating },
          { onConflict: "recipe_id,user_id" },
        );
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["recipe-ratings", recipeId] });
      toast({ title: "Thanks for rating!", description: "Your rating has been saved." });
    },
    onError: (e: Error) => {
      toast({ title: "Couldn't save rating", description: e.message, variant: "destructive" });
    },
  });

  const handleClick = (n: number) => {
    setPending(n);
    submit.mutate(n);
  };

  return (
    <section
      aria-label="Recipe ratings"
      className="my-10 rounded-xl border border-border bg-card p-6"
    >
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-serif text-xl text-foreground">Rate this recipe</h2>
          {stats.count > 0 ? (
            <div className="mt-2 flex items-center gap-2">
              <StarRow value={Math.round(stats.average)} size={18} />
              <span className="text-sm text-muted-foreground">
                {stats.average.toFixed(1)} from {stats.count} rating
                {stats.count === 1 ? "" : "s"}
              </span>
            </div>
          ) : (
            <p className="mt-1 text-sm text-muted-foreground">
              Be the first to rate this recipe.
            </p>
          )}
        </div>

        <div className="flex flex-col items-start gap-2 sm:items-end">
          {user ? (
            <>
              <StarRow
                value={pending || myRating}
                size={28}
                interactive
                onChange={handleClick}
                hover={hover}
                onHover={setHover}
              />
              {myRating > 0 && (
                <p className="text-xs text-muted-foreground">
                  Your rating: {myRating} star{myRating > 1 ? "s" : ""}
                </p>
              )}
            </>
          ) : (
            <Button asChild variant="outline" size="sm">
              <Link to="/auth">Sign in to rate</Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default RecipeRatings;
