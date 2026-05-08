import { ChevronRight } from "lucide-react";
import { regions } from "./data";

const CompanionExplore = () => {
  return (
    <div className="px-6 pt-10">
      <p className="text-xs uppercase tracking-[0.25em] text-companion-muted">
        Discover
      </p>
      <h1 className="mt-1 font-display text-3xl text-companion-fg">
        World cuisines
      </h1>
      <p className="mt-2 text-sm text-companion-muted">
        Wander through regions and find your next meal.
      </p>

      <ul className="mt-8 divide-y divide-white/5 rounded-2xl border border-white/5 bg-companion-surface">
        {regions.map((region) => (
          <li key={region.id}>
            <button
              type="button"
              className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-white/5"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">{region.flag}</span>
                <div>
                  <p className="text-sm text-companion-fg">{region.name}</p>
                  <p className="text-xs text-companion-muted">
                    {region.count} recipes
                  </p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-companion-muted" strokeWidth={1.5} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanionExplore;
