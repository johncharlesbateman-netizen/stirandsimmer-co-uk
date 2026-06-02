import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import RecipeCard from "@/components/RecipeCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const KEY_INGREDIENTS: { emoji: string; name: string; note: string }[] = [
  { emoji: "🍅", name: "Tomatoes", note: "Tinned San Marzano for sauces, ripe vine tomatoes in summer." },
  { emoji: "🫒", name: "Extra virgin olive oil", note: "Used for cooking, finishing and almost everything in between." },
  { emoji: "🧄", name: "Garlic", note: "Sliced thin for sauces, smashed for infusing oil — never burnt." },
  { emoji: "🌿", name: "Basil & parsley", note: "Torn at the end so the flavour stays bright and fresh." },
  { emoji: "🧀", name: "Parmigiano Reggiano", note: "Grated over pasta, stirred into risotto, the savoury backbone." },
  { emoji: "🍝", name: "Good dried pasta", note: "Bronze-die cut holds sauce better than supermarket smooth pasta." },
];

const RegionItaly = () => {
  const { data: recipes } = useQuery({
    queryKey: ["kitchen-atlas-italy-recipes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .eq("cuisine_region", "italian")
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(6);
      if (error) throw error;
      return data ?? [];
    },
  });

  return (
    <Layout>
      <Helmet>
        <title>Italian Cuisine Guide — Stir & Simmer</title>
        <meta
          name="description"
          content="A warm, honest guide to Italian cuisine — its regions, defining ingredients and why it works so well at home. Plus tried-and-tested Italian recipes from our kitchen."
        />
        <link rel="canonical" href="https://stirandsimmer.co.uk/kitchen-atlas/italy" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://stirandsimmer.co.uk/kitchen-atlas/italy" />
        <meta property="og:title" content="Italian Cuisine Guide — Stir & Simmer" />
        <meta
          property="og:description"
          content="A warm, honest guide to Italian cuisine — its regions, defining ingredients and why it works so well at home."
        />
        <meta property="og:site_name" content="Stir & Simmer" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Italian Cuisine Guide — Stir & Simmer" />
        <meta
          name="twitter:description"
          content="A warm, honest guide to Italian cuisine — regions, ingredients and recipes from our kitchen."
        />
      </Helmet>

      <PageHero
        title="🇮🇹 Italy"
        subtitle="Pasta, sauces and the art of simplicity. Italian cooking that feeds the soul."
        imageId="1640774"
        imageAlt="A rustic Italian table with pasta, tomatoes, basil and olive oil"
      />

      <section className="bg-background py-6 border-b border-border">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <Breadcrumbs
            items={[
              { label: "Kitchen Atlas", href: "/kitchen-atlas" },
              { label: "Italy" },
            ]}
          />
        </div>
      </section>

      {/* About */}
      <section className="bg-background py-10 md:py-14 border-b border-border">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-3xl">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
            About Italian cuisine
          </h2>
          <div className="space-y-5 text-base md:text-lg text-foreground/90 leading-relaxed">
            <p>
              There isn't really one Italian cuisine — there are twenty. The cooking of Sicily,
              with its capers, anchovies and citrus, has almost nothing in common with the butter,
              cream and slow-cooked ragùs of Emilia-Romagna. The north leans on rice, polenta and
              dairy; the south on tomatoes, olive oil and the sea. What ties it all together is a
              quiet respect for the ingredient — you cook to show it off, not to cover it up.
            </p>
            <p>
              The defining flavours are simpler than people think. Good olive oil, a tin of proper
              tomatoes, garlic, an onion, a piece of Parmigiano, a handful of herbs and decent dried
              pasta will carry you through most weeknights. The technique that matters most isn't
              fancy — it's patience. Letting onions soften slowly, letting a sauce reduce until it
              clings, finishing pasta in the pan with a splash of its own cooking water so
              everything binds together.
            </p>
            <p>
              That's why it works so well in a home kitchen. Italian food rewards attention rather
              than equipment. A heavy pan, twenty minutes and four good ingredients will give you
              something better than most restaurant pasta. It's the cuisine we cook from most
              often, and the one we'd recommend any new cook start with.
            </p>
          </div>
        </div>
      </section>

      {/* Key ingredients */}
      <section className="bg-warm-soft py-10 md:py-14 border-b border-border">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-2">
            Key ingredients
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Stock these and you can cook Italian almost any night of the week.
          </p>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {KEY_INGREDIENTS.map((i) => (
              <li
                key={i.name}
                className="rounded-lg border border-border bg-card p-5 flex gap-4"
              >
                <span className="text-3xl leading-none" aria-hidden="true">
                  {i.emoji}
                </span>
                <div>
                  <div className="font-display text-lg text-foreground mb-1">{i.name}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{i.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Recipes */}
      <section className="bg-background py-10 md:py-14 border-b border-border">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-2">
            Recipes from our kitchen to try
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            A handful of Italian recipes we cook on rotation. All tested in a real, busy kitchen.
          </p>

          {recipes && recipes.length > 0 ? (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map((r) => (
                  <RecipeCard key={r.id} recipe={r} />
                ))}
              </div>
              <div className="mt-10">
                <Button asChild size="lg">
                  <Link to="/recipes/region/italy">
                    Explore all Italian recipes <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </>
          ) : (
            <p className="text-muted-foreground">No Italian recipes published yet — check back soon.</p>
          )}
        </div>
      </section>

      <section className="bg-background py-8">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <Link
            to="/kitchen-atlas"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" /> Back to the Kitchen Atlas
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default RegionItaly;
