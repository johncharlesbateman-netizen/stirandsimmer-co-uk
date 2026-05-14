// Cuisine regions used to tag recipes. These map directly to the
// challenge regions in The Daily Pass app — keep the slugs identical.

export const CUISINE_REGIONS = [
  "italian",
  "french",
  "british",
  "indian",
  "asian",
  "mexican",
  "spicy",
  "seasonal",
  "comfort",
] as const;

export type CuisineRegion = (typeof CUISINE_REGIONS)[number];

export const cuisineRegionLabels: Record<CuisineRegion, string> = {
  italian: "Italian",
  french: "French",
  british: "British",
  indian: "Indian",
  asian: "Asian",
  spicy: "Spicy",
  seasonal: "Seasonal",
  comfort: "Comfort",
};

export const isCuisineRegion = (v: unknown): v is CuisineRegion =>
  typeof v === "string" && (CUISINE_REGIONS as readonly string[]).includes(v);

export const sanitiseCuisineRegions = (input: unknown): CuisineRegion[] => {
  if (!Array.isArray(input)) return [];
  return Array.from(new Set(input.filter(isCuisineRegion)));
};
