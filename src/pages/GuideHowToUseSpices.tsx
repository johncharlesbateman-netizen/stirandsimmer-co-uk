import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const GuideHowToUseSpices = () => {
  return (
    <Layout>
      <Helmet>
        <title>How to use spices — a beginner's guide | Stir and Simmer</title>
        <meta
          name="description"
          content="A beginner's guide to cooking with spices — what they do, how to store them, when to add them, and how to build flavour with confidence."
        />
        <link rel="canonical" href="https://stirandsimmer.co.uk/guides/how-to-use-spices" />
        <meta property="og:title" content="How to use spices — a beginner's guide | Stir and Simmer" />
        <meta
          property="og:description"
          content="A beginner's guide to cooking with spices — what they do, how to store them, when to add them, and how to build flavour with confidence."
        />
      </Helmet>

      <article className="bg-background">
        {/* Header */}
        <header className="border-b border-border">
          <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-20 max-w-3xl">
            <nav className="text-xs uppercase tracking-widest text-muted-foreground mb-6">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <span className="mx-2">›</span>
              <Link to="/guides" className="hover:text-foreground transition-colors">Guides</Link>
              <span className="mx-2">›</span>
              <span>How to use spices</span>
            </nav>
            <p className="micro-caption mb-4 text-primary">Guide</p>
            <h1 className="font-display text-4xl md:text-5xl leading-tight text-foreground mb-5">
              How to use spices — a beginner's guide
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Learn what spices do, how to handle them, and how to build proper flavour with confidence.
            </p>
            <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
              Spices are one of the most transformative things in a kitchen. A pinch of the right one at the right moment can turn something ordinary into something memorable. But for many home cooks, the spice rack is a graveyard of half-used jars bought for one recipe and never touched again.
            </p>
            <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
              This guide is here to change that.
            </p>
          </div>
        </header>

        {/* Why spices matter */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
            Why spices matter
          </h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            Spices don't just add heat. They add depth, warmth, earthiness, sweetness and complexity. They're the difference between a curry that tastes flat and one that tastes like it's been cooking all day. Understanding a few basics about how to use them will make everything you cook better.
          </p>
        </div>

        {/* Whole vs ground */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
            Whole vs ground
          </h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            Most spices come in two forms — whole and ground.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            Whole spices such as cumin seeds, coriander seeds and cardamom pods last longer, carry more flavour and release it when heated. They're ideal for tempering — dropping them into hot oil at the start of cooking to bloom their flavour before anything else goes in.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            Ground spices are more convenient and better for blending into sauces, marinades and rubs. They lose their potency faster though — if a ground spice smells of nothing when you open the jar, it's past its best.
          </p>
        </div>

        {/* The golden rule */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
            The golden rule — heat activates flavour
          </h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            This is the single most important thing to understand about spices. Heat unlocks their essential oils and transforms raw, dusty powder into something fragrant and alive.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-6">
            There are three main ways to do this:
          </p>
          <ul className="space-y-4 text-base md:text-lg text-foreground/90 leading-relaxed">
            <li>
              <strong className="text-foreground">Dry toasting</strong> — add whole spices to a dry pan over medium heat and shake for 60 to 90 seconds until fragrant. Don't walk away — they burn fast. Use this before grinding or to finish a dish.
            </li>
            <li>
              <strong className="text-foreground">Blooming in oil</strong> — add ground or whole spices to hot oil at the start of cooking, before your onions or garlic. Give them 30 to 60 seconds. This is the foundation of most Indian and Middle Eastern cooking.
            </li>
            <li>
              <strong className="text-foreground">Adding mid-cook</strong> — stirring ground spices into onions or a sauce partway through. Less intense than blooming in oil but still effective.
            </li>
          </ul>
        </div>

        {/* Kitchen Atlas CTA */}
        <section
          className="w-full py-16 md:py-20 border-t border-border"
          style={{ backgroundColor: "#1a0e00" }}
        >
          <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-3xl text-center">
            <h2 className="font-display text-3xl md:text-4xl mb-4" style={{ color: "#f5e9d7" }}>
              Ready to put it to work?
            </h2>
            <p className="text-base md:text-lg mb-8" style={{ color: "#d9c7a8" }}>
              Head to The Kitchen Atlas and explore recipes from around the world to practise on.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link to="/kitchen-atlas">
                Visit The Kitchen Atlas <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </section>

        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-10 max-w-3xl">
          <Link
            to="/guides"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to all guides
          </Link>
        </div>
      </article>
    </Layout>
  );
};

export default GuideHowToUseSpices;
