import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ChefHat, Clock, Flame } from "lucide-react";
import { companionRecipes } from "./data";
import CookingMode from "./CookingMode";

const CompanionRecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const recipe = companionRecipes.find((r) => r.id === id) ?? companionRecipes[0];
  const [cooking, setCooking] = useState(false);

  return (
    <div>
      <header className="relative overflow-hidden px-6 pb-10 pt-6">
        <Link
          to="/app"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-companion-muted hover:text-companion-fg"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back
        </Link>
        <div className="relative mt-8 flex flex-col items-center text-center">
          <div className="absolute h-56 w-56 rounded-full bg-companion-amber/25 blur-3xl" />
          <span className="relative text-7xl drop-shadow-[0_0_30px_rgba(180,83,9,0.5)]">
            {recipe.emoji}
          </span>
          <p className="relative mt-6 text-xs uppercase tracking-[0.25em] text-companion-amber">
            {recipe.region}
          </p>
          <h1 className="relative mt-2 font-display text-3xl text-companion-fg">
            {recipe.name}
          </h1>
          <div className="relative mt-4 flex flex-wrap justify-center gap-2">
            <Tag icon={<Clock className="h-3 w-3" />} label={recipe.time} />
            <Tag icon={<Flame className="h-3 w-3" />} label={recipe.spice} />
            <Tag icon={<ChefHat className="h-3 w-3" />} label={recipe.difficulty} />
          </div>
        </div>
      </header>

      <section className="px-6">
        <h2 className="text-xs uppercase tracking-[0.25em] text-companion-muted">
          Ingredients
        </h2>
        <ul className="mt-4 space-y-3">
          {recipe.ingredients.map((ing) => (
            <li
              key={ing}
              className="flex items-start gap-3 border-b border-white/5 pb-3 text-sm text-companion-fg/90 last:border-0"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-companion-amber" />
              {ing}
            </li>
          ))}
        </ul>
      </section>

      <div className="px-6 py-8">
        <button
          type="button"
          onClick={() => setCooking(true)}
          className="block w-full rounded-xl bg-companion-amber px-4 py-3.5 text-center text-sm font-medium text-white transition-colors hover:bg-companion-amber-soft"
        >
          Start cooking
        </button>
      </div>

      {cooking && (
        <CookingMode
          recipeId={recipe.id}
          recipeName={recipe.name}
          emoji={recipe.emoji}
          steps={recipe.steps}
          onClose={() => setCooking(false)}
        />
      )}
    </div>
  );
};

const Tag = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-companion-fg/80">
    {icon}
    {label}
  </span>
);

export default CompanionRecipeDetail;
