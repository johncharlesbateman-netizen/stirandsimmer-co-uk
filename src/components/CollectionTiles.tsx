import { Link } from "react-router-dom";
import { collections } from "@/lib/collections";

const tileBackgrounds: Record<string, string> = {
  "weeknight-suppers": "bg-[hsl(var(--secondary))]",
  "italian-meals": "bg-[hsl(var(--accent))]",
  "vegetarian-options": "bg-[hsl(var(--muted))]",
  "romantic-meals": "bg-foreground text-background",
};

interface CollectionTilesProps {
  /** Optional eyebrow shown above the heading */
  eyebrow?: string;
  /** Heading rendered above the grid */
  heading?: string;
  /** Short intro paragraph */
  intro?: string;
  /** Render heading as h1 (true) or h2 (false). Defaults to h2. */
  asH1?: boolean;
}

const CollectionTiles = ({
  eyebrow = "Collections",
  heading = "Curated for the way you cook",
  intro = "Hand-picked groups of recipes for every kind of meal — from quick weeknight dinners to elegant dishes for two.",
  asH1 = false,
}: CollectionTilesProps) => {
  const HeadingTag = asH1 ? "h1" : "h2";

  return (
    <section className="section-breathing border-t border-border">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="max-w-2xl mb-12">
          {eyebrow && <p className="micro-caption mb-4">{eyebrow}</p>}
          <HeadingTag className="heading-editorial mb-4">{heading}</HeadingTag>
          {intro && (
            <p className="text-muted-foreground text-lg leading-relaxed">{intro}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {collections.map((c) => (
            <Link
              key={c.slug}
              to={`/collections/${c.slug}`}
              className={`group block p-8 md:p-10 border border-border transition-all duration-500 hover:shadow-lg ${
                tileBackgrounds[c.slug] ?? "bg-secondary"
              }`}
            >
              <p className="micro-caption mb-4 opacity-70">Collection</p>
              <h3 className="font-display text-2xl md:text-3xl mb-3 transition-transform duration-500 group-hover:translate-x-1">
                {c.title}
              </h3>
              <p className="text-sm md:text-base opacity-80 leading-relaxed">
                {c.tagline}
              </p>
              <span className="inline-block mt-6 text-xs tracking-[0.2em] uppercase opacity-70 group-hover:opacity-100 transition-opacity">
                Explore →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionTiles;
