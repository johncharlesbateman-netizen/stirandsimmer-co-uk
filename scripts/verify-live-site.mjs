#!/usr/bin/env node
/**
 * Post-deploy live site verification.
 *
 * Fetches a curated sample of production URLs and asserts that:
 *   1. HTTP status is 200
 *   2. <title> is NOT the generic homepage title
 *   3. <title> contains the expected page-specific fragment
 *   4. Content pages expose the correct schema.org JSON-LD type
 *
 * Exits non-zero on any failure so CI can flag a bad deploy.
 *
 * Usage:
 *   node scripts/verify-live-site.mjs
 *   SITE_URL=https://stirandsimmer.co.uk node scripts/verify-live-site.mjs
 */

const SITE = (process.env.SITE_URL || "https://stirandsimmer.co.uk").replace(/\/$/, "");
const HOMEPAGE_TITLE = "Stir & Simmer | Delicious Recipes for Every Occasion";
const UA = "StirAndSimmerDeployVerifier/1.0";

/** @type {{path: string, kind: "recipe"|"guide"|"page", titleIncludes: string, schemaType?: string}[]} */
const TARGETS = [
  // Recipes
  { path: "/recipes/proper-chicken-stock", kind: "recipe", titleIncludes: "Chicken Stock", schemaType: "Recipe" },
  { path: "/recipes/classic-beef-stew", kind: "recipe", titleIncludes: "Beef Stew", schemaType: "Recipe" },
  { path: "/recipes/spaghetti-bolognese", kind: "recipe", titleIncludes: "Spaghetti Bolognese", schemaType: "Recipe" },
  // Guides
  { path: "/guides/proper-stock", kind: "guide", titleIncludes: "Stock", schemaType: "Article" },
  { path: "/guides/proper-sauce", kind: "guide", titleIncludes: "Sauce", schemaType: "Article" },
  { path: "/guides/mother-sauces", kind: "guide", titleIncludes: "mother sauces", schemaType: "Article" },
  // Key pages
  { path: "/kitchen-atlas", kind: "page", titleIncludes: "Kitchen Atlas" },
  { path: "/meal-planner", kind: "page", titleIncludes: "Meal Planner" },
];

const extractTitle = (html) => {
  const m = html.match(/<title>([^<]*)<\/title>/i);
  return m ? m[1].trim() : "";
};

const hasSchemaType = (html, type) =>
  new RegExp(`"@type"\\s*:\\s*"${type}"`, "i").test(html);

async function check(target) {
  const url = `${SITE}${target.path}`;
  const issues = [];
  let status = 0;
  let title = "";
  try {
    const res = await fetch(url, {
      headers: { "user-agent": UA, "cache-control": "no-cache" },
      redirect: "follow",
    });
    status = res.status;
    const html = await res.text();

    if (status !== 200) issues.push(`HTTP ${status}`);

    title = extractTitle(html);
    if (!title) issues.push("missing <title>");
    else if (title === HOMEPAGE_TITLE) issues.push("title is the generic homepage title (stale SPA shell?)");
    else if (target.titleIncludes &&
             !title.toLowerCase().includes(target.titleIncludes.toLowerCase())) {
      issues.push(`title missing expected fragment "${target.titleIncludes}" (got "${title}")`);
    }

    if (target.schemaType && !hasSchemaType(html, target.schemaType)) {
      issues.push(`missing JSON-LD "@type":"${target.schemaType}"`);
    }
  } catch (err) {
    issues.push(`fetch failed: ${err.message}`);
  }
  return { url, status, title, issues, ok: issues.length === 0 };
}

console.log(`[verify-live-site] Checking ${TARGETS.length} URLs on ${SITE}\n`);

const results = [];
for (const t of TARGETS) {
  const r = await check(t);
  results.push(r);
  const mark = r.ok ? "PASS" : "FAIL";
  console.log(`${mark}  ${r.url}`);
  if (r.title) console.log(`      title: ${r.title}`);
  for (const i of r.issues) console.log(`      - ${i}`);
}

const failing = results.filter((r) => !r.ok);
console.log(`\n[verify-live-site] ${results.length - failing.length}/${results.length} passing`);

if (failing.length) {
  console.error(`\n[verify-live-site] FAILED — ${failing.length} URL(s) regressed on the live site.`);
  console.error("Likely cause: stale CDN cache or prerender regression. Investigate before assuming this is transient.");
  process.exit(1);
}
