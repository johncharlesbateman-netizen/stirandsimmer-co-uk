import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronUp } from "lucide-react";
import { companionRecipes } from "./data";

const CompanionHome = () => {
  const [open, setOpen] = useState(false);
  const featured = companionRecipes[0];

  return (
    <div className="relative min-h-[calc(100vh-5.5rem)] overflow-hidden bg-[#0d0d0d]">
      <header className="relative z-10 px-6 pt-12 text-center">
        <p className="text-[10px] tracking-[0.25em] text-white/30">
          Good evening, John
        </p>
      </header>

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="absolute inset-0 flex flex-col items-center justify-center"
        aria-label="Reveal tonight's dish"
      >
        <div className="relative flex items-center justify-center">
          <div
            className="absolute h-[34rem] w-[34rem] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(217,119,6,0.35) 0%, rgba(180,83,9,0.15) 35%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <div
            className="absolute h-72 w-72 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(217,119,6,0.55) 0%, transparent 70%)",
              filter: "blur(30px)",
            }}
          />
          <span className="relative text-[12rem] leading-none drop-shadow-[0_0_60px_rgba(180,83,9,0.7)]">
            {featured.emoji}
          </span>
        </div>
        <div className="mt-24 flex flex-col items-center gap-2 text-white/35">
          <ChevronUp className="h-4 w-4 animate-bounce" strokeWidth={1.5} />
          <span className="text-[10px] tracking-[0.25em]">
            tap to reveal tonight's dish
          </span>
        </div>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-500"
          onClick={() => setOpen(false)}
        />
      )}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 mx-auto max-w-md transform rounded-t-3xl bg-[#0d0d0d] px-6 pb-28 pt-7 shadow-[0_-20px_60px_rgba(0,0,0,0.8)] transition-transform duration-500 ease-out ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ borderTop: "1px solid rgba(180,83,9,0.2)" }}
      >
        <div className="mx-auto mb-6 h-1 w-10 rounded-full bg-white/10" />
        <p className="text-[10px] uppercase tracking-[0.3em] text-companion-amber">
          {featured.region}
        </p>
        <h2 className="mt-3 font-display text-3xl leading-tight text-white">
          {featured.name}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-white/55">
          {featured.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Pill label={featured.time} />
          <Pill label={`${featured.spice} spice`} />
          <Pill label="Intermediate" />
        </div>
        <div className="mt-7 space-y-3">
          <Link
            to={`/app/recipe/${featured.id}`}
            className="block w-full rounded-xl bg-companion-amber px-4 py-3.5 text-center text-sm font-medium tracking-wide text-white transition-colors hover:bg-companion-amber-soft"
          >
            Start cooking →
          </Link>
          <Link
            to="/app/explore"
            className="block w-full rounded-xl bg-transparent px-4 py-3.5 text-center text-sm text-white/60 transition-colors hover:text-white"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          >
            Explore all recipes
          </Link>
        </div>
      </div>
    </div>
  );
};

const Pill = ({ label }: { label: string }) => (
  <span
    className="rounded-full px-3 py-1 text-[11px] text-white/60"
    style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}
  >
    {label}
  </span>
);

export default CompanionHome;
