export type SupermarketId = "tesco" | "sainsburys" | "asda" | "ocado";

export interface PriceResult {
  ingredient: string;
  productName: string;
  price: number;
}

export interface SupermarketPrices {
  supermarketId: SupermarketId;
  items: PriceResult[];
  total: number;
}

/**
 * Keyword-based price lookup table for common UK grocery ingredients.
 * Prices are rough 2025 averages in GBP, with slight per-supermarket variance.
 * Order matters — first match wins, so put specific terms before generic ones.
 */
const PRICE_RULES: { keywords: string[]; base: number; label: string }[] = [
  // Proteins
  { keywords: ["chicken breast"], base: 3.80, label: "Chicken breast fillets" },
  { keywords: ["chicken thigh"], base: 2.90, label: "Chicken thighs" },
  { keywords: ["chicken wing"], base: 2.50, label: "Chicken wings" },
  { keywords: ["chicken drum"], base: 2.20, label: "Chicken drumsticks" },
  { keywords: ["whole chicken", "roasting chicken"], base: 4.50, label: "Whole chicken" },
  { keywords: ["chicken"], base: 3.50, label: "Chicken pieces" },
  { keywords: ["minced beef", "beef mince"], base: 3.50, label: "Beef mince 500g" },
  { keywords: ["stewing beef", "beef stew", "braising"], base: 4.50, label: "Stewing beef" },
  { keywords: ["sirloin", "steak"], base: 6.00, label: "Sirloin steak" },
  { keywords: ["beef"], base: 4.00, label: "Beef" },
  { keywords: ["lamb chop"], base: 5.50, label: "Lamb chops" },
  { keywords: ["lamb mince"], base: 4.00, label: "Lamb mince 500g" },
  { keywords: ["lamb shoulder", "lamb leg"], base: 7.00, label: "Lamb joint" },
  { keywords: ["lamb"], base: 5.00, label: "Lamb" },
  { keywords: ["pork chop"], base: 3.20, label: "Pork chops" },
  { keywords: ["pork belly"], base: 4.00, label: "Pork belly" },
  { keywords: ["pork mince"], base: 2.80, label: "Pork mince 500g" },
  { keywords: ["sausage"], base: 2.50, label: "Sausages" },
  { keywords: ["bacon"], base: 2.80, label: "Bacon rashers" },
  { keywords: ["pork"], base: 3.50, label: "Pork" },
  { keywords: ["salmon fillet", "salmon"], base: 4.50, label: "Salmon fillets" },
  { keywords: ["cod"], base: 4.00, label: "Cod fillets" },
  { keywords: ["prawn", "shrimp"], base: 3.80, label: "Prawns" },
  { keywords: ["tuna"], base: 1.20, label: "Tuna tin" },
  { keywords: ["fish"], base: 3.50, label: "Fish" },
  { keywords: ["tofu"], base: 2.00, label: "Tofu" },

  // Dairy & eggs
  { keywords: ["egg"], base: 2.30, label: "Free-range eggs (box)" },
  { keywords: ["cheddar"], base: 2.80, label: "Cheddar cheese" },
  { keywords: ["parmesan"], base: 2.50, label: "Parmesan" },
  { keywords: ["mozzarella"], base: 1.20, label: "Mozzarella" },
  { keywords: ["cheese"], base: 2.50, label: "Cheese" },
  { keywords: ["double cream"], base: 1.60, label: "Double cream" },
  { keywords: ["single cream", "cream"], base: 1.30, label: "Single cream" },
  { keywords: ["yoghurt", "yogurt"], base: 1.20, label: "Yoghurt" },
  { keywords: ["butter"], base: 2.00, label: "Butter 250g" },
  { keywords: ["milk"], base: 1.35, label: "Milk 2 pints" },

  // Carbs & grains
  { keywords: ["pasta", "spaghetti", "penne", "fusilli", "linguine", "tagliatelle"], base: 1.00, label: "Pasta 500g" },
  { keywords: ["rice"], base: 1.50, label: "Rice 1kg" },
  { keywords: ["bread"], base: 1.20, label: "Bread loaf" },
  { keywords: ["flour"], base: 1.10, label: "Plain flour 1kg" },
  { keywords: ["noodle"], base: 1.00, label: "Noodles" },
  { keywords: ["couscous"], base: 1.20, label: "Couscous" },
  { keywords: ["potato", "potatoes"], base: 1.50, label: "Potatoes 2kg" },

  // Vegetables
  { keywords: ["onion"], base: 0.80, label: "Onions" },
  { keywords: ["garlic"], base: 0.50, label: "Garlic bulb" },
  { keywords: ["ginger"], base: 0.70, label: "Fresh ginger" },
  { keywords: ["tomato", "tomatoes"], base: 0.90, label: "Tomatoes" },
  { keywords: ["chopped tomatoes", "tinned tomatoes", "canned tomatoes"], base: 0.65, label: "Chopped tomatoes tin" },
  { keywords: ["tomato paste", "tomato purée", "tomato puree"], base: 0.75, label: "Tomato purée" },
  { keywords: ["pepper", "bell pepper"], base: 0.70, label: "Peppers" },
  { keywords: ["chilli", "chili"], base: 0.50, label: "Chillies" },
  { keywords: ["carrot"], base: 0.60, label: "Carrots" },
  { keywords: ["celery"], base: 0.80, label: "Celery" },
  { keywords: ["broccoli"], base: 0.85, label: "Broccoli" },
  { keywords: ["spinach"], base: 1.00, label: "Spinach" },
  { keywords: ["courgette", "zucchini"], base: 0.65, label: "Courgette" },
  { keywords: ["aubergine", "eggplant"], base: 0.85, label: "Aubergine" },
  { keywords: ["mushroom"], base: 0.90, label: "Mushrooms" },
  { keywords: ["leek"], base: 0.80, label: "Leeks" },
  { keywords: ["sweet potato"], base: 1.20, label: "Sweet potatoes" },
  { keywords: ["avocado"], base: 1.00, label: "Avocado" },
  { keywords: ["lettuce"], base: 0.70, label: "Lettuce" },
  { keywords: ["cucumber"], base: 0.55, label: "Cucumber" },
  { keywords: ["spring onion"], base: 0.65, label: "Spring onions" },
  { keywords: ["corn", "sweetcorn"], base: 0.80, label: "Sweetcorn" },
  { keywords: ["peas", "frozen peas"], base: 1.00, label: "Peas" },
  { keywords: ["green bean", "french bean"], base: 1.20, label: "Green beans" },

  // Fruit
  { keywords: ["lemon"], base: 0.35, label: "Lemon" },
  { keywords: ["lime"], base: 0.30, label: "Lime" },
  { keywords: ["banana"], base: 0.75, label: "Bananas bunch" },
  { keywords: ["apple"], base: 0.30, label: "Apples" },
  { keywords: ["orange"], base: 0.40, label: "Orange" },

  // Herbs, spices & seasonings
  { keywords: ["cumin"], base: 1.20, label: "Cumin" },
  { keywords: ["coriander"], base: 0.70, label: "Coriander" },
  { keywords: ["paprika"], base: 1.20, label: "Paprika" },
  { keywords: ["turmeric"], base: 1.20, label: "Turmeric" },
  { keywords: ["cinnamon"], base: 1.20, label: "Cinnamon" },
  { keywords: ["oregano"], base: 1.00, label: "Oregano" },
  { keywords: ["thyme"], base: 0.80, label: "Fresh thyme" },
  { keywords: ["rosemary"], base: 0.80, label: "Fresh rosemary" },
  { keywords: ["basil"], base: 0.80, label: "Fresh basil" },
  { keywords: ["parsley"], base: 0.70, label: "Fresh parsley" },
  { keywords: ["bay lea"], base: 0.90, label: "Bay leaves" },
  { keywords: ["salt"], base: 0.70, label: "Salt" },
  { keywords: ["pepper", "black pepper"], base: 1.00, label: "Black pepper" },
  { keywords: ["chilli flakes", "chili flakes", "red pepper flakes"], base: 1.10, label: "Chilli flakes" },

  // Oils, sauces & condiments
  { keywords: ["olive oil"], base: 3.50, label: "Olive oil" },
  { keywords: ["vegetable oil", "sunflower oil", "oil"], base: 2.00, label: "Cooking oil" },
  { keywords: ["soy sauce"], base: 1.50, label: "Soy sauce" },
  { keywords: ["fish sauce"], base: 1.80, label: "Fish sauce" },
  { keywords: ["worcestershire"], base: 1.50, label: "Worcestershire sauce" },
  { keywords: ["vinegar"], base: 1.20, label: "Vinegar" },
  { keywords: ["honey"], base: 2.50, label: "Honey" },
  { keywords: ["mustard"], base: 1.30, label: "Mustard" },
  { keywords: ["ketchup"], base: 1.50, label: "Ketchup" },
  { keywords: ["mayonnaise", "mayo"], base: 1.80, label: "Mayonnaise" },
  { keywords: ["stock cube", "stock pot", "stock"], base: 1.20, label: "Stock cubes" },

  // Baking & pantry
  { keywords: ["sugar"], base: 1.00, label: "Sugar 1kg" },
  { keywords: ["baking powder"], base: 1.00, label: "Baking powder" },
  { keywords: ["bicarbonate", "baking soda"], base: 0.90, label: "Bicarbonate of soda" },
  { keywords: ["cocoa"], base: 2.00, label: "Cocoa powder" },
  { keywords: ["chocolate"], base: 2.00, label: "Chocolate bar" },
  { keywords: ["vanilla"], base: 2.80, label: "Vanilla extract" },
  { keywords: ["coconut milk"], base: 1.20, label: "Coconut milk tin" },
  { keywords: ["passata"], base: 0.90, label: "Passata" },
  { keywords: ["chickpea"], base: 0.70, label: "Chickpeas tin" },
  { keywords: ["lentil"], base: 0.80, label: "Lentils" },
  { keywords: ["kidney bean", "black bean", "bean"], base: 0.70, label: "Beans tin" },
];

/** Per-supermarket multiplier to simulate slight price variation */
const SUPERMARKET_MULTIPLIER: Record<SupermarketId, number> = {
  asda: 0.95,
  tesco: 1.00,
  sainsburys: 1.04,
  ocado: 1.08,
};

function estimateIngredientPrice(
  ingredient: string,
  supermarket: SupermarketId
): PriceResult {
  const lower = ingredient.toLowerCase();
  for (const rule of PRICE_RULES) {
    if (rule.keywords.some((kw) => lower.includes(kw))) {
      const price = +(rule.base * SUPERMARKET_MULTIPLIER[supermarket]).toFixed(2);
      return { ingredient, productName: rule.label, price };
    }
  }
  // Fallback: assign a modest average price
  return { ingredient, productName: ingredient, price: +(1.50 * SUPERMARKET_MULTIPLIER[supermarket]).toFixed(2) };
}

/**
 * Generate estimated prices for all ingredients across four supermarkets.
 * Runs entirely client-side — no API calls.
 */
export function estimateAllPrices(
  ingredients: string[]
): Record<SupermarketId, SupermarketPrices> {
  const supermarkets: SupermarketId[] = ["tesco", "sainsburys", "asda", "ocado"];
  const results = {} as Record<SupermarketId, SupermarketPrices>;

  for (const sid of supermarkets) {
    const items = ingredients.map((ing) => estimateIngredientPrice(ing, sid));
    const total = items.reduce((sum, item) => sum + item.price, 0);
    results[sid] = { supermarketId: sid, items, total: +total.toFixed(2) };
  }

  return results;
}
