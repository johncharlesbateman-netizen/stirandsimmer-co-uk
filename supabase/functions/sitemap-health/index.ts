// Sitemap health check — fetches the live sitemap index, walks every child
// sitemap, then HEADs every URL inside and reports any that don't return 2xx.
//
// Public endpoint. Call directly:
//   curl https://<project>.functions.supabase.co/sitemap-health
// Optional query params:
//   ?limit=50   cap the number of URLs probed per sitemap (default 500)
//   ?concurrency=10  parallel HEAD requests (default 10)
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const SITEMAP_INDEX = "https://stirandsimmer.co.uk/sitemap.xml";

const extractTags = (xml: string, tag: string): string[] => {
  const re = new RegExp(`<${tag}>([^<]+)</${tag}>`, "g");
  return [...xml.matchAll(re)].map((m) => m[1].trim());
};

async function checkUrl(url: string, signal: AbortSignal): Promise<number> {
  try {
    // Some CDNs reject HEAD — fall back to a tiny ranged GET.
    const head = await fetch(url, { method: "HEAD", signal, redirect: "follow" });
    if (head.status === 405 || head.status === 403) {
      const get = await fetch(url, {
        method: "GET",
        signal,
        redirect: "follow",
        headers: { Range: "bytes=0-0" },
      });
      return get.status;
    }
    return head.status;
  } catch {
    return 0;
  }
}

async function runWithConcurrency<T, R>(
  items: T[],
  limit: number,
  worker: (item: T) => Promise<R>,
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let cursor = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const i = cursor++;
      results[i] = await worker(items[i]);
    }
  });
  await Promise.all(runners);
  return results;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const url = new URL(req.url);
  const limit = Math.min(Number(url.searchParams.get("limit") ?? "500"), 2000);
  const concurrency = Math.min(Number(url.searchParams.get("concurrency") ?? "10"), 25);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 50_000);

  try {
    const indexRes = await fetch(SITEMAP_INDEX, { signal: controller.signal });
    if (!indexRes.ok) {
      throw new Error(`Sitemap index returned ${indexRes.status}`);
    }
    const indexXml = await indexRes.text();
    const childSitemaps = extractTags(indexXml, "loc");

    const childReports: Array<{
      sitemap: string;
      checked: number;
      ok: number;
      broken: Array<{ url: string; status: number }>;
      error?: string;
    }> = [];

    for (const sm of childSitemaps) {
      try {
        const res = await fetch(sm, { signal: controller.signal });
        if (!res.ok) {
          childReports.push({
            sitemap: sm, checked: 0, ok: 0, broken: [],
            error: `Sitemap fetch returned ${res.status}`,
          });
          continue;
        }
        const xml = await res.text();
        const urls = extractTags(xml, "loc").slice(0, limit);
        const statuses = await runWithConcurrency(urls, concurrency, (u) =>
          checkUrl(u, controller.signal).then((status) => ({ url: u, status })),
        );
        const broken = statuses.filter((s) => s.status === 0 || s.status >= 400);
        childReports.push({
          sitemap: sm,
          checked: urls.length,
          ok: statuses.length - broken.length,
          broken,
        });
      } catch (e) {
        childReports.push({
          sitemap: sm, checked: 0, ok: 0, broken: [],
          error: (e as Error).message,
        });
      }
    }

    const totalChecked = childReports.reduce((n, r) => n + r.checked, 0);
    const totalBroken = childReports.reduce((n, r) => n + r.broken.length, 0);

    const body = {
      ok: totalBroken === 0 && childReports.every((r) => !r.error),
      sitemap_index: SITEMAP_INDEX,
      checked_at: new Date().toISOString(),
      totals: { checked: totalChecked, broken: totalBroken },
      sitemaps: childReports,
    };

    return new Response(JSON.stringify(body, null, 2), {
      status: body.ok ? 200 : 207,
      headers: {
        ...corsHeaders,
        "content-type": "application/json; charset=utf-8",
        "cache-control": "no-store",
      },
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ ok: false, error: (e as Error).message }),
      { status: 500, headers: { ...corsHeaders, "content-type": "application/json" } },
    );
  } finally {
    clearTimeout(timeout);
  }
});
