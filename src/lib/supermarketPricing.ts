const RAPIDAPI_KEY = "135d78fd63msha7a0fd5ebd47d41p1560b0jsnaac18f3c3037";
const RAPIDAPI_HOST = "uk-supermarkets-product-pricing.p.rapidapi.com";

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

const supermarketQueryMap: Record<SupermarketId, string> = {
  tesco: "tesco",
  sainsburys: "sainsburys",
  asda: "asda",
  ocado: "ocado",
};

/**
 * Search for a single ingredient at a single supermarket via RapidAPI.
 * Adjust the endpoint path / params once you confirm the exact API spec.
 */
async function fetchPrice(
  ingredient: string,
  supermarket: SupermarketId
): Promise<PriceResult> {
  try {
    const response = await fetch(
      `https://${RAPIDAPI_HOST}/products?query=${encodeURIComponent(ingredient)}&supermarket=${supermarketQueryMap[supermarket]}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": RAPIDAPI_KEY,
          "x-rapidapi-host": RAPIDAPI_HOST,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();

    // Adapt this parsing to match the actual API response shape
    const product = Array.isArray(data?.products)
      ? data.products[0]
      : Array.isArray(data)
        ? data[0]
        : null;

    if (product) {
      const price =
        typeof product.price === "number"
          ? product.price
          : parseFloat(product.price ?? product.unit_price ?? "0");

      return {
        ingredient,
        productName: product.name ?? product.title ?? ingredient,
        price: isNaN(price) ? null : price,
      };
    }

    return { ingredient, productName: null, price: null, error: "No results" };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { ingredient, productName: null, price: null, error: message };
  }
}

/**
 * Fetch prices for all ingredients across all four supermarkets.
 * Returns a map keyed by supermarket ID.
 */
export async function fetchAllPrices(
  ingredients: string[]
): Promise<Record<SupermarketId, SupermarketPrices>> {
  const supermarkets: SupermarketId[] = ["tesco", "sainsburys", "asda", "ocado"];

  const results: Record<SupermarketId, SupermarketPrices> = {} as Record<
    SupermarketId,
    SupermarketPrices
  >;

  // Fire all requests in parallel
  const promises = supermarkets.map(async (sid) => {
    const items = await Promise.all(
      ingredients.map((ing) => fetchPrice(ing, sid))
    );
    const total = items.reduce((sum, item) => sum + (item.price ?? 0), 0);
    results[sid] = { supermarketId: sid, items, total };
  });

  await Promise.all(promises);

  return results;
}
