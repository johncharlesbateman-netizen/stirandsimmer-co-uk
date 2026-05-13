import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import InfiniteCarousel from "@/components/InfiniteCarousel";
import { Link } from "react-router-dom";

const brandImage = "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&q=85";

const audienceTypes = [
  "Home Cooks",
  "Busy Families",
  "Health-Conscious Foodies",
  "Weekend Entertainers",
  "Beginner Chefs",
  "Meal Prep Enthusiasts",
];

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
    <Layout>
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
      {/* Header */}
      <section className="pt-12 md:pt-16 pb-0">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
            {/* Main Content */}
            <div className="md:col-span-7">
              <h1 className="heading-display mb-12">About</h1>
              
              <div className="space-y-8 body-editorial text-muted-foreground">
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

              {/* How This Started */}
              <div className="mt-16 pt-12 border-t border-border">
                <h2 className="heading-section mb-6">How This Started</h2>
                <div className="space-y-6 body-editorial text-muted-foreground">
                  <p>
                    Every recipe on here comes from actually making it — not once, but enough times to know what goes wrong and how to fix it. The portions are honest. The ingredients come from Tesco, Sainsbury's, Aldi or Waitrose. The methods are written for someone who's cooking after work, not performing for a camera.
                  </p>
                  <p>
                    If a dish isn't worth making, it doesn't go on the site.
                  </p>
              </div>

              {/* What You'll Find Here */}
              <div className="mt-16 pt-12 border-t border-border">
                <h2 className="heading-section mb-6">What You'll Find Here</h2>
                <p className="body-editorial text-muted-foreground">
                  Quick meals that don't taste like shortcuts. Proper weekend cooking when you have more time. Guides that explain the why, not just the what. And a recipe list that keeps growing — built around what real cooks actually want to eat.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="md:col-span-4 md:col-start-9 space-y-12">
              {/* Portrait */}
              <div className="aspect-[3/4] bg-muted overflow-hidden">
                <img
                  src={brandImage}
                  alt="Stir & Simmer kitchen with fresh ingredients laid out on a wooden bench"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width={1200}
                  height={900}
                />
              </div>

              {/* UK trust line */}
              <div className="border-l-2 border-foreground pl-4">
                <p className="text-sm text-foreground leading-relaxed">
                  Proudly UK-based. Every recipe uses grams, millilitres and degrees Celsius, with ingredients you'll actually find at Tesco, Sainsbury's, Aldi, Lidl, Morrisons or Waitrose.
                </p>
              </div>

              {/* Client Types */}
              <div>
                <h3 className="micro-caption mb-6">We Cook For</h3>
                <ul className="space-y-3">
                  {audienceTypes.map((audience) => (
                    <li key={audience} className="text-sm text-muted-foreground">
                      {audience}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Why Stir & Simmer */}
              <div>
                <h3 className="micro-caption mb-4">Why Stir & Simmer</h3>
                <ul className="space-y-4">
                  <li className="text-sm text-muted-foreground">
                    <span className="text-foreground font-medium">Built in the UK</span> — written for home cooks who shop at Tesco, Sainsbury's and the corner shop, not Borough Market.
                  </li>
                  <li className="text-sm text-muted-foreground">
                    <span className="text-foreground font-medium">Properly tested</span> — every recipe is cooked, eaten, tweaked and cooked again before it goes live.
                  </li>
                  <li className="text-sm text-muted-foreground">
                    <span className="text-foreground font-medium">No paywalls, ever</span> — no subscriptions, no locked content, no "premium" recipes. Just food.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="pt-8 pb-12">
        <InfiniteCarousel images={carouselImages} />
      </section>

      {/* Three Column Highlights */}
      <section className="py-12 border-t border-border">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
            <div>
              <div className="text-4xl mb-4" aria-hidden="true">🍳</div>
              <h3 className="heading-section mb-2">Real Recipes</h3>
              <p className="text-sm text-muted-foreground">Tested in a home kitchen, not a TV studio</p>
            </div>
            <div>
              <div className="text-4xl mb-4" aria-hidden="true">🛒</div>
              <h3 className="heading-section mb-2">Normal Ingredients</h3>
              <p className="text-sm text-muted-foreground">Everything from your local supermarket</p>
            </div>
            <div>
              <div className="text-4xl mb-4" aria-hidden="true">📅</div>
              <h3 className="heading-section mb-2">Always Growing</h3>
              <p className="text-sm text-muted-foreground">Fresh recipes added when we have something worth sharing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <blockquote className="max-w-3xl">
              <p className="heading-editorial text-muted-foreground italic leading-relaxed">
                "The best cooking happens when you stop worrying about getting it perfect and just start enjoying the process."
              </p>
          </blockquote>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-breathing border-t border-border">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <h2 className="heading-section mb-4">Have a recipe request?</h2>
              <p className="text-muted-foreground">
                Is there a dish you've always wanted to make but never quite cracked? A family favourite you'd love a better version of? Tell us — we build our recipe list around what real cooks actually want to eat.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-block px-8 py-4 bg-foreground text-background text-sm tracking-wider uppercase hover:opacity-80 transition-opacity w-fit"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
