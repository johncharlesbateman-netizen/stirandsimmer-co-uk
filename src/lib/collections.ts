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
  /** High-quality background image URL for the tile. */
  image: string;
}

// Curated Pexels imagery — photographed, on-topic and appetising.
export const collections: CollectionDef[] = [
  {
    slug: "weeknight-suppers",
    name: "Weeknight Suppers",
    title: "Weeknight Suppers",
    tagline: "Quick, comforting meals for busy nights",
    description:
      "Fuss-free recipes that come together quickly with everyday ingredients — perfect for school nights and after-work cooking.",
    icon: Clock,
    image:
      "https://images.pexels.com/photos/2092897/pexels-photo-2092897.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    slug: "italian-meals",
    name: "Italian Meals",
    title: "Italian Meals",
    tagline: "Pasta, risotto and the flavours of Italy",
    description:
      "From silky carbonara to creamy risotto and slow-cooked ragù — classic Italian dishes you can make at home.",
    icon: UtensilsCrossed,
    image:
      "https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    slug: "romantic-meals",
    name: "Romantic Meals",
    title: "Romantic Meals",
    tagline: "Elegant plates for special occasions",
    description:
      "Fillet steaks, hand-dived scallops, soufflés and other show-stoppers for date night and celebrations.",
    icon: Heart,
    image:
      "https://images.pexels.com/photos/776538/pexels-photo-776538.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    slug: "fish-and-seafood",
    name: "Fish & Seafood",
    title: "Fish & Seafood",
    tagline: "Fresh from the sea — light and vibrant",
    description:
      "Pan-fried scallops, prawn linguine, herb-crusted salmon and more — bright, flavourful seafood dishes.",
    icon: Fish,
    image:
      "https://images.pexels.com/photos/3296434/pexels-photo-3296434.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    slug: "sweets-and-desserts",
    name: "Sweets & Desserts",
    title: "Sweets & Desserts",
    tagline: "Treats to round off any meal",
    description:
      "Crème brûlée, sticky toffee pudding, soufflés and decadent cakes — sweet endings for every occasion.",
    icon: Cake,
    image:
      "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    slug: "quick-and-easy",
    name: "Quick & Easy",
    title: "Quick & Easy",
    tagline: "On the table in 30 minutes or less",
    description:
      "Minimal prep, short ingredient lists and simple techniques — for when you need dinner fast.",
    icon: Zap,
    image:
      "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    slug: "sunday-roasts",
    name: "Sunday Roasts",
    title: "Sunday Roasts",
    tagline: "Show-stopping centrepieces for the family table",
    description:
      "Slow-roasted joints, crisp potatoes and proper trimmings — the British weekend tradition done right.",
    icon: Beef,
    image:
      "https://images.pexels.com/photos/6210747/pexels-photo-6210747.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    slug: "soups-and-starters",
    name: "Soups & Starters",
    title: "Soups & Starters",
    tagline: "Light beginnings and warming bowls",
    description:
      "Silky soups, elegant terrines and tempting nibbles to open a meal on the right note.",
    icon: Soup,
    image:
      "https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    slug: "chicken-dishes",
    name: "Chicken Dishes",
    title: "Chicken Dishes",
    tagline: "From comforting roasts to fragrant curries",
    description:
      "The most versatile bird in the kitchen — golden roasts, sticky glazes, fragrant curries and more.",
    icon: Drumstick,
    image:
      "https://images.pexels.com/photos/2673353/pexels-photo-2673353.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    slug: "baking-and-bread",
    name: "Baking & Bread",
    title: "Baking & Bread",
    tagline: "Loaves, scones, biscuits and bakes",
    description:
      "Warm crusty bread, buttery scones, light sponges and crisp biscuits — straight from the oven.",
    icon: Croissant,
    image:
      "https://images.pexels.com/photos/1387070/pexels-photo-1387070.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    slug: "healthy-eating",
    name: "Healthy Eating",
    title: "Healthy Eating",
    tagline: "Nourishing dishes that don't skimp on flavour",
    description:
      "Vibrant salads, grilled fish, lean proteins and seasonal veg — wholesome cooking for everyday wellbeing.",
    icon: Salad,
    image:
      "https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
];
