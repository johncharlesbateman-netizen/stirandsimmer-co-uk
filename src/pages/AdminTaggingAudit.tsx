import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Pencil } from "lucide-react";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

type Recipe = Tables<"recipes">;

const TILE_CATEGORIES = new Set([
  "chicken",
  "beef",
  "lamb",
  "seafood",
  "pork",
  "spicy",
  "pasta",
  "sweets",
]);

const VALID_REGIONS = new Set(["british", "italian", "french", "indian", "asian"]);

type Status = "complete" | "partial" | "missing";

const classify = (r: Recipe): { status: Status; reasons: string[] } => {
  const reasons: string[] = [];
  const hasTileCategory = r.category && TILE_CATEGORIES.has(r.category);
  const regionTags = ((r.cuisine_region as string[] | null) ?? []).filter(
    (t) => VALID_REGIONS.has(t),
  );
  const hasRegion = regionTags.length > 0;

  if (!hasTileCategory) reasons.push("No tile category");
  if (!hasRegion) reasons.push("No cuisine region");

  if (!hasTileCategory && !hasRegion) return { status: "missing", reasons };
  if (!hasTileCategory || !hasRegion) return { status: "partial", reasons };
  return { status: "complete", reasons };
};

const STATUS_STYLES: Record<Status, string> = {
  complete: "border-l-4 border-l-green-600 bg-green-50 dark:bg-green-950/20",
  partial: "border-l-4 border-l-amber-500 bg-amber-50 dark:bg-amber-950/20",
  missing: "border-l-4 border-l-red-600 bg-red-50 dark:bg-red-950/20",
};

const STATUS_LABEL: Record<Status, string> = {
  complete: "Complete",
  partial: "Partial",
  missing: "Missing",
};

const STATUS_BADGE: Record<Status, string> = {
  complete: "bg-green-600 text-white",
  partial: "bg-amber-500 text-white",
  missing: "bg-red-600 text-white",
};

const AdminTaggingAudit = () => {
  const { data: recipes = [], isLoading } = useQuery({
    queryKey: ["admin-tagging-audit"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("recipes")
        .select("id, slug, title, category, cuisine_region")
        .order("title");
      if (error) throw error;
      return (data ?? []) as Recipe[];
    },
  });

  const rows = useMemo(
    () =>
      recipes.map((r) => ({ recipe: r, ...classify(r) })),
    [recipes],
  );

  const counts = useMemo(() => {
    const c = { complete: 0, partial: 0, missing: 0, total: rows.length };
    for (const row of rows) c[row.status]++;
    return c;
  }, [rows]);

  return (
    <Layout>
      <Helmet>
        <title>Recipe tagging audit | Admin | Stir & Simmer</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <section className="py-10 md:py-14 border-b border-border">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <p className="micro-caption mb-2 text-muted-foreground">Admin</p>
          <h1 className="heading-display mb-4">Recipe tagging audit</h1>
          <p className="text-muted-foreground max-w-2xl mb-6">
            Every recipe in the database with its tile category and cuisine
            region tags. Use this to spot recipes that need attention before
            they slip through the Recipes page or Kitchen Atlas filters.
          </p>

          <div className="flex flex-wrap gap-3 text-sm">
            <span className="px-3 py-1.5 rounded-md bg-secondary text-foreground">
              Total: <strong>{counts.total}</strong>
            </span>
            <span className="px-3 py-1.5 rounded-md bg-green-600 text-white">
              Complete: <strong>{counts.complete}</strong>
            </span>
            <span className="px-3 py-1.5 rounded-md bg-amber-500 text-white">
              Partial: <strong>{counts.partial}</strong>
            </span>
            <span className="px-3 py-1.5 rounded-md bg-red-600 text-white">
              Missing: <strong>{counts.missing}</strong>
            </span>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          {isLoading ? (
            <p className="text-muted-foreground">Loading recipes…</p>
          ) : (
            <div className="space-y-2">
              {rows.map(({ recipe, status, reasons }) => {
                const regions =
                  ((recipe.cuisine_region as string[] | null) ?? []);
                return (
                  <div
                    key={recipe.id}
                    className={`rounded-md p-4 ${STATUS_STYLES[status]}`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span
                            className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${STATUS_BADGE[status]}`}
                          >
                            {STATUS_LABEL[status]}
                          </span>
                          <h2 className="font-display text-base md:text-lg text-foreground truncate">
                            {recipe.title}
                          </h2>
                        </div>

                        <div className="flex flex-wrap gap-2 text-xs">
                          <span className="inline-flex items-center gap-1.5">
                            <span className="text-muted-foreground">Category:</span>
                            {recipe.category &&
                            TILE_CATEGORIES.has(recipe.category) ? (
                              <span className="px-2 py-0.5 rounded bg-foreground/10 text-foreground font-mono">
                                {recipe.category}
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded bg-red-600/15 text-red-700 dark:text-red-300 font-mono">
                                {recipe.category ?? "—"}
                              </span>
                            )}
                          </span>

                          <span className="inline-flex items-center gap-1.5 flex-wrap">
                            <span className="text-muted-foreground">Regions:</span>
                            {regions.length === 0 ? (
                              <span className="px-2 py-0.5 rounded bg-red-600/15 text-red-700 dark:text-red-300 font-mono">
                                none
                              </span>
                            ) : (
                              regions.map((tag) => {
                                const valid = VALID_REGIONS.has(tag);
                                return (
                                  <span
                                    key={tag}
                                    className={`px-2 py-0.5 rounded font-mono ${
                                      valid
                                        ? "bg-foreground/10 text-foreground"
                                        : "bg-amber-500/20 text-amber-800 dark:text-amber-200"
                                    }`}
                                  >
                                    {tag}
                                  </span>
                                );
                              })
                            )}
                          </span>
                        </div>

                        {reasons.length > 0 && (
                          <p className="text-xs text-muted-foreground mt-2">
                            {reasons.join(" · ")}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <Link
                          to={`/recipes/${recipe.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> View
                        </Link>
                        <Link
                          to={`/admin/recipes/${recipe.slug}/edit`}
                          className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-md bg-foreground text-background hover:opacity-90"
                        >
                          <Pencil className="w-3.5 h-3.5" /> Edit
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default AdminTaggingAudit;
