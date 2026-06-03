// Suggests AI-assisted metadata (cuisine, SEO title/description, tips, collections)
// for a recipe based on the author-provided content. Never returns suggestions for
// author-controlled fields. Caller decides which suggestions to apply.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { CUISINE_REGIONS } from "../_shared/cuisine-regions.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface SuggestRequest {
  title?: string;
  description?: string;
  ingredients?: string[];
  instructions?: string[];
  prep_time_minutes?: number | null;
  cook_time_minutes?: number | null;
  servings?: number | null;
  // Only used to know which fields are empty — never returned.
  empty_fields?: Array<
    "cuisine_region" | "seo_title" | "seo_description" | "tips" | "collections"
  >;
  allowed_collections?: string[];
}

const SYSTEM_PROMPT = `You help fill in SEO and metadata fields for a recipe.
You will receive the recipe's author-written content (title, description, ingredients, method, times, servings).
Only suggest values for the fields requested in "empty_fields". Never alter or restate author content.
Respond with strict JSON only. Keep it concise and accurate.`;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // Require an authenticated admin caller.
    const authHeader = req.headers.get("Authorization") ?? "";
    if (!authHeader.startsWith("Bearer ")) {
      return json({ error: "Unauthorized" }, 401);
    }
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userError } = await userClient.auth.getUser();
    if (userError || !userData?.user) {
      return json({ error: "Unauthorized" }, 401);
    }
    const admin = createClient(supabaseUrl, serviceKey);
    const email = userData.user.email?.toLowerCase() ?? "";
    let allowed = false;
    if (email) {
      const { data: match } = await admin
        .from("admin_emails")
        .select("email")
        .ilike("email", email)
        .maybeSingle();
      allowed = !!match;
    }
    if (!allowed) {
      return json({ error: "Forbidden" }, 403);
    }

    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      return json({ error: "AI gateway not configured" }, 500);
    }

    const body = (await req.json()) as SuggestRequest;
    const requested = (body.empty_fields ?? []).filter((f) =>
      ["cuisine_region", "seo_title", "seo_description", "tips", "collections"].includes(f)
    );

    if (requested.length === 0) {
      return json({ suggestions: {} });
    }

    const userPrompt = JSON.stringify({
      title: body.title ?? "",
      description: body.description ?? "",
      ingredients: body.ingredients ?? [],
      instructions: body.instructions ?? [],
      prep_time_minutes: body.prep_time_minutes ?? null,
      cook_time_minutes: body.cook_time_minutes ?? null,
      servings: body.servings ?? null,
      empty_fields: requested,
      allowed_cuisine_regions: CUISINE_REGIONS,
      allowed_collections: body.allowed_collections ?? [],
    });

    const aiResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content:
              "Recipe data:\n" +
              userPrompt +
              "\n\nReturn JSON of the form: " +
              JSON.stringify({
                cuisine_region: "one of allowed_cuisine_regions, or null",
                seo_title: "<= 60 chars, includes brand-friendly hook, no quotes",
                seo_description: "<= 155 chars, plain prose, no quotes",
                tips: "1-3 short chef notes joined by line breaks, plain text",
                collections: ["subset of allowed_collections"],
              }) +
              "\nOnly include keys listed in empty_fields. Omit any key you cannot confidently fill.",
          },
        ],
      }),
    });

    if (aiResp.status === 429) return json({ error: "Rate limited, try again shortly" }, 429);
    if (aiResp.status === 402) return json({ error: "AI credits exhausted" }, 402);
    if (!aiResp.ok) {
      const text = await aiResp.text();
      return json({ error: `AI gateway error: ${text}` }, 500);
    }

    const data = await aiResp.json();
    const content: string = data?.choices?.[0]?.message?.content ?? "{}";
    let parsed: Record<string, unknown> = {};
    try {
      parsed = JSON.parse(content);
    } catch {
      parsed = {};
    }

    // Whitelist by requested fields only.
    const suggestions: Record<string, unknown> = {};
    for (const f of requested) {
      if (f in parsed) suggestions[f] = parsed[f];
    }

    return json({ suggestions });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return json({ error: msg }, 500);
  }
});

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
