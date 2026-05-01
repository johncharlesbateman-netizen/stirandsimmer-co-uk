import { Link } from "react-router-dom";
import { collections } from "@/lib/collections";

interface CollectionTilesProps {
  eyebrow?: string;
  heading?: string;
  intro?: string;
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
        {(eyebrow || heading || intro) && (
          <div className="max-w-2xl mb-12">
            {eyebrow && <p className="micro-caption mb-4">{eyebrow}</p>}
            {heading && <HeadingTag className="heading-editorial mb-4">{heading}</HeadingTag>}
            {intro && (
              <p className="text-muted-foreground text-lg leading-relaxed">{intro}</p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
          {collections.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.slug}
                to={`/collections/${c.slug}`}
                className={`group relative block overflow-hidden border border-border/40 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${c.background} ${c.foreground}`}
              >
                {/* decorative ring */}
                <div
                  aria-hidden
                  className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-10 transition-transform duration-700 group-hover:scale-125 bg-current"
                />
                <div className="relative p-6 md:p-7 flex flex-col h-full min-h-[220px]">
                  <div className={`inline-flex items-center justify-center w-11 h-11 rounded-full mb-5 shadow-sm ${c.accent}`}>
                    <Icon className="w-5 h-5" strokeWidth={1.75} aria-hidden />
                  </div>
                  <h3 className="font-display text-xl md:text-2xl mb-2 leading-tight transition-transform duration-500 group-hover:translate-x-1">
                    {c.title}
                  </h3>
                  <p className="text-sm leading-relaxed opacity-80 mb-6">
                    {c.tagline}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-[11px] tracking-[0.2em] uppercase opacity-70 group-hover:opacity-100 transition-opacity">
                    Explore
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CollectionTiles;
