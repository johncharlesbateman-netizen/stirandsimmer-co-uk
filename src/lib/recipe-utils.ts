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

export const allCategories: RecipeCategory[] = [
  "chicken",
  "beef",
  "lamb",
  "pork",
  "spicy",
  "seafood",
  "lunch_suggestions",
  "sweets",
];
