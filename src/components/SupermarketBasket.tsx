import { useState, useEffect, useRef } from "react";
import { ExternalLink, Loader2 } from "lucide-react";
import {
  fetchAllPrices,
  type SupermarketId,
  type SupermarketPrices,
} from "@/lib/supermarketPricing";

interface SupermarketBasketProps {
  checkedItems: string[];
}

interface Supermarket {
  id: SupermarketId;
  name: string;
  colour: string;
  logo: string;
  buildUrl: (items: string[]) => string;
}

const supermarkets: Supermarket[] = [
  {
    id: "ocado",
    name: "Ocado",
    colour: "hsl(267, 56%, 48%)",
    logo: "🟣",
    buildUrl: (items) =>
      `https://www.ocado.com/webshop/getSearchProducts.do?entry=${encodeURIComponent(items.join(", "))}`,
  },
  {
    id: "tesco",
    name: "Tesco",
    colour: "hsl(0, 68%, 42%)",
    logo: "🔴",
    buildUrl: (items) =>
      `https://www.tesco.com/groceries/en-GB/search?query=${encodeURIComponent(items[0] || "")}`,
  },
  {
    id: "sainsburys",
    name: "Sainsbury's",
    colour: "hsl(24, 100%, 50%)",
    logo: "🟠",
    buildUrl: (items) =>
      `https://www.sainsburys.co.uk/gol-ui/SearchResults/${encodeURIComponent(items[0] || "")}`,
  },
  {
    id: "asda",
    name: "ASDA",
    colour: "hsl(120, 61%, 38%)",
    logo: "🟢",
    buildUrl: (items) =>
      `https://groceries.asda.com/search/${encodeURIComponent(items[0] || "")}`,
  },
];

const SupermarketBasket = ({ checkedItems }: SupermarketBasketProps) => {
  const [selected, setSelected] = useState<SupermarketId>("ocado");
  const [loading, setLoading] = useState(false);
  const [prices, setPrices] = useState<Record<SupermarketId, SupermarketPrices> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const prevItemsRef = useRef<string>("");

  // Fetch live prices when checked items change
  useEffect(() => {
    const key = checkedItems.slice().sort().join("|");
    if (key === prevItemsRef.current || checkedItems.length === 0) {
      if (checkedItems.length === 0) {
        setPrices(null);
        setError(null);
      }
      return;
    }
    prevItemsRef.current = key;

    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchAllPrices(checkedItems)
      .then((result) => {
        if (!cancelled) {
          setPrices(result);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("Couldn't fetch live prices. Showing estimates instead.");
          setPrices(null);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [checkedItems]);

  if (checkedItems.length === 0) return null;

  const activeMarket = supermarkets.find((s) => s.id === selected)!;
  const activePrices = prices?.[selected];

  return (
    <div className="mt-6 pt-6 border-t border-border">
      <p className="micro-caption mb-4">Shop these ingredients</p>

      {/* Supermarket cards */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {supermarkets.map((market) => {
          const isActive = market.id === selected;
          const marketPrices = prices?.[market.id];
          const total = marketPrices
            ? `£${marketPrices.total.toFixed(2)}`
            : loading
              ? "…"
              : "—";

          return (
            <button
              key={market.id}
              onClick={() => setSelected(market.id)}
              className={`flex flex-col items-center gap-1 p-3 border transition-colors text-center ${
                isActive
                  ? "border-foreground bg-secondary"
                  : "border-border hover:border-muted-foreground/40"
              }`}
            >
              <span className="text-lg">{market.logo}</span>
              <span className="text-xs font-medium text-foreground">{market.name}</span>
              <span className="text-xs text-muted-foreground">
                {loading ? (
                  <Loader2 className="w-3 h-3 animate-spin inline" />
                ) : (
                  total
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* Per-ingredient price breakdown */}
      {loading && (
        <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" />
          Fetching live prices…
        </div>
      )}

      {error && (
        <p className="text-xs text-muted-foreground mb-4">{error}</p>
      )}

      {activePrices && !loading && (
        <ul className="space-y-1.5 mb-4">
          {activePrices.items.map((item, i) => (
            <li
              key={i}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-muted-foreground truncate mr-2">
                {item.productName ?? item.ingredient}
              </span>
              <span className="font-medium text-foreground whitespace-nowrap">
                {item.price !== null ? `£${item.price.toFixed(2)}` : "n/a"}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Summary + CTA */}
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {checkedItems.length} item{checkedItems.length !== 1 ? "s" : ""}
          {activePrices && !loading && (
            <>
              {" · "}
              <span className="font-medium text-foreground">
                £{activePrices.total.toFixed(2)}
              </span>
            </>
          )}
        </p>
        <a
          href={activeMarket.buildUrl(checkedItems)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
        >
          Open {activeMarket.name}
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};

export default SupermarketBasket;
