// Regenerates public/sitemap.xml from the live database.
// Runs automatically at build time via the Vite plugin in vite.config.ts.
import { createClient } from "@supabase/supabase-js";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SITE = "https://stirandsimmer.co.uk";

const STATIC_URLS = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/recipes", changefreq: "daily", priority: "0.9" },
  { path: "/collections", changefreq: "weekly", priority: "0.8" },
  { path: "/meal-planner", changefreq: "monthly", priority: "0.6" },
  { path: "/guides", changefreq: "monthly", priority: "0.8" },
  { path: "/about", changefreq: "monthly", priority: "0.5" },
  { path: "/contact", changefreq: "monthly", priority: "0.4" },
  
];

const CATEGORY_SLUGS = [
  "chicken", "beef", "lamb", "pork", "spicy",
  "seafood", "pasta", "lunch-suggestions", "sweets",
];

const COLLECTION_SLUGS = [
  "weeknight-suppers", "italian-meals", "romantic-meals", "fish-and-seafood",
  "sweets-and-desserts", "quick-and-easy", "baking-and-bread", "healthy-eating",
];


export async function generateSitemap() {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    console.warn("[sitemap] Missing Supabase env vars — skipping regeneration.");
    return;
  }

  const supabase = createClient(url, key);
  const [{ data: recipes, error }, { data: guides, error: guidesError }] = await Promise.all([
    supabase
      .from("recipes")
      .select("slug, updated_at")
      .eq("published", true)
      .order("updated_at", { ascending: false }),
    supabase
      .from("guides")
      .select("slug, updated_at, last_updated_at")
      .eq("published", true),
  ]);

  if (error) {
    console.error("[sitemap] DB query failed:", error.message);
    return;
  }
  if (guidesError) {
    console.error("[sitemap] Guides query failed:", guidesError.message);
    return;
  }

  const today = new Date().toISOString().split("T")[0];

  const entry = (loc, lastmod, freq, pri) =>
    `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${pri}</priority>\n  </url>`;

  const parts = [];
  for (const u of STATIC_URLS) parts.push(entry(SITE + u.path, today, u.changefreq, u.priority));
  for (const slug of CATEGORY_SLUGS) parts.push(entry(`${SITE}/recipes/category/${slug}`, today, "weekly", "0.8"));
  for (const slug of COLLECTION_SLUGS) parts.push(entry(`${SITE}/collections/${slug}`, today, "weekly", "0.7"));
  for (const g of guides ?? []) {
    const stamp = g.last_updated_at ?? g.updated_at;
    const lastmod = stamp ? new Date(stamp).toISOString().split("T")[0] : today;
    parts.push(entry(`${SITE}/guides/${g.slug}`, lastmod, "monthly", "0.7"));
  }
  for (const r of recipes ?? []) {
    const lastmod = r.updated_at ? new Date(r.updated_at).toISOString().split("T")[0] : today;
    parts.push(entry(`${SITE}/recipes/${r.slug}`, lastmod, "weekly", "0.7"));
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${parts.join("\n")}\n</urlset>\n`;

  const __dirname = dirname(fileURLToPath(import.meta.url));
  const outPath = resolve(__dirname, "../public/sitemap.xml");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, xml, "utf-8");
  console.log(`[sitemap] Wrote ${recipes?.length ?? 0} recipes + ${guides?.length ?? 0} guides + ${STATIC_URLS.length} static + ${CATEGORY_SLUGS.length} categories + ${COLLECTION_SLUGS.length} collections → public/sitemap.xml`);
}

// Allow running standalone: `node scripts/generate-sitemap.mjs`
if (import.meta.url === `file://${process.argv[1]}`) {
  generateSitemap().catch((e) => { console.error(e); process.exit(1); });
}
