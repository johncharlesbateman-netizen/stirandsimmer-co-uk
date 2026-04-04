import { useState, useMemo } from "react";
import { ExternalLink, Info } from "lucide-react";
import {
  estimateAllPrices,
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
    id: "asda",
    name: "ASDA",
    colour: "hsl(120, 61%, 38%)",
    logo: "🟢",
    buildUrl: (items) =>
      `https://groceries.asda.com/search/${encodeURIComponent(items[0] || "")}`,
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
    id: "ocado",
    name: "Ocado",
    colour: "hsl(267, 56%, 48%)",
    logo: "🟣",
    buildUrl: (items) =>
      `https://www.ocado.com/webshop/getSearchProducts.do?entry=${encodeURIComponent(items.join(", "))}`,
  },
];

const SupermarketBasket = ({ checkedItems }: SupermarketBasketProps) => {
  const [selected, setSelected] = useState<SupermarketId>("asda");

  const prices = useMemo(() => {
    if (checkedItems.length === 0) return null;
    return estimateAllPrices(checkedItems);
  }, [checkedItems]);

  if (checkedItems.length === 0 || !prices) return null;

  const activeMarket = supermarkets.find((s) => s.id === selected)!;
  const activePrices = prices[selected];

  // Sort supermarkets by total to highlight cheapest
  const sortedMarkets = [...supermarkets].sort(
    (a, b) => prices[a.id].total - prices[b.id].total
  );
  const cheapestId = sortedMarkets[0].id;

  return (
    <div className="mt-6 pt-6 border-t border-border">
      <div className="flex items-center gap-2 mb-4">
        <p className="micro-caption">Price Estimates</p>
        <div className="group relative">
          <Info className="w-3.5 h-3.5 text-muted-foreground/60 cursor-help" />
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2.5 py-1.5 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
            Estimated prices · actual prices may vary
          </div>
        </div>
      </div>

      {/* Supermarket cards — sorted cheapest first */}
      <div className="grid grid-cols-2 gap-2 mb-2">
        {sortedMarkets.map((market) => {
          const isActive = market.id === selected;
          const total = prices[market.id].total;
          const isCheapest = market.id === cheapestId;

          return (
            <a
              key={market.id}
              href={market.buildUrl(checkedItems)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                setSelected(market.id);
                window.open(market.buildUrl(checkedItems), "_blank");
              }}
              className={`relative flex flex-col items-center gap-1 p-3 border transition-colors text-center cursor-pointer ${
                isActive
                  ? "border-foreground bg-secondary"
                  : "border-border hover:border-muted-foreground/40"
              }`}
            >
              {isCheapest && (
                <span className="absolute -top-2 right-2 text-[10px] font-semibold tracking-wider uppercase bg-background border border-border px-1.5 py-0.5 text-muted-foreground">
                  Cheapest
                </span>
              )}
              <span className="text-lg">{market.logo}</span>
              <span className="text-xs font-medium text-foreground">{market.name}</span>
              <span className="text-xs text-muted-foreground">
                ~£{total.toFixed(2)}
              </span>
            </a>
          );
        })}
      </div>
      <p className="text-xs text-muted-foreground/60 mb-4">
        Prices are estimates. Click a supermarket to check current prices.
      </p>

      {/* Per-ingredient price breakdown */}
      <ul className="space-y-1.5 mb-4">
        {activePrices.items.map((item, i) => (
          <li
            key={i}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-muted-foreground truncate mr-2">
              {item.productName}
            </span>
            <span className="font-medium text-foreground whitespace-nowrap">
              ~£{item.price.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>

      {/* Summary + CTA */}
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {checkedItems.length} item{checkedItems.length !== 1 ? "s" : ""}
          {" · "}
          <span className="font-medium text-foreground">
            ~£{activePrices.total.toFixed(2)}
          </span>
          <span className="text-xs ml-1">(est.)</span>
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
