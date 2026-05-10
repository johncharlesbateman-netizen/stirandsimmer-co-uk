import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const TECHNIQUES = [
  {
    id: "mise-en-place",
    name: "Mise en place",
    french: "“putting in place”",
    intro:
      "The single most important habit any home cook can adopt. Before a pan touches the heat, every ingredient is weighed, chopped, measured and arranged within arm's reach. It sounds fussy. It is the opposite — it is the thing that lets you cook calmly.",
    method:
      "Read the recipe through twice before you start. Lay out your bowls, boards and utensils. Prep every ingredient — chop, measure, juice, grate — and place each in its own small bowl or pile. Only then do you light the hob. Once you cook, you cook; you do not stop to peel garlic while the onions are catching.",
    use: "Every single time you cook anything more involved than scrambled eggs.",
    mistake:
      "Starting to cook before everything is prepped, then burning the garlic while you scramble to chop the parsley.",
  },
  {
    id: "julienne",
    name: "Julienne",
    french: "fine matchstick cut, roughly 3mm × 3mm × 5cm",
    intro:
      "A precise, even matchstick. Julienne vegetables cook quickly and evenly, dress beautifully in salads, and look unmistakably professional on the plate.",
    method:
      "Square off your vegetable so it sits flat on the board. Slice it lengthways into thin planks of even thickness. Stack two or three planks at a time and slice down through them lengthways into matchsticks. Keep your knuckles tucked and your knife tip on the board.",
    use: "Carrot and courgette ribbons for salads, raw vegetables for slaws and garnishes, stir fries where even cooking matters.",
    mistake:
      "Skipping the squaring-off step. If your vegetable rolls on the board your matchsticks will be uneven and they will cook unevenly.",
  },
  {
    id: "brunoise",
    name: "Brunoise",
    french: "fine dice, roughly 3mm cubes",
    intro:
      "Brunoise is what you get when you take a julienne and turn it ninety degrees. A tiny, even dice that melts into a sauce or scatters as a jewel-like garnish.",
    method:
      "Cut your vegetable into a julienne first. Gather the matchsticks together, line them up neatly, and slice across them at the same fine spacing. The result is small, perfectly even cubes.",
    use: "Aromatic bases for sauces and soups, garnishes for consommés and tartares, anywhere you want vegetables to disappear into a dish while still contributing flavour.",
    mistake:
      "Trying to brunoise without first cutting a clean julienne. The shortcut never works — the dice ends up ragged and uneven.",
  },
  {
    id: "chiffonade",
    name: "Chiffonade",
    french: "“made of rags” — fine ribbons of leaves",
    intro:
      "Fine ribbons of soft herbs or leaves. The right cut for basil, mint, sorrel and the leafier brassicas. Done well, it looks like the food was finished by someone who knew what they were doing.",
    method:
      "Stack the leaves on top of each other, largest at the bottom. Roll them tightly into a cigar. Slice across the roll with a sharp knife — the thinner the slice the finer the ribbon. Do it just before serving so the cut edges stay green.",
    use: "Basil over tomatoes and pasta, mint on peas and lamb, finely sliced spring greens or kale for soups and pastas.",
    mistake:
      "Cutting basil with a blunt knife. It bruises, blackens and weeps. Sharp knife, single confident pass.",
  },
  {
    id: "beurre-blanc",
    name: "Beurre blanc",
    french: "“white butter” — an emulsified butter sauce",
    intro:
      "A glossy, ivory-coloured sauce of butter, shallot and acid. No flour, no cream — just a stable emulsion that makes you look like you trained somewhere serious.",
    method:
      "Reduce a splash of dry white wine and white wine vinegar with a finely chopped shallot until almost dry. Take the pan off the heat. Whisk in cold cubed unsalted butter a piece at a time, returning to a very low heat as needed, until the sauce is thick, pale and glossy. Season with salt and a squeeze of lemon. Serve immediately.",
    use: "Poached or pan-fried fish, scallops, asparagus, anything delicate that wants richness without heaviness.",
    mistake:
      "Letting the pan get too hot. The emulsion splits and you are left with greasy, broken butter. Low heat, cold butter, patience.",
  },
  {
    id: "flambe",
    name: "Flambé",
    french: "“flamed” — igniting alcohol in the pan",
    intro:
      "A quick burst of flame that burns off raw alcohol and leaves behind concentrated flavour. Looks dramatic. Is, in truth, a thirty-second technique once you have done it once.",
    method:
      "Have everything ready before you start. Take the pan off the heat — always — before adding the alcohol. Add a measured shot of brandy, rum or whisky. Return the pan to the heat or tilt it gently towards the gas flame, or use a long match. Stand back. Let the flames burn down on their own; do not stir until they die.",
    use: "Steak Diane, crêpes Suzette, pan sauces with brandy, prawns or chicken livers in cognac.",
    mistake:
      "Pouring alcohol into a pan over a live flame. It can flash up the bottle. Always pour off the heat, into the pan, then ignite.",
  },
  {
    id: "deglaze",
    name: "Déglaze",
    french: "“to unstick” — lifting the fond from the pan",
    intro:
      "Those dark, sticky brown bits left in the pan after searing meat are not mess to be scrubbed away. They are flavour — concentrated, caramelised and waiting for liquid. Deglazing is how you turn them into a sauce.",
    method:
      "Once your meat is cooked and resting, pour off any excess fat but leave the brown crust — the fond — in the pan. Return the pan to a medium heat and add a splash of liquid: wine, stock, vinegar or even water. Scrape vigorously with a wooden spoon as the liquid bubbles, lifting all the fond into the sauce. Reduce to the consistency you want, finish with butter or cream if you like, and pour over the meat.",
    use: "After searing steak, chicken, pork chops, lamb — any time you have a pan with a good crust at the bottom.",
    mistake:
      "Letting the pan cool before deglazing, or worse, washing it. The fond sets hard and refuses to lift. Deglaze while the pan is still hot.",
  },
];

const SUMMARY = TECHNIQUES.map((t) => ({
  name: t.name,
  short: {
    "mise-en-place": "Prep everything before you light the hob.",
    julienne: "Even, fine matchsticks.",
    brunoise: "A tiny, perfectly even dice.",
    chiffonade: "Fine ribbons of soft leaves and herbs.",
    "beurre-blanc": "A glossy emulsified butter sauce.",
    flambe: "Igniting alcohol to burn off and concentrate.",
    deglaze: "Turning pan crust into a sauce with liquid.",
  }[t.id]!,
}));

const GuideFrenchTechniques = () => {
  return (
    <Layout>
      <Helmet>
        <title>French cooking techniques every home cook should know — Stir and Simmer</title>
        <meta
          name="description"
          content="Seven essential French cooking techniques explained simply — mise en place, julienne, brunoise, chiffonade, beurre blanc, flambé and déglaze. Master these and transform your cooking."
        />
        <link rel="canonical" href="https://stirandsimmer.co.uk/guides/french-techniques" />
        <meta property="og:title" content="French cooking techniques every home cook should know — Stir and Simmer" />
        <meta
          property="og:description"
          content="Seven essential French cooking techniques explained simply — mise en place, julienne, brunoise, chiffonade, beurre blanc, flambé and déglaze."
        />
      </Helmet>

      <article className="bg-background">
        {/* Dark hero */}
        <header className="w-full" style={{ backgroundColor: "#1a0e00" }}>
          <div className="container mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24 max-w-3xl">
            <nav className="text-xs uppercase tracking-widest mb-6" style={{ color: "#a08c6a" }}>
              <Link to="/" className="hover:underline">Home</Link>
              <span className="mx-2">›</span>
              <Link to="/guides" className="hover:underline">Guides</Link>
              <span className="mx-2">›</span>
              <span>French techniques</span>
            </nav>
            <p className="micro-caption mb-4" style={{ color: "#e0a558" }}>Guide</p>
            <h1
              className="font-display text-4xl md:text-5xl leading-tight mb-5"
              style={{ color: "#f5e9d7" }}
            >
              French cooking techniques every home cook should know
            </h1>
            <p className="text-lg md:text-xl" style={{ color: "#d9c7a8" }}>
              You do not need to train in a professional kitchen. But learning a handful of French techniques will transform the way you cook — and the way your food looks and tastes.
            </p>
          </div>
        </header>

        {/* At a glance summary */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 pt-12 md:pt-16 max-w-3xl">
          <div
            className="rounded-lg p-6 md:p-8 border border-border"
            style={{ backgroundColor: "#FDF3E7" }}
          >
            <p className="text-xs uppercase tracking-widest font-semibold mb-5 text-muted-foreground">
              At a glance — the seven techniques
            </p>
            <ul className="divide-y divide-border/60">
              {SUMMARY.map((s) => (
                <li
                  key={s.name}
                  className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-1 sm:gap-6 py-3"
                >
                  <span className="font-display text-base md:text-lg text-foreground">
                    {s.name}
                  </span>
                  <span className="text-sm md:text-base text-foreground/80">
                    {s.short}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Intro */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-10 md:py-12 max-w-3xl">
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            French cuisine gave the world not just its greatest sauces but its greatest vocabulary. The techniques below are not complicated. They are precise. And precision, once learned, becomes instinct. Work through these one at a time and your cooking will quietly but fundamentally change.
          </p>
        </div>

        {/* Technique sections */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 pb-12 md:pb-16 max-w-3xl">
          {TECHNIQUES.map((t, i) => (
            <section
              key={t.id}
              id={t.id}
              className={`scroll-mt-24 ${i > 0 ? "mt-16 pt-16 border-t border-border" : ""}`}
            >
              <span
                className="inline-block text-xs uppercase tracking-widest font-semibold rounded-full px-3 py-1 mb-4"
                style={{ backgroundColor: "#FDF3E7", color: "#a55a00" }}
              >
                Technique {i + 1} of 7
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-1">
                {t.name}
              </h2>
              <p className="italic text-sm md:text-base text-muted-foreground mb-6">
                {t.french}
              </p>

              <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-8">
                {t.intro}
              </p>

              <h3 className="font-display text-xl md:text-2xl text-foreground mb-3">
                How to do it
              </h3>
              <p className="text-base text-foreground/90 leading-relaxed mb-6">
                {t.method}
              </p>

              <p className="italic text-sm md:text-base text-muted-foreground mb-6">
                Where you will use it — {t.use}
              </p>

              <hr className="border-0 h-px my-8" style={{ backgroundColor: "#e0a558" }} />

              <div
                className="rounded-r-lg p-5 md:p-6 border-l-4"
                style={{ backgroundColor: "#FDF3E7", borderLeftColor: "#e0a558" }}
              >
                <p className="text-xs uppercase tracking-widest font-semibold mb-2 text-muted-foreground">
                  The mistake most home cooks make
                </p>
                <p className="text-base md:text-lg text-foreground">
                  {t.mistake}
                </p>
              </div>
            </section>
          ))}

          {/* Closing */}
          <div
            className="mt-16 rounded-lg p-6 md:p-8 border border-border"
            style={{ backgroundColor: "#F4D9A8" }}
          >
            <p className="text-base md:text-lg text-foreground leading-relaxed">
              You do not need to learn all seven techniques this week. Pick the one that feels most relevant to how you cook right now. Mise en place will change your daily cooking immediately. Julienne will improve how your food looks. Beurre blanc will make you feel like a professional. Déglaze will transform every pan sauce you ever make. Come back to the others when you are ready. Each one is a small investment that pays back every time you cook.
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
              Ready to put these techniques into practice?
            </h2>
            <p className="text-base md:text-lg mb-8" style={{ color: "#d9c7a8" }}>
              Head to The Kitchen Atlas and take on this week's French cooking challenge — designed to use exactly these techniques in real dishes.
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

export default GuideFrenchTechniques;
