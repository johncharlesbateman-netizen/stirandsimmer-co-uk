/**
 * Pure helpers for AI-fill lock enforcement.
 *
 * Lock contract:
 *  - AUTHOR_FIELD_KEYS are author-controlled. The AI never receives them as
 *    "fields to fill" and the apply step has no setter for them.
 *  - AI_FIELD_KEYS are AI-assisted. Each is only added to the request when
 *    currently empty, and only applied when the user explicitly keeps it
 *    ticked in the confirmation dialog.
 */

import { CUISINE_REGIONS, cuisineRegionLabels, type CuisineRegion } from "@/lib/cuisine-regions";
import { collectionNames } from "@/lib/collections";

export const AUTHOR_FIELD_KEYS = [
  "title",
  "description",
  "image",
  "ingredients",
  "instructions",
  "prep_time_minutes",
  "cook_time_minutes",
  "servings",
  "categories",
  "meal_types",
] as const;

export const AI_FIELD_KEYS = [
  "cuisine_region",
  "seo_title",
  "seo_description",
  "tips",
  "collections",
] as const;

export type AuthorFieldKey = (typeof AUTHOR_FIELD_KEYS)[number];
export type AIFieldKey = (typeof AI_FIELD_KEYS)[number];

export const AI_FIELD_LABELS: Record<AIFieldKey, string> = {
  cuisine_region: "Cuisine region",
  seo_title: "Meta title",
  seo_description: "Meta description",
  tips: "Tips",
  collections: "Collections",
};

export interface AssistedFieldState {
  cuisineRegion: CuisineRegion | null;
  seoTitle: string;
  seoDescription: string;
  tips: string;
  collections?: string[];
}

export interface AIFieldPreview {
  key: AIFieldKey;
  label: string;
  preview: string;
  rawValue: unknown;
}

export interface ApplySetters {
  setCuisineRegion: (v: CuisineRegion | null) => void;
  setSeoTitle: (v: string) => void;
  setSeoDescription: (v: string) => void;
  setTips: (v: string) => void;
  setCollections?: (v: string[]) => void;
}

/** Returns the AI-assisted field keys that are currently empty. */
export function computeEmptyAiFields(
  current: AssistedFieldState,
  includesCollections: boolean,
): AIFieldKey[] {
  const empty: AIFieldKey[] = [];
  if (!current.cuisineRegion) empty.push("cuisine_region");
  if (!current.seoTitle.trim()) empty.push("seo_title");
  if (!current.seoDescription.trim()) empty.push("seo_description");
  if (!current.tips.trim()) empty.push("tips");
  if (includesCollections && (!current.collections || current.collections.length === 0)) {
    empty.push("collections");
  }
  return empty;
}

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

/**
 * From raw AI suggestions, build the previews that are safe to show.
 *
 * Locks enforced here:
 *  - Suggestions for keys NOT in `emptyFields` are dropped (the field is
 *    already filled, so AI must never overwrite it).
 *  - Suggestions for keys not in AI_FIELD_KEYS are dropped (the AI must
 *    never touch author fields, even if it tries to return them).
 *  - Invalid values (unknown cuisine, empty strings, no recognised
 *    collections) are dropped.
 */
export function buildValidPreviews(
  emptyFields: readonly AIFieldKey[],
  rawSuggestions: Record<string, unknown>,
): AIFieldPreview[] {
  const allowed = new Set<AIFieldKey>(emptyFields);
  const out: AIFieldPreview[] = [];

  for (const key of AI_FIELD_KEYS) {
    if (!allowed.has(key)) continue;
    const raw = rawSuggestions[key];
    let ok = false;

    if (key === "cuisine_region") {
      ok = typeof raw === "string" && (CUISINE_REGIONS as readonly string[]).includes(raw);
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
    out.push({
      key,
      label: AI_FIELD_LABELS[key],
      preview: renderPreview(key, raw),
      rawValue: raw,
    });
  }

  return out;
}

/**
 * Apply previews that the user kept ticked. Returns the number applied.
 *
 * Locks enforced here:
 *  - There is no setter for any author field, so applying is structurally
 *    incapable of mutating author content.
 *  - Unticked previews are skipped.
 *  - Collections only apply when a setter is provided AND at least one
 *    suggested collection name is recognised.
 */
export function applyPreviews(
  previews: readonly AIFieldPreview[],
  selected: Readonly<Record<AIFieldKey, boolean>>,
  setters: ApplySetters,
): number {
  let applied = 0;
  for (const p of previews) {
    if (!selected[p.key]) continue;
    switch (p.key) {
      case "cuisine_region":
        setters.setCuisineRegion(p.rawValue as CuisineRegion);
        applied += 1;
        break;
      case "seo_title":
        setters.setSeoTitle(String(p.rawValue).trim().slice(0, 70));
        applied += 1;
        break;
      case "seo_description":
        setters.setSeoDescription(String(p.rawValue).trim().slice(0, 170));
        applied += 1;
        break;
      case "tips":
        setters.setTips(String(p.rawValue).trim().slice(0, 2000));
        applied += 1;
        break;
      case "collections": {
        if (!setters.setCollections) break;
        const cleaned = (p.rawValue as unknown[]).filter(
          (c): c is string => typeof c === "string" && collectionNames.includes(c),
        );
        if (cleaned.length > 0) {
          setters.setCollections(cleaned);
          applied += 1;
        }
        break;
      }
    }
  }
  return applied;
}
