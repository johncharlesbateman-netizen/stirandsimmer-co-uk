const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const RAPIDAPI_HOST = "uk-supermarkets-product-pricing.p.rapidapi.com";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const rapidApiKey = Deno.env.get("RAPIDAPI_KEY");
  if (!rapidApiKey) {
    return new Response(
      JSON.stringify({ error: "RAPIDAPI_KEY not configured" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const { ingredients, supermarkets } = await req.json();

    if (!Array.isArray(ingredients) || !Array.isArray(supermarkets)) {
      return new Response(
        JSON.stringify({ error: "ingredients and supermarkets must be arrays" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const results: Record<string, { supermarketId: string; items: any[]; total: number }> = {};

    await Promise.all(
      supermarkets.map(async (sid: string) => {
        const items = await Promise.all(
          ingredients.map(async (ingredient: string) => {
            try {
              const res = await fetch(
                `https://${RAPIDAPI_HOST}/products?query=${encodeURIComponent(ingredient)}&supermarket=${sid}`,
                {
                  headers: {
                    "x-rapidapi-key": rapidApiKey,
                    "x-rapidapi-host": RAPIDAPI_HOST,
                  },
                }
              );

              if (!res.ok) {
                const body = await res.text();
                console.error(`API ${res.status} for ${ingredient}@${sid}: ${body}`);
                return { ingredient, productName: null, price: null, error: `API ${res.status}` };
              }

              const data = await res.json();
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
            } catch (err) {
              return { ingredient, productName: null, price: null, error: String(err) };
            }
          })
        );

        const total = items.reduce((sum: number, item: any) => sum + (item.price ?? 0), 0);
        results[sid] = { supermarketId: sid, items, total };
      })
    );

    return new Response(JSON.stringify(results), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
