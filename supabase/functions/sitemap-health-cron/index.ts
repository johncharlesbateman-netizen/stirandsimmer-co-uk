// Scheduled sitemap health checker.
// Invoked by pg_cron every 24h. Calls the sitemap-health endpoint, and if any
// broken URLs are found (HTTP 207), sends an alert email to the site owner.
//
// Returns 200 always (so cron retries don't pile up); errors are logged.
import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  try {
    const healthRes = await fetch(`${SUPABASE_URL}/functions/v1/sitemap-health`, {
      headers: { Authorization: `Bearer ${SERVICE_ROLE_KEY}` },
    });
    const report = await healthRes.json().catch(() => null);

    console.log("sitemap-health status", healthRes.status, "broken:", report?.totals?.broken);

    if (healthRes.status === 200) {
      return new Response(
        JSON.stringify({ ok: true, alerted: false, status: healthRes.status }),
        { status: 200, headers: { ...corsHeaders, "content-type": "application/json" } },
      );
    }

    // 207 (broken URLs) or other non-200: send alert.
    const templateData = {
      checkedAt: report?.checked_at ?? new Date().toISOString(),
      totalChecked: report?.totals?.checked ?? 0,
      totalBroken: report?.totals?.broken ?? 0,
      sitemaps: report?.sitemaps ?? [],
    };

    const { error } = await supabase.functions.invoke("send-transactional-email", {
      body: {
        templateName: "sitemap-health-alert",
        recipientEmail: "hello@stirandsimmer.co.uk",
        idempotencyKey: `sitemap-health-${new Date().toISOString().slice(0, 10)}`,
        templateData,
      },
    });

    if (error) {
      console.error("Failed to send alert email", error);
      return new Response(
        JSON.stringify({ ok: false, alerted: false, error: error.message }),
        { status: 200, headers: { ...corsHeaders, "content-type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({
        ok: true,
        alerted: true,
        status: healthRes.status,
        totalBroken: templateData.totalBroken,
      }),
      { status: 200, headers: { ...corsHeaders, "content-type": "application/json" } },
    );
  } catch (e) {
    console.error("sitemap-health-cron error", e);
    return new Response(
      JSON.stringify({ ok: false, error: (e as Error).message }),
      { status: 200, headers: { ...corsHeaders, "content-type": "application/json" } },
    );
  }
});
