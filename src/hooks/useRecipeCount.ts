import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/**
 * Fetches the live total number of recipes from the database.
 * Cached for 5 minutes via React Query so the value stays consistent
 * across the site and updates automatically as new recipes are added.
 */
export function useRecipeCount() {
  return useQuery({
    queryKey: ["recipes", "total-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("recipes")
        .select("id", { count: "exact" })
        .limit(1);

      if (error) throw error;

      return count ?? 0;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
}
