import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const ALLOWED_ORIGINS = [
  "http://localhost:8005",
  "http://localhost:8000",
  "http://localhost:3000",
  "https://mimicheck.ai",
  "https://www.mimicheck.ai",
];

interface AuditLogRequest {
  user_id: string;
  action: string;
  resource_type: string;
  resource_id?: string;
  changes?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  user_agent?: string;
  status?: "success" | "failure";
  error_message?: string;
}

serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const origin = req.headers.get("origin") ?? "";
    const corsHeaders = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin)
        ? origin
        : ALLOWED_ORIGINS[0],
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        { status: 405, headers: corsHeaders }
      );
    }

    // Parse request body
    const body: AuditLogRequest = await req.json();

    // Validate required fields
    if (!body.user_id || !body.action || !body.resource_type) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: user_id, action, resource_type",
        }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Get Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Missing Supabase credentials");
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get client IP from headers
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    // Call the audit_log function
    const { data, error } = await supabase.rpc("audit_log", {
      p_user_id: body.user_id,
      p_action: body.action,
      p_resource_type: body.resource_type,
      p_resource_id: body.resource_id || null,
      p_changes: body.changes || null,
      p_metadata: body.metadata || null,
      p_ip_address: clientIp,
      p_user_agent: body.user_agent || req.headers.get("user-agent"),
      p_status: body.status || "success",
    });

    if (error) {
      console.error("Audit log error:", error);
      return new Response(
        JSON.stringify({
          error: "Failed to create audit log",
          details: error.message,
        }),
        { status: 500, headers: corsHeaders }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        log_id: data,
      }),
      { status: 201, headers: corsHeaders }
    );
  } catch (error) {
    console.error("Error in audit-log function:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
