import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const SPICES = [
  {
    id: "cumin",
    name: "Cumin seeds",
    intro:
      "The earthy backbone of garam masala. Without cumin, the blend has no foundation.",
    method:
      "Use whole seeds, never pre-ground. Toast them in a dry pan over a medium heat until they darken a shade and release a warm, nutty aroma — about a minute. Shake the pan constantly. The moment you can smell them properly, take them off the heat.",
    uses: "Provides the savoury, earthy base note that anchors every other spice in the blend.",
    mistake:
      "Walking away from the pan. Cumin goes from fragrant to bitter in seconds.",
  },
  {
    id: "coriander",
    name: "Coriander seeds",
    intro:
      "The bright, citrussy counterweight to cumin. Where cumin grounds the blend, coriander lifts it.",
    method:
      "Toast whole seeds in the same dry pan until they smell sweet and slightly floral. They are more forgiving than cumin but still need watching. You will hear them crackle gently when they are ready.",
    uses: "Adds gentle sweetness and a fresh, almost lemony top note that stops the blend feeling heavy.",
    mistake:
      "Skipping the toast. Untoasted coriander tastes flat and dusty.",
  },
  {
    id: "cardamom",
    name: "Green cardamom",
    intro:
      "The most distinctive note in any garam masala. Use too little and the blend feels flat. Use too much and it tastes like soap.",
    method:
      "Crack the green pods open with the flat of a knife and remove the small black seeds inside. Discard the husks. Toast the seeds very briefly — thirty seconds at most — then grind. Always buy whole pods, never pre-ground cardamom.",
    uses: "Brings perfume, warmth and a subtle sweetness that ties the whole blend together.",
    mistake:
      "Throwing whole pods into the grinder. The papery husks are bitter and ruin the texture.",
  },
  {
    id: "cinnamon",
    name: "Cinnamon or cassia bark",
    intro:
      "The warmth in garam masala — quite literally, since garam means warm. Indian cooks usually use cassia rather than the sweeter Ceylon cinnamon.",
    method:
      "Break a stick into small pieces with the back of a heavy knife. Toast briefly with the other whole spices. Cassia is harder than Ceylon cinnamon, so make sure your grinder can handle it before adding the pieces whole.",
    uses: "Provides a deep, woody warmth that lingers on the palate after the brighter spices fade.",
    mistake:
      "Using ground cinnamon from a jar. The flavour is a fraction of what you get from a freshly broken stick.",
  },
  {
    id: "cloves",
    name: "Cloves",
    intro:
      "The most powerful spice in the blend. A little goes a very long way.",
    method:
      "Toast briefly with the other whole spices. Use sparingly — four or five cloves is enough for a batch made with a tablespoon each of cumin and coriander. Cloves dominate quickly if you are heavy-handed.",
    uses: "Adds a sharp, almost medicinal warmth that cuts through rich, slow-cooked dishes.",
    mistake:
      "Treating cloves like the other whole spices and using a teaspoonful. The blend will taste of nothing else.",
  },
  {
    id: "black-pepper",
    name: "Black peppercorns",
    intro:
      "Garam masala is meant to warm, and before chillies arrived in India from the Americas, black pepper did all the heavy lifting.",
    method:
      "Toast whole peppercorns with the other spices for thirty seconds or so. Grind with the rest of the blend. Use a generous pinch — pepper provides background heat rather than the front-of-mouth burn you get from chilli.",
    uses: "Gives the blend its gentle, lingering heat and rounds out the savoury notes.",
    mistake:
      "Reaching for the pre-ground pepper pot. It has lost most of its volatile oils and tastes dull.",
  },
  {
    id: "nutmeg-mace",
    name: "Nutmeg and mace",
    intro:
      "The optional but transformative finishing touches. Either or both will take your blend from good to memorable.",
    method:
      "Grate fresh nutmeg into the blend after grinding the other spices — never grind a whole nutmeg in a spice grinder, it will gum up the blades. Mace, the lacy red covering of the nutmeg, can be toasted and ground with the rest.",
    uses: "Adds a haunting, slightly sweet warmth that makes the blend feel finished and complete.",
    mistake:
      "Using too much. Nutmeg is potent — a quarter of a whole nut is plenty for a small batch.",
  },
];

const GuideGaramMasala = () => {
  return (
    <Layout>
      <Helmet>
        <title>Garam masala — a cook's guide | Stir and Simmer</title>
        <meta
          name="description"
          content="Garam masala demystified — the spices that go in, why they matter, how to toast and grind them, and the mistakes most home cooks make."
        />
        <link rel="canonical" href="https://stirandsimmer.co.uk/guides/garam-masala" />
        <meta property="og:title" content="Garam masala — a cook's guide | Stir and Simmer" />
        <meta
          property="og:description"
          content="Garam masala demystified — the spices that go in, why they matter, how to toast and grind them, and the mistakes most home cooks make."
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
              <span>Garam masala</span>
            </nav>
            <p className="micro-caption mb-4 text-primary">Guide</p>
            <h1 className="font-display text-4xl md:text-5xl leading-tight text-foreground mb-5">
              Garam masala — a cook's guide
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Make your own and you will never go back to the jar. The difference is not subtle.
            </p>
            <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
              Garam masala literally means warm spice mix. There is no single recipe — every region, every household, every cook has their own version. What follows is a reliable starting point and the principles you need to make it your own. Once you have toasted and ground a batch yourself, the dusty supermarket jar will never look the same again.
            </p>
          </div>
        </header>

        {/* Spice sections */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl">
          {SPICES.map((spice, i) => (
            <section
              key={spice.id}
              id={spice.id}
              className={`scroll-mt-24 ${i > 0 ? "mt-16 pt-16 border-t border-border" : ""}`}
            >
              <p className="micro-caption mb-3 text-primary">Spice {i + 1} of {SPICES.length}</p>
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
                {spice.name}
              </h2>
              <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-8">
                {spice.intro}
              </p>

              <h3 className="font-display text-xl md:text-2xl text-foreground mb-3">
                How to prepare it
              </h3>
              <p className="text-base text-foreground/90 leading-relaxed mb-8">
                {spice.method}
              </p>

              <h3 className="font-display text-xl md:text-2xl text-foreground mb-3">
                What it brings to the blend
              </h3>
              <p className="text-base text-foreground/90 leading-relaxed mb-8">
                {spice.uses}
              </p>

              <div
                className="rounded-lg p-5 md:p-6 border border-border"
                style={{ backgroundColor: "#FDF3E7" }}
              >
                <p className="text-xs uppercase tracking-widest font-semibold mb-2 text-muted-foreground">
                  The mistake most home cooks make
                </p>
                <p className="text-base md:text-lg text-foreground">
                  {spice.mistake}
                </p>
              </div>
            </section>
          ))}

          {/* Closing */}
          <div
            className="mt-16 rounded-lg p-6 md:p-8 border border-border"
            style={{ backgroundColor: "#FDF3E7" }}
          >
            <p className="text-base md:text-lg text-foreground leading-relaxed">
              Toast everything together in a dry pan, let it cool, then grind in a clean spice or coffee grinder until fine. Store in a small airtight jar away from the light and use within a month or two. After that the volatile oils fade and you are back where you started — with a tired jar of dust. Make small batches often. That is the whole secret.
            </p>
          </div>
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
              Head to The Kitchen Atlas and explore the Indian recipes waiting for your fresh garam masala.
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

export default GuideGaramMasala;
