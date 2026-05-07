import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { formatGuideDate } from "@/lib/guide-utils";

const Guides = () => {
  const { data: guides, isLoading } = useQuery({
    queryKey: ["guides", "list"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("guides")
        .select("id, slug, title, intro, image_url, last_updated_at")
        .eq("published", true)
        .order("last_updated_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <Layout>
      <Helmet>
        <title>Kitchen Guides | Stir & Simmer</title>
        <meta
          name="description"
          content="Practical UK kitchen guides — what's in season, midweek dinner ideas and tips for cooking with everyday supermarket ingredients."
        />
        <link rel="canonical" href="https://stirandsimmer.co.uk/guides" />
      </Helmet>

      <section className="py-12 md:py-16 border-b border-border">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <p className="micro-caption mb-4">Kitchen Guides</p>
          <h1 className="heading-display mb-6">Kitchen Guides</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Short, practical guides to cooking better at home — what's in season,
            what to make on a Tuesday night, and how to get more out of your
            weekly shop.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-4 animate-pulse">
                  <div className="aspect-[4/3] bg-muted" />
                  <div className="h-6 w-3/4 bg-muted rounded" />
                  <div className="h-4 w-full bg-muted rounded" />
                </div>
              ))}
            </div>
          ) : guides && guides.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {guides.map((guide) => (
                <Link
                  key={guide.id}
                  to={`/guides/${guide.slug}`}
                  className="group block"
                >
                  <article className="space-y-4">
                    <div className="aspect-[4/3] overflow-hidden bg-muted relative">
                      {guide.image_url ? (
                        <img
                          src={guide.image_url}
                          alt={guide.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover editorial-image"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted">
                          <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
                            Guide
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />
                    </div>
                    <div className="space-y-2">
                      <p className="micro-caption">
                        Updated {formatGuideDate(guide.last_updated_at)}
                      </p>
                      <h2 className="font-display text-xl md:text-2xl">
                        {guide.title}
                      </h2>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {guide.intro}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No guides published yet.</p>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Guides;
