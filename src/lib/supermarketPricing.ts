export type SupermarketId = "ocado" | "tesco" | "sainsburys" | "asda";

export interface PriceResult {
  ingredient: string;
  productName: string | null;
  price: number | null;
  error?: string;
}

export interface SupermarketPrices {
  supermarketId: SupermarketId;
  items: PriceResult[];
  total: number;
}

/**
 * Fetch prices for all ingredients across all four supermarkets
 * via the secure edge function proxy.
 */
export async function fetchAllPrices(
  ingredients: string[]
): Promise<Record<SupermarketId, SupermarketPrices>> {
  const supermarkets: SupermarketId[] = ["tesco", "sainsburys", "asda", "ocado"];
  const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;

  const response = await fetch(
    `https://${projectId}.supabase.co/functions/v1/supermarket-prices`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients, supermarkets }),
    }
  );

  if (!response.ok) {
    throw new Error(`Edge function returned ${response.status}`);
  }

  return response.json();
}
