import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { CUISINE_REGIONS, type CuisineRegion } from "@/lib/cuisine-regions";
import { collectionNames } from "@/lib/collections";

/**
 * AI-fill for AI-assisted recipe fields. Only fields currently empty are sent
 * to the AI as "needs filling", and only those keys are applied to setters.
 * Author fields are read-only inputs to the AI prompt.
 */
export interface AIFillAuthorInput {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: string;
  cookTime: string;
  servings: string;
}

export interface AIFillAssistedState {
  cuisineRegion: CuisineRegion | null;
  seoTitle: string;
  seoDescription: string;
  tips: string;
  collections?: string[]; // only present on the Edit page
}

export interface AIFillSetters {
  setCuisineRegion: (v: CuisineRegion | null) => void;
  setSeoTitle: (v: string) => void;
  setSeoDescription: (v: string) => void;
  setTips: (v: string) => void;
  setCollections?: (v: string[]) => void;
}

export function useAiFillRecipeMetadata() {
  const [loading, setLoading] = useState(false);

  const run = async (
    author: AIFillAuthorInput,
    current: AIFillAssistedState,
    setters: AIFillSetters,
  ) => {
    // Determine which AI-assisted fields are currently empty.
    const emptyFields: string[] = [];
    if (!current.cuisineRegion) emptyFields.push("cuisine_region");
    if (!current.seoTitle.trim()) emptyFields.push("seo_title");
    if (!current.seoDescription.trim()) emptyFields.push("seo_description");
    if (!current.tips.trim()) emptyFields.push("tips");
    if (setters.setCollections && (!current.collections || current.collections.length === 0)) {
      emptyFields.push("collections");
    }

    if (emptyFields.length === 0) {
      toast({
        title: "Nothing to fill",
        description: "All AI-assisted fields already have content. AI won't overwrite them.",
      });
      return;
    }

    if (!author.title.trim() || !author.description.trim()) {
      toast({
        title: "Add a title and description first",
        description: "The AI needs your author content as a reference before it can suggest metadata.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("suggest-recipe-metadata", {
        body: {
          title: author.title,
          description: author.description,
          ingredients: author.ingredients.filter((s) => s.trim()),
          instructions: author.instructions.filter((s) => s.trim()),
          prep_time_minutes: author.prepTime ? parseInt(author.prepTime, 10) : null,
          cook_time_minutes: author.cookTime ? parseInt(author.cookTime, 10) : null,
          servings: author.servings ? parseInt(author.servings, 10) : null,
          empty_fields: emptyFields,
          allowed_collections: collectionNames,
        },
      });

      if (error) throw error;
      const suggestions = (data?.suggestions ?? {}) as Record<string, unknown>;

      let applied = 0;

      // Strict: only apply if the field was empty AND the AI returned a value.
      if (
        emptyFields.includes("cuisine_region") &&
        typeof suggestions.cuisine_region === "string" &&
        (CUISINE_REGIONS as readonly string[]).includes(suggestions.cuisine_region)
      ) {
        setters.setCuisineRegion(suggestions.cuisine_region as CuisineRegion);
        applied += 1;
      }
      if (
        emptyFields.includes("seo_title") &&
        typeof suggestions.seo_title === "string" &&
        suggestions.seo_title.trim()
      ) {
        setters.setSeoTitle(suggestions.seo_title.trim().slice(0, 70));
        applied += 1;
      }
      if (
        emptyFields.includes("seo_description") &&
        typeof suggestions.seo_description === "string" &&
        suggestions.seo_description.trim()
      ) {
        setters.setSeoDescription(suggestions.seo_description.trim().slice(0, 170));
        applied += 1;
      }
      if (
        emptyFields.includes("tips") &&
        typeof suggestions.tips === "string" &&
        suggestions.tips.trim()
      ) {
        setters.setTips(suggestions.tips.trim().slice(0, 2000));
        applied += 1;
      }
      if (
        emptyFields.includes("collections") &&
        setters.setCollections &&
        Array.isArray(suggestions.collections)
      ) {
        const cleaned = (suggestions.collections as unknown[])
          .filter((c): c is string => typeof c === "string" && collectionNames.includes(c));
        if (cleaned.length > 0) {
          setters.setCollections(cleaned);
          applied += 1;
        }
      }

      toast({
        title: applied > 0 ? "AI fields filled" : "No suggestions applied",
        description:
          applied > 0
            ? `Populated ${applied} empty field${applied === 1 ? "" : "s"}. Author content untouched.`
            : "The AI didn't return usable suggestions. Try again or fill them manually.",
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      toast({ title: "AI fill failed", description: msg, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return { run, loading };
}
