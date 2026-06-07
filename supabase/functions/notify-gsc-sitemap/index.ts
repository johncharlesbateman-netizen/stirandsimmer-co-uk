// Re-submits the sitemap to Google Search Console.
// Triggered by a Postgres webhook (via pg_net) whenever a recipe or guide is
// published, and callable manually. Idempotent — GSC just records the latest
// submission timestamp, so it's safe to call frequently.
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const SITE = "https://stirandsimmer.co.uk";
const SITEMAP_URL = `${SITE}/sitemap.xml`;
const GSC_SITE = "sc-domain:stirandsimmer.co.uk";

const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const lovableKey = Deno.env.get("LOVABLE_API_KEY");
  const gscKey = Deno.env.get("GOOGLE_SEARCH_CONSOLE_API_KEY");

  if (!lovableKey || !gscKey) {
    console.error("notify-gsc-sitemap: missing connector credentials");
    return new Response(
      JSON.stringify({ ok: false, error: "missing_credentials" }),
      { status: 500, headers: { ...corsHeaders, "content-type": "application/json" } },
    );
  }

  // Best-effort: log payload from webhook for visibility.
  try {
    const body = await req.json();
    console.log("notify-gsc-sitemap trigger:", JSON.stringify(body).slice(0, 500));
  } catch {
    // not all callers send JSON
  }

  const url = `${GATEWAY}/webmasters/v3/sites/${encodeURIComponent(GSC_SITE)}/sitemaps/${encodeURIComponent(SITEMAP_URL)}`;

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": gscKey,
    },
  });

  const text = await res.text();
  console.log("GSC resubmit status:", res.status, text.slice(0, 200));

  if (!res.ok && res.status !== 204) {
    return new Response(
      JSON.stringify({ ok: false, status: res.status, body: text }),
      { status: 502, headers: { ...corsHeaders, "content-type": "application/json" } },
    );
  }

  return new Response(
    JSON.stringify({ ok: true, sitemap: SITEMAP_URL, submittedAt: new Date().toISOString() }),
    { status: 200, headers: { ...corsHeaders, "content-type": "application/json" } },
  );
});
