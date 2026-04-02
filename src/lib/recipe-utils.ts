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
  chicken: "Whether it's a golden Sunday roast, a fragrant Thai satay or a crispy Southern-style supper, chicken is endlessly versatile. Browse our collection of tried-and-tested recipes that celebrate this kitchen staple in every style — from comfort classics to adventurous world flavours.",
  beef: "Rich, robust and deeply satisfying — beef lends itself to everything from a seared steak with peppercorn sauce to a slow-cooked cottage pie on a cold evening. Explore recipes that make the most of quality cuts with simple techniques and bold seasoning.",
  lamb: "Sweet, tender and full of character, lamb pairs beautifully with herbs, spices and seasonal vegetables. From herb-crusted fillets and Moroccan tagines to hearty shepherd's pie, these recipes bring out the best in every cut.",
  pork: "Comforting, versatile and loved by the whole family — pork shines in everything from sticky glazed fillets and crispy crackling roasts to fragrant stir-fries and slow-braised casseroles. Discover recipes that turn simple pork into something special.",
  spicy: "For those who like a little fire on the plate. From aromatic curries and sizzling baltis to punchy jalfrezi and rich masalas, these recipes bring warmth and depth to chicken, lamb, prawns and more — each one seasoned with care.",
  seafood: "Fresh from the water and onto your plate — seafood at its finest. Delicate pan-fried scallops, zesty prawn linguine, herb-crusted salmon and elegant crab terrines all feature in this collection of light, flavourful dishes.",
  pasta: "There's nothing quite like a bowl of perfectly cooked pasta dressed in a beautiful sauce. From rich lamb ragù with pappardelle to a simple garlic and chilli spaghetti, these recipes celebrate Italy's greatest gift to the kitchen.",
  lunch_suggestions: "Midday meals that go beyond the ordinary. Think warm baguettes with melting cheese, vibrant salads, loaded wraps and satisfying toasted sandwiches — all quick to prepare and perfect for refuelling.",
  sweets: "Life's too short to skip dessert. Indulge in velvety crème brûlée, light-as-air soufflés, buttery scones and decadent chocolate cakes — sweet treats crafted for every occasion and every craving.",
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
