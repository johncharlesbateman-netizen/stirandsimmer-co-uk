import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const GuideProperStock = () => {
  return (
    <Layout>
      <Helmet>
        <title>How to make a proper stock — a cook's guide | Stir and Simmer</title>
        <meta
          name="description"
          content="A practical guide to making proper stock at home — what goes in, how long to simmer, the difference between white and brown stock, and how to use and store it."
        />
        <link rel="canonical" href="https://stirandsimmer.co.uk/guides/proper-stock" />
        <meta property="og:title" content="How to make a proper stock — a cook's guide | Stir and Simmer" />
        <meta
          property="og:description"
          content="A practical guide to making proper stock at home — what goes in, how long to simmer, the difference between white and brown stock, and how to use and store it."
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
              <span>How to make a proper stock</span>
            </nav>
            <p className="micro-caption mb-4 text-primary">Guide</p>
            <h1 className="font-display text-4xl md:text-5xl leading-tight text-foreground mb-5">
              How to make a proper stock
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              The quiet foundation of good cooking — what goes in, how long it takes, and why a homemade stock will outperform anything in a carton.
            </p>
            <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
              Stock is one of those things that separates cooking that tastes good from cooking that tastes remarkable. It's not complicated. It doesn't require special skills or expensive ingredients. What it requires is time — and the understanding that the best things in a kitchen are often the simplest.
            </p>
          </div>
        </header>

        {/* What stock actually is */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
            What stock actually is
          </h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            Stock is water that has been taught to taste of something. You simmer bones, vegetables and aromatics together long enough for everything they contain — collagen, minerals, natural sugars, flavour compounds — to dissolve into the liquid. What you're left with is a deeply flavoured base that makes everything you cook with it better.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            It is not the same as a cube. A stock cube is salt with flavouring. It has its place, but it is not stock.
          </p>
        </div>

        {/* Why stock matters */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
            Why stock matters
          </h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            Stock adds body, savouriness and depth that water simply can't. The collagen from the bones gives sauces their silky weight. The slow extraction of vegetables and aromatics gives a backdrop of flavour that you can taste in the finished dish even when you can't quite name it. Shop-bought stock is mostly salt and flavouring — useful in a pinch, but never the same.
          </p>
        </div>

        {/* Why bother making your own */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
            Why bother making your own
          </h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            Shop-bought stock has improved considerably. There are some decent fresh stocks available in supermarkets now. But homemade stock has qualities that no carton can replicate.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            When you make stock from bones, particularly roasted ones, you extract collagen that converts to gelatin as it cooks. A good stock, when chilled, should set to a loose jelly. That gelatin is what gives a sauce or a braise its body — that quality of coating your mouth rather than just washing over it.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            Homemade stock is also almost free. You are using things that would otherwise be thrown away.
          </p>
        </div>

        {/* Stock vs broth */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
            Stock vs broth
          </h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            The two words get used interchangeably, but there's a useful distinction.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            <strong className="text-foreground">Stock</strong> is made primarily from bones. It's unseasoned, simmered for hours, and prized for its body — the gelatine from the bones is what makes a good stock set to a wobble in the fridge.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            <strong className="text-foreground">Broth</strong> is made from meat (often with bones), seasoned, and meant to be sipped or eaten on its own. It's lighter, quicker, and tastes finished rather than foundational.
          </p>
        </div>

        {/* The basics */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
            The four things you need
          </h2>
          <ul className="space-y-4 text-base md:text-lg text-foreground/90 leading-relaxed">
            <li>
              <strong className="text-foreground">Bones</strong> — chicken carcasses, beef marrow and knuckle, or fish frames. Ask your butcher; they're often free or close to it. For vegetable stock, swap in a generous pile of trimmings and whole vegetables.
            </li>
            <li>
              <strong className="text-foreground">Mirepoix</strong> — the classic French base of roughly chopped onion, carrot and celery in a 2:1:1 ratio. No need to peel. Leeks and fennel are welcome additions.
            </li>
            <li>
              <strong className="text-foreground">Aromatics</strong> — a bay leaf, a few peppercorns, a sprig of thyme, parsley stalks. Garlic if you like. Keep it restrained — stock is a backdrop, not a feature.
            </li>
            <li>
              <strong className="text-foreground">Cold water</strong> — enough to cover the bones by a couple of inches. Always start cold; it draws more flavour out as the temperature climbs.
            </li>
          </ul>
        </div>

        {/* White vs brown */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
            White vs brown stock
          </h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            Same ingredients, different approach.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            <strong className="text-foreground">White stock</strong> uses raw bones straight into the pot. It's pale, clean and delicate — ideal for light sauces, risottos and poached dishes where you don't want a heavy roasted note.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            <strong className="text-foreground">Brown stock</strong> starts by roasting the bones and vegetables in a hot oven until deeply coloured. The Maillard reaction adds a savoury, almost meaty depth that's the foundation of classic gravies, French sauces and rich braises.
          </p>
        </div>

        {/* Step by step */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
            Step by step
          </h2>
          <ul className="space-y-4 text-base md:text-lg text-foreground/90 leading-relaxed">
            <li>
              <strong className="text-foreground">1. Prepare the bones.</strong> For brown stock, roast at 220°C for 40 to 50 minutes until deep mahogany. For white stock, blanch raw bones briefly in boiling water then drain — this removes scum and gives a cleaner result.
            </li>
            <li>
              <strong className="text-foreground">2. Build the pot.</strong> Add the bones, mirepoix and aromatics to a tall, narrow pot. Cover with cold water by a couple of inches.
            </li>
            <li>
              <strong className="text-foreground">3. Bring up slowly.</strong> Heat gently to a bare simmer — never a rolling boil. A boil emulsifies the fat into the liquid and turns the stock cloudy and greasy.
            </li>
            <li>
              <strong className="text-foreground">4. Skim.</strong> For the first 20 minutes, skim the grey foam and fat that rises to the top. After that, leave it alone.
            </li>
            <li>
              <strong className="text-foreground">5. Simmer.</strong> Chicken stock: 3 to 4 hours. Beef or veal: 6 to 8 hours, longer if you can. Fish: 30 to 45 minutes only — any longer and it turns bitter. Vegetable: 45 minutes to an hour.
            </li>
            <li>
              <strong className="text-foreground">6. Strain.</strong> Pass through a fine sieve, ideally lined with muslin. Press gently — don't crush the solids or you'll cloud the liquid.
            </li>
            <li>
              <strong className="text-foreground">7. Cool quickly.</strong> Sit the pot in a sink of cold water and stir occasionally. Once cool, refrigerate. The fat will set on top and lift off cleanly the next day.
            </li>
          </ul>
        </div>

        {/* Common mistakes */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
            Common mistakes to avoid
          </h2>
          <ul className="space-y-4 text-base md:text-lg text-foreground/90 leading-relaxed">
            <li><strong className="text-foreground">Boiling instead of simmering</strong> — the single most common mistake. Cloudy, greasy stock almost always comes from the heat being too high.</li>
            <li><strong className="text-foreground">Salting the pot</strong> — stock is a building block. Season the finished dish, not the stock, or you'll find yourself trapped when you reduce it.</li>
            <li><strong className="text-foreground">Too many aromatics</strong> — a bouquet garni, not a herb garden. Strong herbs like rosemary or sage will dominate. Keep it neutral.</li>
            <li><strong className="text-foreground">Starting with hot water</strong> — cold water draws flavour out gradually as it heats. Hot water seals the bones and gives a thinner result.</li>
            <li><strong className="text-foreground">Skipping the skim</strong> — a few minutes of skimming early on is the difference between a clear, golden stock and a murky one.</li>
          </ul>
        </div>

        {/* How to use and store */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
            How to use it — and how to store it
          </h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            Once you have a good stock in the fridge, you'll find uses for it everywhere. Cook your rice in it instead of water. Use it as the base for soups, risottos and braises. Reduce it hard with a splash of wine for an instant pan sauce. A ladleful added to a tray of roasting vegetables transforms them.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            Stock keeps for 3 to 4 days in the fridge, or freeze it in portions — ice cube trays for small splashes, larger containers for full-batch cooking. A well-stocked freezer of homemade stock is one of the quietest upgrades you can give your cooking.
          </p>
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

export default GuideProperStock;
