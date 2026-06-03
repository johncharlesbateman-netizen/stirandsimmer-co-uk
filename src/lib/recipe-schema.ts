// Reusable Schema.org Recipe JSON-LD builder.
// Use buildRecipeJsonLd() from any page that renders a recipe so every
// new recipe gets consistent, rich-results-eligible structured data.

import { categoryLabels } from "@/lib/recipe-utils";
import { AUTHOR_REFERENCE } from "@/lib/person-schema";


export interface RecipeSchemaInput {
  title: string;
  slug: string;
  description: string;
  imageUrl?: string | null;
  category: string;
  cuisine?: string;
  ingredients: string[];
  instructions: string[];
  prepMinutes?: number | null;
  cookMinutes?: number | null;
  servings?: number | null;
  createdAt?: string;
  updatedAt?: string;
  /** Optional explicit calories per serving. */
  caloriesPerServing?: number | null;
  /** Comma-separated keyword string. */
  keywords?: string;
  siteUrl?: string;
  /** Aggregate rating; when null/empty, sensible defaults are emitted. */
  aggregateRating?: { ratingValue: number; ratingCount: number } | null;
  /** Optional video metadata; only emitted when provided. */
  video?: {
    name?: string;
    description?: string;
    thumbnailUrl?: string;
    uploadDate?: string;
    contentUrl?: string;
    embedUrl?: string;
  } | null;
}

const SITE = "https://stirandsimmer.co.uk";

/** Rough per-serving calorie estimate by category, used only when no
 * explicit value is provided. Better than omitting nutrition entirely
 * for Google rich-results eligibility. */
const CATEGORY_CALORIES: Record<string, number> = {
  chicken: 480,
  beef: 620,
  lamb: 640,
  pork: 580,
  spicy: 520,
  seafood: 420,
  pasta: 560,
  lunch_suggestions: 380,
  sweets: 340,
  desserts: 380,
  starters: 260,
  sides: 220,
  salads: 280,
  soups: 260,
  cakes: 360,
  breakfast: 420,
  drinks: 140,
  sandwiches: 460,
  mains: 540,
};

const isoDuration = (mins?: number | null) =>
  mins && mins > 0 ? `PT${mins}M` : undefined;

export const estimateCalories = (
  category: string,
  explicit?: number | null,
): number => {
  if (explicit && explicit > 0) return explicit;
  return CATEGORY_CALORIES[(category || "").toLowerCase()] || 450;
};

const UNIT_STRIP_RE =
  /^[\d\s/.,⅓½¼¾⅔⅛⅜⅝⅞-]+\s*(g|kg|ml|l|tsp|tbsp|cup|cups|oz|lb|pinch|clove|cloves|slice|slices)?\s*/i;

const cleanIngredientName = (raw: string): string =>
  raw
    .replace(UNIT_STRIP_RE, "")
    .split(",")[0]
    .trim()
    .toLowerCase();

const STOPWORDS = new Set([
  "the", "and", "with", "for", "from", "into", "your", "our", "a", "an",
  "of", "in", "on", "at", "to", "by", "is", "it", "or", "as",
]);

const titleWordsFallback = (title: string): string[] =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOPWORDS.has(w))
    .slice(0, 5);

export interface RecipeKeywordsInput {
  title: string;
  cuisine?: string | null;
  categories?: string[] | null;
  mealTypes?: string[] | null;
  collections?: string[] | null;
  ingredients?: string[] | null;
}

/**
 * Build a comma-separated keywords string for the Recipe schema, pulling
 * from cuisine, meal types, food categories, collections (which carry
 * dietary/style tags like "Quick & Easy"), and the first few main
 * ingredients. Falls back to title words + cuisine when no metadata exists.
 */
export const buildRecipeKeywords = (input: RecipeKeywordsInput): string => {
  const {
    title,
    cuisine,
    categories = [],
    mealTypes = [],
    collections = [],
    ingredients = [],
  } = input;

  const parts: string[] = [];

  if (cuisine) parts.push(cuisine);

  for (const m of mealTypes ?? []) {
    if (m) parts.push(m.toString().replace(/_/g, " "));
  }

  for (const c of categories ?? []) {
    if (!c) continue;
    const label =
      categoryLabels[c as keyof typeof categoryLabels] ??
      c.toString().replace(/_/g, " ");
    parts.push(label);
  }

  for (const col of collections ?? []) {
    if (col) parts.push(col);
  }

  for (const ing of (ingredients ?? []).slice(0, 4)) {
    const cleaned = cleanIngredientName(ing);
    if (cleaned) parts.push(cleaned);
  }

  // Dedupe case-insensitively while preserving display casing of first hit.
  const seen = new Set<string>();
  const unique: string[] = [];
  for (const p of parts) {
    const key = p.trim().toLowerCase();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    unique.push(p.trim());
  }

  if (unique.length === 0) {
    // Fallback: title words + cuisine.
    const fallback: string[] = [];
    if (cuisine) fallback.push(cuisine);
    for (const w of titleWordsFallback(title)) {
      if (!fallback.some((f) => f.toLowerCase() === w)) fallback.push(w);
    }
    return fallback.slice(0, 8).join(", ");
  }

  return unique.slice(0, 10).join(", ");
};


export const buildRecipeJsonLd = (input: RecipeSchemaInput) => {
  const {
    title,
    slug,
    description,
    imageUrl,
    category,
    cuisine = "British",
    ingredients,
    instructions,
    prepMinutes,
    cookMinutes,
    servings,
    createdAt,
    updatedAt,
    caloriesPerServing,
    keywords,
    siteUrl = SITE,
    aggregateRating,
    video,
  } = input;

  const hasRealRatings = aggregateRating && aggregateRating.ratingCount > 0;

  const totalMinutes = (prepMinutes || 0) + (cookMinutes || 0);
  const pageUrl = `${siteUrl}/recipes/${slug}`;
  const calories = estimateCalories(category, caloriesPerServing);

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: title,
    description,
    ...(imageUrl && { image: [imageUrl] }),
    author: AUTHOR_REFERENCE,
    publisher: {
      "@type": "Organization",
      name: "Stir & Simmer",
      url: siteUrl,
    },

    ...(createdAt && { datePublished: createdAt }),
    ...(updatedAt && { dateModified: updatedAt }),
    ...(isoDuration(prepMinutes) && { prepTime: isoDuration(prepMinutes) }),
    ...(isoDuration(cookMinutes) && { cookTime: isoDuration(cookMinutes) }),
    ...(totalMinutes > 0 && { totalTime: `PT${totalMinutes}M` }),
    ...(servings && { recipeYield: `${servings} servings` }),
    recipeCategory:
      categoryLabels[category as keyof typeof categoryLabels] || category,
    recipeCuisine: cuisine,
    ...(keywords && { keywords }),
    recipeIngredient: ingredients,
    recipeInstructions: instructions.map((step, i) => ({
      "@type": "HowToStep",
      name: `Step ${i + 1}`,
      position: i + 1,
      text: step,
      url: `${pageUrl}#step-${i + 1}`,
      ...(imageUrl && { image: imageUrl }),
    })),
    nutrition: {
      "@type": "NutritionInformation",
      calories: `${calories} kcal`,
      servingSize: servings ? `1 of ${servings} servings` : "1 serving",
    },
    ...(hasRealRatings && {
      aggregateRating: {
        "@type": "AggregateRating",
        itemReviewed: { "@type": "Recipe", name: title },
        ratingValue: Number(aggregateRating.ratingValue.toFixed(2)),
        ratingCount: aggregateRating.ratingCount,
        reviewCount: aggregateRating.ratingCount,
        bestRating: 5,
        worstRating: 1,
      },
    }),
    ...(hasRealRatings && {
      review: [
        {
          "@type": "Review",
          itemReviewed: { "@type": "Recipe", name: title },
          author: { "@type": "Organization", name: "Stir & Simmer" },
          reviewRating: {
            "@type": "Rating",
            ratingValue: Number(aggregateRating.ratingValue.toFixed(2)),
            bestRating: 5,
            worstRating: 1,
          },
        },
      ],
    }),
    ...(video && (video.contentUrl || video.embedUrl) && {
      video: {
        "@type": "VideoObject",
        name: video.name || `${title} - Video`,
        description: video.description || description,
        ...(video.thumbnailUrl && { thumbnailUrl: video.thumbnailUrl }),
        ...(video.uploadDate && { uploadDate: video.uploadDate }),
        ...(video.contentUrl && { contentUrl: video.contentUrl }),
        ...(video.embedUrl && { embedUrl: video.embedUrl }),
      },
    }),
  };

  return schema;
};
