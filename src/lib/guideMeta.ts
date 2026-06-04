import properStockImage from "@/assets/guide-proper-stock.jpg";
import properSauceImage from "@/assets/guide-proper-sauce.jpg";
import choosingPansImage from "@/assets/guide-choosing-pans.jpg";
import kitchenKnivesImage from "@/assets/guide-kitchen-knives.jpg";
import oliveOilImage from "@/assets/guide-understanding-olive-oil-hero.jpg";
import howToCookPastaImage from "@/assets/guide-how-to-cook-pasta-hero.jpg";
import howToMakeBreadImage from "@/assets/guide-how-to-make-bread-hero.jpg";
import whatToCookInSummerImage from "@/assets/guide-what-to-cook-in-summer-hero.jpg";
import howToSeasonFoodImage from "@/assets/guide-how-to-season-food.jpg";

export const SITE_ORIGIN = "https://stirandsimmer.co.uk";
const AUTHOR = "Stir & Simmer";

const pexels = (id: string, w = 1600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fm=webp&w=${w}`;

const toAbsolute = (path: string) =>
  path.startsWith("http") ? path : `${SITE_ORIGIN}${path}`;

const stripSiteSuffix = (title: string) =>
  title.replace(/\s*[|—–-]\s*Stir\s*&\s*Simmer\s*$/i, "").trim();

export type GuideMeta = {
  slug: string;
  /** Page <title>, includes the "Stir & Simmer" site suffix. */
  title: string;
  /** Clean headline without the site suffix, used in schema/breadcrumbs. */
  name: string;
  description: string;
  image: string;
  url: string;
  publishedTime: string;
  modifiedTime: string;
  author: string;
};

type RawMeta = {
  slug: string;
  title: string;
  description: string;
  imageId?: string;
  image?: string;
  publishedTime: string;
  modifiedTime?: string;
};

const RAW: RawMeta[] = [
  {
    slug: "mother-sauces",
    title: "The Five French Mother Sauces Explained — Stir & Simmer",
    description:
      "Learn the five French mother sauces — Béchamel, Velouté, Espagnole, Hollandaise and Tomat — with clear steps, ratios and the mistakes to avoid.",
    imageId: "5908227",
    publishedTime: "2025-01-15T09:00:00Z",
  },
  {
    slug: "french-techniques",
    title: "Essential French Cooking Techniques for Home Cooks — Stir & Simmer",
    description:
      "Master seven essential French techniques — mise en place, julienne, brunoise, chiffonade, beurre blanc, flambé and déglaze — to lift everyday cooking.",
    imageId: "4252137",
    publishedTime: "2025-02-01T09:00:00Z",
  },
  {
    slug: "garam-masala",
    title: "Garam Masala Explained: Spices, Toasting and How to Use It — Stir & Simmer",
    description:
      "What garam masala really is, the spices that belong in it, how to toast and grind your own blend, and when to add it for the deepest, warmest flavour.",
    imageId: "1340116",
    publishedTime: "2025-02-15T09:00:00Z",
  },
  {
    slug: "how-to-use-spices",
    title: "How to Cook With Spices: A Beginner's Guide — Stir & Simmer",
    description:
      "A beginner's guide to cooking with spices — how to store, toast and bloom them, when to add them, and how to build layered flavour with real confidence.",
    imageId: "2802527",
    publishedTime: "2025-03-01T09:00:00Z",
  },
  {
    slug: "proper-stock",
    title: "How to Make Proper Stock at Home: A Cook's Guide — Stir & Simmer",
    description:
      "How to make a proper stock at home — bones, vegetables and timings for white and brown stocks, plus how to strain, store and actually use them well.",
    image: properStockImage,
    publishedTime: "2025-03-15T09:00:00Z",
  },
  {
    slug: "proper-sauce",
    title: "How to Make a Proper Sauce From Scratch — Stir & Simmer",
    description:
      "How to build a proper sauce at home — the bases, the thickeners, the deglaze, and the small details that turn pan juices into something glossy and rich.",
    image: properSauceImage,
    publishedTime: "2025-04-01T09:00:00Z",
  },
  {
    slug: "choosing-pans",
    title: "How to Choose the Right Pan for Every Job — Stir & Simmer",
    description:
      "A practical guide to choosing pans — cast iron, stainless steel, non-stick and copper — and which shapes and sizes actually earn space in your kitchen.",
    image: choosingPansImage,
    publishedTime: "2025-04-15T09:00:00Z",
  },
  {
    slug: "kitchen-knives",
    title: "Kitchen Knives: Which to Buy, How to Hold, How to Sharpen — Stir & Simmer",
    description:
      "Which kitchen knives are worth owning, how to grip them safely, how to keep an edge with a steel and stone, and how to buy blades that last a lifetime.",
    image: kitchenKnivesImage,
    publishedTime: "2025-05-01T09:00:00Z",
  },
  {
    slug: "understanding-olive-oil",
    title: "Understanding Olive Oil: Labels, Grades and When to Use It — Stir & Simmer",
    description:
      "Olive oil decoded — what extra virgin really means, when to cook with it, when to finish a dish with it, and which UK bottles are worth buying.",
    image: oliveOilImage,
    publishedTime: "2025-05-18T09:00:00Z",
  },
  {
    slug: "how-to-cook-pasta",
    title: "How to Cook Pasta Properly: An Italian Cook's Guide — Stir & Simmer",
    description:
      "Cook pasta the Italian way — pick the right shape, salt the water heavily, time it al dente, save the cooking water, and finish it in the sauce.",
    image: howToCookPastaImage,
    publishedTime: "2025-05-18T10:00:00Z",
  },
  {
    slug: "how-to-make-bread",
    title: "How to Make Bread at Home: A Beginner's Baking Guide — Stir & Simmer",
    description:
      "Start baking bread at home — the four ingredients, choosing flours and yeast, kneading and proving, the common mistakes, and five loaves to try first.",
    image: howToMakeBreadImage,
    publishedTime: "2025-05-18T11:00:00Z",
  },
  {
    slug: "what-to-cook-in-summer",
    title: "What to Cook in Summer: A Seasonal UK Cooking Guide — Stir & Simmer",
    description:
      "Cook with the British summer — what's in season, how to build a proper salad, grilling done well, the herbs to use, and five summer dishes to master.",
    image: whatToCookInSummerImage,
    publishedTime: "2025-05-18T12:00:00Z",
  },
  {
    slug: "how-to-season-food",
    title: "How to Season Food: A Cook's Guide to Salt, Acid and Balance — Stir & Simmer",
    description:
      "How to season food properly — when to add salt, how to taste as you cook, the role of acid, and how Thai, Japanese and Middle Eastern cooks build flavour.",
    image: howToSeasonFoodImage,
    publishedTime: "2026-06-04T09:00:00Z",
    modifiedTime: "2026-06-04T09:00:00Z",
  },
];

const DEFAULT_MODIFIED = "2025-05-16T09:00:00Z";

export const GUIDES_IN_ORDER: GuideMeta[] = RAW.map((r) => {
  const image = r.image ?? (r.imageId ? pexels(r.imageId, 1600) : "");
  return {
    slug: r.slug,
    title: r.title,
    name: stripSiteSuffix(r.title),
    description: r.description,
    image: toAbsolute(image),
    url: `${SITE_ORIGIN}/guides/${r.slug}`,
    publishedTime: r.publishedTime,
    modifiedTime: r.modifiedTime ?? DEFAULT_MODIFIED,
    author: AUTHOR,
  };
});

export const GUIDE_META: Record<string, GuideMeta> = Object.fromEntries(
  GUIDES_IN_ORDER.map((m) => [m.slug, m]),
);

export const getGuideMeta = (slug: string): GuideMeta => {
  const meta = GUIDE_META[slug];
  if (!meta) throw new Error(`Missing guide meta for slug: ${slug}`);
  return meta;
};
