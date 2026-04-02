import { Database } from "@/integrations/supabase/types";

type RecipeCategory = Database["public"]["Enums"]["recipe_category"];

export const categoryLabels: Record<RecipeCategory, string> = {
  chicken: "Chicken",
  beef: "Beef",
  lamb: "Lamb",
  pork: "Pork",
  spicy: "Spicy",
  seafood: "Seafood",
  pasta: "Pasta Heaven",
  lunch_suggestions: "Lunch Suggestions",
  sweets: "Sweets to Tempt",
};

export const categoryDescriptions: Record<RecipeCategory, string> = {
  chicken: "Delicious chicken recipes — from roasts and curries to quick weeknight dinners. Fresh ingredients, bold flavours.",
  beef: "Hearty beef recipes for every occasion — steaks, stews, slow cooks and more. Simple techniques, incredible results.",
  lamb: "Flavourful lamb recipes — roasts, tagines, chops and slow-cooked favourites using fresh seasonal ingredients.",
  pork: "Tasty pork recipes — from crispy belly to pulled pork, chops and sausage dishes. Comfort food at its best.",
  spicy: "Turn up the heat with our spicy recipes — fiery curries, chilli dishes and bold-flavoured meals for spice lovers.",
  seafood: "Fresh seafood recipes — fish, prawns, mussels and more. Light, flavourful dishes with simple preparation.",
  pasta: "Comforting pasta recipes — from creamy carbonara to fresh ragu. Classic Italian-inspired dishes made easy.",
  lunch_suggestions: "Quick and satisfying lunch recipes — salads, sandwiches, soups and light meals perfect for midday.",
  sweets: "Irresistible sweet treats — cakes, puddings, biscuits and desserts to satisfy every craving.",
};

export const categorySlugs: Record<string, RecipeCategory> = {
  chicken: "chicken",
  beef: "beef",
  lamb: "lamb",
  pork: "pork",
  spicy: "spicy",
  seafood: "seafood",
  pasta: "pasta",
  "lunch-suggestions": "lunch_suggestions",
  sweets: "sweets",
};

export const categoryToSlug: Record<RecipeCategory, string> = {
  chicken: "chicken",
  beef: "beef",
  lamb: "lamb",
  pork: "pork",
  spicy: "spicy",
  seafood: "seafood",
  pasta: "pasta",
  lunch_suggestions: "lunch-suggestions",
  sweets: "sweets",
};

export const allCategories: RecipeCategory[] = [
  "chicken",
  "beef",
  "lamb",
  "pork",
  "spicy",
  "seafood",
  "pasta",
  "lunch_suggestions",
  "sweets",
];
