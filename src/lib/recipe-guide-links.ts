// Maps a recipe to the static guide pages (under /guides/...) that are most
// relevant — used to surface contextual internal links on RecipeDetail.
// Pure deterministic matching based on cuisine, categories, title and
// ingredients. No external data, no AI.

import { GUIDES, type GuideEntry } from "@/lib/guidesIndex";

type RecipeForLinks = {
  title: string;
  cuisine_region?: string | null;
  categories?: string[] | null;
  collections?: string[] | null;
  ingredients?: unknown[] | null;
};

const guideBySlug = (slug: string): GuideEntry | undefined =>
  GUIDES.find((g) => g.slug === slug);

/** Return up to `max` related guides for a recipe, in priority order. */
export const getRelatedGuides = (
  recipe: RecipeForLinks,
  max = 2,
): GuideEntry[] => {
  const cuisine = (recipe.cuisine_region ?? "").toLowerCase();
  const cats = (recipe.categories ?? []).map((c) => String(c).toLowerCase());
  const cols = (recipe.collections ?? []).map((c) => String(c).toLowerCase());
  const title = recipe.title.toLowerCase();
  const ingText = (recipe.ingredients ?? [])
    .map((i) => {
      if (typeof i === "string") return i;
      if (i && typeof i === "object") {
        const o = i as { item?: unknown; text?: unknown };
        return String(o.item ?? o.text ?? "");
      }
      return "";
    })
    .join(" ")
    .toLowerCase();

  const haystack = `${title} ${ingText}`;
  const hasAny = (terms: string[]) => terms.some((t) => haystack.includes(t));

  const candidates: string[] = [];

  // Pasta dishes
  if (
    cats.includes("pasta") ||
    /\b(pasta|spaghetti|tagliatelle|penne|linguine|rigatoni|fettuccine|lasagne)\b/.test(haystack)
  ) {
    candidates.push("how-to-cook-pasta");
  }

  // Bread — title-only to avoid matching "breadcrumbs" or "shortbread" in ingredient lists.
  if (/\b(bread|loaf|focaccia|sourdough)\b/.test(title) || /\bbread dough\b/.test(haystack)) {
    candidates.push("how-to-make-bread");
  }

  // Spices / bold flavours
  if (
    cuisine === "indian" ||
    cuisine === "thai" ||
    cols.includes("spicy") ||
    cats.includes("spicy") ||
    hasAny(["garam masala", "cumin", "coriander seed", "turmeric", "cardamom"])
  ) {
    candidates.push("how-to-use-spices");
    if (hasAny(["garam masala"])) candidates.push("garam-masala");
  }

  // Sauces, braises, reductions, stocks
  if (
    /\b(sauce|gravy|reduction|ragu|ragù|sugo|jus)\b/.test(haystack) ||
    /\bsimmer.*until.*thicken|reduce.*by|deglaze\b/.test(haystack)
  ) {
    candidates.push("proper-sauce");
  }
  if (/\b(stock|broth|bone broth)\b/.test(haystack)) {
    candidates.push("proper-stock");
  }

  // Olive oil — Italian / Mediterranean / Greek cuisines where olive oil is
  // genuinely central. Don't trigger just because a recipe uses olive oil as
  // a cooking fat (almost every recipe does).
  if (cuisine === "italian" || cuisine === "mediterranean" || cuisine === "greek") {
    candidates.push("understanding-olive-oil");
  }

  // Knife work — only for recipes that actually require notable knife skills.
  // Word-bounded terms; "diced butter" or "diced cheese" in a baking recipe
  // must NOT trigger this.
  if (
    /\b(finely chopped|finely chop|finely diced|finely dice|julienned?|brunoise|chiffonade|filleted|deboned|butterflied)\b/.test(
      haystack,
    ) ||
    /\bfillet (the |a |whole )?(fish|salmon|sea bass|trout|mackerel)\b/.test(haystack) ||
    cats.includes("knife-skills")
  ) {
    candidates.push("kitchen-knives");
  }

  // Summer / seasonal — only when the recipe is explicitly tagged summer or
  // built around a clearly summer hero ingredient in the title.
  if (
    cols.includes("summer") ||
    /\b(gazpacho|panzanella|caprese)\b/.test(title) ||
    /\b(tomato|peach|courgette|cucumber)\b/.test(title)
  ) {
    candidates.push("what-to-cook-in-summer");
  }

  // French classical
  if (cuisine === "french" || /\b(beurre blanc|hollandaise|béchamel|veloute|velouté|espagnole)\b/.test(haystack)) {
    candidates.push("mother-sauces");
    candidates.push("french-techniques");
  }


  // De-duplicate, resolve, cap.
  const seen = new Set<string>();
  const out: GuideEntry[] = [];
  for (const slug of candidates) {
    if (seen.has(slug)) continue;
    seen.add(slug);
    const g = guideBySlug(slug);
    if (g) out.push(g);
    if (out.length >= max) break;
  }
  return out;
};
