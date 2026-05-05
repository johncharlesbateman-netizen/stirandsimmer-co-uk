import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import NewsletterSignup from "@/components/NewsletterSignup";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

/**
 * Renders the blog post body. Markdown-style headings (##) become <h2>,
 * blank lines separate paragraphs. This keeps editing simple while still
 * giving us proper semantic H2 subheadings inside an H1-led page.
 */
const renderBody = (content: string) => {
  const blocks = content.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
  return blocks.map((block, i) => {
    if (block.startsWith("## ")) {
      return (
        <h2
          key={i}
          className="heading-section mt-12 mb-4"
        >
          {block.replace(/^##\s+/, "")}
        </h2>
      );
    }
    if (block.startsWith("### ")) {
      return (
        <h3 key={i} className="font-display text-xl mt-8 mb-3">
          {block.replace(/^###\s+/, "")}
        </h3>
      );
    }
    return (
      <p
        key={i}
        className="text-base text-muted-foreground leading-relaxed mb-5"
      >
        {block}
      </p>
    );
  });
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug!)
        .eq("published", true)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-20">
          <div className="animate-pulse space-y-6 max-w-3xl">
            <div className="h-4 w-32 bg-muted rounded" />
            <div className="h-10 w-2/3 bg-muted rounded" />
            <div className="aspect-[16/9] bg-muted" />
            <div className="h-4 w-full bg-muted" />
            <div className="h-4 w-5/6 bg-muted" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-20 text-center">
          <h1 className="heading-editorial mb-4">Post not found</h1>
          <Link
            to="/blog"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to the blog
          </Link>
        </div>
      </Layout>
    );
  }

  const pageUrl = `https://greatfoodrecipes.co.uk/blog/${post.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    ...(post.image_url && { image: [post.image_url] }),
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "Great Food Recipes",
      url: "https://greatfoodrecipes.co.uk",
    },
    mainEntityOfPage: pageUrl,
  };

  return (
    <Layout>
      <Helmet>
        <title>{`${post.title} | Great Food Recipes`}</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={pageUrl} />
        {post.image_url && <meta property="og:image" content={post.image_url} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        {post.image_url && <meta name="twitter:image" content={post.image_url} />}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 pt-8">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
      </div>

      {/* Header */}
      <article>
        <header className="py-12 md:py-16">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <div className="max-w-3xl">
              <p className="micro-caption mb-4">Journal</p>
              <h1 className="heading-display mb-6">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span>By {post.author}</span>
                <span aria-hidden>·</span>
                <time dateTime={post.published_at}>
                  {formatDate(post.published_at)}
                </time>
              </div>
            </div>
          </div>
        </header>

        {post.image_url && (
          <div className="pb-10">
            <div className="container mx-auto px-6 md:px-12 lg:px-20">
              <div className="max-w-4xl aspect-[16/9] overflow-hidden bg-muted">
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        )}

        <div className="container mx-auto px-6 md:px-12 lg:px-20 pb-24 md:pb-32">
          <div className="max-w-3xl">{renderBody(post.content)}</div>
        </div>
      </article>

      <NewsletterSignup />
    </Layout>
  );
};

export default BlogPost;
