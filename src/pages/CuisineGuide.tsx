import { Helmet } from "react-helmet-async";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import RecipeCard from "@/components/RecipeCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { CUISINE_GUIDES_BY_SLUG } from "@/lib/cuisine-guides";

const CuisineGuidePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const guide = slug ? CUISINE_GUIDES_BY_SLUG[slug] : undefined;

  const { data: recipes } = useQuery({
    queryKey: [
      "kitchen-atlas-cuisine-recipes",
      guide?.cuisineRegionTag,
      guide?.featuredRecipeTitles ?? null,
    ],
    enabled: !!guide,
    queryFn: async () => {
      if (!guide) return [];
      let query = supabase
        .from("recipes")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (guide.featuredRecipeTitles && guide.featuredRecipeTitles.length > 0) {
        // Curated allowlist — only show these specific recipes.
        query = query.in("title", guide.featuredRecipeTitles);
      } else {
        query = query.eq("cuisine_region", guide.cuisineRegionTag).limit(6);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data ?? [];
    },
  });

  if (!guide) return <Navigate to="/kitchen-atlas" replace />;

  const canonical = `https://stirandsimmer.co.uk/kitchen-atlas/${guide.slug}`;
  const ogImage = `https://images.pexels.com/photos/${guide.imageId}/pexels-photo-${guide.imageId}.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop`;

  return (
    <Layout hideNewsletter>
      <Helmet>
        <title>{guide.seoTitle}</title>
        <meta name="description" content={guide.seoDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={guide.seoTitle} />
        <meta property="og:description" content={guide.seoDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={guide.imageAlt} />
        <meta property="og:site_name" content="Stir & Simmer" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={guide.seoTitle} />
        <meta name="twitter:description" content={guide.seoDescription} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content={guide.imageAlt} />
      </Helmet>


      <PageHero
        title={`${guide.emoji} ${guide.name}`}
        subtitle={guide.characterLine}
        imageId={guide.imageId}
        imageAlt={guide.imageAlt}
      />

      {/* Back link */}
      <section className="bg-background pt-4 pb-2">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <Link
            to="/kitchen-atlas"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Kitchen Atlas
          </Link>
        </div>
      </section>

      <section className="bg-background py-6 border-b border-border">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <Breadcrumbs
            items={[
              { label: "Kitchen Atlas", href: "/kitchen-atlas" },
              { label: guide.name },
            ]}
          />
        </div>
      </section>

      {/* About */}
      <section className="bg-background py-10 md:py-14 border-b border-border">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-3xl">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
            About {guide.adjective} cuisine
          </h2>
          <div className="space-y-5 text-base md:text-lg text-foreground/90 leading-relaxed">
            {guide.about.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
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
            Stock these and you can cook {guide.adjective} almost any night of the week.
          </p>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {guide.keyIngredients.map((i) => (
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
            A handful of {guide.adjective} recipes we cook on rotation. All tested in a real, busy kitchen.
          </p>

          {recipes && recipes.length > 0 ? (
            <div
              className={
                recipes.length === 1
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              }
            >
              {recipes.map((r) => (
                <RecipeCard key={r.id} recipe={r} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">
              No {guide.adjective} recipes published yet — check back soon.
            </p>
          )}

          <div className="mt-10">
            <Button asChild size="lg">
              <Link to={`/recipes/region/${guide.regionPageId}`}>
                Explore all {guide.adjective} recipes <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* You might also enjoy */}
      <section className="bg-warm-soft py-10 md:py-14 border-b border-border">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-8">
            You might also enjoy
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
            {guide.relatedCuisines
              .map((s) => CUISINE_GUIDES_BY_SLUG[s])
              .filter(Boolean)
              .map((related) => (
                <Link
                  key={related.slug}
                  to={`/kitchen-atlas/${related.slug}`}
                  className="group flex flex-col text-left rounded-xl p-5 md:p-6 bg-card border border-border overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-primary/30"
                >
                  <div className="text-2xl md:text-3xl mb-2">{related.emoji}</div>
                  <div className="font-display text-lg md:text-xl leading-tight text-foreground">
                    {related.name}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed flex-1">
                    {related.characterLine}
                  </p>
                  <div className="mt-3 text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                    Read the guide <span aria-hidden="true">→</span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CuisineGuidePage;
