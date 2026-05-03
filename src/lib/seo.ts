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

/**
 * Build descriptive alt text for a recipe image, e.g.
 *   "Homemade beef lasagne with beef mince, tomato passata and mozzarella"
 * Falls back to just the title when no usable ingredients are present.
 * Kept under ~125 chars so it works well with screen readers.
 */
export const buildRecipeAltText = (
  title: string,
  ingredients: string[] = [],
): string => {
  const cleanTitle = title.trim();
  const key = getKeyIngredients(ingredients, 3)
    .map((i) => i.toLowerCase())
    // Filter out anything already mentioned in the title.
    .filter((i) => !cleanTitle.toLowerCase().includes(i.split(" ")[0]));

  if (!key.length) return cleanTitle;

  const list =
    key.length === 1
      ? key[0]
      : `${key.slice(0, -1).join(", ")} and ${key[key.length - 1]}`;

  const alt = `${cleanTitle} with ${list}`;
  return alt.length > 125 ? alt.slice(0, 122).replace(/[,;\s]+$/, "") + "…" : alt;
};

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

/**
 * Build a short, unique introductory paragraph for a recipe page so the
 * visible content isn't just an ingredients list. Combines the recipe's own
 * description with key ingredients, timing, category, and a varied opening
 * line seeded from the title so each page reads differently.
 */
export const buildRecipeIntro = (
  title: string,
  description: string,
  ingredients: string[],
  category: string,
  totalMinutes: number,
  servings: number | null,
): string => {
  const key = getKeyIngredients(ingredients, 3);
  const cleanCat = (category || "dish").toLowerCase().replace(/_/g, " ");
  const seed = title.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const openers = [
    `This ${cleanCat} recipe brings together`,
    `Our take on ${title.toLowerCase()} pairs`,
    `A reliable ${cleanCat} you'll come back to, built around`,
    `If you're after a ${cleanCat} with character, try this combination of`,
  ];
  const opener = openers[seed % openers.length];
  const ingList = key.length
    ? `${key.slice(0, -1).join(", ")}${key.length > 1 ? " and " : ""}${key[key.length - 1]}`
    : "fresh, seasonal ingredients";
  const timing = totalMinutes > 0
    ? ` It comes together in around ${totalMinutes} minutes${servings ? ` and serves ${servings}` : ""}.`
    : servings ? ` Serves ${servings}.` : "";
  return `${opener} ${ingList}.${timing} ${description.trim()}`.trim();
};

/**
 * Build a short, varied serving-suggestion paragraph derived from the
 * recipe's category. Adds genuinely useful on-page text without requiring
 * per-recipe manual copy.
 */
export const buildServingSuggestion = (
  title: string,
  category: string,
): string => {
  const cat = (category || "").toLowerCase();
  const map: Record<string, string> = {
    mains: `Serve ${title} hot, straight from the pan, with a simple green salad or seasonal vegetables on the side. A glass of dry white or a light red works beautifully.`,
    starters: `Plate ${title} as a light first course before a main of roast meat or pasta. A wedge of lemon and a piece of crusty bread are all the company it needs.`,
    desserts: `Serve ${title} just slightly chilled with a small jug of cream, a scoop of vanilla ice cream, or a strong espresso to finish.`,
    sides: `${title} is the perfect partner for grilled meats, roast chicken or a hearty stew. Add a sprinkle of fresh herbs just before serving.`,
    sandwiches: `Pack ${title} for lunch with a handful of crisps, some pickles, and a piece of fruit — or serve it with a bowl of soup for a quick supper.`,
    salads: `Bring ${title} to the table as a light lunch on its own, or pair it with grilled fish or chicken for a more substantial meal.`,
    soups: `Ladle ${title} into warm bowls and serve with thick slices of buttered bread or a swirl of cream and cracked pepper on top.`,
    cakes: `Slice ${title} into generous wedges and serve with a pot of tea or strong coffee. Perfect for afternoons, birthdays, or any excuse really.`,
    breakfast: `${title} works just as well for a leisurely weekend brunch as it does for a quick weekday breakfast — add fruit, yoghurt, or a strong coffee.`,
    drinks: `Serve ${title} well chilled in your favourite glass, with plenty of ice and a garnish if the mood takes you.`,
  };
  return map[cat] ||
    `Serve ${title} as soon as it's ready, with whatever sides you fancy — a fresh salad, crusty bread, or seasonal vegetables all work well.`;
};
