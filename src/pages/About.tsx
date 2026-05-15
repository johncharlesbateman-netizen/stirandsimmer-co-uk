import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import InfiniteCarousel from "@/components/InfiniteCarousel";


const brandImage = "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&q=85";


const carouselImages = [
  { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80", alt: "Delicious food spread" },
  { src: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&q=80", alt: "Gourmet pasta" },
  { src: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=800&q=80", alt: "Fresh ingredients" },
  { src: "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?w=800&q=80", alt: "Pizza close-up" },
  { src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80", alt: "BBQ meat" },
  { src: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80", alt: "Pancakes" },
  { src: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80", alt: "Salmon dish" },
];

const About = () => {
  return (
    <Layout hideNewsletter>
      <Helmet>
        <title>About Us | Stir & Simmer</title>
        <meta name="description" content="Learn about Stir & Simmer — who we are, our passion for fresh seasonal cooking, and who our recipes are made for." />
        <meta name="keywords" content="food photographer, editorial food photography, food stylist" />
        <link rel="canonical" href="https://stirandsimmer.co.uk/about" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://stirandsimmer.co.uk/about" />
        <meta property="og:title" content="About Us | Stir & Simmer" />
        <meta property="og:description" content="Learn about Stir & Simmer — who we are, our passion for fresh seasonal cooking, and who our recipes are made for." />
        <meta property="og:image" content={brandImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us | Stir & Simmer" />
        <meta name="twitter:description" content="Learn about Stir & Simmer — who we are, our passion for fresh seasonal cooking, and who our recipes are made for." />
        <meta name="twitter:image" content={brandImage} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About — Stir & Simmer",
          "url": "https://stirandsimmer.co.uk/about",
          "description": "Learn about Stir & Simmer — who we are, our passion for fresh seasonal cooking, and who our recipes are made for.",
          "mainEntity": {
            "@type": "Organization",
            "name": "Stir & Simmer",
            "url": "https://stirandsimmer.co.uk",
            "image": brandImage,
            "description": "We create recipes the same way we enjoy food — with care, curiosity, and a love for fresh, honest ingredients."
          }
        })}</script>
      </Helmet>

      <PageHero
        title="About Stir & Simmer"
        subtitle="Real food, real kitchens, no shortcuts."
        imageId="1640777"
        imageAlt="A warm, lived-in kitchen with fresh ingredients on the counter"
      />
      {/* Intro */}
      <section className="pt-12 md:pt-16 pb-12">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl space-y-8 body-editorial text-muted-foreground">
            <p className="text-foreground text-xl md:text-2xl font-display leading-relaxed">
              Stir & Simmer is a UK recipe site for people who love good food but don't want cooking to become a project.
            </p>
            <p>
              We started this in a real kitchen, after one too many recipes that called for ingredients you've never heard of, techniques that assumed professional training, or timings that only work if you have the whole afternoon free.
            </p>
            <p>
              That's not most people's reality. So we built something different.
            </p>
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="pb-12">
        <InfiniteCarousel images={carouselImages} />
      </section>

      {/* UK trust line */}
      <section className="pb-4">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl border-l-2 border-foreground pl-4">
            <p className="text-sm text-foreground leading-relaxed">
              Proudly UK-based. Every recipe uses grams, millilitres and degrees Celsius, with ingredients you'll actually find at Tesco, Sainsbury's, Aldi, Lidl, Morrisons or Waitrose.
            </p>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default About;
