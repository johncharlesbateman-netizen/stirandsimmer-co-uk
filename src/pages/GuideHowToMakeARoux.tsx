import Breadcrumbs from "@/components/Breadcrumbs";
import GuideSeo from "@/components/GuideSeo";
import GuideFAQ from "@/components/GuideFAQ";
import GuideRelatedGuides from "@/components/GuideRelatedGuides";
import GuideRelatedRecipes from "@/components/GuideRelatedRecipes";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import GuideTOC from "@/components/GuideTOC";
import { ArrowLeft } from "lucide-react";

const GuideHowToMakeARoux = () => {
  return (
    <Layout>
      <GuideSeo slug="how-to-make-a-roux" />

      <article className="bg-background">
        {/* Header */}
        <header className="border-b border-border">
          <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-20 max-w-3xl">
            <Breadcrumbs
              className="mb-6"
              items={[
                { label: "Home", href: "/" },
                { label: "Guides", href: "/guides" },
                { label: "How to make a roux" },
              ]}
            />
            <Link
              to="/guides"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Guides
            </Link>
            <p className="micro-caption mb-4 text-primary">Guide</p>
            <h1 className="font-display text-4xl md:text-5xl leading-tight text-foreground mb-5">
              How to Make a Roux
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Equal parts butter and flour — the small piece of technique that underpins Béchamel, Velouté, Espagnole and most classic sauces. The three stages, the ratios and the method explained simply.
            </p>
            <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
              A roux is two ingredients and one technique. Get it right and you have the foundation of Béchamel, Velouté, Espagnole, a proper gumbo and most of the gravies and pan sauces worth making at home. Get it wrong and you have raw-tasting paste with lumps. The difference is patience and heat.
            </p>
            <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
              This is not a complicated thing to learn. It is a fundamental one. Once a roux is instinctive, a whole category of cooking opens up.
            </p>
          </div>
        </header>

        <GuideTOC
          items={[
            { id: "what-a-roux-is", label: "What a Roux Is — and What It Does" },
            { id: "the-three-stages", label: "The Three Stages" },
            { id: "the-basic-method", label: "The Basic Method" },
            { id: "ratios-and-thickening-power", label: "Ratios and thickening power" },
            { id: "how-to-avoid-lumps", label: "How to avoid lumps" },
            { id: "common-mistakes", label: "Common mistakes" },
            { id: "where-to-use-it", label: "Where to use it" },
          ]}
        />

        {/* What a Roux Is — and What It Does */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 id="what-a-roux-is" className="font-display text-3xl md:text-4xl text-foreground mb-6">What a Roux Is — and What It Does</h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            A roux is equal parts fat and flour cooked together. The fat is almost always butter in classical French cooking, though oil or rendered fat will do the same job.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            Cooking the flour in fat does two things. First, it strips out the raw, pasty taste that uncooked flour gives to a sauce. Second, it coats the starch granules in fat so they disperse into liquid without clumping — the reason a properly made roux produces a smooth sauce while flour stirred directly into liquid almost always lumps.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            The longer you cook the roux, the darker and more flavoured it becomes — and the less it thickens. This trade-off is the whole craft of the roux. A white roux gives maximum thickening power and almost no flavour of its own. A dark brown roux gives the deep, toasted flavour of a gumbo or an Espagnole but thickens the sauce considerably less.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            You choose the stage based on what the dish needs.
          </p>
        </div>

        {/* The Three Stages */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 id="the-three-stages" className="font-display text-3xl md:text-4xl text-foreground mb-6">The Three Stages</h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            <strong className="text-foreground">White roux</strong> is cooked for two to three minutes over medium heat, just until the raw flour smell disappears but before any colour develops. The roux should smell faintly biscuity — clean and slightly nutty. This is the roux for Béchamel, cheese sauce, lasagne, fish pie and any pale, creamy sauce. It has the highest thickening power of the three.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            <strong className="text-foreground">Blond roux</strong> is cooked for five to seven minutes until the mixture turns a pale straw colour and the nutty smell deepens. Blond roux is used for Velouté — the mother sauce built on chicken, fish or veal stock — and for pale gravies and cream sauces where you want a little more flavour than a white roux provides without losing too much thickening power.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            <strong className="text-foreground">Brown roux</strong> is cooked for twenty minutes or more, stirring almost constantly, until the colour reaches a deep mahogany and the smell becomes toasty, rich and faintly chocolatey. This is the roux for Espagnole, proper onion gravy, gumbo and the rich, dark sauces of southern American cooking. It thickens less than a white roux — roughly half as much — but the flavour is in a different league entirely.
          </p>
        </div>

        {/* The Basic Method */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 id="the-basic-method" className="font-display text-3xl md:text-4xl text-foreground mb-6">The Basic Method</h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            Use a heavy-based pan — cast iron or thick stainless steel. Thin pans create hot spots and a roux burns quickly, especially as it darkens.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            Melt the butter over a medium heat. Once it is foaming and the foam is beginning to subside, add the flour all at once and stir immediately with a wooden spoon or flat whisk. The mixture will clump briefly and then come together into a smooth paste within thirty seconds.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            Keep stirring and keep the heat steady. The roux needs constant attention — walk away and it burns. Cook it to the stage the dish requires, keeping the heat moderate throughout. If you are going for brown roux, lower the heat as the colour deepens: the darker it gets, the faster it can tip from mahogany to black.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            Once the roux has reached the right stage, add the liquid. Warm your milk or stock before it goes in — not boiling, just warm. The sauce comes together in seconds rather than minutes when the temperatures are close.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            Add the liquid gradually at first. The first addition should be two or three tablespoons, whisked in vigorously until completely smooth before the next addition. Once the first few additions have gone in without lumping, you can add the rest in a steady stream, whisking constantly.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            Bring slowly to a simmer and cook for a further three to five minutes, stirring regularly. This finishes cooking out any remaining flour taste and lets the sauce reach its final consistency.
          </p>
        </div>

        {/* Ratios */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 id="ratios-and-thickening-power" className="font-display text-3xl md:text-4xl text-foreground mb-6">Ratios and thickening power</h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            For one pint (around 600ml) of liquid:
          </p>
          <ul className="space-y-2 text-base md:text-lg text-foreground/90 leading-relaxed list-disc pl-6">
            <li><strong className="text-foreground">Pouring sauce</strong> — 30g butter and 30g flour.</li>
            <li><strong className="text-foreground">Coating sauce</strong> — 45g butter and 45g flour.</li>
            <li><strong className="text-foreground">Thick (panade) sauce</strong> — 60g butter and 60g flour.</li>
          </ul>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mt-5">
            A brown roux thickens roughly half as much as a white one — compensate by using more, or accept a looser sauce in exchange for the deeper flavour.
          </p>
        </div>

        {/* How to avoid lumps */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 id="how-to-avoid-lumps" className="font-display text-3xl md:text-4xl text-foreground mb-6">How to avoid lumps</h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            Two rules. First, the liquid going in should be warm — cold milk hitting a hot roux is the classic recipe for lumps. Second, add the liquid gradually, whisking constantly, especially at the start. Once the first splash is smoothly incorporated, the rest goes in easily.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            If lumps do appear, pass the finished sauce through a fine sieve. Nobody will know.
          </p>
        </div>

        {/* Common mistakes */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 id="common-mistakes" className="font-display text-3xl md:text-4xl text-foreground mb-6">Common mistakes</h2>
          <ul className="space-y-4 text-base md:text-lg text-foreground/90 leading-relaxed">
            <li><strong className="text-foreground">Not cooking the flour long enough</strong> — under-cooked roux tastes raw and pasty. Always give it at least two full minutes.</li>
            <li><strong className="text-foreground">Burning the roux</strong> — once it goes from dark brown to black, you start again. The bitter taste cannot be hidden.</li>
            <li><strong className="text-foreground">Cold liquid into hot roux</strong> — warm the milk or stock first. The sauce comes together in seconds rather than minutes.</li>
            <li><strong className="text-foreground">Walking away</strong> — a roux needs your attention, especially as it darkens. It can turn in under a minute.</li>
          </ul>
        </div>

        {/* Where to use it */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 id="where-to-use-it" className="font-display text-3xl md:text-4xl text-foreground mb-6">Where to use it</h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            A roux is the backbone of three of{" "}
            <Link to="/guides/mother-sauces" className="underline underline-offset-4 hover:text-primary">the five French mother sauces</Link>
            {" "}— Béchamel, Velouté and Espagnole — and through them, dozens of daughter sauces. It also thickens proper gravies, cheese sauces, lasagne, fish pie, gumbo and almost every classic comfort dish you can name.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            For the bigger picture on how a roux fits into the layered approach of building a dish, see the guide on{" "}
            <Link to="/guides/how-to-build-flavour-from-scratch" className="underline underline-offset-4 hover:text-primary">how to build flavour from scratch</Link>.
          </p>
        </div>

        <GuideFAQ slug="how-to-make-a-roux" />

        <GuideRelatedRecipes guideSlug="how-to-make-a-roux" />

        <GuideRelatedGuides guideSlug="how-to-make-a-roux" />

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

export default GuideHowToMakeARoux;
