import { Fragment, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";

export type RecipeRef = Pick<
  Tables<"recipes">,
  "title" | "slug" | "image_url" | "description"
>;

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Linkify recipe titles found in a paragraph of text. Longest titles first
 * so multi-word titles win over substrings.
 */
export const linkifyRecipeMentions = (
  text: string,
  recipes: Pick<RecipeRef, "title" | "slug">[],
): ReactNode => {
  if (!recipes.length) return text;
  const sorted = [...recipes].sort((a, b) => b.title.length - a.title.length);
  const pattern = new RegExp(
    `(${sorted.map((r) => escapeRegex(r.title)).join("|")})`,
    "gi",
  );
  const parts = text.split(pattern);
  return parts.map((part, i) => {
    const match = sorted.find((r) => r.title.toLowerCase() === part.toLowerCase());
    if (match) {
      return (
        <Link
          key={i}
          to={`/recipes/${match.slug}`}
          className="font-medium text-foreground underline underline-offset-4 decoration-primary/50 hover:decoration-primary transition-colors"
        >
          {part}
        </Link>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
};

const findReferencedRecipes = (
  text: string,
  recipes: RecipeRef[],
): RecipeRef[] => {
  const lower = text.toLowerCase();
  const seen = new Set<string>();
  const out: RecipeRef[] = [];
  const sorted = [...recipes].sort((a, b) => b.title.length - a.title.length);
  for (const r of sorted) {
    if (lower.includes(r.title.toLowerCase()) && !seen.has(r.slug)) {
      seen.add(r.slug);
      out.push(r);
    }
  }
  return out;
};

const HEADING_RE = /^([A-Z][A-Za-z0-9'&\-]*(?:\s+[A-Za-z0-9'&\-]+){0,9})\s+—\s+(.+)$/s;

const RecipeCard = ({ recipe }: { recipe: RecipeRef }) => (
  <Link
    to={`/recipes/${recipe.slug}`}
    className="group flex items-stretch gap-4 bg-card border border-border rounded-md overflow-hidden hover:border-primary/40 hover:shadow-sm transition-all"
  >
    <div className="w-28 sm:w-36 flex-shrink-0 bg-muted overflow-hidden">
      {recipe.image_url ? (
        <img
          src={recipe.image_url}
          alt={recipe.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div className="w-full h-full bg-muted" />
      )}
    </div>
    <div className="flex-1 py-3 pr-4 flex flex-col justify-center min-w-0">
      <p className="micro-caption mb-1">Recipe</p>
      <h4 className="font-display text-base sm:text-lg leading-snug mb-1 group-hover:text-primary transition-colors">
        {recipe.title}
      </h4>
      {recipe.description && (
        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
          {recipe.description}
        </p>
      )}
      <span className="mt-2 inline-flex items-center gap-1 text-xs tracking-[0.15em] uppercase text-primary">
        View recipe <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
      </span>
    </div>
  </Link>
);

export const renderGuideBody = (body: string, recipes: RecipeRef[]) => {
  const paragraphs = body.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

  const blocks: ReactNode[] = [];
  let sectionIndex = 0;

  paragraphs.forEach((para, i) => {
    const headingMatch = para.match(HEADING_RE);
    const referenced = findReferencedRecipes(para, recipes);

    // Detect a section heading (Title Case phrase followed by em-dash)
    if (headingMatch && headingMatch[1].split(/\s+/).length <= 8) {
      const heading = headingMatch[1];
      const rest = headingMatch[2];

      if (sectionIndex > 0) {
        blocks.push(
          <div key={`div-${i}`} className="my-10 flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <span className="text-primary/60 text-sm">✦</span>
            <div className="h-px flex-1 bg-border" />
          </div>,
        );
      }
      sectionIndex++;

      blocks.push(
        <h2
          key={`h-${i}`}
          className="font-display text-2xl md:text-3xl mb-4 mt-2 text-foreground"
        >
          {heading}
        </h2>,
      );
      blocks.push(
        <p
          key={`p-${i}`}
          className="body-editorial text-muted-foreground mb-6"
        >
          {linkifyRecipeMentions(rest, recipes)}
        </p>,
      );
    } else {
      blocks.push(
        <p
          key={`p-${i}`}
          className="body-editorial text-muted-foreground mb-6"
        >
          {linkifyRecipeMentions(para, recipes)}
        </p>,
      );
    }

    if (referenced.length > 0) {
      blocks.push(
        <div
          key={`r-${i}`}
          className="not-prose grid sm:grid-cols-2 gap-3 mb-8 mt-2"
        >
          {referenced.map((r) => (
            <RecipeCard key={r.slug} recipe={r} />
          ))}
        </div>,
      );
    }
  });

  return blocks;
};

export const formatGuideDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
