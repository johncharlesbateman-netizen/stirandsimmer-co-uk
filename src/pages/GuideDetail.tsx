import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { renderGuideBody, formatGuideDate } from "@/lib/guide-utils";
import { guideImageBySlug } from "@/lib/guide-images";

const GuideDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: guide, isLoading } = useQuery({
    queryKey: ["guide", slug],
    enabled: !!slug,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("guides")
        .select("*")
        .eq("slug", slug!)
        .eq("published", true)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const { data: recipes = [] } = useQuery({
    queryKey: ["recipes", "for-guides"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("recipes")
        .select("title, slug, image_url, description");
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-20">
          <div className="animate-pulse space-y-6 max-w-3xl">
            <div className="h-4 w-32 bg-muted rounded" />
            <div className="h-12 w-3/4 bg-muted rounded" />
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-full bg-muted rounded" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!guide) {
    return (
      <Layout>
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-20 text-center">
          <h1 className="heading-section mb-4">Guide not found</h1>
          <Link to="/guides" className="editorial-link">Back to all guides</Link>
        </div>
      </Layout>
    );
  }

  const canonical = `https://stirandsimmer.co.uk/guides/${guide.slug}`;
  const heroImage = guide.image_url || guideImageBySlug[guide.slug];

  return (
    <Layout>
      <Helmet>
        <title>{guide.title} | Stir & Simmer</title>
        <meta name="description" content={guide.intro} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={guide.title} />
        <meta property="og:description" content={guide.intro} />
        {heroImage && <meta property="og:image" content={heroImage} />}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: guide.title,
            description: guide.intro,
            datePublished: guide.published_at,
            dateModified: guide.last_updated_at,
            author: { "@type": "Organization", name: "Stir & Simmer" },
            publisher: {
              "@type": "Organization",
              name: "Stir & Simmer",
              url: "https://stirandsimmer.co.uk",
            },
            mainEntityOfPage: canonical,
            ...(heroImage ? { image: heroImage } : {}),
          })}
        </script>
      </Helmet>

      {/* Hero banner */}
      <section className="relative w-full h-[55vh] min-h-[420px] max-h-[640px] overflow-hidden bg-muted">
        {heroImage && (
          <img
            src={heroImage}
            alt={guide.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/10" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-6 md:px-12 lg:px-20 pb-12 md:pb-16">
            <Link
              to="/guides"
              className="inline-flex items-center gap-2 text-sm text-foreground/80 hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> All guides
            </Link>
            <p className="micro-caption mb-3 text-primary">Kitchen Guide</p>
            <h1 className="heading-display max-w-4xl mb-4 text-foreground">
              {guide.title}
            </h1>
            <p className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-muted-foreground">
              <Clock className="w-3 h-3" />
              Updated {formatGuideDate(guide.last_updated_at)}
            </p>
          </div>
        </div>
      </section>

      <article className="py-12 md:py-16">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto">
            {/* Intro lede */}
            <div className="mb-12 pb-10 border-b border-border">
              <p className="font-display text-xl md:text-2xl leading-relaxed text-foreground/90 first-letter:font-display first-letter:text-5xl first-letter:font-normal first-letter:mr-2 first-letter:float-left first-letter:leading-none first-letter:mt-1 first-letter:text-primary">
                {guide.intro}
              </p>
            </div>

            {/* Body */}
            <div>{renderGuideBody(guide.body, recipes)}</div>

            {/* Footer CTA */}
            <div className="mt-16 pt-10 border-t border-border text-center">
              <p className="micro-caption mb-3">Keep reading</p>
              <Link
                to="/guides"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-md hover:bg-secondary transition-colors text-sm tracking-wide"
              >
                <ArrowLeft className="w-4 h-4" /> Back to all kitchen guides
              </Link>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default GuideDetail;
