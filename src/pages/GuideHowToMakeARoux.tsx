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
            { id: "ratios-and-thickening-power", label: "Ratios" },
            { id: "how-to-avoid-lumps", label: "How to Avoid Lumps" },
            { id: "common-mistakes", label: "Common Mistakes" },
            { id: "where-to-use-it", label: "Where to Use It" },
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
          <h2 id="ratios-and-thickening-power" className="font-display text-3xl md:text-4xl text-foreground mb-6">Ratios</h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            For approximately 600ml (one pint) of finished sauce:
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            <strong className="text-foreground">Pouring sauce</strong> — 30g butter, 30g flour. The consistency of single cream. Correct for soups and light sauces.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            <strong className="text-foreground">Coating sauce</strong> — 45g butter, 45g flour. Thick enough to coat the back of a spoon. Correct for Béchamel over pasta, cauliflower cheese, croque monsieur.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            <strong className="text-foreground">Thick (panade) sauce</strong> — 60g butter, 60g flour. Used for binding croquettes and soufflé bases, not for pouring.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            If you are making a brown roux, increase the quantities by roughly half again to compensate for the reduced thickening power.
          </p>
        </div>

        {/* How to Avoid Lumps */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 id="how-to-avoid-lumps" className="font-display text-3xl md:text-4xl text-foreground mb-6">How to Avoid Lumps</h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            Lumps in a sauce come from one of two causes: cold liquid hitting a hot roux, or liquid added too fast before the starch has had time to disperse. Both are avoidable.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            Warm the liquid before it goes in. Add the first few splashes slowly and whisk hard. If the sauce is already thickening smoothly after the first addition, the rest can go in more quickly.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            If lumps do appear despite all of this, pass the finished sauce through a fine sieve before serving. Nobody will know. A lump-free sauce that has been sieved is indistinguishable from one that never lumped.
          </p>
        </div>

        {/* Common Mistakes */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 id="common-mistakes" className="font-display text-3xl md:text-4xl text-foreground mb-6">Common Mistakes</h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            <strong className="text-foreground">Not cooking the flour long enough.</strong> The most common error. An under-cooked roux tastes raw and starchy in the finished sauce. Always give a white roux at least two full minutes, even when you are in a hurry. The flavour of the dish depends on it.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            <strong className="text-foreground">Burning the roux.</strong> Once a roux goes black, it is bitter and cannot be rescued. Start again. As a roux darkens, lower the heat — the darker it gets, the faster it can burn. A brown roux particularly needs watching in its final minutes.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            <strong className="text-foreground">Adding cold liquid.</strong> Warm your milk or stock before it goes in. This single habit eliminates most lumping problems.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            <strong className="text-foreground">Walking away.</strong> A roux needs your attention, especially as it darkens. It can go from perfect to burnt in under a minute at high heat. Stay with it.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            <strong className="text-foreground">Using too light a pan.</strong> A thin saucepan creates hot spots that burn the flour in patches before the rest has coloured. Use the heaviest pan you have.
          </p>
        </div>

        {/* Where to Use It */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 id="where-to-use-it" className="font-display text-3xl md:text-4xl text-foreground mb-6">Where to Use It</h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            A roux is the backbone of three of{" "}
            <Link to="/guides/mother-sauces" className="underline underline-offset-4 hover:text-primary">the five French mother sauces</Link>
            {" "}— Béchamel, Velouté and Espagnole — and through them, dozens of the classic derivative sauces. It also thickens proper gravies, cheese sauces, lasagne, fish pie, gumbo and almost every classic comfort dish you can name.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            Understanding the roux is understanding why those dishes work — and how to adjust them. Too thick? Add more warm liquid. Too thin? Make a small fresh roux and whisk it in. Too pale in flavour? Cook the roux a little longer next time. Every variable is in your hands.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            For the bigger picture on how a roux fits into the layered approach to building a dish, see the guide on{" "}
            <Link to="/guides/how-to-build-flavour-from-scratch" className="underline underline-offset-4 hover:text-primary">how to build flavour from scratch</Link>
            . For where the roux leads in classical French cooking, see{" "}
            <Link to="/guides/mother-sauces" className="underline underline-offset-4 hover:text-primary">the five French mother sauces</Link>
            .
          </p>
        </div>

        <GuideFAQ slug="how-to-make-a-roux" />

        <GuideRelatedRecipes guideSlug="how-to-make-a-roux" />

        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            <strong className="text-foreground">Related Guides:</strong> The Five French Mother Sauces · How to Build Flavour from Scratch · How to Make a Proper Stock · French Cooking Techniques
          </p>
        </div>

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
