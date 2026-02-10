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

    // Fire-and-forget: send notification email to connor@olausen.ca
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (RESEND_API_KEY) {
      try {
        const tradeInRows = sanitizedData.trade_in_interest ? [
              sanitizedData.trade_in_gpu && `<tr><td style="color:#666;padding:4px 12px 4px 0;font-size:13px;white-space:nowrap;">GPU</td><td style="color:#222;padding:4px 0;font-size:13px;">${sanitizedData.trade_in_gpu}</td></tr>`,
              sanitizedData.trade_in_cpu && `<tr><td style="color:#666;padding:4px 12px 4px 0;font-size:13px;white-space:nowrap;">CPU</td><td style="color:#222;padding:4px 0;font-size:13px;">${sanitizedData.trade_in_cpu}</td></tr>`,
              sanitizedData.trade_in_ram && `<tr><td style="color:#666;padding:4px 12px 4px 0;font-size:13px;white-space:nowrap;">RAM</td><td style="color:#222;padding:4px 0;font-size:13px;">${sanitizedData.trade_in_ram}</td></tr>`,
              sanitizedData.trade_in_storage && `<tr><td style="color:#666;padding:4px 12px 4px 0;font-size:13px;white-space:nowrap;">Storage</td><td style="color:#222;padding:4px 0;font-size:13px;">${sanitizedData.trade_in_storage}</td></tr>`,
              sanitizedData.trade_in_motherboard && `<tr><td style="color:#666;padding:4px 12px 4px 0;font-size:13px;white-space:nowrap;">Board</td><td style="color:#222;padding:4px 0;font-size:13px;">${sanitizedData.trade_in_motherboard}</td></tr>`,
              sanitizedData.trade_in_uptime && `<tr><td style="color:#666;padding:4px 12px 4px 0;font-size:13px;white-space:nowrap;">Uptime</td><td style="color:#222;padding:4px 0;font-size:13px;">${sanitizedData.trade_in_uptime}</td></tr>`,
            ].filter(Boolean).join("") : "";

        const notificationHtml = `
          <!DOCTYPE html>
          <html>
          <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
          <body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:32px 16px;">
              <tr>
                <td align="center">
                  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:8px;overflow:hidden;">
                    <!-- Brand header -->
                    <tr>
                      <td style="padding:24px 28px 16px;">
                        <p style="color:#1a0a2e;font-size:13px;font-weight:600;letter-spacing:3px;text-transform:uppercase;margin:0 0 12px;">Unbound &middot; Gaming</p>
                        <hr style="border:none;border-top:2px solid #fc7e30;margin:0;">
                      </td>
                    </tr>
                    <!-- Title -->
                    <tr>
                      <td style="padding:16px 28px 0;">
                        <h1 style="color:#1a0a2e;font-size:18px;font-weight:600;margin:0;">New Waitlist Signup <span style="color:#fc7e30;">#${insertedData.queue_position}</span></h1>
                      </td>
                    </tr>
                    <!-- Contact -->
                    <tr>
                      <td style="padding:20px 28px 0;">
                        <p style="color:#999;font-size:10px;text-transform:uppercase;letter-spacing:2px;font-weight:600;margin:0 0 8px;">Contact</p>
                        <table cellpadding="0" cellspacing="0">
                          <tr><td style="color:#666;padding:3px 12px 3px 0;font-size:13px;">Name</td><td style="color:#222;padding:3px 0;font-size:13px;">${sanitizedData.first_name} ${sanitizedData.last_name}</td></tr>
                          <tr><td style="color:#666;padding:3px 12px 3px 0;font-size:13px;">Email</td><td style="color:#222;padding:3px 0;font-size:13px;">${sanitizedData.email}</td></tr>
                          ${sanitizedData.phone_number ? `<tr><td style="color:#666;padding:3px 12px 3px 0;font-size:13px;">Phone</td><td style="color:#222;padding:3px 0;font-size:13px;">${sanitizedData.phone_number}</td></tr>` : ""}
                        </table>
                      </td>
                    </tr>
                    <!-- Preferences -->
                    <tr>
                      <td style="padding:20px 28px 0;">
                        <p style="color:#999;font-size:10px;text-transform:uppercase;letter-spacing:2px;font-weight:600;margin:0 0 8px;">Preferences</p>
                        <table cellpadding="0" cellspacing="0">
                          <tr><td style="color:#666;padding:3px 12px 3px 0;font-size:13px;">Tier</td><td style="color:#222;padding:3px 0;font-size:13px;text-transform:capitalize;">${sanitizedData.preferred_tier}</td></tr>
                          ${sanitizedData.budget_range ? `<tr><td style="color:#666;padding:3px 12px 3px 0;font-size:13px;">Budget</td><td style="color:#222;padding:3px 0;font-size:13px;">${sanitizedData.budget_range}</td></tr>` : ""}
                          <tr><td style="color:#666;padding:3px 12px 3px 0;font-size:13px;">Mailing</td><td style="color:#222;padding:3px 0;font-size:13px;">${sanitizedData.mailing_list_opt_in ? "Yes" : "No"}</td></tr>
                          <tr><td style="color:#666;padding:3px 12px 3px 0;font-size:13px;">Coupon</td><td style="color:#222;padding:3px 0;font-size:13px;font-family:'Courier New',monospace;">${insertedData.coupon_code}</td></tr>
                        </table>
                      </td>
                    </tr>
                    ${tradeInRows ? `
                    <!-- Trade-in -->
                    <tr>
                      <td style="padding:20px 28px 0;">
                        <p style="color:#999;font-size:10px;text-transform:uppercase;letter-spacing:2px;font-weight:600;margin:0 0 8px;">Trade-in</p>
                        <table cellpadding="0" cellspacing="0">${tradeInRows}</table>
                      </td>
                    </tr>
                    ` : ""}
                    <!-- Footer -->
                    <tr>
                      <td style="padding:24px 28px;text-align:center;">
                        <p style="color:#bbb;font-size:11px;margin:0;">&copy; ${new Date().getFullYear()} Unbound - Gaming</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `;

        fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "Unbound - Gaming <noreply@olausen.ca>",
            to: ["connor@olausen.ca"],
            subject: `New Waitlist Signup: ${sanitizedData.first_name} ${sanitizedData.last_name} (#${insertedData.queue_position})`,
            html: notificationHtml,
          }),
        }).then((res) => {
          if (!res.ok) res.text().then((t) => console.error("Notification email failed:", t));
          else console.log("Notification email sent to connor@olausen.ca");
        }).catch((err) => console.error("Notification email error:", err));
      } catch (notifErr) {
        console.error("Notification email setup error:", notifErr);
      }
    }

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
