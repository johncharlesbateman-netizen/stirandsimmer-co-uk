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
            <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
              Spices are the difference between food that's fine and food that makes someone stop and ask what's in it. There is nothing mystical about them — only a handful of principles to learn. Once you have those, the rest is curiosity and practice.
            </p>
          </div>
        </header>

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
