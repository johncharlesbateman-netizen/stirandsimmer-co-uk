import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
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
    queryKey: ["recipes", "titles-slugs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("recipes")
        .select("title, slug");
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

      <article className="py-12 md:py-16">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <Link
            to="/guides"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> All guides
          </Link>

          <div className="max-w-3xl">
            <p className="micro-caption mb-4">Kitchen Guide</p>
            <h1 className="heading-display mb-6">{guide.title}</h1>
            <p className="text-muted-foreground text-lg mb-4">{guide.intro}</p>
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-10">
              Last updated {formatGuideDate(guide.last_updated_at)}
            </p>

            {heroImage && (
              <div className="aspect-[16/9] overflow-hidden bg-muted mb-12">
                <img
                  src={heroImage}
                  alt={guide.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="prose-editorial">
              {renderGuideBody(guide.body, recipes)}
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default GuideDetail;
