import { useState, useLayoutEffect, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import QRCode from "qrcode";
import { ArrowLeft, Leaf, Share2, ExternalLink, Printer, ChevronDown } from "lucide-react";
import { supermarketLogos } from "@/lib/supermarket-logos";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { categoryLabels, categoryToSlug } from "@/lib/recipe-utils";
import { scaleIngredients, scaleIngredientsSmart } from "@/lib/ingredient-scaler";
import { buildSeoTitle, buildSeoDescription, buildRecipeIntro, buildServingSuggestion } from "@/lib/seo";
import { optimisedImage, responsiveSrcSet } from "@/lib/image-utils";
import { buildRecipeAltText } from "@/lib/seo";
import IngredientList from "@/components/IngredientList";
import ServingScaler from "@/components/ServingScaler";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type MobileTab = "ingredients" | "method" | "shop";

const RecipeDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  const { isAdmin } = useAuth();
  const [servings, setServings] = useState<number | null>(null);
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());
  const [activeTab, setActiveTab] = useState<MobileTab>("ingredients");
  const [printWithImage, setPrintWithImage] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  // Scroll to top and reset state when navigating to a new recipe
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    setServings(null);
    setCheckedIngredients(new Set());
    setActiveTab("ingredients");
  }, [slug]);

  // Generate QR code for the print view linking back to this recipe
  useEffect(() => {
    if (!slug) return;
    const url = `https://greatfoodrecipes.co.uk/recipes/${slug}`;
    QRCode.toDataURL(url, { margin: 1, width: 240 })
      .then(setQrDataUrl)
      .catch(() => setQrDataUrl(""));
  }, [slug]);

  const toggleIngredient = (index: number) => {
    setCheckedIngredients((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const { data: recipe, isLoading } = useQuery({
    queryKey: ["recipe", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .eq("slug", slug!)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  // Related recipes: same category first, fall back to other recipes
  const { data: relatedRecipes = [] } = useQuery({
    queryKey: ["related-recipes", recipe?.id, recipe?.category],
    queryFn: async () => {
      if (!recipe) return [];
      // Try same category first
      const { data: sameCat } = await supabase
        .from("recipes")
        .select("*")
        .eq("category", recipe.category)
        .neq("id", recipe.id)
        .limit(6);

      let pool = sameCat ?? [];

      if (pool.length < 3) {
        const { data: others } = await supabase
          .from("recipes")
          .select("*")
          .neq("id", recipe.id)
          .neq("category", recipe.category)
          .limit(6);
        pool = [...pool, ...(others ?? [])];
      }

      // Score by shared ingredients to surface most-similar first
      const baseIngredients = new Set(
        ((recipe.ingredients as string[]) ?? []).map((i) =>
          i.toLowerCase().replace(/[^a-z\s]/g, "").trim(),
        ),
      );
      const scored = pool.map((r) => {
        const ings = ((r.ingredients as string[]) ?? []).map((i) =>
          i.toLowerCase().replace(/[^a-z\s]/g, "").trim(),
        );
        const overlap = ings.filter((i) =>
          [...baseIngredients].some((b) => b && i && (b.includes(i) || i.includes(b))),
        ).length;
        return { recipe: r, score: overlap };
      });
      scored.sort((a, b) => b.score - a.score);
      return scored.slice(0, 3).map((s) => s.recipe);
    },
    enabled: !!recipe,
  });

  const baseServings = recipe?.servings || 2;
  const currentServings = servings ?? baseServings;
  const scaleFactor = currentServings / baseServings;

  const ingredients = (recipe?.ingredients as string[]) || [];
  const instructions = (recipe?.instructions as string[]) || [];
  const scaledIngredients = scaleIngredients(ingredients, baseServings, currentServings);
  const smartScaledIngredients = scaleIngredientsSmart(ingredients, baseServings, currentServings);
  const isScaled = currentServings !== baseServings;

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-20">
          <div className="animate-pulse space-y-8">
            <div className="h-4 w-32 bg-muted rounded" />
            <div className="h-10 w-2/3 bg-muted rounded" />
            <div className="aspect-[16/9] bg-muted" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!recipe) {
    return (
      <Layout>
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-20 text-center">
          <h1 className="heading-editorial mb-4">Recipe not found</h1>
          <Link to="/recipes" className="text-muted-foreground hover:text-foreground transition-colors">
            ← Back to recipes
          </Link>
        </div>
      </Layout>
    );
  }

  const totalTime = (recipe.prep_time_minutes || 0) + (recipe.cook_time_minutes || 0);

  const seoTitle = buildSeoTitle(
    (recipe as { seo_title?: string | null }).seo_title,
    recipe.title,
    totalTime,
  );
  const seoDescription = buildSeoDescription(
    (recipe as { seo_description?: string | null }).seo_description,
    recipe.title,
    recipe.description,
    ingredients,
    totalTime,
    recipe.category,
  );
  // Richer description used for structured data (not constrained to 155 chars).
  const structuredDescription = recipe.description;
  const imageAlt = buildRecipeAltText(recipe.title, ingredients);

  const pageUrl = `https://greatfoodrecipes.co.uk/recipes/${recipe.slug}`;
  const shareUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/og-recipe?slug=${recipe.slug}`;

  // Build keywords from category + first few key ingredients (de-duplicated, lowercase).
  const keywordParts = [
    categoryLabels[recipe.category],
    ...ingredients
      .slice(0, 6)
      .map((i) =>
        i
          .replace(
            /^[\d\s/.,⅓½¼¾⅔⅛⅜⅝⅞-]+\s*(g|kg|ml|l|tsp|tbsp|cup|cups|oz|lb|pinch|clove|cloves|slice|slices)?\s*/i,
            "",
          )
          .split(",")[0]
          .trim()
          .toLowerCase(),
      ),
  ].filter(Boolean);
  const keywords = Array.from(new Set(keywordParts)).slice(0, 8).join(", ");

  const prepTimeIso = recipe.prep_time_minutes
    ? `PT${recipe.prep_time_minutes}M`
    : "PT0M";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    description: structuredDescription,
    ...(recipe.image_url && { image: [recipe.image_url] }),
    prepTime: prepTimeIso,
    ...(recipe.cook_time_minutes && { cookTime: `PT${recipe.cook_time_minutes}M` }),
    ...(totalTime > 0 && { totalTime: `PT${totalTime}M` }),
    ...(recipe.servings && { recipeYield: `${recipe.servings} servings` }),
    recipeCategory: categoryLabels[recipe.category],
    recipeCuisine: "British",
    keywords,
    recipeIngredient: ingredients,
    recipeInstructions: instructions.map((step, i) => ({
      "@type": "HowToStep",
      name: `Step ${i + 1}`,
      position: i + 1,
      text: step,
      ...(recipe.image_url && { image: recipe.image_url }),
      url: `${pageUrl}#step-${i + 1}`,
    })),
    nutrition: {
      "@type": "NutritionInformation",
      servingSize: recipe.servings ? `1 of ${recipe.servings} servings` : "1 serving",
    },
    author: {
      "@type": "Organization",
      name: "Great Food Recipes",
      url: "https://greatfoodrecipes.co.uk",
    },
    datePublished: recipe.created_at,
    dateModified: recipe.updated_at,
  };




  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({ title: "Link copied!", description: "Share this link on social media for a rich preview." });
    } catch {
      toast({ title: "Couldn't copy", description: shareUrl, variant: "destructive" });
    }
  };

  const handlePrint = (withImage: boolean) => {
    setPrintWithImage(withImage);
    setTimeout(() => window.print(), 50);
  };

  return (
    <Layout>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content="Great Food Recipes" />
        {recipe.image_url && <meta property="og:image" content={recipe.image_url} />}
        {recipe.image_url && <meta property="og:image:alt" content={imageAlt} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        {recipe.image_url && <meta name="twitter:image" content={recipe.image_url} />}
        <link rel="canonical" href={pageUrl} />
        {recipe.image_url && (
          <link
            rel="preload"
            as="image"
            href={optimisedImage(recipe.image_url, { width: 1600 })}
            imageSrcSet={responsiveSrcSet(recipe.image_url, [800, 1200, 1600, 2000])}
            imageSizes="(max-width: 1024px) 100vw, 1024px"
            fetchPriority="high"
          />
        )}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      {/* Back Link & Share */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 pt-8 flex items-center justify-between">
        <Link
          to="/recipes"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Recipes
        </Link>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none">
              <Printer className="w-4 h-4" />
              Print Recipe
              <ChevronDown className="w-3 h-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background">
              <DropdownMenuItem onClick={() => handlePrint(false)}>
                Print without image
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handlePrint(true)}>
                Print with image
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
          {isAdmin && (
            <Link
              to={`/admin/recipes/${recipe.slug}/edit`}
              className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Edit
            </Link>
          )}
        </div>
      </div>

      {/* Hero */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-4xl">
            <p className="micro-caption mb-4">
              <Link
                to={`/recipes/category/${categoryToSlug[recipe.category]}`}
                className="editorial-link hover:text-foreground transition-colors"
              >
                {categoryLabels[recipe.category]}
              </Link>
            </p>
            <h1 className="heading-display mb-6">{recipe.title}</h1>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
              {recipe.description}
            </p>

            {/* Intro paragraph — adds unique on-page content for SEO */}
            <p className="text-base text-muted-foreground/90 mb-8 max-w-2xl leading-relaxed">
              {buildRecipeIntro(
                recipe.title,
                recipe.description ?? "",
                ingredients,
                recipe.category,
                totalTime,
                recipe.servings,
              )}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
              {recipe.prep_time_minutes ? (
                <span><strong className="text-foreground font-medium">Prep</strong> {recipe.prep_time_minutes} min</span>
              ) : null}
              {recipe.cook_time_minutes ? (
                <span><strong className="text-foreground font-medium">Cook</strong> {recipe.cook_time_minutes} min</span>
              ) : null}
              {totalTime > 0 ? (
                <span><strong className="text-foreground font-medium">Total</strong> {totalTime} min</span>
              ) : null}
              {recipe.servings ? (
                <span><strong className="text-foreground font-medium">Serves</strong> {recipe.servings}</span>
              ) : null}
              {recipe.is_seasonal && (
                <span className="flex items-center gap-2 text-accent">
                  <Leaf className="w-4 h-4" />
                  Seasonal
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Image */}
      {recipe.image_url && (
        <section className="pb-12">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <div className="max-w-4xl aspect-[16/9] overflow-hidden bg-muted">
              <img
                src={optimisedImage(recipe.image_url, { width: 1600 })}
                srcSet={responsiveSrcSet(recipe.image_url, [800, 1200, 1600, 2000])}
                sizes="(max-width: 1024px) 100vw, 1024px"
                alt={imageAlt}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                width={1600}
                height={900}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="pb-20 md:pb-32">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          {/* Mobile tab bar */}
          <div className="mb-8 flex max-w-4xl border-b border-border md:hidden">
            {([
              { key: "ingredients" as MobileTab, label: "Ingredients" },
              { key: "method" as MobileTab, label: "Method" },
              { key: "shop" as MobileTab, label: "Shop" },
            ]).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? "border-b-2 border-foreground text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 max-w-4xl">
            {/* Ingredients — order-2 on mobile (after image+info), order-1 on md */}
            <div className={`order-1 ${activeTab === "ingredients" ? "block" : "hidden"} md:col-span-4 md:order-1 md:block`}>
              <h2 className="heading-section mb-6 pb-4 border-b border-border hidden md:block">
                Ingredients
              </h2>
              <ServingScaler
                servings={currentServings}
                baseServings={baseServings}
                onChange={setServings}
              />
              <IngredientList
                ingredients={smartScaledIngredients}
                checkedIngredients={checkedIngredients}
                onToggle={toggleIngredient}
              />
              {isScaled && (
                <p className="mt-6 text-xs text-muted-foreground border-l-2 border-accent/40 pl-3 leading-relaxed">
                  <strong className="text-foreground">Cooking time may vary</strong> — check
                  your dish rather than relying on the original times when scaling
                  servings.
                </p>
              )}
            </div>

            {/* Instructions */}
            <div className={`order-2 ${activeTab === "method" ? "block" : "hidden"} md:col-span-8 md:order-2 md:block`}>
              <h2 className="heading-section mb-6 pb-4 border-b border-border hidden md:block">
                Method
              </h2>
              <ol className="space-y-6">
                {(() => {
                  let stepNum = 0;
                  return instructions.map((step, i) => {
                    const isHeader = /^(for the |for |the )/i.test(step.trim()) && step.trim().split(" ").length <= 6;
                    if (isHeader) {
                      return (
                        <li key={i} className="pt-4 first:pt-0">
                          <span className="text-base font-semibold text-foreground">
                            {step.replace(/:$/, "")}
                          </span>
                        </li>
                      );
                    }
                    stepNum++;
                    return (
                      <li key={i} className="flex gap-4">
                        <span className="font-display text-2xl text-muted-foreground/40 flex-shrink-0 w-8">
                          {stepNum}
                        </span>
                        <p className="text-muted-foreground leading-relaxed pt-1">
                          {step}
                        </p>
                      </li>
                    );
                  });
                })()}
              </ol>

              {/* Tips */}
              {recipe.tips && (
                <div className="mt-12 p-6 bg-secondary border border-border">
                  <h2 className="micro-caption mb-3">Chef's Tips</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {recipe.tips}
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* Serving Suggestions — adds unique on-page text for SEO */}
          <div className="max-w-4xl mt-16 pt-12 border-t border-border">
            <h2 className="heading-section mb-4">Serving Suggestions</h2>
            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
              {buildServingSuggestion(recipe.title, recipe.category)}
            </p>
          </div>

        </div>
      </section>

      {/* You Might Also Like */}
      {relatedRecipes.length > 0 && (
        <section className="no-print pb-12 md:pb-20 border-t border-border">
          <div className="container mx-auto px-6 md:px-12 lg:px-20 pt-16 md:pt-20">
            <h2 className="heading-section mb-10">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {relatedRecipes.map((r) => {
                const rPrep = r.prep_time_minutes || 0;
                return (
                  <Link
                    key={r.id}
                    to={`/recipes/${r.slug}`}
                    className="group block"
                  >
                    <article className="space-y-4">
                      <div className="aspect-[4/3] overflow-hidden bg-muted relative">
                        <img
                          src={r.image_url ? optimisedImage(r.image_url, { width: 800 }) : "/placeholder.svg"}
                          srcSet={r.image_url ? responsiveSrcSet(r.image_url, [400, 600, 800, 1200]) : undefined}
                          sizes="(max-width: 768px) 100vw, 33vw"
                          alt={buildRecipeAltText(r.title, (r.ingredients as string[] | null) ?? [])}
                          loading="lazy"
                          decoding="async"
                          width={800}
                          height={600}
                          className="w-full h-full object-cover editorial-image"
                        />
                        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />
                      </div>
                      <div className="space-y-2">
                        <p className="micro-caption">{categoryLabels[r.category]}</p>
                        <h3 className="font-display text-xl md:text-2xl group-hover:text-accent transition-colors">
                          {r.title}
                        </h3>
                        {r.description && (
                          <p className="text-sm text-muted-foreground line-clamp-3">
                            {r.description}
                          </p>
                        )}
                        {rPrep > 0 && (
                          <p className="text-sm text-muted-foreground">
                            Prep {rPrep} min
                          </p>
                        )}
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Supermarket Cards */}
      <section className={`no-print pb-20 md:pb-32 ${activeTab === "shop" ? "block" : "hidden"} md:block`}>
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-4xl">
            <h2 className="heading-section mb-6 pb-4 border-b border-border">
              Shop the Ingredients
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {([
                { name: "Tesco", id: "tesco" as const, url: "https://www.tesco.com/" },
                { name: "Sainsbury's", id: "sainsburys" as const, url: "https://www.sainsburys.co.uk/" },
                { name: "ASDA", id: "asda" as const, url: "https://www.asda.com/" },
                { name: "Waitrose", id: "waitrose" as const, url: "https://www.waitrose.com/" },
                { name: "Morrisons", id: "morrisons" as const, url: "https://www.morrisons.com/" },
                { name: "Aldi", id: "aldi" as const, url: "https://www.aldi.co.uk/" },
                { name: "Lidl", id: "lidl" as const, url: "https://www.lidl.co.uk/" },
                { name: "Booths", id: "booths" as const, url: "https://www.booths.co.uk/" },
                { name: "Ocado", id: "ocado" as const, url: "https://www.ocado.com/" },
              ]).map((market) => (
                <a
                  key={market.name}
                  href={market.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 p-5 border border-border hover:border-muted-foreground/40 hover:bg-secondary hover:shadow-sm transition-all duration-200 text-center group last:col-span-2 last:max-w-[50%] last:mx-auto md:last:col-span-1 md:last:max-w-none"
                >
                  <img src={supermarketLogos[market.id]} alt={market.name} className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-200" loading="lazy" width={40} height={40} />
                  <span className="text-sm font-semibold text-foreground">{market.name}</span>
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                    Shop now <ExternalLink className="w-3 h-3" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Print-only recipe card */}
      <div
        className={`print-recipe-card ${printWithImage ? "" : "print-no-image"}`}
        aria-hidden="true"
      >
        <div className="print-section">
          <h2>{recipe.title}</h2>
          {recipe.description && <p className="print-description">{recipe.description}</p>}
          {recipe.image_url && (
            <img src={recipe.image_url} alt={imageAlt} className="print-image" />
          )}
          <div className="print-meta">
            {recipe.prep_time_minutes ? (
              <div><strong>Prep</strong>{recipe.prep_time_minutes} min</div>
            ) : null}
            {recipe.cook_time_minutes ? (
              <div><strong>Cook</strong>{recipe.cook_time_minutes} min</div>
            ) : null}
            {totalTime > 0 ? (
              <div><strong>Total</strong>{totalTime} min</div>
            ) : null}
            {recipe.servings ? (
              <div><strong>Servings</strong>{currentServings}</div>
            ) : null}
          </div>
        </div>

        <section className="print-section">
          <h2>Ingredients</h2>
          <ul className="print-ingredients">
            {scaledIngredients.map((ing, i) => (
              <li key={i}>{ing}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Method</h2>
          <ol className="print-instructions">
            {instructions.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </section>

        {recipe.tips && (
          <section className="print-section">
            <h2>Chef's Tips</h2>
            <p>{recipe.tips}</p>
          </section>
        )}

        {qrDataUrl && (
          <div className="print-qr">
            <img src={qrDataUrl} alt="Scan to view recipe online" />
            <p>
              Scan to view this recipe online
              <span>{pageUrl}</span>
            </p>
          </div>
        )}

        <div className="print-footer">greatfoodrecipes.co.uk</div>
      </div>
    </Layout>
  );
};

export default RecipeDetail;
