import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowRight } from "lucide-react";

const GUIDES = [
  {
    slug: "mother-sauces",
    title: "The five French mother sauces — and why every home cook should know them",
    description:
      "Master these five and you hold the keys to almost every classic sauce in western cuisine.",
    eyebrow: "French technique",
  },
  {
    slug: "french-techniques",
    title: "French cooking techniques every home cook should know",
    description:
      "Seven essential French techniques — mise en place, julienne, brunoise, chiffonade, beurre blanc, flambé and déglaze — explained simply.",
    eyebrow: "French technique",
  },
];

const Guides = () => {
  return (
    <Layout>
      <Helmet>
        <title>Guides — kitchen techniques and reference | Stir and Simmer</title>
        <meta
          name="description"
          content="Practical kitchen guides from Stir and Simmer — techniques, reference and the craft behind great home cooking."
        />
        <link rel="canonical" href="https://www.stirandsimmer.co.uk/guides" />
      </Helmet>

      <header className="border-b border-border bg-background">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20 max-w-3xl">
          <p className="micro-caption mb-4 text-primary">Guides</p>
          <h1 className="font-display text-4xl md:text-5xl leading-tight text-foreground mb-5">
            Kitchen guides
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Techniques, reference and the craft behind great home cooking — explained simply.
          </p>
        </div>
      </header>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 max-w-3xl">
        <ul className="space-y-6">
          {GUIDES.map((g) => (
            <li key={g.slug}>
              <Link
                to={`/guides/${g.slug}`}
                className="block rounded-lg p-6 md:p-8 border border-border bg-card hover:-translate-y-1 hover:shadow-md transition-all"
              >
                <p className="text-xs uppercase tracking-widest font-semibold mb-2 text-primary">
                  {g.eyebrow}
                </p>
                <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3 leading-tight">
                  {g.title}
                </h2>
                <p className="text-base md:text-lg text-muted-foreground mb-4">
                  {g.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm text-foreground">
                  Read the guide <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default Guides;
