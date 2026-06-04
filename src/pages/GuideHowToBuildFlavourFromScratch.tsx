import Breadcrumbs from "@/components/Breadcrumbs";
import GuideSeo from "@/components/GuideSeo";
import GuideFAQ from "@/components/GuideFAQ";
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
            { id: "browning-in-thai-cooking-frying-the-paste", label: "Browning in Thai Cooking: Frying the Paste" },
            { id: "deglazing-the-technique-that-wastes-nothing", label: "Deglazing: The Technique That Wastes Nothing" },
            { id: "reducing-concentrating-what-you-have-built", label: "Reducing: Concentrating What You Have Built" },
            { id: "finishing-the-final-layer", label: "Finishing: The Final Layer" },
            { id: "how-it-all-connects", label: "How It All Connects" },
            { id: "a-note-on-patience", label: "A Note on Patience" },
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

        {/* Browning in Thai Cooking: Frying the Paste */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 id="browning-in-thai-cooking-frying-the-paste" className="font-display text-3xl md:text-4xl text-foreground mb-6">Browning in Thai Cooking: Frying the Paste</h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            Thai cooking approaches the same principle differently again, but the logic is identical.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            A Thai curry does not begin with the liquid. It begins with the paste — red, green, yellow or massaman — fried in the thick, fatty top layer of coconut cream over high heat, stirred constantly, until it is fragrant and beginning to separate from the cream. The paste is cooked, not just warmed. The raw edges of galangal, lemongrass, shrimp paste and chilli are transformed by the heat before anything else enters the pan.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            Only once the paste is properly cooked — fragrant, slightly darkened, with oil pooling at the edges — does the rest of the coconut milk go in. This sequence is not traditional habit. It is the correct way to build flavour.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            A Thai curry made by dumping paste and coconut milk in together from the start tastes thinner and flatter than one where the paste has been properly fried first. The difference, again, is the Maillard reaction doing its work.
          </p>
        </div>

        {/* Deglazing: The Technique That Wastes Nothing */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 id="deglazing-the-technique-that-wastes-nothing" className="font-display text-3xl md:text-4xl text-foreground mb-6">Deglazing: The Technique That Wastes Nothing</h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            After browning — whether meat, vegetables or a spice paste — there is almost always something left in the pan. A dark, sticky, slightly caramelised residue clinging to the bottom and sides. This is not a problem to be cleaned up. It is concentrated flavour waiting to be used.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            Deglazing is the process of dissolving this residue into a liquid — wine, stock, cider, water, tamarind, coconut milk, or fish sauce — by adding it to the hot pan and scraping as it sizzles. The residue dissolves completely into the liquid within seconds, transforming a few tablespoons of something thin into the flavoured base of a sauce. In French cooking, deglazing with wine or stock after searing a piece of meat is the first step in almost every pan sauce and braise. The liquid picks up everything the browning created and carries it into the finished dish.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            In Indian cooking, the equivalent moment is when tomatoes or yogurt are added to a bhuna base — the liquid ingredients hit the hot, dry paste and dissolve the caramelised residue from the pan into the sauce.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            In Thai cooking, it happens when the full coconut milk goes into the pan after the paste has been fried — the liquid lifts everything the frying created and incorporates it into the curry.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            Different liquids. Different cuisines. The same principle.
          </p>
        </div>

        {/* Reducing: Concentrating What You Have Built */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 id="reducing-concentrating-what-you-have-built" className="font-display text-3xl md:text-4xl text-foreground mb-6">Reducing: Concentrating What You Have Built</h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            Once liquid has been added to a flavour base, the next task is often to reduce it — to simmer off water and concentrate the flavour compounds that remain.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            Reduction is not complicated, but it requires patience and attention. A sauce that has been properly reduced has body, depth and intensity. A sauce that has not has none of these things.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            In European cooking, wine is almost always reduced before stock is added — this drives off the harsh alcohol and concentrates the fruit and acidity. The stock then reduces further with the meat or vegetables, picking up their flavour as it goes.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            In Indian cooking, the addition of tomatoes to a bhuna base is followed by a period of cooking down — simmering until the tomatoes have broken completely and the sauce has reduced to a thick, concentrated paste that coats everything in the pan. This stage, sometimes called the masala, is where the character of the curry is established.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            In Thai cooking, the curry sauce often reduces gently as it cooks, the coconut cream thickening and intensifying around the protein or vegetables. The balance of sweet, sour, salt and heat is adjusted at this stage — not at the beginning.
          </p>
        </div>

        {/* Finishing: The Final Layer */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 id="finishing-the-final-layer" className="font-display text-3xl md:text-4xl text-foreground mb-6">Finishing: The Final Layer</h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            The last stage of flavour building is finishing — the adjustments made just before the dish is served that bring everything into balance and add the final layer of complexity.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            In French cooking, finishing often means mounting a sauce with cold butter — whisking small cubes of butter into a hot, reduced sauce off the heat to give it gloss, richness and a rounded flavour that nothing else provides. A squeeze of lemon or a splash of vinegar may follow, to lift what the richness has flattened.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            In Indian cooking, finishing might mean a final tarka — whole spices and dried chilli fried briefly in hot ghee and poured over the dish at the last moment. Or a handful of fresh coriander and a squeeze of lime. Or a swirl of cream. Each addition is deliberate.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            In Thai cooking, the finishing is arguably the most precise of all: fish sauce for salt and depth, lime juice for acidity, palm sugar for sweetness, fresh Thai basil or kaffir lime leaves for fragrance. The cook tastes and adjusts until all four elements are in balance — not any one of them dominant, but each one present and harmonious.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            The principle is the same everywhere: the final moments of cooking are not an afterthought. They are where a good dish becomes a memorable one.
          </p>
        </div>

        {/* How It All Connects */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 id="how-it-all-connects" className="font-display text-3xl md:text-4xl text-foreground mb-6">How It All Connects</h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            The guides on this site covering stocks, mother sauces, roux, and French techniques are all, in different ways, about the same thing: using the principles above to build flavour systematically rather than by accident.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            Stock is reduced browning — bones and vegetables that have been slowly coaxed to give up everything they contain into a liquid that becomes the backbone of hundreds of dishes.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            A mother sauce is a reduced, flavoured liquid that has been finished into something versatile and stable — the logic of deglazing and reducing applied at scale.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            A roux is a way of building body and flavour simultaneously, the fat carrying the flavour of butter or other fat into the sauce as it thickens.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            Whether the dish is a coq au vin, a lamb rogan josh or a green Thai curry, the cook is doing the same things: browning to create flavour, deglazing to capture it, reducing to concentrate it, and finishing to balance it.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            The ingredients change. The cuisine changes. The logic does not.
          </p>
        </div>

        {/* A Note on Patience */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 id="a-note-on-patience" className="font-display text-3xl md:text-4xl text-foreground mb-6">A Note on Patience</h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            The single most common reason that home cooking disappoints is impatience — turning the heat up to speed things along, adding liquid before the browning is done, serving before the reduction has finished. The food that results tastes of effort without the reward that patience would have given it.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            Every technique in this guide requires time. The bhuna cannot be rushed. The braise needs its hours. The reduction must not be forced with high heat that burns rather than concentrates.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            Give the process time. The flavour will find you.
          </p>
        </div>

        <GuideFAQ slug="how-to-build-flavour-from-scratch" />

        {/* Related Guides */}
        <section className="border-t border-border py-12 md:py-16">
          <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-3xl">
            <h2 className="heading-section mb-8 md:mb-10">Related Guides</h2>
            <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
              <Link to="/guides/proper-stock" className="editorial-link underline underline-offset-4 hover:text-primary">How to Make a Proper Stock</Link>{" "}
              ·{" "}
              <Link to="/guides/mother-sauces" className="editorial-link underline underline-offset-4 hover:text-primary">The Mother Sauces</Link>{" "}
              ·{" "}
              <Link to="/guides/how-to-make-a-roux" className="editorial-link underline underline-offset-4 hover:text-primary">How to Make a Roux</Link>{" "}
              ·{" "}
              <Link to="/guides/french-techniques" className="editorial-link underline underline-offset-4 hover:text-primary">French Cooking Techniques</Link>
            </p>
          </div>
        </section>

        {/* Kitchen Atlas links */}
        <div className="border-t border-border">
          <div className="container mx-auto px-6 md:px-12 lg:px-20 py-8 md:py-10 max-w-3xl">
            <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
              See these principles in action in the Kitchen Atlas:{" "}
              <Link to="/kitchen-atlas/india" className="editorial-link underline underline-offset-4 hover:text-primary">Indian Cuisine</Link>{" "}
              ·{" "}
              <Link to="/kitchen-atlas/thailand" className="editorial-link underline underline-offset-4 hover:text-primary">Thai Cuisine</Link>{" "}
              ·{" "}
              <Link to="/kitchen-atlas/france" className="editorial-link underline underline-offset-4 hover:text-primary">French Cuisine</Link>
            </p>
          </div>
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

export default GuideHowToBuildFlavourFromScratch;
