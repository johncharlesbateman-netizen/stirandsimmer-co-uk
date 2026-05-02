import { Link } from "react-router-dom";
import { CalendarDays, ArrowRight } from "lucide-react";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Sample meals shown in the preview grid (illustrative only)
const previewMeals: Record<string, { lunch: string; dinner: string }> = {
  Mon: { lunch: "Halloumi salad", dinner: "Lemon chicken" },
  Tue: { lunch: "Tomato soup", dinner: "Beef ragu" },
  Wed: { lunch: "Pesto pasta", dinner: "Thai curry" },
  Thu: { lunch: "Chickpea bowl", dinner: "Sea bass" },
  Fri: { lunch: "Steak sandwich", dinner: "Pizza night" },
  Sat: { lunch: "Brunch eggs", dinner: "Sunday roast" },
  Sun: { lunch: "Leftovers", dinner: "Risotto" },
};

const MealPlannerPromo = () => {
  return (
    <section className="bg-planner text-planner-foreground relative overflow-hidden">
      {/* Decorative gradient */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, hsl(var(--planner-accent) / 0.6), transparent 55%), radial-gradient(circle at 80% 80%, hsl(var(--planner-accent) / 0.4), transparent 50%)",
        }}
      />

      <div className="relative container mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: copy + CTA */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-planner-foreground/10 backdrop-blur-sm border border-planner-foreground/20 mb-6">
              <CalendarDays className="w-3.5 h-3.5" />
              <span className="text-xs tracking-[0.2em] uppercase">New · Weekly Meal Planner</span>
            </div>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-6">
              Plan Your Week's Meals
            </h2>

            <p className="text-base md:text-lg text-planner-foreground/85 leading-relaxed max-w-xl mb-8">
              Take the stress out of weeknight cooking. Drag favourite recipes into a
              simple Mon–Sun grid, build your shopping list automatically, and sit
              down to dinner with a plan.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/meal-planner"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-planner-foreground text-planner text-sm tracking-wider uppercase font-medium hover:bg-planner-foreground/90 transition-all hover:gap-3"
              >
                Start Planning
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <span className="text-xs uppercase tracking-[0.2em] text-planner-foreground/70">
                Free · No sign-up needed
              </span>
            </div>
          </div>

          {/* Right: 7-day preview grid */}
          <div className="relative">
            <div className="absolute -inset-4 bg-planner-foreground/5 rounded-lg blur-2xl" aria-hidden />
            <div className="relative bg-planner-foreground/5 backdrop-blur-sm border border-planner-foreground/15 rounded-lg p-4 md:p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4 px-1">
                <p className="text-xs tracking-[0.2em] uppercase text-planner-foreground/70">
                  This Week
                </p>
                <p className="text-xs text-planner-foreground/60">Lunch · Dinner</p>
              </div>

              <div className="grid grid-cols-7 gap-1.5 md:gap-2">
                {days.map((day) => (
                  <div key={day} className="flex flex-col">
                    <div className="text-[10px] md:text-xs font-medium tracking-wider uppercase text-center text-planner-foreground/80 pb-1.5 border-b border-planner-foreground/15 mb-1.5">
                      {day}
                    </div>
                    <div className="space-y-1.5">
                      <div className="bg-planner-foreground/10 hover:bg-planner-foreground/15 transition-colors rounded p-1.5 md:p-2 min-h-[52px] md:min-h-[64px] flex items-center justify-center text-center">
                        <span className="text-[9px] md:text-[11px] leading-tight text-planner-foreground/90">
                          {previewMeals[day].lunch}
                        </span>
                      </div>
                      <div className="bg-planner-accent/30 hover:bg-planner-accent/40 transition-colors rounded p-1.5 md:p-2 min-h-[52px] md:min-h-[64px] flex items-center justify-center text-center">
                        <span className="text-[9px] md:text-[11px] leading-tight text-planner-foreground">
                          {previewMeals[day].dinner}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4 mt-4 px-1 text-[10px] tracking-wider uppercase text-planner-foreground/60">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-planner-foreground/15" />
                  Lunch
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-planner-accent/40" />
                  Dinner
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MealPlannerPromo;
