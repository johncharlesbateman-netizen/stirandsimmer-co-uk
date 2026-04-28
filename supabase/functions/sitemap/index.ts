// Dynamic sitemap.xml — pulls recipes live from the database.
// Public endpoint, no JWT required.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const SITE = "https://greatfoodrecipes.co.uk";

const STATIC_URLS: Array<{ loc: string; changefreq: string; priority: string }> = [
  { loc: `${SITE}`, changefreq: "weekly", priority: "1.0" },
  { loc: `${SITE}/recipes`, changefreq: "weekly", priority: "0.9" },
  { loc: `${SITE}/about`, changefreq: "monthly", priority: "0.5" },
  { loc: `${SITE}/contact`, changefreq: "monthly", priority: "0.5" },
];

const CATEGORY_SLUGS = [
  "chicken", "beef", "lamb", "pork", "spicy",
  "seafood", "pasta", "lunch-suggestions", "sweets",
];

Deno.serve(async (_req) => {
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
    );

    const { data: recipes, error } = await supabase
      .from("recipes")
      .select("slug, updated_at")
      .order("updated_at", { ascending: false });

    if (error) throw error;

    const today = new Date().toISOString().split("T")[0];

    const urls: string[] = [];

    for (const u of STATIC_URLS) {
      urls.push(
        `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
      );
    }

    for (const slug of CATEGORY_SLUGS) {
      urls.push(
        `  <url>\n    <loc>${SITE}/recipes/category/${slug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`
      );
    }

    for (const r of recipes ?? []) {
      urls.push(
        `  <url>\n    <loc>${SITE}/recipes/${r.slug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`
      );
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;

    return new Response(xml, {
      status: 200,
      headers: {
        "content-type": "application/xml; charset=utf-8",
        "cache-control": "public, max-age=300",
      },
    });
  } catch (e) {
    return new Response(`Error generating sitemap: ${(e as Error).message}`, { status: 500 });
  }
});
