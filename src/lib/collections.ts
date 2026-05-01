// Curated recipe collections.
// `name` is stored verbatim in the `recipes.collections` text[] column,
// so it must match the values used by the auto-assignment seed.

import {
  Clock,
  UtensilsCrossed,
  Leaf,
  Heart,
  Fish,
  Cake,
  Zap,
  Soup,
  Drumstick,
  Croissant,
  Salad,
  Beef,
  type LucideIcon,
} from "lucide-react";

export type CollectionSlug =
  | "weeknight-suppers"
  | "italian-meals"
  | "vegetarian-options"
  | "romantic-meals"
  | "fish-and-seafood"
  | "sweets-and-desserts"
  | "quick-and-easy"
  | "sunday-roasts"
  | "soups-and-starters"
  | "chicken-dishes"
  | "baking-and-bread"
  | "healthy-eating";

export interface CollectionDef {
  slug: CollectionSlug;
  /** Stored value in DB */
  name: string;
  /** Display title */
  title: string;
  tagline: string;
  description: string;
  /** Lucide icon used on tile */
  icon: LucideIcon;
  /** Tailwind classes for the tile background (uses semantic tokens). */
  background: string;
  /** Foreground text colour class to pair with the background. */
  foreground: string;
  /** Accent strip colour for the icon halo. */
  accent: string;
}

export const collections: CollectionDef[] = [
  {
    slug: "weeknight-suppers",
    name: "Weeknight Suppers",
    title: "Weeknight Suppers",
    tagline: "Quick, comforting meals for busy nights",
    description:
      "Fuss-free recipes that come together quickly with everyday ingredients — perfect for school nights and after-work cooking.",
    icon: Clock,
    background: "bg-[hsl(28_55%_92%)]",
    foreground: "text-[hsl(20_45%_18%)]",
    accent: "bg-[hsl(20_55%_45%)] text-[hsl(28_55%_96%)]",
  },
  {
    slug: "italian-meals",
    name: "Italian Meals",
    title: "Italian Meals",
    tagline: "Pasta, risotto and the flavours of Italy",
    description:
      "From silky carbonara to creamy risotto and slow-cooked ragù — classic Italian dishes you can make at home.",
    icon: UtensilsCrossed,
    background: "bg-[hsl(8_60%_90%)]",
    foreground: "text-[hsl(0_50%_20%)]",
    accent: "bg-[hsl(0_65%_42%)] text-[hsl(8_60%_96%)]",
  },
  {
    slug: "vegetarian-options",
    name: "Vegetarian Options",
    title: "Vegetarian Options",
    tagline: "Plant-forward dishes without the meat",
    description:
      "Vegetable-led recipes and sweet bakes that prove a meat-free meal can be every bit as satisfying.",
    icon: Leaf,
    background: "bg-[hsl(95_38%_88%)]",
    foreground: "text-[hsl(120_35%_18%)]",
    accent: "bg-[hsl(120_40%_32%)] text-[hsl(95_38%_96%)]",
  },
  {
    slug: "romantic-meals",
    name: "Romantic Meals",
    title: "Romantic Meals",
    tagline: "Elegant plates for special occasions",
    description:
      "Fillet steaks, hand-dived scallops, soufflés and other show-stoppers for date night and celebrations.",
    icon: Heart,
    background: "bg-[hsl(340_25%_18%)]",
    foreground: "text-[hsl(345_60%_94%)]",
    accent: "bg-[hsl(345_70%_55%)] text-[hsl(345_60%_98%)]",
  },
  {
    slug: "fish-and-seafood",
    name: "Fish & Seafood",
    title: "Fish & Seafood",
    tagline: "Fresh from the sea — light and vibrant",
    description:
      "Pan-fried scallops, prawn linguine, herb-crusted salmon and more — bright, flavourful seafood dishes.",
    icon: Fish,
    background: "bg-[hsl(195_45%_88%)]",
    foreground: "text-[hsl(205_55%_18%)]",
    accent: "bg-[hsl(205_60%_38%)] text-[hsl(195_45%_96%)]",
  },
  {
    slug: "sweets-and-desserts",
    name: "Sweets & Desserts",
    title: "Sweets & Desserts",
    tagline: "Treats to round off any meal",
    description:
      "Crème brûlée, sticky toffee pudding, soufflés and decadent cakes — sweet endings for every occasion.",
    icon: Cake,
    background: "bg-[hsl(330_55%_92%)]",
    foreground: "text-[hsl(325_45%_22%)]",
    accent: "bg-[hsl(325_55%_50%)] text-[hsl(330_55%_96%)]",
  },
  {
    slug: "quick-and-easy",
    name: "Quick & Easy",
    title: "Quick & Easy",
    tagline: "On the table in 30 minutes or less",
    description:
      "Minimal prep, short ingredient lists and simple techniques — for when you need dinner fast.",
    icon: Zap,
    background: "bg-[hsl(48_85%_88%)]",
    foreground: "text-[hsl(35_60%_20%)]",
    accent: "bg-[hsl(35_85%_45%)] text-[hsl(48_85%_96%)]",
  },
  {
    slug: "sunday-roasts",
    name: "Sunday Roasts",
    title: "Sunday Roasts",
    tagline: "Show-stopping centrepieces for the family table",
    description:
      "Slow-roasted joints, crisp potatoes and proper trimmings — the British weekend tradition done right.",
    icon: Beef,
    background: "bg-[hsl(20_50%_22%)]",
    foreground: "text-[hsl(35_55%_92%)]",
    accent: "bg-[hsl(35_75%_55%)] text-[hsl(20_50%_18%)]",
  },
  {
    slug: "soups-and-starters",
    name: "Soups & Starters",
    title: "Soups & Starters",
    tagline: "Light beginnings and warming bowls",
    description:
      "Silky soups, elegant terrines and tempting nibbles to open a meal on the right note.",
    icon: Soup,
    background: "bg-[hsl(35_50%_88%)]",
    foreground: "text-[hsl(25_45%_22%)]",
    accent: "bg-[hsl(25_60%_45%)] text-[hsl(35_50%_96%)]",
  },
  {
    slug: "chicken-dishes",
    name: "Chicken Dishes",
    title: "Chicken Dishes",
    tagline: "From comforting roasts to fragrant curries",
    description:
      "The most versatile bird in the kitchen — golden roasts, sticky glazes, fragrant curries and more.",
    icon: Drumstick,
    background: "bg-[hsl(42_70%_88%)]",
    foreground: "text-[hsl(30_50%_20%)]",
    accent: "bg-[hsl(30_65%_42%)] text-[hsl(42_70%_96%)]",
  },
  {
    slug: "baking-and-bread",
    name: "Baking & Bread",
    title: "Baking & Bread",
    tagline: "Loaves, scones, biscuits and bakes",
    description:
      "Warm crusty bread, buttery scones, light sponges and crisp biscuits — straight from the oven.",
    icon: Croissant,
    background: "bg-[hsl(38_55%_88%)]",
    foreground: "text-[hsl(28_50%_22%)]",
    accent: "bg-[hsl(28_60%_42%)] text-[hsl(38_55%_96%)]",
  },
  {
    slug: "healthy-eating",
    name: "Healthy Eating",
    title: "Healthy Eating",
    tagline: "Nourishing dishes that don't skimp on flavour",
    description:
      "Vibrant salads, grilled fish, lean proteins and seasonal veg — wholesome cooking for everyday wellbeing.",
    icon: Salad,
    background: "bg-[hsl(150_35%_88%)]",
    foreground: "text-[hsl(155_45%_18%)]",
    accent: "bg-[hsl(155_50%_32%)] text-[hsl(150_35%_96%)]",
  },
];

export const collectionNames: string[] = collections.map((c) => c.name);

export const collectionBySlug: Record<CollectionSlug, CollectionDef> =
  Object.fromEntries(collections.map((c) => [c.slug, c])) as Record<
    CollectionSlug,
    CollectionDef
  >;

export const collectionByName: Record<string, CollectionDef> =
  Object.fromEntries(collections.map((c) => [c.name, c]));

export const isCollectionSlug = (s: string | undefined): s is CollectionSlug =>
  !!s && s in collectionBySlug;
