import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type PublishedRecipe = Tables<"recipes">;

/**
 * Single source of truth for published recipes.
 *
 * Before: the home page made three separate `/rest/v1/recipes` calls
 * (latest-6 for Index, latest-5 for FeaturedRecipes, all rows for the
 * collection tally in CollectionTiles).
 *
 * Now: one query, cached under `["published-recipes"]`, and every
 * consumer slices/derives what it needs. React Query dedupes parallel
 * mounts and keeps the result fresh for 5 minutes.
 */
export const PUBLISHED_RECIPES_KEY = ["published-recipes"] as const;

export function usePublishedRecipes() {
  return useQuery({
    queryKey: PUBLISHED_RECIPES_KEY,
    queryFn: async (): Promise<PublishedRecipe[]> => {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

/** Most recent N published recipes (ordered newest first). */
export function useLatestPublishedRecipes(limit: number) {
  const query = usePublishedRecipes();
  const recipes = useMemo(
    () => (query.data ?? []).slice(0, limit),
    [query.data, limit],
  );
  return { ...query, data: recipes };
}

/** Tally of how many published recipes belong to each collection. */
export function usePublishedCollectionCounts() {
  const query = usePublishedRecipes();
  const counts = useMemo(() => {
    const tally: Record<string, number> = {};
    for (const row of query.data ?? []) {
      for (const name of row.collections ?? []) {
        tally[name] = (tally[name] ?? 0) + 1;
      }
    }
    return tally;
  }, [query.data]);
  return { ...query, data: counts };
}
