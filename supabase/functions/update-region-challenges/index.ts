import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Simple shared password for the standalone /admin/challenges tool.
// Change this string to rotate the password.
const ADMIN_PASSWORD = "StirSimmer2026!";

const ALLOWED_REGIONS = new Set(["uk", "italy", "france", "asia"]);

type Update = { region_id: string; challenge: string };

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return json({ error: "Invalid body" }, 400);
    }

    const { password, updates } = body as {
      password?: string;
      updates?: unknown;
    };

    if (password !== ADMIN_PASSWORD) {
      return json({ error: "Incorrect password" }, 401);
    }

    if (!Array.isArray(updates) || updates.length === 0) {
      return json({ error: "No updates provided" }, 400);
    }

    const cleaned: Update[] = [];
    for (const u of updates as Update[]) {
      if (
        !u ||
        typeof u.region_id !== "string" ||
        typeof u.challenge !== "string" ||
        !ALLOWED_REGIONS.has(u.region_id) ||
        u.challenge.trim().length === 0 ||
        u.challenge.length > 2000
      ) {
        return json({ error: "Invalid update entry" }, 400);
      }
      cleaned.push({ region_id: u.region_id, challenge: u.challenge.trim() });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Fetch existing rows so we can record any that are about to change
    // into the history log.
    const { data: existing, error: existingError } = await supabase
      .from("region_challenges")
      .select("region_id, challenge")
      .in("region_id", cleaned.map((u) => u.region_id));

    if (existingError) {
      console.error("read existing error", existingError);
      return json({ error: existingError.message }, 500);
    }

    const existingById = new Map(
      (existing ?? []).map((r) => [r.region_id, r.challenge as string]),
    );

    const now = new Date().toISOString();

    const historyRows = cleaned
      .filter((u) => {
        const prev = existingById.get(u.region_id);
        return prev !== undefined && prev.trim() !== u.challenge.trim();
      })
      .map((u) => ({
        region_id: u.region_id,
        challenge: existingById.get(u.region_id)!,
        replaced_at: now,
      }));

    if (historyRows.length > 0) {
      const { error: historyError } = await supabase
        .from("region_challenge_history")
        .insert(historyRows);
      if (historyError) {
        console.error("history insert error", historyError);
        return json({ error: historyError.message }, 500);
      }
    }

    const rows = cleaned.map((u) => ({
      region_id: u.region_id,
      challenge: u.challenge,
      updated_at: now,
    }));

    const { error } = await supabase
      .from("region_challenges")
      .upsert(rows, { onConflict: "region_id" });

    if (error) {
      console.error("upsert error", error);
      return json({ error: error.message }, 500);
    }

    return json({ ok: true, updated_at: now, count: rows.length });
  } catch (e) {
    console.error(e);
    return json({ error: (e as Error).message ?? "Unknown error" }, 500);
  }
});

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
