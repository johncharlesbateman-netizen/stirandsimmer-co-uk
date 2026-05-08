import { ChevronRight } from "lucide-react";

const rows = [
  { label: "Cooking time", value: "Up to 45 min" },
  { label: "Spice level", value: "Medium" },
  { label: "Dietary notes", value: "Pescatarian" },
  { label: "Saved recipes", value: "12" },
  { label: "Cook log", value: "8 dishes" },
];

const CompanionProfile = () => {
  return (
    <div className="px-6 pt-10">
      <div className="flex flex-col items-center text-center">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-companion-amber/30 blur-2xl" />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-companion-amber/40 bg-companion-surface text-4xl">
            🧑‍🍳
          </div>
        </div>
        <h1 className="mt-5 font-display text-2xl text-companion-fg">Alex</h1>
        <p className="mt-1 text-xs uppercase tracking-[0.25em] text-companion-amber">
          Confident Cook
        </p>
      </div>

      <ul className="mt-10 divide-y divide-white/5 rounded-2xl border border-white/5 bg-companion-surface">
        {rows.map((row) => (
          <li key={row.label}>
            <button
              type="button"
              className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-white/5"
            >
              <span className="text-sm text-companion-fg">{row.label}</span>
              <span className="flex items-center gap-2 text-sm text-companion-muted">
                {row.value}
                <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanionProfile;
