import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowRight } from "lucide-react";
import properStockImage from "@/assets/guide-proper-stock.jpg";
import properSauceImage from "@/assets/guide-proper-sauce.jpg";

const pexels = (id: string, w = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fm=webp&w=${w}`;
const pexelsSrcSet = (id: string, widths: number[]) =>
  widths.map((w) => `${pexels(id, w)} ${w}w`).join(", ");

const HERO_ID = "1340116"; // moody spices and herbs on dark wood
const heroImage = pexels(HERO_ID, 1600);
const heroSrcSet = pexelsSrcSet(HERO_ID, [768, 1200, 1600, 2000]);

type GuideEntry = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  imageId?: string;
  image?: string;
  imageAlt: string;
};

const GUIDES: GuideEntry[] = [
  {
    slug: "mother-sauces",
    title: "The five French mother sauces — and why every home cook should know them",
    description:
      "Master these five and you hold the keys to almost every classic sauce in western cuisine.",
    eyebrow: "French technique",
    imageId: "5908227", // saucepan with cream sauce
    imageAlt: "A glossy sauce being whisked in a saucepan",
  },
  {
    slug: "french-techniques",
    title: "French cooking techniques every home cook should know",
    description:
      "Seven essential French techniques — mise en place, julienne, brunoise, chiffonade, beurre blanc, flambé and déglaze — explained simply.",
    eyebrow: "French technique",
    imageId: "4252137", // chef knife and chopped vegetables
    imageAlt: "Chef's knife and finely chopped vegetables on a wooden board",
  },
  {
    slug: "garam-masala",
    title: "Garam masala — a cook's guide",
    description:
      "The spices that go in, why they matter, how to toast and grind them, and the mistakes most home cooks make.",
    eyebrow: "Indian technique",
    imageId: "1340116", // bowls of warm spices
    imageAlt: "Small bowls of warm Indian spices arranged on a dark surface",
  },
  {
    slug: "how-to-use-spices",
    title: "How to use spices — a beginner's guide",
    description:
      "What spices do, how to store them, when to add them, and how to build proper flavour with confidence.",
    eyebrow: "Technique",
    imageId: "2802527", // spices in jars and spoons
    imageAlt: "An array of ground spices in spoons on a dark wooden table",
  },
  {
    slug: "proper-stock",
    title: "How to make a proper stock",
    description:
      "The quiet foundation of good cooking — bones, mirepoix, water and time, and how to turn them into something your sauces and soups can lean on.",
    eyebrow: "Technique",
    image: properStockImage,
    imageAlt: "A pot of golden chicken stock simmering with bones, vegetables and herbs",
  },
  {
    slug: "proper-sauce",
    title: "How to make a proper sauce",
    description:
      "The building blocks, the techniques, and the small details that turn a thin pan liquid into something glossy, balanced and worth mopping up.",
    eyebrow: "Technique",
    image: properSauceImage,
    imageAlt: "A glossy dark pan sauce being whisked in a copper saucepan",
  },
];

const Guides = () => {
  return (
    <Layout>
      <Helmet>
        <title>Guides — kitchen techniques and reference | Stir and Simmer</title>
        <meta
          name="description"
          content="Practical kitchen guides from Stir and Simmer — techniques, reference and the craft behind great home cooking."
        />
        <link rel="canonical" href="https://stirandsimmer.co.uk/guides" />
        <link rel="preconnect" href="https://images.pexels.com" crossOrigin="" />
        <link rel="preload" as="image" href={heroImage} imageSrcSet={heroSrcSet} imageSizes="100vw" fetchPriority="high" />
      </Helmet>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            srcSet={heroSrcSet}
            sizes="100vw"
            alt="Warm spices, herbs and cookware arranged on a dark rustic surface"
            fetchPriority="high"
            decoding="async"
            width={1600}
            height={900}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/80" />
        </div>
        <div className="relative container mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-32 max-w-3xl text-primary-foreground">
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase mb-4 opacity-90">Guides</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight mb-5">
            Kitchen guides
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl">
            Techniques, reference and the craft behind great home cooking — explained simply.
          </p>
        </div>
      </section>

      {/* Guide cards */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-5xl">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {GUIDES.map((g) => (
            <li key={g.slug}>
              <Link
                to={`/guides/${g.slug}`}
                className="group relative block overflow-hidden border border-border/40 min-h-[340px] md:min-h-[380px] transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
              >
                <img
                  src={g.image ?? pexels(g.imageId!, 800)}
                  srcSet={g.image ? undefined : pexelsSrcSet(g.imageId!, [400, 600, 800, 1200])}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  alt={g.imageAlt}
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={600}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/25 transition-opacity duration-500 group-hover:from-black/95 group-hover:via-black/65"
                />
                <div className="relative p-6 md:p-7 flex flex-col h-full min-h-[340px] md:min-h-[380px] text-white">
                  <p className="text-[10px] tracking-[0.2em] uppercase opacity-90 mb-auto">
                    {g.eyebrow}
                  </p>
                  <div className="mt-6">
                    <h2 className="font-display text-xl md:text-2xl mb-3 leading-tight transition-transform duration-500 group-hover:translate-x-1">
                      {g.title}
                    </h2>
                    <p className="text-sm leading-relaxed opacity-85 mb-5 line-clamp-3">
                      {g.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.2em] uppercase opacity-90 group-hover:opacity-100 transition-opacity">
                      Read the guide
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default Guides;
