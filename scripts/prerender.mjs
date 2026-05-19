// Static meta-only prerender. Runs after Vite emits dist/ at production
// build time and writes one HTML file per public route to dist/{path}/index.html.
//
// Each emitted file is a copy of dist/index.html with the SEO-critical tags
// (title, description, canonical, OG, Twitter, optional JSON-LD) rewritten
// for that specific route, so crawlers (Googlebot, Bingbot, GPTBot,
// ClaudeBot, PerplexityBot) see fully-formed metadata in the source HTML
// without needing to execute JavaScript.

import { createClient } from "@supabase/supabase-js";
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SITE = "https://stirandsimmer.co.uk";
const DEFAULT_OG = `${SITE}/og-image.jpg`;

// ---------- Static route definitions ----------

const STATIC_ROUTES = [
  {
    path: "/",
    title: "Stir & Simmer | Delicious Recipes for Every Occasion",
    description:
      "Discover easy, flavour-packed recipes for every occasion. From quick weeknight dinners to impressive desserts — Stir & Simmer has something for everyone.",
  },
  {
    path: "/recipes",
    title: "All Recipes | Stir & Simmer",
    description:
      "Browse every recipe on Stir & Simmer — chicken, beef, lamb, fish, pasta, vegetarian and more. Tried and tested in a real kitchen.",
  },
  {
    path: "/collections",
    title: "Recipe Collections | Stir & Simmer",
    description:
      "Curated collections of our favourite recipes — Italian meals, romantic dinners, fish and seafood, sweets, quick and easy and more.",
  },
  {
    path: "/kitchen-atlas",
    title: "Kitchen Atlas — Recipes by Region | Stir & Simmer",
    description:
      "Explore our recipes by cuisine region — Italian, French, British, Indian, Asian and more. A world of flavour from a single kitchen.",
  },
  {
    path: "/guides",
    title: "Cooking Guides | Stir & Simmer",
    description:
      "In-depth cooking guides covering classic techniques, mother sauces, French foundations and more — from a real working kitchen.",
  },
  {
    path: "/guides/mother-sauces",
    title: "The Five French Mother Sauces — A Complete Guide | Stir & Simmer",
    description:
      "A complete guide to the five French mother sauces — béchamel, velouté, espagnole, tomate and hollandaise — with techniques, ratios and uses.",
  },
  {
    path: "/guides/french-techniques",
    title: "Essential French Cooking Techniques | Stir & Simmer",
    description:
      "Master the essential French cooking techniques that underpin classic cuisine — from sautéing and braising to stocks, sauces and emulsions.",
  },
  {
    path: "/meal-planner",
    title: "7-Day Meal Planner | Stir & Simmer",
    description:
      "Plan a week of dinners in minutes — our free 7-day meal planner picks recipes for you, builds a shopping list and exports it to your supermarket basket.",
  },
  {
    path: "/about",
    title: "About Stir & Simmer",
    description:
      "Stir & Simmer is a UK recipe site sharing tried-and-tested dishes from a real working kitchen — from quick weeknight dinners to dinner-party showpieces.",
  },
  {
    path: "/contact",
    title: "Contact Stir & Simmer",
    description:
      "Got a question, a recipe request or just want to say hello? Drop us a line — we'd love to hear from you.",
  },
  {
    path: "/privacy",
    title: "Privacy Policy | Stir & Simmer",
    description:
      "How Stir & Simmer collects, uses and protects your personal data, in line with the UK GDPR and the Data Protection Act 2018.",
  },
];

// Recipe-tile category pages (mirrors src/lib/recipe-tiles.ts).
const CATEGORY_TILES = [
  { slug: "all", title: "All recipes | Stir & Simmer", description: "Browse every recipe on Stir & Simmer — chicken, beef, lamb, fish, pasta, vegetarian and more. All free, all tried and tested." },
  { slug: "chicken", title: "Chicken recipes — easy and delicious | Stir & Simmer", description: "Discover our collection of tried and tested chicken recipes — from quick weeknight dinners to impressive weekend dishes. All free to browse." },
  { slug: "beef", title: "Beef recipes | Stir & Simmer", description: "Hearty beef recipes for every occasion — slow braises, roasts, ragùs and more. Tried and tested in a real kitchen." },
  { slug: "lamb", title: "Lamb recipes | Stir & Simmer", description: "Tender lamb recipes — slow roasts, fragrant curries and Mediterranean braises. Tried and tested in a real kitchen." },
  { slug: "fish-and-seafood", title: "Fish and seafood recipes | Stir & Simmer", description: "Fresh and flavourful fish and seafood recipes from Stir & Simmer. From simple weeknight salmon to impressive dinner party dishes." },
  { slug: "pork", title: "Pork recipes | Stir & Simmer", description: "Tried and tested pork recipes — from glazed fillets and crackling roasts to fragrant stir-fries and slow-braised casseroles." },
  { slug: "quick-meals", title: "Quick meal recipes — ready in 30 minutes or less | Stir & Simmer", description: "Fast, flavourful and fuss-free — our quick meal recipes are ready in 30 minutes or less. Perfect for busy weeknights." },
  { slug: "spicy", title: "Spicy recipes for heat lovers | Stir & Simmer", description: "Bold, fiery and full of flavour — our spicy recipe collection for those who like a little heat in the kitchen." },
  { slug: "pasta-and-rice", title: "Pasta and rice recipes | Stir & Simmer", description: "Comforting pasta and rice recipes — from rich ragùs and silky carbonara to fragrant pilafs and biryanis." },
  { slug: "puddings-and-desserts", title: "Pudding and dessert recipes | Stir & Simmer", description: "Velvety crème brûlée, light soufflés, buttery scones and decadent chocolate cakes — sweet recipes for every occasion." },
  // Legacy slugs still present in the sitemap.
  { slug: "seafood", title: "Fish and seafood recipes | Stir & Simmer", description: "Fresh and flavourful fish and seafood recipes from Stir & Simmer." },
  { slug: "pasta", title: "Pasta recipes | Stir & Simmer", description: "Comforting pasta recipes — from rich ragùs and silky carbonara to fresh tomato sauces." },
  { slug: "lunch-suggestions", title: "Lunch ideas | Stir & Simmer", description: "Easy, flavour-packed lunch ideas — from sandwiches and salads to warming bowls." },
  { slug: "sweets", title: "Sweet recipes | Stir & Simmer", description: "Sweet recipes from Stir & Simmer — cakes, biscuits, puddings and desserts." },
];

// Collection pages (mirrors src/lib/collections.ts).
const COLLECTIONS = [
  { slug: "italian-meals", title: "Italian Meals", description: "From silky carbonara to creamy risotto and slow-cooked ragù — classic Italian dishes you can make at home." },
  { slug: "romantic-meals", title: "Romantic Meals", description: "Fillet steaks, hand-dived scallops, soufflés and other show-stoppers for date night and celebrations." },
  { slug: "fish-and-seafood", title: "Fish & Seafood", description: "Pan-fried scallops, prawn linguine, herb-crusted salmon and more — bright, flavourful seafood dishes." },
  { slug: "sweets-and-desserts", title: "Sweets & Desserts", description: "Crème brûlée, sticky toffee pudding, soufflés and decadent cakes — sweet endings for every occasion." },
  { slug: "quick-and-easy", title: "Quick & Easy", description: "Minimal prep, short ingredient lists and simple techniques — for when you need dinner fast." },
  { slug: "baking-and-bread", title: "Baking & Bread", description: "Warm crusty bread, buttery scones, light sponges and crisp biscuits — straight from the oven." },
  // Listed in sitemap but not currently in collections.ts — generic copy.
  { slug: "weeknight-suppers", title: "Weeknight Suppers", description: "Easy weeknight dinners that come together fast without compromising on flavour." },
  { slug: "healthy-eating", title: "Healthy Eating", description: "Bright, balanced recipes that prioritise vegetables, lean proteins and whole grains." },
];

// Region pages (mirrors src/lib/cuisine-regions.ts).
const REGIONS = [
  { slug: "italian", label: "Italian" },
  { slug: "french", label: "French" },
  { slug: "british", label: "British" },
  { slug: "indian", label: "Indian" },
  { slug: "asian", label: "Asian" },
  { slug: "spicy", label: "Spicy" },
  { slug: "seasonal", label: "Seasonal" },
  { slug: "comfort", label: "Comfort" },
];

// ---------- HTML rewriting ----------

const escapeHtml = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

/**
 * Rewrites the SEO-critical tags inside a copy of dist/index.html.
 * Removes any existing <title>, description / canonical / og:* / twitter:*
 * tags, then inserts a fresh block tailored to this route.
 *
 * For the homepage, also injects a static <img id="lcp-hero"> sibling of
 * #root so the LCP candidate paints with the HTML parser (~1.2 s on mobile)
 * instead of waiting for React to mount (~2.5 s+). The element is hidden by
 * the React Index page once its own hero <img> is mounted.
 */
function buildPrerenderedHtml(template, meta) {
  const { url, title, description, image = DEFAULT_OG, type = "website", jsonLd, injectHero } = meta;

  // Strip existing SEO tags from the source template.
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta\s+name=["']description["'][^>]*>/gi, "")
    .replace(/<link\s+rel=["']canonical["'][^>]*>/gi, "")
    .replace(/<meta\s+property=["']og:[^"']+["'][^>]*>/gi, "")
    .replace(/<meta\s+name=["']twitter:[^"']+["'][^>]*>/gi, "");

  const tags = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<link rel="canonical" href="${escapeHtml(url)}" />`,
    `<meta property="og:type" content="${escapeHtml(type)}" />`,
    `<meta property="og:site_name" content="Stir &amp; Simmer" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:url" content="${escapeHtml(url)}" />`,
    `<meta property="og:image" content="${escapeHtml(image)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:site" content="@StirAndSimmer" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(image)}" />`,
  ];

  if (jsonLd) {
    const blocks = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
    for (const block of blocks) {
      tags.push(
        `<script type="application/ld+json">${JSON.stringify(block).replace(/</g, "\\u003c")}</script>`,
      );
    }
  }

  html = html.replace(/<\/head>/i, `${tags.join("\n    ")}\n  </head>`);

  if (injectHero) {
    const base = "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&fm=webp";
    const srcset = [480, 768, 1024, 1280, 1600].map((w) => `${base}&amp;w=${w} ${w}w`).join(", ");
    const heroImg = `<img id="lcp-hero" src="${base}&amp;w=1280" srcset="${srcset}" sizes="100vw" alt="Rustic table laid with freshly cooked dishes, herbs and warm natural light" fetchpriority="high" decoding="async" width="1600" height="1067" />`;
    // Inserted before #root so the LCP image is in the initial paint tree.
    html = html.replace(/<div id="root"><\/div>/, `${heroImg}\n    <div id="root"></div>`);
  }

  return html;
}

function buildBreadcrumb(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

const HOME_JSONLD = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Stir & Simmer",
    url: SITE,
    description:
      "Curated recipes crafted with fresh ingredients, bold flavours, and a whole lot of love.",
    publisher: { "@type": "Organization", name: "Stir & Simmer", url: SITE },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE}/recipes?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Stir & Simmer",
    url: SITE,
    logo: `${SITE}/og-image.jpg`,
    description: "A UK recipe site with free curated recipes for every occasion.",
  },
];

function writeRoute(distDir, template, meta) {
  const html = buildPrerenderedHtml(template, meta);
  // Root route stays as dist/index.html; everything else nests under its path.
  const outPath =
    meta.path === "/"
      ? resolve(distDir, "index.html")
      : resolve(distDir, `.${meta.path}/index.html`);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html, "utf-8");
}

function buildRecipeJsonLd({ title, slug, description, imageUrl, category }) {
  const url = `${SITE}/recipes/${slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: title,
    description,
    ...(imageUrl && { image: [imageUrl] }),
    url,
    author: { "@type": "Organization", name: "Stir & Simmer", url: SITE },
    recipeCategory: category,
  };
}

// ---------- Main entry ----------

export async function prerenderRoutes() {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const distDir = resolve(__dirname, "../dist");
  const templatePath = resolve(distDir, "index.html");

  let template;
  try {
    template = readFileSync(templatePath, "utf-8");
  } catch (e) {
    console.warn("[prerender] dist/index.html missing — skipping.");
    return;
  }

  // ---------- Inline the CSS bundle ----------
  // Vite emits a single render-blocking stylesheet at /assets/index-*.css
  // (~17 KiB transferred, ~80 KiB unminified). Lighthouse measured 400 ms
  // of LCP delay waiting for it. Inlining it into <head> removes the
  // critical-path request entirely so the prerendered hero <img> can paint
  // as soon as the HTML lands — no extra round-trip.
  //
  // Trade-off: we ship the same CSS in every prerendered HTML file (~5 KiB
  // gzipped each). For 350 prerendered routes that's ~1.7 MB of total
  // duplicated bytes across the whole site, but each individual cold-load
  // only pays for one copy — a clear win for LCP.
  try {
    const assetsDir = resolve(distDir, "assets");
    const cssFile = readdirSync(assetsDir).find(
      (f) => f.startsWith("index-") && f.endsWith(".css"),
    );
    if (cssFile) {
      const cssPath = resolve(assetsDir, cssFile);
      const css = readFileSync(cssPath, "utf-8");
      const cssHref = `/assets/${cssFile}`;
      // Strip the original render-blocking <link rel="stylesheet"> for this
      // bundle (Vite inserts it in <head>) and replace with an inline
      // <style> block. We keep a deferred <link> in <noscript> so users
      // without JS still get the styles via the standard mechanism, and a
      // preload-as-style swap so the browser caches the external file for
      // subsequent navigations (where CSS hashing means it'll match).
      const linkRe = new RegExp(
        `<link\\s+rel=["']stylesheet["']\\s+[^>]*href=["']${cssHref.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&",
        )}["'][^>]*>`,
        "i",
      );
      const inlined =
        `<style data-inlined-bundle>${css}</style>\n    ` +
        `<link rel="preload" as="style" href="${cssHref}" onload="this.onload=null;this.rel='stylesheet'" />\n    ` +
        `<noscript><link rel="stylesheet" href="${cssHref}" /></noscript>`;
      if (linkRe.test(template)) {
        template = template.replace(linkRe, inlined);
        console.log(`[prerender] Inlined ${(css.length / 1024).toFixed(1)} KiB of CSS from ${cssFile}.`);
      } else {
        console.warn(`[prerender] CSS <link> for ${cssHref} not found in template — skipping inline.`);
      }
    } else {
      console.warn("[prerender] No index-*.css found in dist/assets — skipping inline.");
    }
  } catch (e) {
    console.warn("[prerender] CSS inline failed:", e.message);
  }


  const routes = [];

  for (const r of STATIC_ROUTES) {
    const url = `${SITE}${r.path === "/" ? "/" : r.path}`;
    const route = { path: r.path, url, title: r.title, description: r.description };
    if (r.path === "/") {
      route.jsonLd = HOME_JSONLD;
      route.injectHero = true;
    } else {
      route.jsonLd = buildBreadcrumb([
        { name: "Home", url: `${SITE}/` },
        { name: r.title.split(" | ")[0].split(" — ")[0].trim(), url },
      ]);
    }
    routes.push(route);
  }

  for (const t of CATEGORY_TILES) {
    const url = `${SITE}/recipes/category/${t.slug}`;
    routes.push({
      path: `/recipes/category/${t.slug}`,
      url,
      title: t.title,
      description: t.description,
      jsonLd: buildBreadcrumb([
        { name: "Home", url: `${SITE}/` },
        { name: "Recipes", url: `${SITE}/recipes` },
        { name: t.title.split(" | ")[0].split(" — ")[0].trim(), url },
      ]),
    });
  }

  for (const c of COLLECTIONS) {
    const url = `${SITE}/collections/${c.slug}`;
    routes.push({
      path: `/collections/${c.slug}`,
      url,
      title: `${c.title} — Recipe Collection | Stir & Simmer`,
      description: c.description,
      jsonLd: buildBreadcrumb([
        { name: "Home", url: `${SITE}/` },
        { name: "Collections", url: `${SITE}/collections` },
        { name: c.title, url },
      ]),
    });
  }

  for (const r of REGIONS) {
    const url = `${SITE}/recipes/region/${r.slug}`;
    routes.push({
      path: `/recipes/region/${r.slug}`,
      url,
      title: `${r.label} recipes | Stir & Simmer`,
      description: `Explore our collection of ${r.label} recipes — tried and tested in a real kitchen, free to browse.`,
      jsonLd: buildBreadcrumb([
        { name: "Home", url: `${SITE}/` },
        { name: "Kitchen Atlas", url: `${SITE}/kitchen-atlas` },
        { name: `${r.label} recipes`, url },
      ]),
    });
  }

  // Recipe pages — fetched from the database.
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  let recipeCount = 0;
  if (url && key) {
    try {
      const supabase = createClient(url, key);
      const { data: recipes, error } = await supabase
        .from("recipes")
        .select("slug, title, description, image_url, category, seo_title, seo_description")
        .eq("published", true);
      if (error) throw error;
      for (const r of recipes ?? []) {
        const title = r.seo_title || `${r.title} | Stir & Simmer`;
        const description =
          r.seo_description ||
          (r.description ? r.description.slice(0, 155) : `${r.title} — a tried-and-tested recipe from Stir & Simmer.`);
        const recipeUrl = `${SITE}/recipes/${r.slug}`;
        routes.push({
          path: `/recipes/${r.slug}`,
          url: recipeUrl,
          title,
          description,
          image: r.image_url || DEFAULT_OG,
          type: "article",
          jsonLd: [
            buildRecipeJsonLd({
              title: r.title,
              slug: r.slug,
              description: r.description ?? title,
              imageUrl: r.image_url,
              category: r.category,
            }),
            buildBreadcrumb([
              { name: "Home", url: `${SITE}/` },
              { name: "Recipes", url: `${SITE}/recipes` },
              { name: r.title, url: recipeUrl },
            ]),
          ],
        });
        recipeCount++;
      }
    } catch (e) {
      console.warn("[prerender] Recipe fetch failed:", e.message);
    }
  } else {
    console.warn("[prerender] Missing Supabase env vars — skipping recipe routes.");
  }

  for (const route of routes) writeRoute(distDir, template, route);

  console.log(
    `[prerender] Wrote ${routes.length} HTML files (${STATIC_ROUTES.length} static, ${CATEGORY_TILES.length} categories, ${COLLECTIONS.length} collections, ${REGIONS.length} regions, ${recipeCount} recipes).`,
  );
}

if (import.meta.url === `file://${process.argv[1]}`) {
  prerenderRoutes().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
