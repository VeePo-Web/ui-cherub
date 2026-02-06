import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface WaitlistSignupRequest {
  email: string;
  firstName: string;
  lastName: string;
  preferredTier: string;
  phoneNumber?: string;
  budgetRange?: string;
  tradeInInterest: boolean;
  mailingListOptIn: boolean;
  tradeInGpu?: string;
  tradeInCpu?: string;
  tradeInRam?: string;
  tradeInStorage?: string;
  tradeInMotherboard?: string;
  tradeInUptime?: string;
}

// Sanitize inputs to prevent injection
const sanitizeInput = (input: string | undefined | null, maxLength = 255): string | null => {
  if (!input) return null;
  return input.replace(/[<>]/g, "").trim().slice(0, maxLength);
};

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
};

const validateTier = (tier: string): boolean => {
  return ["ludacris", "esports", "pro"].includes(tier);
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create admin client with service role (bypasses RLS)
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const body: WaitlistSignupRequest = await req.json();

    // Validate required fields
    if (!body.email || !body.firstName || !body.lastName || !body.preferredTier) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate email format
    if (!validateEmail(body.email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate tier
    if (!validateTier(body.preferredTier)) {
      return new Response(
        JSON.stringify({ error: "Invalid tier selection" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Sanitize all inputs
    const sanitizedData = {
      email: sanitizeInput(body.email)!,
      first_name: sanitizeInput(body.firstName, 50)!,
      last_name: sanitizeInput(body.lastName, 50)!,
      preferred_tier: body.preferredTier,
      phone_number: sanitizeInput(body.phoneNumber, 20),
      budget_range: body.budgetRange || null,
      trade_in_interest: Boolean(body.tradeInInterest),
      mailing_list_opt_in: Boolean(body.mailingListOptIn),
      trade_in_gpu: sanitizeInput(body.tradeInGpu, 100),
      trade_in_cpu: sanitizeInput(body.tradeInCpu, 100),
      trade_in_ram: sanitizeInput(body.tradeInRam, 50),
      trade_in_storage: sanitizeInput(body.tradeInStorage, 100),
      trade_in_motherboard: sanitizeInput(body.tradeInMotherboard, 100),
      trade_in_uptime: sanitizeInput(body.tradeInUptime, 50),
    };

    // Insert into waitlist_signups table
    const { data: insertedData, error: insertError } = await supabaseAdmin
      .from("waitlist_signups")
      .insert(sanitizedData)
      .select("queue_position, coupon_code, first_name")
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
      
      // Handle duplicate email
      if (insertError.code === "23505") {
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: "This email is already on the waitlist!" 
          }),
          { status: 409, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
      
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Failed to join waitlist. Please try again." 
        }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Waitlist signup successful:", { 
      queuePosition: insertedData.queue_position,
      tier: body.preferredTier 
    });

    return new Response(
      JSON.stringify({
        success: true,
        queuePosition: insertedData.queue_position,
        couponCode: insertedData.coupon_code,
        firstName: insertedData.first_name,
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in waitlist-signup function:", error);
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
