import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { type CuisineRegion } from "@/lib/cuisine-regions";
import { collectionNames } from "@/lib/collections";
import {
  AI_FIELD_LABELS,
  type AIFieldKey,
  type AIFieldPreview,
  type ApplySetters,
  applyPreviews,
  buildValidPreviews,
  computeEmptyAiFields,
} from "@/lib/ai-fill-lock";

export type { AIFieldKey, AIFieldPreview } from "@/lib/ai-fill-lock";
export { AI_FIELD_LABELS } from "@/lib/ai-fill-lock";

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
  collections?: string[];
}

export type AIFillSetters = ApplySetters;

export function useAiFillRecipeMetadata() {
  const [loading, setLoading] = useState(false);
  const [previews, setPreviews] = useState<AIFieldPreview[]>([]);
  const [selected, setSelected] = useState<Record<AIFieldKey, boolean>>({
    cuisine_region: true,
    seo_title: true,
    seo_description: true,
    tips: true,
    collections: true,
  });
  const [pendingSetters, setPendingSetters] = useState<AIFillSetters | null>(null);

  const open = previews.length > 0;

  const request = async (
    author: AIFillAuthorInput,
    current: AIFillAssistedState,
    setters: AIFillSetters,
  ) => {
    const emptyFields = computeEmptyAiFields(current, Boolean(setters.setCollections));

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
        description:
          "The AI needs your author content as a reference before it can suggest metadata.",
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
      const valid = buildValidPreviews(emptyFields, suggestions);

      if (valid.length === 0) {
        toast({
          title: "No usable suggestions",
          description: "The AI didn't return anything we could safely apply.",
        });
        return;
      }

      const initialSelected: Record<AIFieldKey, boolean> = {
        cuisine_region: false,
        seo_title: false,
        seo_description: false,
        tips: false,
        collections: false,
      };
      for (const p of valid) initialSelected[p.key] = true;

      setPreviews(valid);
      setSelected(initialSelected);
      setPendingSetters(setters);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      toast({ title: "AI fill failed", description: msg, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const toggle = (key: AIFieldKey) =>
    setSelected((prev) => ({ ...prev, [key]: !prev[key] }));

  const cancel = () => {
    setPreviews([]);
    setPendingSetters(null);
  };

  const confirm = () => {
    if (!pendingSetters) return;
    const applied = applyPreviews(previews, selected, pendingSetters);
    toast({
      title: applied > 0 ? "AI fields filled" : "Nothing applied",
      description:
        applied > 0
          ? `Populated ${applied} field${applied === 1 ? "" : "s"}. Author content untouched.`
          : "No fields were selected.",
    });
    cancel();
  };

  return { request, confirm, cancel, toggle, loading, open, previews, selected };
}
