import { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Plus, X, Printer, Trash2, ExternalLink, Info } from "lucide-react";
import Layout from "@/components/Layout";
import RecipePickerDialog from "@/components/RecipePickerDialog";
import { mergeIngredients } from "@/lib/ingredientMerger";
import {
  estimateAllPrices,
  type SupermarketId,
} from "@/lib/supermarketPricing";

/* ── Types ────────────────────────────────────────────────── */

interface AssignedRecipe {
  id: string;
  title: string;
  slug: string;
  ingredients: string[];
  servings: number | null;
  image_url: string | null;
}

type MealType = "breakfast" | "lunch" | "dinner";

type WeekPlan = Record<string, Record<MealType, AssignedRecipe | null>>;

/* ── Constants ────────────────────────────────────────────── */

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const MEALS: { key: MealType; label: string }[] = [
  { key: "breakfast", label: "Breakfast" },
  { key: "lunch", label: "Lunch" },
  { key: "dinner", label: "Dinner" },
];

const SUPERMARKET_META: Record<SupermarketId, { name: string; logo: string; buildUrl: (t: string) => string }> = {
  aldi: { name: "Aldi", logo: "🔵", buildUrl: () => "https://www.aldi.co.uk" },
  lidl: { name: "Lidl", logo: "🟡", buildUrl: () => "https://www.lidl.co.uk" },
  asda: { name: "ASDA", logo: "🟢", buildUrl: (t) => `https://groceries.asda.com/search/${encodeURIComponent(t)}` },
  tesco: { name: "Tesco", logo: "🔴", buildUrl: (t) => `https://www.tesco.com/groceries/en-GB/search?query=${encodeURIComponent(t)}` },
  sainsburys: { name: "Sainsbury's", logo: "🟠", buildUrl: (t) => `https://www.sainsburys.co.uk/gol-ui/SearchResults/${encodeURIComponent(t)}` },
  ocado: { name: "Ocado", logo: "🟣", buildUrl: (t) => `https://www.ocado.com/search?entry=${encodeURIComponent(t)}` },
  waitrose: { name: "Waitrose", logo: "🟢", buildUrl: (t) => `https://www.waitrose.com/ecom/shop/search?&searchTerm=${encodeURIComponent(t)}` },
  morrisons: { name: "Morrisons", logo: "🟡", buildUrl: () => "https://groceries.morrisons.com" },
};

const emptyWeek = (): WeekPlan =>
  Object.fromEntries(DAYS.map((d) => [d, { breakfast: null, lunch: null, dinner: null }]));

/* ── Component ────────────────────────────────────────────── */

const MealPlanner = () => {
  const [plan, setPlan] = useState<WeekPlan>(emptyWeek);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerSlot, setPickerSlot] = useState<{ day: string; meal: MealType } | null>(null);

  /* Assign / remove recipes */
  const assignRecipe = useCallback((day: string, meal: MealType, recipe: AssignedRecipe) => {
    setPlan((prev) => ({
      ...prev,
      [day]: { ...prev[day], [meal]: recipe },
    }));
  }, []);

  const removeRecipe = useCallback((day: string, meal: MealType) => {
    setPlan((prev) => ({
      ...prev,
      [day]: { ...prev[day], [meal]: null },
    }));
  }, []);

  /* Gather all assigned recipes */
  const assignedRecipes = useMemo(() => {
    const list: AssignedRecipe[] = [];
    for (const day of DAYS) {
      for (const { key } of MEALS) {
        const r = plan[day][key];
        if (r) list.push(r);
      }
    }
    return list;
  }, [plan]);

  const hasRecipes = assignedRecipes.length > 0;

  /* Merged shopping list */
  const mergedIngredients = useMemo(
    () => (hasRecipes ? mergeIngredients(assignedRecipes.map((r) => r.ingredients)) : []),
    [assignedRecipes, hasRecipes]
  );

  /* Price comparison */
  const prices = useMemo(() => {
    if (mergedIngredients.length === 0) return null;
    return estimateAllPrices(mergedIngredients);
  }, [mergedIngredients]);

  const sortedMarkets = useMemo(() => {
    if (!prices) return [];
    return (Object.keys(prices) as SupermarketId[]).sort(
      (a, b) => prices[a].total - prices[b].total
    );
  }, [prices]);

  /* Print */
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const mealRows = DAYS.map((day) => {
      const slots = MEALS.map(({ key, label }) => {
        const r = plan[day][key];
        return `<td class="slot">${r ? `<span class="recipe-name">${r.title}</span>` : `<span class="empty">—</span>`}</td>`;
      }).join("");
      return `<tr><td class="day-cell">${day}</td>${slots}</tr>`;
    }).join("");

    const priceCards = prices && sortedMarkets.length > 0
      ? sortedMarkets.map((id, i) => {
          const m = SUPERMARKET_META[id];
          return `<div class="price-card${i === 0 ? " cheapest" : ""}">
            ${i === 0 ? '<div class="badge">Cheapest</div>' : ""}
            <div class="name">${m.name}</div>
            <div class="total">~£${prices[id].total.toFixed(2)}</div>
          </div>`;
        }).join("")
      : "";

    printWindow.document.write(`<!DOCTYPE html><html><head><title>Weekly Meal Plan</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:'DM Sans',system-ui,sans-serif;padding:2.5rem;color:#2b2b2b;max-width:900px;margin:0 auto}
        .logo{font-size:1.5rem;font-weight:600;letter-spacing:-0.02em;margin-bottom:0.25rem}
        .subtitle{font-size:1.1rem;color:#666;margin-bottom:1.5rem;padding-bottom:1rem;border-bottom:2px solid #e8e4df}
        .section-title{font-size:0.7rem;text-transform:uppercase;letter-spacing:0.1em;color:#888;margin:1.5rem 0 0.75rem}
        table{width:100%;border-collapse:collapse;font-size:0.85rem}
        th,td{border:1px solid #e8e4df;padding:0.5rem 0.6rem;text-align:left}
        th{background:#faf9f7;font-weight:600;font-size:0.7rem;text-transform:uppercase;letter-spacing:0.05em}
        .day-cell{font-weight:600;width:100px}
        .slot{min-width:120px}
        .recipe-name{font-weight:500}
        .empty{color:#bbb}
        ul{list-style:none;padding:0}
        li{padding:0.35rem 0;border-bottom:1px solid #f0ece7;font-size:0.85rem;display:flex;align-items:center;gap:0.5rem}
        li::before{content:"☐";color:#aaa}
        .prices-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:0.5rem;margin-top:0.75rem}
        .price-card{border:1px solid #e8e4df;padding:0.5rem;text-align:center}
        .price-card.cheapest{border-color:#2b2b2b;background:#faf9f7}
        .price-card .name{font-size:0.8rem;font-weight:600}
        .price-card .total{font-size:0.8rem;color:#666;margin-top:0.15rem}
        .price-card .badge{font-size:0.55rem;text-transform:uppercase;letter-spacing:0.08em;font-weight:600;color:#888;margin-bottom:0.15rem}
        .disclaimer{margin-top:1.5rem;padding-top:1rem;border-top:2px solid #e8e4df;font-size:0.75rem;color:#999;font-style:italic}
        @media print{body{padding:1.5rem}}
      </style></head><body>
      <div class="logo">Great Food Recipes</div>
      <div class="subtitle">Weekly Meal Plan</div>
      <table><thead><tr><th>Day</th><th>Breakfast</th><th>Lunch</th><th>Dinner</th></tr></thead>
      <tbody>${mealRows}</tbody></table>
      <div class="section-title">Shopping List · ${mergedIngredients.length} item${mergedIngredients.length !== 1 ? "s" : ""}</div>
      <ul>${mergedIngredients.map((item) => `<li>${item}</li>`).join("")}</ul>
      ${priceCards ? `<div class="section-title">Estimated Prices</div><div class="prices-grid">${priceCards}</div>` : ""}
      <div class="disclaimer">Prices are estimates — visit supermarket website for current prices.</div>
      </body></html>`);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <Layout>
      <Helmet>
        <title>Weekly Meal Planner | Great Food Recipes</title>
        <meta name="description" content="Plan your weekly meals with our interactive meal planner. Assign recipes to each day, generate a combined shopping list and compare prices across UK supermarkets." />
      </Helmet>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="micro-caption mb-2">Plan & Shop</p>
            <h1 className="heading-editorial">Weekly Meal Planner</h1>
          </div>
          {hasRecipes && (
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Printer className="w-4 h-4" />
                Print
              </button>
              <button
                onClick={() => setPlan(emptyWeek())}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear week
              </button>
            </div>
          )}
        </div>

        {/* 7-day grid */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-px bg-border border border-border mb-12">
          {DAYS.map((day) => (
            <div key={day} className="bg-background">
              <div className="p-3 border-b border-border bg-secondary">
                <p className="text-xs font-semibold tracking-wider uppercase text-center">{day}</p>
              </div>
              {MEALS.map(({ key, label }) => {
                const recipe = plan[day][key];
                return (
                  <div key={key} className="p-3 border-b border-border last:border-b-0 min-h-[90px] flex flex-col">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground/60 mb-1.5">{label}</p>
                    {recipe ? (
                      <div className="flex-1 flex flex-col">
                        <Link
                          to={`/recipes/${recipe.slug}`}
                          className="text-xs font-medium text-foreground hover:text-muted-foreground transition-colors line-clamp-2 mb-auto"
                        >
                          {recipe.title}
                        </Link>
                        <button
                          onClick={() => removeRecipe(day, key)}
                          className="self-end mt-1 p-0.5 text-muted-foreground/40 hover:text-foreground transition-colors"
                          aria-label="Remove recipe"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setPickerSlot({ day, meal: key });
                          setPickerOpen(true);
                        }}
                        className="flex-1 flex items-center justify-center text-muted-foreground/30 hover:text-muted-foreground/60 hover:bg-secondary/50 transition-colors"
                        aria-label={`Add ${label} for ${day}`}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Shopping list & price comparison */}
        {hasRecipes && mergedIngredients.length > 0 && (
          <section className="max-w-2xl">
            <p className="micro-caption mb-4">Combined Shopping List</p>
            <div className="p-5 bg-secondary border border-border">
              <p className="text-sm text-muted-foreground mb-4">
                {mergedIngredients.length} item{mergedIngredients.length !== 1 ? "s" : ""} from {assignedRecipes.length} recipe{assignedRecipes.length !== 1 ? "s" : ""}
              </p>
              <ul className="space-y-2 mb-6">
                {mergedIngredients.map((item, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-muted-foreground/40 mt-0.5">☐</span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Price comparison */}
              {prices && sortedMarkets.length > 0 && (
                <div className="pt-5 border-t border-border">
                  <div className="flex items-center gap-2 mb-4">
                    <p className="micro-caption">Price Estimates</p>
                    <div className="group relative">
                      <Info className="w-3.5 h-3.5 text-muted-foreground/60 cursor-help" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2.5 py-1.5 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                        Estimated prices · actual prices may vary
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
                    {sortedMarkets.map((id, i) => {
                      const m = SUPERMARKET_META[id];
                      const total = prices[id].total;
                      const isCheapest = i === 0;

                      return (
                        <button
                          key={id}
                          onClick={() => {
                            const term = mergedIngredients[0]
                              ?.replace(/^\d[\d./]*\s*/g, "")
                              .replace(/\b(g|kg|ml|l|tbsp|tsp|cup|cups|oz|lb)\b/gi, "")
                              .trim() || "groceries";
                            window.open(m.buildUrl(term), "_blank");
                          }}
                          title={["aldi", "lidl", "morrisons"].includes(id) ? `Search for your ingredients on ${m.name}'s website` : `Shop at ${m.name}`}
                          className={`relative flex flex-col items-center gap-1 p-3 border transition-colors text-center cursor-pointer ${
                            isCheapest
                              ? "border-foreground bg-secondary"
                              : "border-border hover:border-muted-foreground/40"
                          }`}
                        >
                          {isCheapest && (
                            <span className="absolute -top-2 right-2 text-[10px] font-semibold tracking-wider uppercase bg-background border border-border px-1.5 py-0.5 text-muted-foreground">
                              Cheapest
                            </span>
                          )}
                          <span className="text-lg">{m.logo}</span>
                          <span className="text-xs font-medium text-foreground">{m.name}</span>
                          <span className="text-xs text-muted-foreground">~£{total.toFixed(2)}</span>
                        </button>
                      );
                    })}
                  </div>

                  <p className="text-xs text-muted-foreground/60 mb-4">
                    Prices are estimates. Click a supermarket to check current prices.
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  Print meal plan & shopping list
                </button>
              </div>
            </div>
          </section>
        )}

        {!hasRecipes && (
          <div className="text-center py-16 border border-border bg-secondary">
            <p className="text-muted-foreground mb-2">Click the <Plus className="w-4 h-4 inline" /> button on any slot to start planning your week.</p>
            <p className="text-sm text-muted-foreground/60">
              Once you add recipes, a combined shopping list with price estimates will appear here.
            </p>
          </div>
        )}
      </div>

      {/* Recipe picker dialog */}
      <RecipePickerDialog
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={(recipe) => {
          if (pickerSlot) {
            assignRecipe(pickerSlot.day, pickerSlot.meal, recipe);
          }
        }}
        dayLabel={pickerSlot?.day || ""}
        mealLabel={MEALS.find((m) => m.key === pickerSlot?.meal)?.label || ""}
      />
    </Layout>
  );
};

export default MealPlanner;
