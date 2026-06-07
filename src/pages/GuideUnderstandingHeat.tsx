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

const GuideUnderstandingHeat = () => {
  return (
    <Layout>
      <GuideSeo slug="understanding-heat" />

      <article className="bg-background">
        <GuideHero slug="understanding-heat" />

        {/* Header */}
        <header className="border-b border-border">
          <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-20 max-w-3xl">
            <Breadcrumbs
              className="mb-6"
              items={[
                { label: "Home", href: "/" },
                { label: "Guides", href: "/guides" },
                { label: "Understanding heat" },
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
              Understanding heat — a cook's guide
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Heat is the one variable in cooking that changes everything. Get it right and food colours, caramelises and develops flavour. Get it wrong and the same ingredients steam, burn or sit grey and disappointing in the pan.
            </p>
            <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
              Before anything else — the cooker you cook on shapes everything about how you manage heat, and no two are quite the same.
            </p>
          </div>
        </header>

        <GuideTOC
          items={[
            { id: "knowing-your-cooker", label: "Heat control starts with knowing your cooker" },
            { id: "heat-levels", label: "The heat levels every cook needs to understand" },
            { id: "getting-the-pan-hot", label: "Getting the pan right before anything goes in" },
            { id: "dry-heat-wet-heat", label: "Dry heat and wet heat — understanding the difference" },
            { id: "understanding-your-oven", label: "Understanding your oven" },
            { id: "visual-sound-cues", label: "Visual and sound cues — what to look and listen for" },
            { id: "food-thermometer", label: "The food thermometer — the most underused tool in a home kitchen" },
            { id: "resting", label: "Resting — the step most home cooks skip" },
          ]}
        />

        {/* Section 1: Knowing your cooker */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 id="knowing-your-cooker" className="font-display text-3xl md:text-4xl text-foreground mb-6">Heat control starts with knowing your cooker</h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            A gas cooker gives you immediate visual feedback. Turn the flame up and you can see it respond. Turn it down and the change is instant. For most cooks this is the most intuitive way to cook — the flame tells you what is happening.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            An electric cooker is easier to keep clean and maintains a steady temperature well, but you lose the visual element. The hob does not respond instantly — it heats slowly and cools slowly. Learning how quickly your electric rings respond to adjustment is part of learning to cook on them. What reads as medium on the dial may behave differently to the medium on someone else's cooker.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            An induction hob looks similar to electric but behaves differently. The heat is more instant and more intense than a conventional electric ring. It can be extraordinarily responsive but needs to be understood — the same setting that gently simmers on one hob may be far too aggressive on another.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            A range or country range is something many cooks aspire to. They are impressive and capable but notoriously difficult to regulate — both on the hob and in the oven. The heat is less precise and more instinctive. Cooking on a range takes time and experience to master.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            The principle is the same regardless of what you cook on — know your cooker. A recipe is written in general terms. How it behaves in your kitchen on your heat source is something only you can learn.
          </p>
        </div>

        {/* Section 2: Heat levels */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 id="heat-levels" className="font-display text-3xl md:text-4xl text-foreground mb-6">The heat levels every cook needs to understand</h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            Heat is not simply on or off, high or low. There is a spectrum, and understanding where on that spectrum you need to be — and being able to hold it there — is one of the most useful skills in a kitchen.
          </p>
          <ul className="space-y-4 text-base md:text-lg text-foreground/90 leading-relaxed">
            <li>
              <strong className="text-foreground">Gentle warming</strong> — the surface of the liquid barely moves. No bubbles. Used for keeping things warm, melting chocolate, or infusing flavours without cooking them.
            </li>
            <li>
              <strong className="text-foreground">Simmer</strong> — a constant gentle breaking of the surface with small bubbles. Not a vigorous boil, not a lazy warm. This is the workhorse of cooking — stocks, soups, braises and sauces all spend most of their time here.{" "}
              <Link to="/guides/proper-stock" className="editorial-link text-foreground underline underline-offset-4 hover:no-underline">
                The proper stock guide explains why a gentle simmer matters for clarity and depth
              </Link>
              . We named this site partly after it. It matters.
            </li>
            <li>
              <strong className="text-foreground">Rolling simmer</strong> — more vigorous than a simmer, with larger bubbles breaking consistently across the surface. Used for reducing a sauce or stock where you want evaporation without the violence of a full boil.{" "}
              <Link to="/guides/proper-sauce" className="editorial-link text-foreground underline underline-offset-4 hover:no-underline">
                The proper sauce guide covers how to reduce without burning or splitting
              </Link>
              .
            </li>
            <li>
              <strong className="text-foreground">Boiling</strong> — full vigorous movement throughout the liquid. For pasta water, blanching vegetables, or anything that needs high heat fast.
            </li>
            <li>
              <strong className="text-foreground">Sautéing</strong> — high heat with fat in the pan and food moving. The food should be moving regularly, cooking fast in direct contact with a hot surface.
            </li>
            <li>
              <strong className="text-foreground">Searing</strong> — very high heat, minimal movement. The goal is colour and crust. Moving the food too soon or too often prevents this from happening.
            </li>
          </ul>

          <Callout label="Technique tip">
            To test whether a pan is properly hot before adding oil or food, add a few drops of water. If the drops bead up, roll around the surface and disappear quickly, the pan is at the right temperature. If they sit and steam slowly, the pan needs more time. This takes seconds and saves a lot of disappointing results.
          </Callout>
        </div>

        {/* Section 3: Getting the pan hot */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 id="getting-the-pan-hot" className="font-display text-3xl md:text-4xl text-foreground mb-6">Getting the pan right before anything goes in</h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            One of the most common mistakes in home cooking is adding food to a pan that is not yet hot enough. A cold or lukewarm pan means food steams rather than sears, sticks rather than releases, and colours unevenly or not at all.{" "}
            <Link to="/guides/choosing-pans" className="editorial-link text-foreground underline underline-offset-4 hover:no-underline">
              The choosing pans guide covers which materials hold and distribute heat best
            </Link>
            .
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            Heat the pan first. Add the oil or fat once the pan is hot — you will see it shimmer and move fluidly. Then add the food. The sizzle when food hits a properly hot pan is the sound you are looking for. Silence or a gentle hiss means the pan was not ready.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            The exception is garlic. Garlic added to a pan that is too hot will brown within seconds and turn bitter before anything else has had a chance to cook. Add garlic after other aromatics, or reduce the heat before it goes in, and watch it constantly.
          </p>

          <Callout label="The mistake most home cooks make with garlic">
            Adding garlic to a pan that is too hot. Garlic browns in seconds at high heat and once it has burnt the bitterness cannot be fixed. It will flavour everything else in the pan. If this happens the honest answer is to start again. Add garlic after other aromatics, keep the heat moderate, and watch it.
          </Callout>
        </div>

        {/* Section 4: Dry heat and wet heat */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 id="dry-heat-wet-heat" className="font-display text-3xl md:text-4xl text-foreground mb-6">Dry heat and wet heat — understanding the difference</h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            All cooking methods fall into one of two categories.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            <strong className="text-foreground">Dry heat</strong> — roasting, grilling, frying, searing — uses hot air, hot metal or hot fat to cook food. It produces colour, crust and caramelisation. It is generally high heat applied relatively fast.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            <strong className="text-foreground">Wet heat</strong> — poaching, steaming, braising, simmering — uses liquid or steam to cook food. It is generally lower heat applied over longer time. It cannot exceed 100 degrees Celsius at sea level regardless of how high the flame goes, which is why long slow braises in liquid produce tender rather than charred results.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            Many dishes use both — sear a piece of meat in a hot pan first to develop colour and flavour, then braise it slowly in liquid to become tender. The two methods work together.
          </p>
        </div>

        {/* Section 5: Understanding your oven */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 id="understanding-your-oven" className="font-display text-3xl md:text-4xl text-foreground mb-6">Understanding your oven</h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            A fan oven circulates hot air around the food, which distributes heat more evenly. A middle shelf position will give you all-around cooking with consistent results. As a general guide, fan oven temperatures run approximately 20 degrees Celsius lower than the conventional temperatures given in most recipes — so a recipe calling for 200 degrees Celsius in a conventional oven is typically cooked at around 180 degrees Celsius in a fan oven. That said, every oven is different and the dial temperature is not always the actual temperature inside.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            A conventional oven without a fan has more variation across the space. The top of the oven is significantly hotter than the bottom. Food that needs colour on top goes higher. Food that needs gentle heat without browning goes lower. Understanding where the heat sits in your oven gives you more control, not less.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            Whichever oven you use, get to know it. An oven thermometer costs very little and tells you whether what the dial says matches what is actually happening inside. It is one of the most useful small investments in a kitchen.
          </p>
        </div>

        {/* Section 6: Visual and sound cues */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 id="visual-sound-cues" className="font-display text-3xl md:text-4xl text-foreground mb-6">Visual and sound cues — what to look and listen for</h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            You do not always need a thermometer to understand heat. The food and the pan tell you what you need to know if you pay attention.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            <strong className="text-foreground">Sound</strong> — a loud immediate sizzle when food hits the pan means it is hot enough. Silence or a slow gentle hiss means it is not. A simmer has a quiet steady sound. A rolling boil is louder and more insistent.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            <strong className="text-foreground">Sight</strong> — oil that shimmers and moves fluidly in the pan is hot. Oil that sits still is not ready. Butter that foams and then the foam subsides is at the right temperature for cooking. Butter that immediately browns is too hot for anything delicate. The surface of a liquid tells you exactly where on the heat spectrum you are — from barely moving to a rolling boil.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            <strong className="text-foreground">Smell</strong> — garlic, onions and spices release their aroma as they cook. A sharp acrid smell means the heat is too high. A gentle sweet fragrant smell means you are where you need to be. The{" "}
            <Link to="/guides/how-to-season-food" className="editorial-link text-foreground underline underline-offset-4 hover:no-underline">
              how to season food guide
            </Link>
            {" "}explains how aroma and seasoning work together to build flavour.
          </p>

          <Callout label="The mistake most home cooks make">
            Not getting the pan hot enough before adding food, and then turning the heat up to compensate once the food is already in. Food added to a cold pan sticks, steams and colours unevenly. The time to build heat is before the food goes in, not after. Be patient with the pan. It will tell you when it is ready. The same applies to resting — food taken straight from heat to plate loses its juices immediately. Give it time.
          </Callout>
        </div>

        {/* Section 7: Food thermometer */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 id="food-thermometer" className="font-display text-3xl md:text-4xl text-foreground mb-6">The food thermometer — the most underused tool in a home kitchen</h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            A food thermometer removes the guesswork from the most important question in cooking — is it done. Cutting into a piece of meat to check costs you juice and presentation. Pressing it and guessing takes years of experience to do reliably. A thermometer tells you exactly where you are in seconds.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            The principle is simple: it is always better to undercook, measure and return something to the heat than to overcook it and find there is nothing to be done. Overcooked meat, fish or poultry cannot be retrieved. Undercooked food can always go back.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            Key internal temperatures to know: Chicken and poultry — 74 degrees Celsius at the thickest point away from bone. Beef and lamb medium rare — 55 to 57 degrees Celsius. Beef and lamb medium — 60 to 63 degrees Celsius. Pork — 70 degrees Celsius. Fish — 60 degrees Celsius though many prefer it pulled slightly before this.
          </p>
        </div>

        {/* Section 8: Resting */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 id="resting" className="font-display text-3xl md:text-4xl text-foreground mb-6">Resting — the step most home cooks skip</h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            Once food comes off the heat it is not finished. Resting allows the juices that have been driven to the centre of the meat during cooking to redistribute through the whole piece. Cut into it immediately and those juices run straight onto the board. Rest it properly and they stay in the meat where they belong.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            A steak needs to rest for roughly as long as it was cooked — a steak cooked for four minutes needs four minutes of rest. A larger joint needs longer. Tent it loosely with foil to retain some warmth and leave it alone.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            The temperature will also continue to rise slightly during resting — known as carry-over cooking — which is why pulling food from the heat two or three degrees before the target temperature makes sense.
          </p>
        </div>

        {/* Closing */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            Heat is the part of cooking that no recipe can fully control for you. A recipe can tell you high, medium or low — it cannot know your cooker, your pan, your kitchen. Developing heat awareness is a matter of paying attention every time you cook. Listen to the pan. Watch the oil. Smell what is happening. The more you notice, the more instinctive it becomes.
          </p>
        </div>

        <GuideFAQ slug="understanding-heat" />


        <GuideRelatedGuides guideSlug="understanding-heat" />

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

export default GuideUnderstandingHeat;
