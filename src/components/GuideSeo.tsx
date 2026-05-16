import { Helmet } from "react-helmet-async";
import { getGuideMeta } from "@/lib/guideMeta";

type Props = { slug: string };

const GuideSeo = ({ slug }: Props) => {
  const meta = getGuideMeta(slug);
  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="author" content={meta.author} />
      <link rel="canonical" href={meta.url} />

      {/* Open Graph */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={meta.url} />
      <meta property="og:image" content={meta.image} />
      <meta property="og:site_name" content="Stir & Simmer" />
      <meta property="article:published_time" content={meta.publishedTime} />
      <meta property="article:modified_time" content={meta.modifiedTime} />
      <meta property="article:author" content={meta.author} />
      <meta property="og:author" content={meta.author} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />
    </Helmet>
  );
};

export default GuideSeo;
