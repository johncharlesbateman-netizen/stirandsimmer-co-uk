import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { CUISINE_REGIONS, cuisineRegionLabels, type CuisineRegion } from "@/lib/cuisine-regions";
import { collectionNames } from "@/lib/collections";

/**
 * AI-fill for AI-assisted recipe fields. Two phase:
 *  1) request() — fetches suggestions from the edge function (loading state)
 *  2) confirm() — applies only the previewed fields the user keeps ticked
 * Author fields are read-only inputs to the prompt and are never modified.
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
  collections?: string[];
}

export interface AIFillSetters {
  setCuisineRegion: (v: CuisineRegion | null) => void;
  setSeoTitle: (v: string) => void;
  setSeoDescription: (v: string) => void;
  setTips: (v: string) => void;
  setCollections?: (v: string[]) => void;
}

export type AIFieldKey =
  | "cuisine_region"
  | "seo_title"
  | "seo_description"
  | "tips"
  | "collections";

export interface AIFieldPreview {
  key: AIFieldKey;
  label: string;
  preview: string;
  rawValue: unknown;
}

export const AI_FIELD_LABELS: Record<AIFieldKey, string> = {
  cuisine_region: "Cuisine region",
  seo_title: "Meta title",
  seo_description: "Meta description",
  tips: "Tips",
  collections: "Collections",
};

function renderPreview(key: AIFieldKey, value: unknown): string {
  if (value == null) return "";
  if (key === "cuisine_region" && typeof value === "string") {
    return cuisineRegionLabels[value as CuisineRegion] ?? value;
  }
  if (key === "collections" && Array.isArray(value)) {
    return value.filter((c): c is string => typeof c === "string").join(", ");
  }
  if (typeof value === "string") return value;
  return String(value);
}

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
    const emptyFields: AIFieldKey[] = [];
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

      const valid: AIFieldPreview[] = [];
      const initialSelected: Record<AIFieldKey, boolean> = {
        cuisine_region: false,
        seo_title: false,
        seo_description: false,
        tips: false,
        collections: false,
      };

      for (const key of emptyFields) {
        const raw = suggestions[key];
        let ok = false;
        if (key === "cuisine_region") {
          ok =
            typeof raw === "string" &&
            (CUISINE_REGIONS as readonly string[]).includes(raw);
        } else if (key === "collections") {
          ok =
            Array.isArray(raw) &&
            (raw as unknown[]).some(
              (c) => typeof c === "string" && collectionNames.includes(c),
            );
        } else {
          ok = typeof raw === "string" && raw.trim().length > 0;
        }
        if (!ok) continue;
        valid.push({
          key,
          label: AI_FIELD_LABELS[key],
          preview: renderPreview(key, raw),
          rawValue: raw,
        });
        initialSelected[key] = true;
      }

      if (valid.length === 0) {
        toast({
          title: "No usable suggestions",
          description: "The AI didn't return anything we could safely apply.",
        });
        return;
      }

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
    let applied = 0;
    for (const p of previews) {
      if (!selected[p.key]) continue;
      switch (p.key) {
        case "cuisine_region":
          pendingSetters.setCuisineRegion(p.rawValue as CuisineRegion);
          applied += 1;
          break;
        case "seo_title":
          pendingSetters.setSeoTitle(String(p.rawValue).trim().slice(0, 70));
          applied += 1;
          break;
        case "seo_description":
          pendingSetters.setSeoDescription(String(p.rawValue).trim().slice(0, 170));
          applied += 1;
          break;
        case "tips":
          pendingSetters.setTips(String(p.rawValue).trim().slice(0, 2000));
          applied += 1;
          break;
        case "collections": {
          if (!pendingSetters.setCollections) break;
          const cleaned = (p.rawValue as unknown[]).filter(
            (c): c is string => typeof c === "string" && collectionNames.includes(c),
          );
          if (cleaned.length > 0) {
            pendingSetters.setCollections(cleaned);
            applied += 1;
          }
          break;
        }
      }
    }
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
