import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.46.1";

const ALLOWED_ORIGINS = [
  "http://localhost:8005",
  "http://localhost:8000",
  "http://localhost:3000",
  "https://mimicheck.ai",
  "https://www.mimicheck.ai",
];

type TelemetryPayload = {
  event?: string;
  area?: string;
  severity?: string;
  timestamp?: string;
  meta?: Record<string, unknown>;
};

function getCorsHeaders(origin: string) {
  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin)
      ? origin
      : ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

serve(async (req) => {
  const origin = req.headers.get("origin") ?? "";
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: corsHeaders,
      });
    }

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Missing Authorization" }), {
        status: 401,
        headers: corsHeaders,
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseAnon = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
    if (!supabaseUrl || !supabaseAnon) {
      return new Response(JSON.stringify({ error: "Missing Supabase env" }), {
        status: 500,
        headers: corsHeaders,
      });
    }

    const supabase = createClient(supabaseUrl, supabaseAnon, {
      global: { headers: { Authorization: authHeader } },
      auth: { persistSession: false },
    });

    const { data: userData, error: userError } = await supabase.auth.getUser();
    const user = userData?.user;

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Not authenticated", details: userError?.message }),
        { status: 401, headers: corsHeaders },
      );
    }

    const body = (await req.json().catch(() => ({}))) as TelemetryPayload;
    const eventName = body?.event;

    if (!eventName) {
      return new Response(JSON.stringify({ error: "Missing event" }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const meta = body?.meta ?? {};
    const url = (meta as any)?.url ?? null;
    const userAgent = (meta as any)?.userAgent ?? req.headers.get("user-agent") ?? null;
    const sessionId = (meta as any)?.sessionId ?? null;

    const { error: insertError } = await supabase.from("telemetry_events").insert({
      auth_user_id: user.id,
      event_name: eventName,
      area: body?.area ?? null,
      severity: body?.severity ?? null,
      meta: meta,
      url,
      user_agent: userAgent,
      session_id: sessionId,
    });

    if (insertError) {
      return new Response(
        JSON.stringify({ error: "Insert failed", details: insertError.message }),
        { status: 500, headers: corsHeaders },
      );
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Internal server error", details: error?.message }),
      { status: 500, headers: corsHeaders },
    );
  }
});
