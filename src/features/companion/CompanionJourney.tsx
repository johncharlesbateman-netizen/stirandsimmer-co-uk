import { Check, Lock } from "lucide-react";
import { stats, tiers } from "./data";

const CompanionJourney = () => {
  const cooked = stats.cooked;

  return (
    <div className="px-6 pt-10">
      <p className="text-xs uppercase tracking-[0.25em] text-companion-muted">
        Your journey
      </p>
      <h1 className="mt-1 font-display text-3xl text-companion-fg">
        Always learning
      </h1>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <Stat label="Dishes cooked" value={stats.cooked} />
        <Stat label="Regions" value={stats.regions} />
        <Stat label="To discover" value={stats.toDiscover} />
      </div>

      <div className="mt-10 space-y-4">
        {tiers.map((tier) => {
          const unlocked = cooked >= tier.threshold;
          const current =
            unlocked &&
            (tiers.find((t) => t.threshold > tier.threshold && cooked >= t.threshold)
              ? false
              : true);
          return (
            <div
              key={tier.name}
              className={`rounded-2xl border p-5 transition-colors ${
                current
                  ? "border-companion-amber/50 bg-companion-amber/10"
                  : "border-white/5 bg-companion-surface"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-lg text-companion-fg">
                    {tier.name}
                  </h3>
                  <p className="mt-1 text-sm text-companion-muted">{tier.blurb}</p>
                  <p className="mt-3 text-xs uppercase tracking-[0.18em] text-companion-muted">
                    {tier.criteria}
                  </p>
                </div>
                <Badge
                  state={current ? "current" : unlocked ? "done" : "locked"}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Stat = ({ label, value }: { label: string; value: number }) => (
  <div className="rounded-2xl border border-white/5 bg-companion-surface p-4 text-center">
    <p className="font-display text-2xl text-companion-amber">{value}</p>
    <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-companion-muted">
      {label}
    </p>
  </div>
);

const Badge = ({ state }: { state: "current" | "done" | "locked" }) => {
  if (state === "current")
    return (
      <span className="rounded-full border border-companion-amber/60 bg-companion-amber/20 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-companion-amber">
        Current
      </span>
    );
  if (state === "done")
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-companion-muted">
        <Check className="h-3 w-3" /> Done
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-companion-muted">
      <Lock className="h-3 w-3" /> Locked
    </span>
  );
};

export default CompanionJourney;
