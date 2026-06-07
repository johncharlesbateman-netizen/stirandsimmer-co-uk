import { GUIDE_BY_SLUG } from "@/lib/guidesIndex";

const pexels = (id: string, w = 1600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fm=webp&w=${w}`;
const pexelsSrcSet = (id: string, widths: number[]) =>
  widths.map((w) => `${pexels(id, w)} ${w}w`).join(", ");

interface GuideHeroProps {
  slug: string;
  /** Override the alt text when needed. Defaults to the tile's imageAlt. */
  alt?: string;
}

/**
 * Renders the guide page's hero image, matching the image used on the
 * corresponding tile in the Guides index for visual continuity.
 */
const GuideHero = ({ slug, alt }: GuideHeroProps) => {
  const g = GUIDE_BY_SLUG[slug];
  if (!g) return null;

  const src = g.image ?? pexels(g.imageId!, 1600);
  const srcSet =
    g.imageSrcSet ??
    (g.imageId ? pexelsSrcSet(g.imageId, [768, 1200, 1600, 2000]) : undefined);

  return (
    <div className="w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-muted">
      <img
        src={src}
        srcSet={srcSet}
        sizes="100vw"
        alt={alt ?? g.imageAlt}
        width={1600}
        height={900}
        className="w-full h-full object-cover"
        fetchPriority="high"
      />
    </div>
  );
};

export default GuideHero;
