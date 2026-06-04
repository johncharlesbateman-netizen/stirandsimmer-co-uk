import Breadcrumbs from "@/components/Breadcrumbs";
import GuideSeo from "@/components/GuideSeo";
import GuideRelatedRecipes from "@/components/GuideRelatedRecipes";
import GuideFAQ from "@/components/GuideFAQ";
import GuideRelatedGuides from "@/components/GuideRelatedGuides";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
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

const GuideKnifeSkills = () => {
  return (
    <Layout>
      <GuideSeo slug="knife-skills" />

      <article className="bg-background">
        {/* Header */}
        <header className="border-b border-border">
          <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-20 max-w-3xl">
            <Breadcrumbs
              className="mb-6"
              items={[
                { label: "Home", href: "/" },
                { label: "Guides", href: "/guides" },
                { label: "Knife skills" },
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
              Knife skills for home cooks — a practical guide
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              A sharp knife used properly is one of the most satisfying tools in a kitchen. A blunt one used badly is one of the most frustrating. The difference is knowledge, practice and a little care.
            </p>
            <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
              Knife skills are not about speed or showing off. They are about three things that directly affect the food on the plate — safety, even cooking and presentation. A cook who understands their knife works more confidently, produces food that cooks consistently, and puts dishes on the table that look as considered as they taste. Finely chopped onions melt into a sauce. Lumps don't. Thinly sliced meat is tender. Thick uneven slices aren't. A garnish cut with care signals effort before anyone takes a bite. These are not small things.
            </p>
          </div>
        </header>

        <GuideTOC
          items={[
            { id: "note-on-learning", label: "A note on learning" },
            { id: "right-knife", label: "The right knife for the job" },
            { id: "left-or-right", label: "Left or right handed — it matters" },
            { id: "pinch-grip", label: "How to hold a knife — the pinch grip" },
            { id: "claw-grip", label: "The claw grip — the most important technique in this guide" },
            { id: "rocking-motion", label: "Keeping the tip down — the rocking motion" },
            { id: "basic-cuts", label: "The basic cuts every home cook needs" },
            { id: "cut-quality", label: "Why cut quality affects the finished dish" },
            { id: "knife-care", label: "Knife care — the part most home cooks neglect" },
          ]}
        />

        {/* A note on learning */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 id="note-on-learning" className="font-display text-3xl md:text-4xl text-foreground mb-6">A note on learning</h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            Knife skills are one of the few techniques where seeing genuinely beats reading. This guide will explain the principles clearly — but search for "chef's knife grip" and "claw grip technique" on YouTube alongside reading it. Watching the hand position once is worth a hundred words of description. Then practise. It takes time and repetition before it feels natural.
          </p>
        </div>

        {/* The right knife for the job */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 id="right-knife" className="font-display text-3xl md:text-4xl text-foreground mb-6">The right knife for the job</h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            You do not need many knives. You need one good one that is kept sharp. A quality chef's knife — broad bladed, well balanced, comfortable in your hand — will handle the vast majority of everything you cook. A sharp chef's knife is safer, more efficient and more pleasurable to use than a full block of blunt ones.{" "}
            <Link to="/guides/kitchen-knives" className="editorial-link text-foreground underline underline-offset-4 hover:no-underline">
              The kitchen knives guide covers which knives are worth owning and how to choose them
            </Link>
            .
          </p>
        </div>

        {/* Left or right handed */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 id="left-or-right" className="font-display text-3xl md:text-4xl text-foreground mb-6">Left or right handed — it matters</h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            Set yourself up correctly before you start. Right handed cooks hold the knife in the right hand and use the left hand to guide and hold the ingredient. Left handed cooks do the opposite. Everything that follows assumes right handed — reverse it if you need to.
          </p>
        </div>

        {/* How to hold a knife — the pinch grip */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 id="pinch-grip" className="font-display text-3xl md:text-4xl text-foreground mb-6">How to hold a knife — the pinch grip</h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            Most people hold a knife by the handle. This gives less control than the pinch grip — where the thumb and the side of the index finger pinch the blade itself just above the bolster, with the remaining fingers wrapped around the handle. It feels unfamiliar at first. Within a few sessions it feels completely natural and gives significantly more precision and control.
          </p>
        </div>

        {/* The claw grip */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 id="claw-grip" className="font-display text-3xl md:text-4xl text-foreground mb-6">The claw grip — the most important technique in this guide</h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            The guiding hand — your left hand holding the ingredient — is where most accidents happen and where most inefficiency comes from. The claw grip solves both. Curl your fingers so the fingertips are tucked down and inward, with the flat area between the top and bottom knuckles facing the blade vertically. The blade rests against this flat area as it moves — guided by the knuckles, never able to reach the fingertips. Your thumb stays tucked behind your fingers at all times. This takes practice. It will feel awkward. Persist with it — it is the single technique that most improves both safety and efficiency at the same time.
          </p>
        </div>

        {/* Keeping the tip down — the rocking motion */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 id="rocking-motion" className="font-display text-3xl md:text-4xl text-foreground mb-6">Keeping the tip down — the rocking motion</h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            For most chopping the tip of the knife stays in contact with the board while the heel rocks up and down. The knife does not lift entirely off the board with each stroke — it pivots. This is more controlled, more efficient and less tiring than lifting the whole blade repeatedly. Combined with the claw grip moving the ingredient steadily toward the blade, it produces fast and even results.
          </p>
        </div>

        {/* The basic cuts every home cook needs */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 id="basic-cuts" className="font-display text-3xl md:text-4xl text-foreground mb-6">The basic cuts every home cook needs</h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            You do not need to master julienne or chiffonade to cook well. These four cuts cover the vast majority of home cooking.
          </p>
          <ul className="space-y-4 text-base md:text-lg text-foreground/90 leading-relaxed">
            <li>
              <strong className="text-foreground">Rough chop</strong> — irregular pieces of similar approximate size. For stocks, soups and anything that will be blended or cooked for a long time.
            </li>
            <li>
              <strong className="text-foreground">Dice</strong> — uniform cubes. Small dice for sauces and salsas where texture matters. Larger dice for stews and braises. Uniformity is the point — even pieces cook evenly.
            </li>
            <li>
              <strong className="text-foreground">Slice</strong> — even cuts of consistent thickness. The thickness depends on the dish — thin for carpaccio or stir fry, thicker for roasting or grilling. Consistency matters more than speed.
            </li>
            <li>
              <strong className="text-foreground">Fine chop</strong> — for garlic, herbs, chillies and aromatics where you want the flavour to distribute evenly through a dish rather than appear in chunks.
            </li>
          </ul>
        </div>

        {/* Why cut quality affects the finished dish */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 id="cut-quality" className="font-display text-3xl md:text-4xl text-foreground mb-6">Why cut quality affects the finished dish</h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            Uniformly diced onions soften and sweeten evenly. Uneven pieces mean some burn while others remain raw. Finely chopped garlic melts into a sauce. Roughly chopped pieces remain assertive and uneven in flavour. Evenly sliced meat cooks to the same doneness throughout. Uneven slices mean some pieces are overcooked before others are done. And presentation — a dish where the vegetables are cut with care, the herbs are finely chopped and the garnish is deliberate looks like someone was paying attention. That matters.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            Cut quality also affects flavour distribution — the more even your pieces, the more consistently seasoning and heat reach every part of the ingredient. The{" "}
            <Link to="/guides/how-to-season-food" className="editorial-link text-foreground underline underline-offset-4 hover:no-underline">
              how to season food guide
            </Link>
            {" "}explains why even seasoning depends on even preparation.
          </p>
        </div>

        {/* Knife care */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <h2 id="knife-care" className="font-display text-3xl md:text-4xl text-foreground mb-6">Knife care — the part most home cooks neglect</h2>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            A good knife poorly cared for quickly becomes a bad knife. Three rules.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            <strong className="text-foreground">Hone regularly, sharpen rarely</strong> — a honing steel realigns the edge and should be used before every session. A few strokes takes thirty seconds. Do this consistently and a full sharpen becomes a rare event.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            <strong className="text-foreground">Never the dishwasher</strong> — the heat warps handles, the moisture promotes rust, and rattling against other utensils destroys the edge faster than years of normal use. Hand wash, dry immediately, every time without exception.
          </p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
            <strong className="text-foreground">Store properly</strong> — a drawer full of mixed kitchen equipment is the worst option. Three better options: a knife block on the worktop keeps blades separated and protected and suits most home kitchens. A magnetic wall strip keeps knives visible and accessible and is better for smaller kitchens. A knife wallet or knife roll with individual cloth pockets for each knife is what serious home cooks and professionals use — it protects each blade individually and travels well. Whatever you choose, never the drawer.
          </p>

          <Callout label="The mistake most home cooks make">
            Using a blunt knife and sharpening it rarely. A blunt knife requires more force, gives less control and is significantly more dangerous than a sharp one — it slips rather than cuts. A few strokes on a honing steel before each session takes thirty seconds and keeps the edge in constant good condition. Do that consistently and a full sharpen becomes a rare event rather than a constant need.
          </Callout>
        </div>

        {/* Closing */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl border-b border-border">
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
            Knife skills improve slowly and then suddenly. The claw grip feels impossible for a few weeks and then one day it is simply how you hold food. The rocking motion feels laboured and then becomes automatic. Give it time, practise on things that do not matter, and pay attention to what changes in the food when the cuts are more consistent. It will.
          </p>
        </div>

        <GuideFAQ slug="knife-skills" />

        <GuideRelatedRecipes guideSlug="knife-skills" />

        <GuideRelatedGuides guideSlug="knife-skills" />

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

export default GuideKnifeSkills;
