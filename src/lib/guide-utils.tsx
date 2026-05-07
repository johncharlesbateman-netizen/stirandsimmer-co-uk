import { Fragment, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Tables } from "@/integrations/supabase/types";

type RecipeRef = Pick<Tables<"recipes">, "title" | "slug">;

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Linkify recipe titles found in a paragraph of text. Longest titles first
 * so multi-word titles win over substrings.
 */
export const linkifyRecipeMentions = (text: string, recipes: RecipeRef[]): ReactNode => {
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
          className="underline underline-offset-4 decoration-muted-foreground/40 hover:decoration-foreground transition-colors"
        >
          {part}
        </Link>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
};

export const renderGuideBody = (body: string, recipes: RecipeRef[]) => {
  const paragraphs = body.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  return paragraphs.map((p, i) => (
    <p key={i} className="body-editorial text-muted-foreground mb-6 last:mb-0">
      {linkifyRecipeMentions(p, recipes)}
    </p>
  ));
};

export const formatGuideDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
