#!/usr/bin/env node
/**
 * SEO audit for /recipes/:slug pages.
 *
 * Validates that every recipe in the database has the data required to
 * render a complete JSON-LD Recipe schema (name, description, image,
 * prepTime, cookTime, totalTime, recipeYield, recipeIngredient,
 * recipeInstructions) plus a valid meta title (<60 chars) and meta
 * description (<155 chars).
 *
 * Mirrors the logic in src/lib/seo.ts and src/pages/RecipeDetail.tsx so
 * the audit reflects exactly what users/Google see.
 *
 * Usage:
 *   node scripts/seo-audit.mjs            # human-readable report
 *   node scripts/seo-audit.mjs --json     # JSON output for CI
 *   node scripts/seo-audit.mjs --fail     # exit 1 if any issues found
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ----- read SUPABASE_URL + anon key from .env -----
const env = Object.fromEntries(
  readFileSync(resolve(__dirname, "../.env"), "utf8")
    .split("\n")
    .filter((l) => l && !l.startsWith("#") && l.includes("="))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^"|"$/g, "")];
    }),
);

const SUPABASE_URL = env.VITE_SUPABASE_URL;
const SUPABASE_KEY = env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY in .env");
  process.exit(2);
}

const TITLE_LIMIT = 60;
const DESC_LIMIT = 155;

// ----- fetch all recipes -----
async function fetchAllRecipes() {
  const all = [];
  const pageSize = 1000;
  let from = 0;
  while (true) {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/recipes?select=slug,title,description,image_url,prep_time_minutes,cook_time_minutes,servings,ingredients,instructions,seo_title,seo_description,category`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          Range: `${from}-${from + pageSize - 1}`,
          "Range-Unit": "items",
          Prefer: "count=exact",
        },
      },
    );
    if (!res.ok) throw new Error(`Supabase ${res.status}: ${await res.text()}`);
    const batch = await res.json();
    all.push(...batch);
    if (batch.length < pageSize) break;
    from += pageSize;
  }
  return all;
}

// ----- mirror of src/lib/seo.ts helpers -----
const SITE_SUFFIX = " | Great Food Recipes";
const truncate = (text, limit) => {
  if (text.length <= limit) return text;
  const sliced = text.slice(0, limit - 1);
  const lastSpace = sliced.lastIndexOf(" ");
  const trimmed = lastSpace > limit * 0.6 ? sliced.slice(0, lastSpace) : sliced;
  return trimmed.replace(/[,;:.\-\s]+$/, "") + "…";
};
const stripQuantity = (i) =>
  i.replace(
    /^[\d\s\/.,⅓½¼¾⅔⅛⅜⅝⅞-]+\s*(g|kg|ml|l|tsp|tbsp|cup|cups|oz|lb|pinch|clove|cloves|slice|slices)?\s*/i,
    "",
  ).split(",")[0].trim();
const getKeyIngredients = (ings, max = 3) =>
  ings.filter((i) => !/^(for the |for |the )/i.test(i.trim()))
    .slice(0, max).map(stripQuantity).filter(Boolean);

const buildSeoTitle = (custom, title, totalMin) => {
  if (custom?.trim()) return truncate(custom.trim(), TITLE_LIMIT);
  const base = title.trim();
  if (totalMin > 0) {
    const wt = `${base} (${totalMin} min)${SITE_SUFFIX}`;
    if (wt.length <= TITLE_LIMIT) return wt;
  }
  const ws = `${base}${SITE_SUFFIX}`;
  if (ws.length <= TITLE_LIMIT) return ws;
  return truncate(base, TITLE_LIMIT);
};
const buildSeoDescription = (custom, _title, desc, ings, totalMin) => {
  if (custom?.trim()) return truncate(custom.trim(), DESC_LIMIT);
  const key = getKeyIngredients(ings);
  const parts = [desc.trim()];
  if (key.length) parts.push(`Made with ${key.join(", ")}.`);
  if (totalMin > 0) parts.push(`Ready in ${totalMin} min.`);
  return truncate(parts.join(" "), DESC_LIMIT);
};

// ----- audit a single recipe -----
const REQUIRED_SCHEMA_FIELDS = [
  "name", "description", "image", "prepTime", "cookTime",
  "totalTime", "recipeYield", "recipeIngredient", "recipeInstructions",
];

function auditRecipe(r) {
  const issues = [];
  const ingredients = Array.isArray(r.ingredients) ? r.ingredients : [];
  const instructions = Array.isArray(r.instructions) ? r.instructions : [];
  const prep = r.prep_time_minutes ?? 0;
  const cook = r.cook_time_minutes ?? 0;
  const total = prep + cook;

  // Build the JSON-LD the page would emit
  const schema = {
    name: r.title,
    description: r.description,
    image: r.image_url ? [r.image_url] : null,
    prepTime: prep ? `PT${prep}M` : null,
    cookTime: cook ? `PT${cook}M` : null,
    totalTime: total ? `PT${total}M` : null,
    recipeYield: r.servings ? `${r.servings} servings` : null,
    recipeIngredient: ingredients.length ? ingredients : null,
    recipeInstructions: instructions.length ? instructions : null,
  };

  for (const f of REQUIRED_SCHEMA_FIELDS) {
    if (!schema[f]) issues.push(`schema.${f} missing`);
  }

  const seoTitle = buildSeoTitle(r.seo_title, r.title, total);
  const seoDesc = buildSeoDescription(r.seo_description, r.title, r.description, ingredients, total);

  if (!seoTitle) issues.push("meta title empty");
  else if (seoTitle.length > TITLE_LIMIT) issues.push(`meta title ${seoTitle.length} > ${TITLE_LIMIT}`);
  if (!seoDesc) issues.push("meta description empty");
  else if (seoDesc.length > DESC_LIMIT) issues.push(`meta description ${seoDesc.length} > ${DESC_LIMIT}`);

  return {
    slug: r.slug,
    title: r.title,
    url: `/recipes/${r.slug}`,
    seoTitle, seoTitleLen: seoTitle?.length ?? 0,
    seoDesc, seoDescLen: seoDesc?.length ?? 0,
    schemaPresent: REQUIRED_SCHEMA_FIELDS.filter((f) => schema[f]),
    schemaMissing: REQUIRED_SCHEMA_FIELDS.filter((f) => !schema[f]),
    issues,
    ok: issues.length === 0,
  };
}

// ----- duplicate detection -----
function findDuplicates(results) {
  const titleMap = new Map();
  const descMap = new Map();
  for (const r of results) {
    if (r.seoTitle) (titleMap.get(r.seoTitle) || titleMap.set(r.seoTitle, []).get(r.seoTitle)).push(r.slug);
    if (r.seoDesc) (descMap.get(r.seoDesc) || descMap.set(r.seoDesc, []).get(r.seoDesc)).push(r.slug);
  }
  return {
    titles: [...titleMap.entries()].filter(([, s]) => s.length > 1),
    descs: [...descMap.entries()].filter(([, s]) => s.length > 1),
  };
}

// ----- main -----
const args = new Set(process.argv.slice(2));
const recipes = await fetchAllRecipes();
const results = recipes.map(auditRecipe);
const failing = results.filter((r) => !r.ok);
const dups = findDuplicates(results);

if (args.has("--json")) {
  console.log(JSON.stringify({
    total: results.length,
    failing: failing.length,
    duplicateTitles: dups.titles.length,
    duplicateDescriptions: dups.descs.length,
    results,
    duplicates: dups,
  }, null, 2));
} else {
  console.log(`\nSEO audit — ${results.length} recipes\n${"=".repeat(50)}`);
  console.log(`✓ Passing: ${results.length - failing.length}`);
  console.log(`✗ Failing: ${failing.length}`);
  console.log(`⚠ Duplicate titles: ${dups.titles.length}`);
  console.log(`⚠ Duplicate descriptions: ${dups.descs.length}\n`);

  if (failing.length) {
    console.log("Issues:");
    for (const r of failing) {
      console.log(`\n  ${r.url}  (${r.title})`);
      for (const i of r.issues) console.log(`    - ${i}`);
    }
  }
  if (dups.titles.length) {
    console.log("\nDuplicate meta titles:");
    for (const [t, slugs] of dups.titles) console.log(`  "${t}" → ${slugs.join(", ")}`);
  }
  if (dups.descs.length) {
    console.log("\nDuplicate meta descriptions:");
    for (const [d, slugs] of dups.descs) console.log(`  "${d.slice(0, 80)}…" → ${slugs.join(", ")}`);
  }
  console.log();
}

if (args.has("--fail") && (failing.length || dups.titles.length || dups.descs.length)) {
  process.exit(1);
}
