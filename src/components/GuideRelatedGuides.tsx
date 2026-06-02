import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  GUIDE_BY_SLUG,
  GUIDE_FALLBACK_IMAGE,
  RELATED_GUIDES,
  guideCardImage,
  guideCardSrcSet,
} from "@/lib/guidesIndex";

interface Props {
  guideSlug: string;
}

const GuideRelatedGuides = ({ guideSlug }: Props) => {
  const slugs = RELATED_GUIDES[guideSlug];
  if (!slugs) return null;
  const guides = slugs
    .map((s) => GUIDE_BY_SLUG[s])
    .filter((g): g is NonNullable<typeof g> => !!g);
  if (guides.length === 0) return null;

  return (
    <section className="border-t border-border py-12 md:py-16">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-5xl">
        <h2 className="heading-section mb-8 md:mb-10">Related guides</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {guides.map((g) => (
            <li key={g.slug}>
              <Link
                to={`/guides/${g.slug}`}
                className="group relative block overflow-hidden border border-warm-dark/20 aspect-[3/2] md:aspect-[4/3] transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
              >
                <img
                  src={guideCardImage(g, 800)}
                  srcSet={guideCardSrcSet(g)}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  alt={g.imageAlt}
                  loading="lazy"
                  decoding="async"
                  width={600}
                  height={400}
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (img.src === GUIDE_FALLBACK_IMAGE) return;
                    img.srcset = "";
                    img.src = GUIDE_FALLBACK_IMAGE;
                  }}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-warm-dark/95 via-warm-dark/60 to-warm-dark/25 transition-opacity duration-500 group-hover:from-warm-dark group-hover:via-warm-dark/70"
                />
                <div className="absolute inset-0 p-6 md:p-7 flex flex-col justify-end text-warm-dark-foreground">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-warm-cream-muted mb-3">
                    {g.eyebrow}
                  </p>
                  <h3 className="font-display text-xl md:text-2xl mb-3 leading-tight transition-transform duration-500 group-hover:translate-x-1">
                    {g.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-warm-cream-muted mb-5 line-clamp-3">
                    {g.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.2em] uppercase text-warm-cream-muted group-hover:text-warm-dark-foreground transition-colors">
                    Read the guide
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default GuideRelatedGuides;
