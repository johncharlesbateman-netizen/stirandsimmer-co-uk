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
