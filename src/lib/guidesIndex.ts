import properStockImage from "@/assets/guide-proper-stock.webp";
import properStockSrcSet from "@/assets/guide-proper-stock.webp?w=400;600;800;1200&format=webp&as=srcset";
import properSauceImage from "@/assets/guide-proper-sauce.webp";
import properSauceSrcSet from "@/assets/guide-proper-sauce.webp?w=400;600;800;1200&format=webp&as=srcset";
import choosingPansImage from "@/assets/guide-choosing-pans.webp";
import choosingPansSrcSet from "@/assets/guide-choosing-pans.webp?w=400;600;800;1200&format=webp&as=srcset";
import kitchenKnivesImage from "@/assets/guide-kitchen-knives.webp";
import kitchenKnivesSrcSet from "@/assets/guide-kitchen-knives.webp?w=400;600;800;1200&format=webp&as=srcset";
import howToCookPastaImage from "@/assets/guide-how-to-cook-pasta-hero.webp";
import howToCookPastaSrcSet from "@/assets/guide-how-to-cook-pasta-hero.webp?w=400;600;800;1200&format=webp&as=srcset";
import howToMakeBreadImage from "@/assets/guide-how-to-make-bread-hero.webp";
import howToMakeBreadSrcSet from "@/assets/guide-how-to-make-bread-hero.webp?w=400;600;800;1200&format=webp&as=srcset";
import whatToCookInSummerImage from "@/assets/guide-what-to-cook-in-summer-hero.webp";
import whatToCookInSummerSrcSet from "@/assets/guide-what-to-cook-in-summer-hero.webp?w=400;600;800;1200&format=webp&as=srcset";
import howToSeasonFoodImage from "@/assets/guide-how-to-season-food.jpg";
import howToSeasonFoodSrcSet from "@/assets/guide-how-to-season-food.jpg?w=400;600;800;1200&format=webp&as=srcset";
import knifeSkillsImage from "@/assets/guide-knife-skills.jpg";
import knifeSkillsSrcSet from "@/assets/guide-knife-skills.jpg?w=400;600;800;1200&format=webp&as=srcset";
import understandingHeatImage from "@/assets/guide-understanding-heat.jpg";
import understandingHeatSrcSet from "@/assets/guide-understanding-heat.jpg?w=400;600;800;1200&format=webp&as=srcset";
import buildFlavourImage from "@/assets/guide-build-flavour.jpg";
import buildFlavourSrcSet from "@/assets/guide-build-flavour.jpg?w=400;600;800;1200&format=webp&as=srcset";
import howToMakeARouxImage from "@/assets/guide-how-to-make-a-roux.jpg";
import howToMakeARouxSrcSet from "@/assets/guide-how-to-make-a-roux.jpg?w=400;600;800;1200&format=webp&as=srcset";
import motherSaucesImage from "@/assets/guide-mother-sauces.png";
import motherSaucesSrcSet from "@/assets/guide-mother-sauces.png?w=400;600;800;1200&format=webp&as=srcset";

export const GUIDE_CATEGORIES = [
  "All",
  "Technique",
  "French Technique",
  "Spices",
  "Equipment",
  "Kitchen Essentials",
  "Seasonal",
] as const;
export type GuideCategory = (typeof GUIDE_CATEGORIES)[number];

export type GuideEntry = {
  slug: string;
  title: string;
  description: string;
  /** Display label on the card. */
  eyebrow: string;
  /** Filter category — must be one of GUIDE_CATEGORIES (minus "All"). */
  category: Exclude<GuideCategory, "All">;
  imageId?: string;
  image?: string;
  imageSrcSet?: string;
  imageAlt: string;
};

const pexels = (id: string, w = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fm=webp&w=${w}`;
const pexelsSrcSet = (id: string, widths: number[]) =>
  widths.map((w) => `${pexels(id, w)} ${w}w`).join(", ");

export const GUIDES: GuideEntry[] = [
  {
    slug: "mother-sauces",
    title: "The five French mother sauces — and why every home cook should know them",
    description:
      "Master these five and you hold the keys to almost every classic sauce in western cuisine.",
    eyebrow: "French Technique",
    category: "French Technique",
    image: motherSaucesImage,
    imageSrcSet: motherSaucesSrcSet,
    imageAlt: "A silky pale-golden béchamel sauce being whisked in a copper saucepan",
  },
  {
    slug: "french-techniques",
    title: "French cooking techniques every home cook should know",
    description:
      "Seven essential French techniques — mise en place, julienne, brunoise, chiffonade, beurre blanc, flambé and déglaze — explained simply.",
    eyebrow: "French Technique",
    category: "French Technique",
    imageId: "33858056",
    imageAlt: "Flames rising from a sauté pan on a gas stove during flambé",
  },
  {
    slug: "garam-masala",
    title: "Garam masala — a cook's guide",
    description:
      "The spices that go in, why they matter, how to toast and grind them, and the mistakes most home cooks make.",
    eyebrow: "Spices",
    category: "Spices",
    imageId: "1340116",
    imageAlt: "Small bowls of warm Indian spices arranged on a dark surface",
  },
  {
    slug: "how-to-use-spices",
    title: "How to use spices — a beginner's guide",
    description:
      "What spices do, how to store them, when to add them, and how to build proper flavour with confidence.",
    eyebrow: "Spices",
    category: "Spices",
    imageId: "2802527",
    imageAlt: "An array of ground spices in spoons on a dark wooden table",
  },
  {
    slug: "proper-stock",
    title: "How to make a proper stock",
    description:
      "The quiet foundation of good cooking — bones, mirepoix, water and time, and how to turn them into something your sauces and soups can lean on.",
    eyebrow: "French Technique",
    category: "French Technique",
    image: properStockImage,
    imageSrcSet: properStockSrcSet,
    imageAlt: "A pot of golden chicken stock simmering with bones, vegetables and herbs",
  },
  {
    slug: "proper-sauce",
    title: "How to make a proper sauce",
    description:
      "The building blocks, the techniques, and the small details that turn a thin pan liquid into something glossy, balanced and worth mopping up.",
    eyebrow: "French Technique",
    category: "French Technique",
    image: properSauceImage,
    imageSrcSet: properSauceSrcSet,
    imageAlt: "A glossy dark pan sauce being whisked in a copper saucepan",
  },
  {
    slug: "choosing-pans",
    title: "Choosing the right pan for the job",
    description:
      "The materials, the shapes, and which pans actually earn their place in a home kitchen — a practical guide to building a collection that lasts.",
    eyebrow: "Equipment",
    category: "Equipment",
    image: choosingPansImage,
    imageSrcSet: choosingPansSrcSet,
    imageAlt: "An overhead arrangement of cast iron, copper and stainless steel pans on a dark surface",
  },
  {
    slug: "kitchen-knives",
    title: "Kitchen knives — a cook's guide",
    description:
      "The blades worth owning, how to hold them, how to keep them sharp, and how to choose ones that will last a lifetime.",
    eyebrow: "Equipment",
    category: "Equipment",
    image: kitchenKnivesImage,
    imageSrcSet: kitchenKnivesSrcSet,
    imageAlt: "An overhead arrangement of kitchen knives on a dark cutting board",
  },
  {
    slug: "understanding-olive-oil",
    title: "Understanding olive oil — a cook's guide",
    description:
      "What the labels actually mean, how it's made, when to cook with it, when to finish with it, and which bottles to buy in the UK.",
    eyebrow: "Kitchen Essentials",
    category: "Kitchen Essentials",
    imageId: "33783",
    imageAlt: "A bottle of extra virgin olive oil and fresh olives on a dark wooden surface",
  },
  {
    slug: "how-to-cook-pasta",
    title: "How to cook pasta properly — a cook's guide",
    description:
      "How to choose the shape, salt the water, time it right, save the cooking water and finish it in the sauce — the small habits that change everything.",
    eyebrow: "Kitchen Essentials",
    category: "Kitchen Essentials",
    image: howToCookPastaImage,
    imageSrcSet: howToCookPastaSrcSet,
    imageAlt: "Spaghetti being twirled in a pan of glossy tomato sauce with basil and parmesan",
  },
  {
    slug: "how-to-make-bread",
    title: "How to make bread at home — a beginner's guide",
    description:
      "The four ingredients, the flours, the yeasts, the method and the mistakes — everything you need to bake a proper loaf at home.",
    eyebrow: "Kitchen Essentials",
    category: "Kitchen Essentials",
    image: howToMakeBreadImage,
    imageSrcSet: howToMakeBreadSrcSet,
    imageAlt: "A freshly baked rustic sourdough loaf with an open crumb, sliced on a dark wooden board",
  },
  {
    slug: "what-to-cook-in-summer",
    title: "What to cook in summer — a seasonal guide",
    description:
      "What's in season in the UK, how to build a proper salad, grilling done well, summer herbs, soft fruit and five dishes every cook should know.",
    eyebrow: "Seasonal",
    category: "Seasonal",
    image: whatToCookInSummerImage,
    imageSrcSet: whatToCookInSummerSrcSet,
    imageAlt: "A sunlit summer table with grilled vegetables, ripe tomatoes, peaches, fresh herbs and a jug of iced drink",
  },
  {
    slug: "how-to-season-food",
    title: "How to season food — a cook's guide",
    description:
      "Seasoning is a continuous conversation with the food — when to add salt, when to add acid, and how different cuisines build flavour without it.",
    eyebrow: "Technique",
    category: "Technique",
    image: howToSeasonFoodImage,
    imageSrcSet: howToSeasonFoodSrcSet,
    imageAlt: "A hand sprinkling flaky sea salt over a wooden board with peppercorns and fresh herbs",
  },
  {
    slug: "knife-skills",
    title: "Knife skills for home cooks — a practical guide",
    description:
      "The pinch grip, the claw grip, the rocking motion and the four cuts every home cook needs — plus why a sharp knife is safer, more efficient and more satisfying to use.",
    eyebrow: "Technique",
    category: "Technique",
    image: knifeSkillsImage,
    imageSrcSet: knifeSkillsSrcSet,
    imageAlt: "A chef's knife on a dark wooden cutting board with finely chopped vegetables and fresh herbs",
  },
  {
    slug: "understanding-heat",
    title: "Understanding heat — a cook's guide",
    description:
      "How to control heat on any cooker, the difference between dry and wet heat, what the heat levels actually mean, and the visual and sound cues that tell you what's really happening in the pan.",
    eyebrow: "Technique",
    category: "Technique",
    image: understandingHeatImage,
    imageSrcSet: understandingHeatSrcSet,
    imageAlt: "A hot cast iron skillet on a hob with butter sizzling and steam rising",
  },
  {
    slug: "how-to-build-flavour-from-scratch",
    title: "How to build flavour from scratch",
    description:
      "The layers, the bases and the small habits that turn a pan of ingredients into something with depth, balance and life — fat, aromatics, stock, roux, browning, salt and acid.",
    eyebrow: "Technique",
    category: "Technique",
    image: buildFlavourImage,
    imageSrcSet: buildFlavourSrcSet,
    imageAlt: "A cast iron skillet of deeply browned onions and aromatics sizzling in golden butter",
  },
  {
    slug: "how-to-make-a-roux",
    title: "How to make a roux",
    description:
      "Equal parts butter and flour — the small piece of technique that underpins Béchamel, Velouté, Espagnole and most classic sauces. The three stages, the ratios and the rule that prevents lumps.",
    eyebrow: "French Technique",
    category: "French Technique",
    image: howToMakeARouxImage,
    imageSrcSet: howToMakeARouxSrcSet,
    imageAlt: "A pale golden roux being whisked in a copper saucepan with butter and flour beside it",
  },
];

export const GUIDE_FALLBACK_IMAGE = properStockImage;

export const guideCardImage = (g: GuideEntry, w = 800) =>
  g.image ?? pexels(g.imageId!, w);
export const guideCardSrcSet = (g: GuideEntry) =>
  g.imageSrcSet ?? (g.image ? undefined : pexelsSrcSet(g.imageId!, [400, 600, 800, 1200]));

export const GUIDE_BY_SLUG: Record<string, GuideEntry> = Object.fromEntries(
  GUIDES.map((g) => [g.slug, g]),
);

/** Manual related-guide mapping. Order matters — first listed shows first. */
export const RELATED_GUIDES: Record<string, string[]> = {
  "mother-sauces": ["proper-sauce", "french-techniques", "how-to-make-a-roux", "how-to-build-flavour-from-scratch"],
  "french-techniques": ["mother-sauces", "kitchen-knives", "how-to-build-flavour-from-scratch"],
  "garam-masala": ["how-to-season-food", "how-to-use-spices"],
  "how-to-use-spices": ["garam-masala", "how-to-season-food"],
  "proper-stock": ["understanding-heat", "how-to-season-food", "how-to-build-flavour-from-scratch"],
  "proper-sauce": ["understanding-heat", "how-to-season-food"],
  "choosing-pans": ["kitchen-knives", "how-to-cook-pasta"],
  "kitchen-knives": ["knife-skills", "choosing-pans"],
  "knife-skills": ["kitchen-knives", "how-to-season-food"],
  "understanding-olive-oil": ["proper-sauce", "what-to-cook-in-summer"],
  "how-to-cook-pasta": ["proper-sauce", "understanding-olive-oil"],
  "how-to-make-bread": ["how-to-cook-pasta", "kitchen-knives"],
  "what-to-cook-in-summer": ["understanding-olive-oil", "how-to-make-bread"],
  "how-to-season-food": ["proper-sauce", "how-to-use-spices"],
  "understanding-heat": ["proper-sauce", "proper-stock"],
  "how-to-build-flavour-from-scratch": ["proper-stock", "mother-sauces", "how-to-make-a-roux", "french-techniques"],
  "how-to-make-a-roux": ["mother-sauces", "how-to-build-flavour-from-scratch", "proper-stock", "french-techniques"],
};

