import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const GuideChoosingPans = () => {
  return (
    <Layout>
      <Helmet>
        <title>Choosing the right pan for the job — a cook's guide | Stir and Simmer</title>
        <meta
          name="description"
          content="A practical guide to choosing the right pan for the job — the materials, the shapes, and which pans actually earn their place in a home kitchen."
        />
        <link rel="canonical" href="https://stirandsimmer.co.uk/guides/choosing-pans" />
        <meta property="og:title" content="Choosing the right pan for the job — a cook's guide | Stir and Simmer" />
        <meta
          property="og:description"
          content="A practical guide to choosing the right pan for the job — the materials, the shapes, and which pans actually earn their place in a home kitchen."
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
              <span>Choosing the right pan for the job</span>
            </nav>
            <Link
              to="/guides"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Guides
            </Link>
            <p className="micro-caption mb-4 text-primary">Equipment Guide</p>
            <h1 className="font-display text-4xl md:text-5xl leading-tight text-foreground mb-5">
              Choosing the right pan for the job
            </h1>
            <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
              The pan you cook in matters more than most home cooks realise. The right pan does half the work for you — it conducts heat evenly, releases food cleanly and makes the difference between a steak with a deep, even crust and one that's grey and stewed.
            </p>
            <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
              You don't need a cupboard full of cookware. You need three or four good pans that earn their keep. This is a guide to the materials, the shapes, and how to choose the ones that will quietly improve everything you cook.
            </p>
          </div>
        </header>

        {/* Why the pan matters */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
            Why the pan matters
          </h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            A pan is a heat exchanger. Its job is to take energy from your hob and deliver it to the food, evenly and at the right rate. A thin, lightweight pan will hotspot, scorch and lose temperature the second food hits it. A heavy, well-made pan will hold its heat, sear properly and forgive small mistakes.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            The shape matters too. Sloped sides for tossing and reducing. Straight sides for braising and shallow frying. Wide and flat for searing. The right shape makes a technique easier; the wrong shape makes it nearly impossible.
          </p>
        </div>

        {/* The materials */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
            The materials
          </h2>
          <ul className="space-y-4 text-base md:text-lg text-foreground/90 leading-relaxed">
            <li>
              <strong className="text-foreground">Stainless steel</strong> — the workhorse. Durable, oven-safe, non-reactive and brilliant for building fond — the caramelised bits that make pan sauces sing. Look for a heavy tri-ply or five-ply pan with an aluminium core. Avoid thin, single-layer steel.
            </li>
            <li>
              <strong className="text-foreground">Cast iron</strong> — unbeatable for searing. Holds heat like nothing else, gives meat a proper crust, and only gets better with age. Heavy, slow to heat up, and needs seasoning rather than scrubbing. A 26cm or 30cm skillet is the one to own.
            </li>
            <li>
              <strong className="text-foreground">Carbon steel</strong> — the chef's secret. Sears almost as well as cast iron but lighter and more responsive. Brilliant for vegetables, eggs once seasoned, and anything that needs quick high heat. The pan most restaurant kitchens actually reach for.
            </li>
            <li>
              <strong className="text-foreground">Non-stick</strong> — for one job: eggs and delicate fish. Don't use it for searing, don't put it in a hot oven, and replace it when it starts to wear. A cheap non-stick pan replaced every couple of years will serve you better than an expensive one you try to make last forever.
            </li>
            <li>
              <strong className="text-foreground">Enamelled cast iron</strong> — slow cooking, braising, stews. A good casserole — a Dutch oven — will go from hob to oven to table and last decades. Worth the investment.
            </li>
            <li>
              <strong className="text-foreground">Copper</strong> — beautiful, responsive, expensive. Reacts to heat changes faster than anything else, which makes it the gold standard for sauces and sugar work. Niche, but lovely if you have the budget.
            </li>
          </ul>
        </div>

        {/* The pans worth owning */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
            The pans worth owning
          </h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-6">
            You can cook almost anything with these five pans. Start here and add as you need to.
          </p>
          <ul className="space-y-4 text-base md:text-lg text-foreground/90 leading-relaxed">
            <li>
              <strong className="text-foreground">A heavy stainless steel frying pan (28cm)</strong> — for chicken, pork, vegetables, pan sauces, anything that needs proper browning. The pan you'll reach for most.
            </li>
            <li>
              <strong className="text-foreground">A cast iron or carbon steel skillet (26–30cm)</strong> — for steak, lamb chops, smash burgers, anything that needs a serious crust. Hot, heavy, hardworking.
            </li>
            <li>
              <strong className="text-foreground">A small non-stick pan (20–24cm)</strong> — for eggs and fish. That's it. Keep it for those jobs only and it will last.
            </li>
            <li>
              <strong className="text-foreground">A medium saucepan (2–3 litres)</strong> — for sauces, rice, blanching vegetables, reducing stock. Stainless steel with a heavy base.
            </li>
            <li>
              <strong className="text-foreground">A heavy casserole or Dutch oven (4–6 litres)</strong> — for braises, stews, slow-cooked ragùs, soups, even bread. The pan that turns cheap cuts into something special.
            </li>
          </ul>
        </div>

        {/* How to choose well */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
            How to choose well
          </h2>
          <ul className="space-y-4 text-base md:text-lg text-foreground/90 leading-relaxed">
            <li>
              <strong className="text-foreground">Pick it up</strong> — a good pan feels heavy in the hand. Weight means thickness, and thickness means even heat. A pan that feels flimsy will cook flimsily.
            </li>
            <li>
              <strong className="text-foreground">Check the base</strong> — a flat, thick base sits firm on the hob and spreads heat evenly. Thin or warped bases hotspot and waste energy.
            </li>
            <li>
              <strong className="text-foreground">Look at the handle</strong> — it should be riveted, not glued or screwed. A loose handle on a hot pan is dangerous. Oven-safe handles open up a whole category of techniques.
            </li>
            <li>
              <strong className="text-foreground">Match it to your hob</strong> — if you cook on induction, the pan must be magnetic. Cast iron and most stainless steel work; aluminium and copper usually don't unless they have a steel base.
            </li>
            <li>
              <strong className="text-foreground">Buy fewer, better pans</strong> — one good pan you reach for every day is worth ten cheap ones gathering dust. Spend more, buy less, and look after what you have.
            </li>
          </ul>
        </div>

        {/* Common mistakes to avoid */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
            Common mistakes to avoid
          </h2>
          <ul className="space-y-4 text-base md:text-lg text-foreground/90 leading-relaxed">
            <li>
              <strong className="text-foreground">Using non-stick for searing</strong> — non-stick coatings break down at high heat and never give you the crust or fond you need. Reach for stainless steel, cast iron or carbon steel instead.
            </li>
            <li>
              <strong className="text-foreground">Overcrowding the pan</strong> — too much food drops the temperature and the pan starts to steam rather than sear. Cook in batches if you have to. Give the food room.
            </li>
            <li>
              <strong className="text-foreground">Not preheating</strong> — most pans need a minute or two on the hob before food goes in. A pan that isn't properly hot will stick, weep and brown badly.
            </li>
            <li>
              <strong className="text-foreground">Washing cast iron with soap</strong> — it strips the seasoning. Hot water, a stiff brush, dry on the hob, a thin film of oil. That's it.
            </li>
            <li>
              <strong className="text-foreground">Buying a full set</strong> — most matching cookware sets include pans you'll never use. Build your collection one pan at a time and only add what you actually need.
            </li>
          </ul>
        </div>

        {/* A note on care */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
            A note on care
          </h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            A good pan, looked after, will outlive you. Dry it properly. Don't shock a hot pan under cold water. Season your cast iron and carbon steel with a thin film of oil after every wash. Treat your pans well and they will, slowly and quietly, make you a better cook.
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

export default GuideChoosingPans;
