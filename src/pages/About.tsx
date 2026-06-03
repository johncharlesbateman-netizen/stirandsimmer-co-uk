import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";

const brandImage = "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&q=85";

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
      <section className="pt-8 md:pt-10 pb-6 md:pb-8">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl space-y-6 body-editorial text-muted-foreground">
            <p className="text-foreground text-xl md:text-2xl font-display leading-relaxed">
              Stir & Simmer is written by John Bateman.
            </p>
            <p>
              A career in international financial services with a global banking group took John across the world — four years living and working in Bahrain, and extensive responsibilities for financing UK exports across Malaysia, Indonesia, Singapore and Thailand. Along the way came an education in food that no cookery school could replicate: markets, home kitchens, restaurant dining and street food across the Middle East and Southeast Asia, each with its own produce, techniques and flavour logic.
            </p>
            <p>
              Back in the UK and retired, that lifetime of eating well found a new purpose. What started as a basic recipe book — the dishes that had been cooked, tested and asked for again — became Great Food Recipes, and eventually Stir & Simmer. The name changed. The principle never did.
            </p>
            <p>
              Every recipe here is one we actually make. Nothing requires ingredients you can't find in Tesco, Sainsbury's, Aldi or Waitrose. Nothing assumes professional training or a free afternoon. The techniques are explained because understanding why something works matters more than just following instructions. And every recipe is completely free — no subscriptions, no paywalls, no catch.
            </p>
            <p>
              That's what this site is.
            </p>
          </div>

          <div className="max-w-3xl mt-10 pt-8 border-t border-border">
            <h2 className="heading-section mb-4">How This Started</h2>
            <div className="space-y-4 body-editorial text-muted-foreground">
              <p>
                What became Stir & Simmer began as a handwritten recipe collection started around twenty years ago. The dishes that worked — the ones family and friends asked for again — were written down. Over time that personal collection became Great Food Recipes, a site shared with a wider audience, and eventually evolved into what you see today.
              </p>
              <p>
                The principle never changed: if it wasn't asked for again, it didn't make the cut.
              </p>
              <p>
                Every recipe comes from actually making it — not once, but enough times to know what goes wrong and how to fix it. The portions are honest. The ingredients come from Tesco, Sainsbury's, Aldi or Waitrose. The methods are written for someone who's cooking after work, not performing for a camera.
              </p>
            </div>
          </div>

          <div className="max-w-3xl mt-10 pt-8 border-t border-border">
            <h2 className="heading-section mb-4">What You'll Find Here</h2>
            <p className="body-editorial text-muted-foreground">
              Quick meals that don't taste like shortcuts. Proper weekend cooking when you have more time. Guides that explain the why, not just the what. And a recipe list that keeps growing — built around what real cooks actually want to eat.
            </p>
          </div>
        </div>
      </section>

      {/* Why Stir & Simmer */}
      <section className="pb-12 md:pb-16">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl">
            <p className="micro-caption text-accent mb-3">Why Stir & Simmer</p>
            <h2 className="heading-section mb-8">Built for real UK kitchens</h2>

            <div className="grid md:grid-cols-2 gap-10 md:gap-12">
              <div>
                <h3 className="font-display text-xl text-foreground mb-4">We cook for</h3>
                <ul className="space-y-3 body-editorial text-muted-foreground">
                  <li>— People cooking after a long day at work</li>
                  <li>— Families feeding fussy eaters without compromise</li>
                  <li>— Anyone who wants weekend cooking to feel like a treat, not a chore</li>
                  <li>— Home cooks who'd rather learn the why than memorise the what</li>
                  <li>— Shoppers who actually use Tesco, Sainsbury's, Aldi and Waitrose</li>
                </ul>
              </div>

              <div>
                <h3 className="font-display text-xl text-foreground mb-4">Why UK-specific matters</h3>
                <div className="space-y-4 body-editorial text-muted-foreground">
                  <p>
                    We're based in the Fens, on the borders of Cambridgeshire, Norfolk and Lincolnshire. Good farming country, honest food, not much pretension about eating. Every measurement is in grams and millilitres. Every oven temperature is in Celsius (with fan settings noted). Every ingredient is something you can actually buy at a British supermarket — no hunting for obscure imports or guessing at conversions.
                  </p>
                  <p>
                    It sounds small. In practice, it's the difference between a recipe that works first time and one that quietly fails on a Tuesday night.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default About;
