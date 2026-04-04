import { useState, useMemo } from "react";
import { ExternalLink } from "lucide-react";

interface SupermarketBasketProps {
  checkedItems: string[];
}

interface Supermarket {
  id: string;
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

/** Rough placeholder prices (£) per common ingredient keyword */
const estimateItemPrice = (item: string): number => {
  const lower = item.toLowerCase();
  if (lower.includes("chicken") || lower.includes("beef") || lower.includes("lamb") || lower.includes("pork") || lower.includes("prawn") || lower.includes("salmon") || lower.includes("scallop"))
    return 3.5;
  if (lower.includes("cheese") || lower.includes("cream") || lower.includes("butter") || lower.includes("yoghurt"))
    return 2.0;
  if (lower.includes("pasta") || lower.includes("rice") || lower.includes("noodle") || lower.includes("bread") || lower.includes("flour"))
    return 1.2;
  if (lower.includes("oil") || lower.includes("vinegar") || lower.includes("sauce") || lower.includes("stock"))
    return 1.8;
  if (lower.includes("wine") || lower.includes("beer") || lower.includes("cider"))
    return 4.0;
  if (lower.includes("spice") || lower.includes("cumin") || lower.includes("paprika") || lower.includes("turmeric") || lower.includes("cinnamon") || lower.includes("chilli"))
    return 1.0;
  if (lower.includes("herb") || lower.includes("basil") || lower.includes("parsley") || lower.includes("coriander") || lower.includes("thyme") || lower.includes("rosemary"))
    return 0.8;
  if (lower.includes("egg"))
    return 2.2;
  if (lower.includes("milk"))
    return 1.3;
  return 0.9; // generic veg / misc
};

/** Small per-supermarket price modifier so estimates differ slightly */
const priceModifiers: Record<string, number> = {
  ocado: 1.12,
  tesco: 1.0,
  sainsburys: 1.05,
  asda: 0.95,
};

const SupermarketBasket = ({ checkedItems }: SupermarketBasketProps) => {
  const [selected, setSelected] = useState<string>("ocado");

  const baseTotal = useMemo(
    () => checkedItems.reduce((sum, item) => sum + estimateItemPrice(item), 0),
    [checkedItems],
  );

  if (checkedItems.length === 0) return null;

  const activeMarket = supermarkets.find((s) => s.id === selected)!;
  const estimatedTotal = (baseTotal * (priceModifiers[selected] ?? 1)).toFixed(2);

  return (
    <div className="mt-6 pt-6 border-t border-border">
      <p className="micro-caption mb-4">Shop these ingredients</p>

      {/* Supermarket cards */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {supermarkets.map((market) => {
          const isActive = market.id === selected;
          const est = (baseTotal * (priceModifiers[market.id] ?? 1)).toFixed(2);
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
              <span className="text-xs text-muted-foreground">≈ £{est}</span>
            </button>
          );
        })}
      </div>

      {/* Summary + CTA */}
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {checkedItems.length} item{checkedItems.length !== 1 ? "s" : ""} · est.{" "}
          <span className="font-medium text-foreground">£{estimatedTotal}</span>
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
