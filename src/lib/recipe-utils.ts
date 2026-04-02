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
  chicken: "From coq au vin and chicken kiev to satay, tapas and spicy fried chicken — bold chicken dishes for every occasion.",
  beef: "Steaks, stroganoff, burgers, kebabs and cottage pie — hearty beef recipes with simple techniques and incredible results.",
  lamb: "Lamb fillets, burgers, skewers, meatballs and shepherd's pie — flavourful lamb recipes with fresh seasonal ingredients.",
  pork: "Sausage casseroles, pork fillets, meatballs, chow mein and bangers & mash — comforting pork dishes the whole family will love.",
  spicy: "Curries, baltis, jalfrezi, tikka and masala — fiery recipes featuring chicken, lamb, prawns and salmon for spice lovers.",
  seafood: "Salmon, prawns, scallops, crab and halibut — fresh seafood recipes from risottos and salads to terrines and paella.",
  pasta: "Tagliatelle, penne, spaghetti, lasagne and lamb ragu — comforting pasta dishes with rich sauces and fresh ingredients.",
  lunch_suggestions: "Baguettes, wraps, salads, toasts and sandwiches — quick and satisfying lunch ideas perfect for midday.",
  sweets: "Cakes, scones, soufflés, ice cream, biscotti and crème brûlée — irresistible sweet treats for every occasion.",
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
