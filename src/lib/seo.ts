// SEO helpers for recipe pages.
// Generates concise, unique meta titles (<60 chars) and descriptions (<155 chars)
// when an admin hasn't supplied custom values.

const SITE_SUFFIX = " | Great Food Recipes";
const TITLE_LIMIT = 60;
const DESC_LIMIT = 155;

const truncate = (text: string, limit: number): string => {
  if (text.length <= limit) return text;
  const sliced = text.slice(0, limit - 1);
  const lastSpace = sliced.lastIndexOf(" ");
  const trimmed = lastSpace > limit * 0.6 ? sliced.slice(0, lastSpace) : sliced;
  return trimmed.replace(/[,;:.\-\s]+$/, "") + "…";
};

const stripQuantity = (ingredient: string): string =>
  ingredient
    .replace(
      /^[\d\s\/.,⅓½¼¾⅔⅛⅜⅝⅞-]+\s*(g|kg|ml|l|tsp|tbsp|cup|cups|oz|lb|pinch|clove|cloves|slice|slices)?\s*/i,
      "",
    )
    .split(",")[0]
    .trim();

const getKeyIngredients = (ingredients: string[], max = 3): string[] =>
  ingredients
    .filter((i) => !/^(for the |for |the )/i.test(i.trim()))
    .slice(0, max)
    .map(stripQuantity)
    .filter(Boolean);

export const buildSeoTitle = (
  customTitle: string | null | undefined,
  recipeTitle: string,
  totalMinutes: number,
): string => {
  if (customTitle?.trim()) return truncate(customTitle.trim(), TITLE_LIMIT);

  const base = recipeTitle.trim();
  // Try adding a benefit (prep/cook time) if it fits.
  if (totalMinutes > 0) {
    const withTime = `${base} (${totalMinutes} min)${SITE_SUFFIX}`;
    if (withTime.length <= TITLE_LIMIT) return withTime;
  }
  const withSuffix = `${base}${SITE_SUFFIX}`;
  if (withSuffix.length <= TITLE_LIMIT) return withSuffix;
  return truncate(base, TITLE_LIMIT);
};

export const buildSeoDescription = (
  customDescription: string | null | undefined,
  recipeTitle: string,
  description: string,
  ingredients: string[],
  totalMinutes: number,
): string => {
  if (customDescription?.trim()) {
    return truncate(customDescription.trim(), DESC_LIMIT);
  }

  const keyIngredients = getKeyIngredients(ingredients);
  const parts: string[] = [description.trim()];

  if (keyIngredients.length) {
    parts.push(`Made with ${keyIngredients.join(", ")}.`);
  }
  if (totalMinutes > 0) {
    parts.push(`Ready in ${totalMinutes} min.`);
  }

  return truncate(parts.join(" "), DESC_LIMIT);
};
