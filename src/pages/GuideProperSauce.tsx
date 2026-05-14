import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const GuideProperSauce = () => {
  return (
    <Layout>
      <Helmet>
        <title>How to make a proper sauce — a cook's guide | Stir and Simmer</title>
        <meta
          name="description"
          content="A practical guide to making proper sauces at home — the building blocks, the techniques, and the small details that turn a thin pan liquid into something glossy and memorable."
        />
        <link rel="canonical" href="https://stirandsimmer.co.uk/guides/proper-sauce" />
        <meta property="og:title" content="How to make a proper sauce — a cook's guide | Stir and Simmer" />
        <meta
          property="og:description"
          content="A practical guide to making proper sauces at home — the building blocks, the techniques, and the small details that turn a thin pan liquid into something glossy and memorable."
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
              <span>How to make a proper sauce</span>
            </nav>
            <Link
              to="/guides"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Guides
            </Link>
            <p className="micro-caption mb-4 text-primary">Guide</p>
            <h1 className="font-display text-4xl md:text-5xl leading-tight text-foreground mb-5">
              How to make a proper sauce
            </h1>
            <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
              A great sauce is not an afterthought. It is the difference between a plate of food and a meal worth remembering. It is what turns a piece of chicken into something people ask you to make again. It is, in many ways, the whole point.
            </p>
            <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
              The good news is that once you understand a handful of principles, making a proper sauce becomes less about following a recipe and more about instinct. You will start to see what every sauce has in common — and from there, you can make almost anything.
            </p>
          </div>
        </header>

        {/* What a sauce actually does */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
            What a sauce actually does
          </h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            A sauce has one job: to add flavour, moisture and cohesion to a dish. It should complement what it's served with, not compete with it. It should taste like it belongs on the plate — not like something that arrived separately and happens to be nearby.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            A good sauce should also have body. Not necessarily thick, but present. Something that coats rather than runs. That quality comes from reduction, from fat, from starch, or from gelatin — and often from a combination of all four.
          </p>
        </div>

        {/* The building blocks */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
            The building blocks
          </h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-6">
            Every sauce, however complex it looks, is built from a small number of elements:
          </p>
          <ul className="space-y-4 text-base md:text-lg text-foreground/90 leading-relaxed">
            <li>
              <strong className="text-foreground">A base</strong> — stock, wine, cream, tomatoes, butter. This is the foundation and it determines the character of everything that follows.
            </li>
            <li>
              <strong className="text-foreground">Aromatics</strong> — onion, shallot, garlic, celery, carrot. Cooked low and slow at the start to build sweetness and depth.
            </li>
            <li>
              <strong className="text-foreground">Acid</strong> — wine, vinegar, lemon juice. Acid lifts a sauce and stops it tasting flat. Almost every great sauce has some acid in it somewhere.
            </li>
            <li>
              <strong className="text-foreground">Fat</strong> — butter, cream, olive oil. Fat carries flavour and gives a sauce its richness and texture. Whisking cold butter into a finished sauce — a technique called <em>monter au beurre</em> — gives it a beautiful gloss and body without heaviness.
            </li>
            <li>
              <strong className="text-foreground">Seasoning</strong> — salt, pepper, and time. A sauce that tastes flat usually needs more salt, more reduction, or more time. Often all three.
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

export default GuideProperSauce;
