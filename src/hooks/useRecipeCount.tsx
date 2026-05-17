import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/**
 * Single source of truth for the live recipe count.
 * Returns `null` while loading or if the query fails — callers should hide
 * or omit the number rather than display a stale fallback.
 */
export function useRecipeCount(): number | null {
  const { data } = useQuery({
    queryKey: ["recipes", "count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("recipes")
        .select("*", { count: "exact", head: true });
      if (error) throw error;
      return typeof count === "number" ? count : null;
    },
    staleTime: 5 * 60 * 1000,
  });
  return data ?? null;
}
