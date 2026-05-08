import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronUp, Clock, Flame, ChefHat } from "lucide-react";
import { companionRecipes } from "./data";

const CompanionHome = () => {
  const [open, setOpen] = useState(false);
  const featured = companionRecipes[0];

  return (
    <div className="relative min-h-[calc(100vh-5.5rem)] overflow-hidden">
      <header className="px-6 pt-10">
        <p className="text-xs uppercase tracking-[0.25em] text-companion-muted">
          Good evening
        </p>
        <h1 className="mt-1 font-display text-2xl text-companion-fg">
          Tonight's dish awaits
        </h1>
      </header>

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="absolute inset-0 flex flex-col items-center justify-center"
        aria-label="Reveal tonight's dish"
      >
        <div className="relative flex items-center justify-center">
          <div className="absolute h-72 w-72 rounded-full bg-companion-amber/25 blur-3xl" />
          <div className="absolute h-48 w-48 rounded-full bg-companion-amber/40 blur-2xl" />
          <span className="relative text-[9rem] leading-none drop-shadow-[0_0_40px_rgba(180,83,9,0.6)]">
            {featured.emoji}
          </span>
        </div>
        <div className="mt-16 flex flex-col items-center gap-2 text-companion-muted">
          <ChevronUp className="h-4 w-4 animate-bounce" strokeWidth={1.5} />
          <span className="text-xs uppercase tracking-[0.3em]">Tap to reveal</span>
        </div>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 mx-auto max-w-md transform rounded-t-3xl border-t border-white/5 bg-companion-surface px-6 pb-28 pt-6 transition-transform duration-500 ease-out ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-white/15" />
        <div className="flex items-start gap-4">
          <span className="text-5xl">{featured.emoji}</span>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-companion-amber">
              {featured.region}
            </p>
            <h2 className="mt-1 font-display text-2xl text-companion-fg">
              {featured.name}
            </h2>
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-companion-muted">
          {featured.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Tag icon={<Clock className="h-3 w-3" />} label={featured.time} />
          <Tag icon={<Flame className="h-3 w-3" />} label={featured.spice} />
          <Tag icon={<ChefHat className="h-3 w-3" />} label={featured.difficulty} />
        </div>
        <div className="mt-6 space-y-3">
          <Link
            to={`/app/recipe/${featured.id}`}
            className="block w-full rounded-xl bg-companion-amber px-4 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-companion-amber-soft"
          >
            Start cooking
          </Link>
          <Link
            to="/app/explore"
            className="block w-full rounded-xl border border-white/10 px-4 py-3 text-center text-sm text-companion-fg hover:border-companion-amber/40"
          >
            Explore all recipes
          </Link>
        </div>
      </div>
    </div>
  );
};

const Tag = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-companion-fg/80">
    {icon}
    {label}
  </span>
);

export default CompanionHome;
