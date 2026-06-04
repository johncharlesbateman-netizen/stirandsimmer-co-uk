import Breadcrumbs from "@/components/Breadcrumbs";
import GuideSeo from "@/components/GuideSeo";
import GuideFAQ from "@/components/GuideFAQ";
import GuideRelatedGuides from "@/components/GuideRelatedGuides";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import GuideTOC from "@/components/GuideTOC";
import { ArrowLeft } from "lucide-react";

const GuideHowToBuildFlavourFromScratch = () => {
  return (
    <Layout>
      <GuideSeo slug="how-to-build-flavour-from-scratch" />

      <article className="bg-background">
        {/* Header */}
        <header className="border-b border-border">
          <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-20 max-w-3xl">
            <Breadcrumbs
              className="mb-6"
              items={[
                { label: "Home", href: "/" },
                { label: "Guides", href: "/guides" },
                { label: "How to build flavour from scratch" },
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
              How to Build Flavour from Scratch
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              The logic of browning, deglazing, reducing and finishing — and why the same principles apply whether you're making a French braise, an Indian curry or a Thai stir-fry.
            </p>
            <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
              There is a reason that some food tastes of something and some food merely tastes of its ingredients. The difference is almost never about the quality of what went in. It is almost always about what happened to it on the way.
            </p>
            <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
              Flavour in cooking is not found — it is built. Layer by layer, decision by decision, from the moment the pan heats up to the moment the dish reaches the table. Every great cuisine in the world understands this, though each one goes about it differently.
            </p>
            <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
              This guide explains the underlying logic. Once you understand it, you will cook differently — not because you have learned a new recipe, but because you understand what you are actually trying to do.
            </p>
          </div>
        </header>

        <GuideTOC
          items={[
            { id: "the-foundation-why-heat-changes-everything", label: "The Foundation: Why Heat Changes Everything" },
            { id: "browning-in-european-cooking", label: "Browning in European Cooking" },
            { id: "browning-in-indian-cooking-the-bhuna", label: "Browning in Indian Cooking: The Bhuna" },
            { id: "what-flavour-actually-is", label: "What flavour actually is" },
            { id: "the-foundation-fat-and-aromatics", label: "The foundation — fat and aromatics" },
            { id: "the-base-stocks-and-roux", label: "The base — stocks and roux" },
            { id: "the-maillard-layer", label: "The Maillard layer" },
            { id: "salt-acid-and-balance", label: "Salt, acid and balance" },
            { id: "spices-herbs-and-finishing", label: "Spices, herbs and finishing" },
            { id: "how-other-cuisines-build-flavour", label: "How other cuisines build flavour" },
            { id: "common-mistakes", label: "Common mistakes" },
            { id: "putting-it-all-together", label: "Putting it all together" },
          ]}
        />

        {/* The Foundation: Why Heat Changes Everything */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 id="the-foundation-why-heat-changes-everything" className="font-display text-3xl md:text-4xl text-foreground mb-6">The Foundation: Why Heat Changes Everything</h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            Raw ingredients taste of themselves. Cooked ingredients — properly cooked — taste of something more.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            The reason is chemistry. When proteins and sugars are exposed to high heat, they undergo what is known as the Maillard reaction: a complex series of chemical changes that produce hundreds of new flavour compounds. This is what happens when meat sears, when onions soften and colour, when spices hit a hot pan. It is not burning. It is transformation.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            The Maillard reaction requires dry, high heat. This is why a piece of meat dropped into a cold, wet pan steams rather than sears — and why it tastes flat as a result. The surface must be dry, the pan must be hot, and the heat must have time to work.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            This single principle — that browning creates flavour — sits at the heart of cooking across every cuisine that has ever produced something worth eating.
          </p>
        </div>

        {/* Browning in European Cooking */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 id="browning-in-european-cooking" className="font-display text-3xl md:text-4xl text-foreground mb-6">Browning in European Cooking</h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            In French and Italian cooking, the process begins with the soffritto or mirepoix — onion, carrot and celery cooked slowly in fat until softened and lightly coloured. This is not just a way of softening vegetables. It is the first layer of flavour in the dish, the foundation on which everything else is built.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            Meat is seared separately, at high heat, until a deep brown crust forms on every surface. That crust is flavour. It is not a seal — the old idea that searing "seals in juices" has been disproven — but it is an enormous concentration of taste that cannot be achieved any other way.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            The fat used for browning matters. Butter adds richness and its own flavour. Olive oil brings fruitiness. Rendered animal fat — duck fat, lard, beef dripping — adds depth that vegetable oils cannot match.
          </p>
        </div>

        {/* Browning in Indian Cooking: The Bhuna */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 id="browning-in-indian-cooking-the-bhuna" className="font-display text-3xl md:text-4xl text-foreground mb-6">Browning in Indian Cooking: The Bhuna</h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            Indian cooking has its own version of this principle, and it is arguably even more systematic.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            The bhuna is the process of cooking down onions, garlic, ginger and spice paste together in oil over medium-high heat, stirring constantly, until the mixture is deeply caramelised, the water has completely evaporated, and the oil begins to separate and pool around the edges of the paste. This can take twenty to thirty minutes. It cannot be rushed.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            What you are doing during the bhuna is building the flavour base of the entire dish. The raw sharpness of the onion becomes sweet and complex. The garlic loses its bite and becomes mellow. The spices bloom in the hot oil, their fat-soluble flavour compounds releasing in a way that water-based cooking cannot achieve.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            A curry made with a properly cooked bhuna base and one made with onions that have only softened without colouring taste like different dishes. They are, in a sense, different dishes.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            The spices themselves are added in sequence — whole spices first into the hot oil (mustard seeds, cardamom, cloves, dried chillies), which crackle and release their flavour before the onions go in; ground spices later, when the paste is already well-coloured, so they cook briefly in the oil without burning.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            This is layering. Each addition builds on the last.
          </p>
        </div>

        {/* What flavour actually is */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 id="what-flavour-actually-is" className="font-display text-3xl md:text-4xl text-foreground mb-6">What flavour actually is</h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            Flavour is the sum of taste, aroma and texture. Taste is what the tongue picks up — salt, sweet, sour, bitter and umami. Aroma is what the nose does, and it carries most of the work. Texture is the quiet partner that decides whether something feels finished or thin.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            Building flavour from scratch means stacking those elements deliberately rather than hoping they appear at the end.
          </p>
        </div>

        {/* The foundation — fat and aromatics */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 id="the-foundation-fat-and-aromatics" className="font-display text-3xl md:text-4xl text-foreground mb-6">The foundation — fat and aromatics</h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            Almost every savoury dish in the world starts the same way — fat warmed in a pan, then aromatics softened in it. The French call it mirepoix: onion, carrot and celery. The Italians sweat soffritto. The Spanish build sofrito with tomato and pepper. The Cajuns have their holy trinity of onion, celery and green pepper.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            The principle is the same everywhere — gentle heat, enough fat, and time. Aromatics cooked properly give a sweet, rounded base that no amount of seasoning later can replicate.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            Take your time here. Onions softened for fifteen minutes are not the same as onions softened for three. This single step is where most home cooking quietly falls down.
          </p>
        </div>

        {/* The base — stocks and roux */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 id="the-base-stocks-and-roux" className="font-display text-3xl md:text-4xl text-foreground mb-6">The base — stocks and roux</h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            Once your aromatics are soft, the next layer is liquid — and what you choose changes everything. Water adds nothing. A proper stock adds body, savouriness and depth that nothing in a carton can match. If you only learn one thing from this guide, learn how to{" "}
            <Link to="/guides/proper-stock" className="underline underline-offset-4 hover:text-primary">make a proper stock</Link>{" "}
            and keep some in the freezer.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            For thickening and binding, the classic French answer is a roux — equal parts butter and flour cooked together until the raw taste is gone. A pale roux gives you a Béchamel; a deeper, blonder one gives you a Velouté; a dark brown roux underpins a proper gumbo. The full method is in the guide on{" "}
            <Link to="/guides/how-to-make-a-roux" className="underline underline-offset-4 hover:text-primary">how to make a roux</Link>.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            Stock plus roux is the spine of classical western cooking. It is also why{" "}
            <Link to="/guides/mother-sauces" className="underline underline-offset-4 hover:text-primary">the mother sauces</Link>{" "}
            are worth learning — once you understand them, hundreds of dishes stop being mysterious.
          </p>
        </div>

        {/* The Maillard layer */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 id="the-maillard-layer" className="font-display text-3xl md:text-4xl text-foreground mb-6">The Maillard layer</h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            Browning is flavour. When proteins and sugars meet high, dry heat they undergo the Maillard reaction — the same chemistry that gives you the crust on a steak, the colour on a roast chicken, the golden edges of an onion. Hundreds of new aromatic compounds are created that simply do not exist in the raw ingredient.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            Get your pan hot enough. Dry your meat. Do not crowd. And when those browned bits — the fond — stick to the bottom of the pan, do not throw them away. Deglaze with wine, stock or vinegar and scrape them up; that is pure flavour going straight into your sauce.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            Deglazing and the rest of the classical toolkit are covered in the guide to{" "}
            <Link to="/guides/french-techniques" className="underline underline-offset-4 hover:text-primary">French cooking techniques</Link>.
          </p>
        </div>

        {/* Salt, acid and balance */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 id="salt-acid-and-balance" className="font-display text-3xl md:text-4xl text-foreground mb-6">Salt, acid and balance</h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            Salt is the amplifier. It does not add flavour so much as bring out the flavour already there. Season early, taste, season again — never just at the end.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            Acid is the spark. A squeeze of lemon, a splash of vinegar, a spoonful of yoghurt — acid lifts everything and stops a dish tasting flat or heavy. If something is "missing" and you cannot work out what, the answer is almost always acid.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            Fat carries flavour. Sweetness rounds edges. Bitterness adds interest. The goal is balance — no single element shouting, all of them in conversation.
          </p>
        </div>

        {/* Spices, herbs and finishing */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 id="spices-herbs-and-finishing" className="font-display text-3xl md:text-4xl text-foreground mb-6">Spices, herbs and finishing</h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            Whole spices toasted in a dry pan and then ground release flavours that pre-ground supermarket jars never will. Bloom them in hot fat at the start of cooking to draw their oils out.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            Hardy herbs — thyme, rosemary, bay — go in early and cook with the dish. Soft herbs — parsley, basil, coriander, dill — go in at the very end so their aroma survives.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            Finishing touches matter. A drizzle of good olive oil, a knob of cold butter swirled into a sauce, a scattering of flaky salt, a final grating of zest. None of these add bulk — they add the top notes that make a dish taste alive.
          </p>
        </div>

        {/* How other cuisines build flavour */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 id="how-other-cuisines-build-flavour" className="font-display text-3xl md:text-4xl text-foreground mb-6">How other cuisines build flavour</h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            The western model — fat, mirepoix, stock, roux, reduction — is one answer. It is not the only one.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            <strong className="text-foreground">
              <Link to="/kitchen-atlas/india" className="underline underline-offset-4 hover:text-primary">Indian cuisine</Link>
            </strong>{" "}
            builds depth through the tarka — whole spices bloomed in hot ghee or oil, often poured over a dish at the end as well as cooked into it. Onions cooked patiently to a deep brown, ginger and garlic pastes, tomato reduced to a jammy paste, then layered spice blends like garam masala added at different stages.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            <strong className="text-foreground">
              <Link to="/kitchen-atlas/thailand" className="underline underline-offset-4 hover:text-primary">Thai cuisine</Link>
            </strong>{" "}
            works almost entirely without dairy or long-cooked stocks. Flavour is built from pounded fresh pastes of lemongrass, galangal, chilli and shallot, then balanced live on the plate with fish sauce, palm sugar and lime — salt, sweet, sour and heat in constant conversation.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            <strong className="text-foreground">
              <Link to="/kitchen-atlas/france" className="underline underline-offset-4 hover:text-primary">French cuisine</Link>
            </strong>{" "}
            is the most codified of the three — mirepoix, fond, deglaze, reduce, mount with butter. It is the system the whole western canon is built on, and the one the rest of this guide leans on most heavily.
          </p>
        </div>

        {/* Common mistakes */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 id="common-mistakes" className="font-display text-3xl md:text-4xl text-foreground mb-6">Common mistakes</h2>
          <ul className="space-y-4 text-base md:text-lg text-foreground/90 leading-relaxed">
            <li><strong className="text-foreground">Rushing the aromatics.</strong> Three minutes of frantic stirring is not the same as fifteen minutes of patient sweating. The base sets the ceiling for everything that follows.</li>
            <li><strong className="text-foreground">Cooking with water when stock would do.</strong> Risotto in water tastes like rice in water. Same dish, same effort — the only difference is the liquid.</li>
            <li><strong className="text-foreground">Not browning properly.</strong> A pale, grey piece of meat in a pale, grey sauce has skipped the single biggest flavour upgrade available to a home cook.</li>
            <li><strong className="text-foreground">Seasoning only at the end.</strong> Salt added late sits on the surface. Salt added in layers gets into the food.</li>
            <li><strong className="text-foreground">Forgetting the acid.</strong> Almost every savoury dish benefits from a final hit of lemon, vinegar or wine. Try it before you decide it does not need it.</li>
          </ul>
        </div>

        {/* Putting it all together */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 id="putting-it-all-together" className="font-display text-3xl md:text-4xl text-foreground mb-6">Putting it all together</h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            A good cook is not somebody who knows hundreds of recipes. It is somebody who understands the order in which flavour is built and applies the same handful of moves to whatever is in the kitchen.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            Fat, then aromatics, then browning, then a proper liquid, then patient cooking, then balance — salt, acid, sweetness, heat. Finish with something fresh. Taste at every stage. That is the whole game.
          </p>
        </div>

        <GuideFAQ slug="how-to-build-flavour-from-scratch" />

        <GuideRelatedGuides guideSlug="how-to-build-flavour-from-scratch" />

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

export default GuideHowToBuildFlavourFromScratch;
