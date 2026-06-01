// Build-time guard against sitemap drift.
//
// Compares the COLLECTION_SLUGS hard-coded in scripts/generate-sitemap.mjs
// and supabase/functions/sitemap/index.ts against the slugs that actually
// exist in src/lib/collections.ts (the live source of truth).
//
// Fails the build with a clear diff if either side drifts so we never again
// publish a sitemap pointing at retired collection pages.
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const read = (p) => readFileSync(resolve(root, p), "utf-8");

// Extract slugs from `slug: "..."` lines inside collections.ts. The file is
// small and well-formed so a regex is safer than spinning up a TS loader at
// build time.
function extractCollectionSlugs() {
  const src = read("src/lib/collections.ts");
  const matches = [...src.matchAll(/^\s*slug:\s*"([a-z0-9-]+)"/gm)];
  return matches.map((m) => m[1]);
}

// Pull the slug list out of a JS/TS array literal named COLLECTION_SLUGS.
function extractArrayLiteral(source, name) {
  const re = new RegExp(`COLLECTION_SLUGS\\s*=\\s*\\[([^\\]]+)\\]`);
  const m = source.match(re);
  if (!m) throw new Error(`Could not find COLLECTION_SLUGS in source for ${name}`);
  return [...m[1].matchAll(/"([a-z0-9-]+)"/g)].map((x) => x[1]);
}

function diff(label, expected, actual) {
  const exp = new Set(expected);
  const act = new Set(actual);
  const missing = [...exp].filter((s) => !act.has(s));
  const extra = [...act].filter((s) => !exp.has(s));
  if (missing.length === 0 && extra.length === 0) return null;
  return `[${label}] sitemap collection slugs drift detected.\n` +
    (missing.length ? `  Missing (in collections.ts but not sitemap): ${missing.join(", ")}\n` : "") +
    (extra.length ? `  Stale   (in sitemap but not collections.ts): ${extra.join(", ")}\n` : "");
}

export function validateSitemapCollections() {
  const live = extractCollectionSlugs();
  if (live.length === 0) throw new Error("Could not parse any slugs out of src/lib/collections.ts");

  const errors = [];
  const sitemapJs = extractArrayLiteral(read("scripts/generate-sitemap.mjs"), "scripts/generate-sitemap.mjs");
  const sitemapFn = extractArrayLiteral(read("supabase/functions/sitemap/index.ts"), "supabase/functions/sitemap/index.ts");

  const d1 = diff("scripts/generate-sitemap.mjs", live, sitemapJs);
  const d2 = diff("supabase/functions/sitemap/index.ts", live, sitemapFn);
  if (d1) errors.push(d1);
  if (d2) errors.push(d2);

  if (errors.length) {
    throw new Error(
      "Sitemap collection drift — update the offending file(s) so the lists match src/lib/collections.ts:\n\n" +
      errors.join("\n"),
    );
  }
  console.log(`[sitemap-validate] OK — ${live.length} collection slugs match across collections.ts, generate-sitemap.mjs, and edge function.`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    validateSitemapCollections();
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}
