import Breadcrumbs from "@/components/Breadcrumbs";
import GuideSeo from "@/components/GuideSeo";
import GuideFAQ from "@/components/GuideFAQ";
import GuideRelatedGuides from "@/components/GuideRelatedGuides";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import GuideHero from "@/components/GuideHero";
import GuideTOC from "@/components/GuideTOC";
import { ArrowLeft } from "lucide-react";

const Callout = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <aside className="my-8 border-l-4 border-primary bg-muted/40 px-6 py-6 md:px-8 md:py-7">
    <p className="micro-caption text-primary mb-3">{label}</p>
    <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
      {children}
    </p>
  </aside>
);

const GuideHowToSeasonFood = () => {
  return (
    <Layout>
      <GuideSeo slug="how-to-season-food" />

      <article className="bg-background">
        <GuideHero slug="how-to-season-food" />

        {/* Header */}
        <header className="border-b border-border">
          <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-20 max-w-3xl">
            <Breadcrumbs
              className="mb-6"
              items={[
                { label: "Home", href: "/" },
                { label: "Guides", href: "/guides" },
                { label: "How to season food" },
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
              How to season food — a cook's guide
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Get this right and everything you cook improves. Not because you add more salt, but because you understand what seasoning actually is.
            </p>
            <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
              Seasoning is not a step at the end of a recipe. It is an ongoing process — a continuous conversation between you and the food — that starts before anything hits the pan and continues until the dish reaches the table. Get that idea fixed in your mind and everything that follows makes sense. Most home cooks season once, usually at the end, and hope for the best. The food tastes flat and they add more salt. It still tastes flat because the problem isn't the amount of salt — it's the timing.
            </p>
          </div>
        </header>

        <GuideTOC
          items={[
            { id: "tasting-as-you-cook", label: "Tasting as you cook — the habit that changes everything" },
            { id: "season-at-the-start", label: "Season at the start — building the base" },
            { id: "season-in-the-middle", label: "Season in the middle — adjusting as flavours develop" },
            { id: "season-at-the-end", label: "Season at the end — the finishing touches that lift a dish" },
            { id: "beyond-salt-and-pepper", label: "Beyond salt and pepper — how different cuisines season" },
            { id: "ingredients-that-season-for-you", label: "Ingredients that season for you" },
          ]}
        />

        {/* Tasting as you cook */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 id="tasting-as-you-cook" className="font-display text-3xl md:text-4xl text-foreground mb-6">Tasting as you cook — the habit that changes everything</h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            The single most important thing you can do to improve your cooking is taste it throughout. Not once. Not twice. Constantly. Every time you add an ingredient, every time something changes in the pan, every time you're about to move to the next step — taste it.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            You are not tasting for salt. You are tasting for balance. Does it need more depth? More brightness? More heat? More richness? Salt is only one answer to those questions.
          </p>
        </div>

        {/* Season at the start */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 id="season-at-the-start" className="font-display text-3xl md:text-4xl text-foreground mb-6">Season at the start — building the base</h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            Some seasoning belongs at the very beginning. Salt added to onions as they cook draws out moisture, helping them soften and brown correctly rather than steam in their own liquid. This is not seasoning in the flavour sense — it is using salt as a cooking tool. The result is a properly caramelised base that carries the whole dish.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            The same principle applies to vegetables before roasting and pasta water before the pasta goes in. Early seasoning penetrates. Late seasoning sits on the surface.
          </p>

          <Callout label="Technique tip">
            When browning onions for an Indian dish, add a small pinch of salt at the start. It draws out water and helps the onions colour properly rather than stew. A correctly browned onion base is the foundation of almost every great curry — see the{" "}
            <Link to="/guides/garam-masala" className="editorial-link text-foreground underline underline-offset-4 hover:no-underline">
              garam masala guide
            </Link>{" "}
            for more on building that base.
          </Callout>

          <Callout label="A note on steak">
            Seasoning a steak before cooking needs care. Salt draws moisture to the surface — if the steak goes straight into a very hot pan it can steam rather than sear, leaving the meat tougher than it should be. Either season well in advance (at least 45 minutes, ideally longer) so the moisture is reabsorbed, or season immediately before cooking and get it into a properly hot dry pan fast. Pepper is more straightforward to add after cooking as high heat can burn it and turn it bitter.
          </Callout>
        </div>

        {/* Season in the middle */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 id="season-in-the-middle" className="font-display text-3xl md:text-4xl text-foreground mb-6">Season in the middle — adjusting as flavours develop</h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            As a dish cooks, flavours concentrate, ingredients release their own salt, and the balance shifts. This is the stage most home cooks miss entirely. A stock reduces and becomes saltier. A sauce made with anchovies, capers or olives builds its own salinity. Parmesan stirred into a risotto at the end brings significant salt with it.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            Taste at every stage and react to what you find. You are not adding salt — you are maintaining balance as the dish evolves.
          </p>
        </div>

        {/* Season at the end */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 id="season-at-the-end" className="font-display text-3xl md:text-4xl text-foreground mb-6">Season at the end — the finishing touches that lift a dish</h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            The final seasoning is the most visible but often the least important if the earlier stages have been done properly. At the end you are fine-tuning, not correcting.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            Acid belongs here more than anywhere else. A squeeze of lemon juice, a splash of good vinegar, a final grind of pepper — these are finishing moves that lift and brighten a dish that is already well seasoned. Fresh herbs added at the end bring a different dimension that heat would destroy if they went in earlier.
          </p>
        </div>

        {/* Beyond salt and pepper */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 id="beyond-salt-and-pepper" className="font-display text-3xl md:text-4xl text-foreground mb-6">Beyond salt and pepper — how different cuisines season</h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-6">
            Salt and pepper are not universal. Different culinary traditions use different ingredients to achieve the same balance.
          </p>
          <ul className="space-y-4 text-base md:text-lg text-foreground/90 leading-relaxed">
            <li>
              <strong className="text-foreground">Fish sauce</strong> — the salt carrier of{" "}
              <Link to="/kitchen-atlas/thailand" className="editorial-link text-foreground underline underline-offset-4 hover:no-underline">
                Thai
              </Link>
              , Vietnamese and much of Southeast Asian cooking. Deeply savoury, funky in the bottle, it disappears into a dish and leaves only depth behind.
            </li>
            <li>
              <strong className="text-foreground">Soy sauce</strong> — the foundation of Chinese, Japanese and Korean seasoning. Adds salt and umami simultaneously. Light soy for seasoning, dark soy for colour and depth.
            </li>
            <li>
              <strong className="text-foreground">Miso</strong> — fermented soybean paste that carries salt, umami and a complexity that straight salt cannot replicate. Worth stirring into dressings, soups and braises.
            </li>
            <li>
              <strong className="text-foreground">Sumac</strong> — the souring agent of{" "}
              <Link to="/kitchen-atlas/middle-east" className="editorial-link text-foreground underline underline-offset-4 hover:no-underline">
                Middle Eastern
              </Link>{" "}
              cooking. Where a Western cook reaches for lemon, a Middle Eastern cook often reaches for sumac. Scattered over grilled meats, salads and dips at the end.
            </li>
            <li>
              <strong className="text-foreground">Preserved lemons</strong> — salt and acid together, used in North African cooking to add a rounded, mellow citrus note that fresh lemon cannot achieve.
            </li>
          </ul>
        </div>

        {/* Ingredients that season for you */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 id="ingredients-that-season-for-you" className="font-display text-3xl md:text-4xl text-foreground mb-6">Ingredients that season for you</h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            Some ingredients carry significant salt and need to be accounted for before you add anything else. Add these to a dish and taste before reaching for the salt: anchovies, capers, olives, bacon and pancetta, parmesan and pecorino, soy sauce, fish sauce, miso, Worcestershire sauce, stock cubes and many bought stocks.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            A dish built on anchovies, finished with parmesan, may need no added salt at all. Taste first. Always.
          </p>

          <Callout label="The mistake most home cooks make">
            Seasoning only at the end. By that point the flavours are set and adding salt merely makes the dish taste salty rather than well seasoned. Salt added throughout cooking penetrates and integrates. Salt added at the end sits on the surface. The difference is noticeable.
          </Callout>
        </div>

        {/* Closing */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            Seasoning is the one skill that cannot be taught by a recipe. A recipe can tell you to add salt — it cannot tell you how much, because that depends on your ingredients, your pan, how much the sauce has reduced and a dozen other variables. The only way to develop the instinct is to taste constantly, react honestly, and cook the same things enough times that the balance becomes second nature.
          </p>
        </div>

        <GuideFAQ slug="how-to-season-food" />


        <GuideRelatedGuides guideSlug="how-to-season-food" />

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

export default GuideHowToSeasonFood;
