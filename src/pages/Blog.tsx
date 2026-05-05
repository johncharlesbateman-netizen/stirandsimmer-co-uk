import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { optimisedImage, responsiveSrcSet } from "@/lib/image-utils";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const Blog = () => {
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("slug, title, excerpt, image_url, author, published_at")
        .eq("published", true)
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  return (
    <Layout>
      <Helmet>
        <title>Blog — Stories, Tips & Kitchen Notes | Great Food Recipes</title>
        <meta
          name="description"
          content="Stories, cooking tips, seasonal ideas and kitchen notes from the team at Great Food Recipes — short reads to help you cook with more confidence."
        />
        <link rel="canonical" href="https://greatfoodrecipes.co.uk/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://greatfoodrecipes.co.uk/blog" />
        <meta property="og:title" content="Blog — Great Food Recipes" />
        <meta
          property="og:description"
          content="Stories, cooking tips, seasonal ideas and kitchen notes from the team at Great Food Recipes."
        />
      </Helmet>

      {/* Header */}
      <section className="section-breathing pb-12">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <p className="micro-caption mb-4">Journal</p>
          <h1 className="heading-display mb-6">Blog</h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Stories, kitchen notes and seasonal ideas from our table to yours.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-32">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse space-y-4">
                  <div className="aspect-[4/3] bg-muted" />
                  <div className="h-5 w-3/4 bg-muted" />
                  <div className="h-4 w-full bg-muted" />
                  <div className="h-4 w-5/6 bg-muted" />
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="max-w-xl">
              <p className="text-muted-foreground">
                No blog posts yet — check back soon for our first stories from
                the kitchen.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group block"
                >
                  <article className="space-y-4">
                    <div className="aspect-[4/3] overflow-hidden bg-muted relative">
                      <img
                        src={post.image_url ? optimisedImage(post.image_url, { width: 800 }) : "/placeholder.svg"}
                        srcSet={post.image_url ? responsiveSrcSet(post.image_url, [400, 600, 800, 1200]) : undefined}
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        alt={post.title}
                        loading="lazy"
                        decoding="async"
                        width={800}
                        height={600}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="micro-caption">
                        {formatDate(post.published_at)}
                      </p>
                      <h2 className="font-display text-xl md:text-2xl group-hover:text-accent transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
