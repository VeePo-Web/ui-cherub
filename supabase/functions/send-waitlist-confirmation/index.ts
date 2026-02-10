import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface WaitlistConfirmationRequest {
  email: string;
  firstName: string;
  queuePosition: number;
  couponCode: string;
}

// Sanitize inputs to prevent injection
const sanitizeInput = (input: string): string => {
  return input.replace(/[<>]/g, '').trim().slice(0, 255);
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Early check for API key
  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured - check Supabase secrets");
    return new Response(
      JSON.stringify({ 
        error: "Email service not configured",
        hint: "RESEND_API_KEY secret is missing" 
      }),
      { status: 503, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  try {
    const { email, firstName, queuePosition, couponCode }: WaitlistConfirmationRequest = await req.json();

    // Validate required fields
    if (!email || !firstName || !queuePosition || !couponCode) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Sanitize inputs
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedFirstName = sanitizeInput(firstName);
    const sanitizedCouponCode = sanitizeInput(couponCode);

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Unbound Waitlist Confirmation</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #1a0a2e; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #1a0a2e; padding: 48px 20px;">
          <tr>
            <td align="center">
              <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px; background-color: #2d1b4e; border-radius: 12px; overflow: hidden;">
                <!-- Brand mark -->
                <tr>
                  <td style="padding: 36px 40px 0; text-align: center;">
                    <p style="color: #fc7e30; font-size: 13px; font-weight: 600; letter-spacing: 4px; text-transform: uppercase; margin: 0;">Unbound &middot; Gaming</p>
                  </td>
                </tr>

                <!-- Headline -->
                <tr>
                  <td style="padding: 32px 40px 0; text-align: center;">
                    <h1 style="color: #ffffff; font-size: 24px; font-weight: 600; margin: 0; line-height: 1.3;">You're on the list, ${sanitizedFirstName}.</h1>
                  </td>
                </tr>

                <!-- Queue position -->
                <tr>
                  <td style="padding: 32px 40px 0; text-align: center;">
                    <p style="color: #a89bb8; font-size: 11px; margin: 0 0 6px; text-transform: uppercase; letter-spacing: 3px; font-weight: 500;">Position in line</p>
                    <p style="color: #fc7e30; font-size: 44px; font-weight: 700; margin: 0; line-height: 1;">#${queuePosition}</p>
                  </td>
                </tr>

                <!-- Coupon box -->
                <tr>
                  <td style="padding: 32px 40px 0;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #fc7e30; border-radius: 8px;">
                      <tr>
                        <td style="padding: 20px; text-align: center;">
                          <p style="color: #a89bb8; font-size: 11px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 2px; font-weight: 500;">Your 10% discount code</p>
                          <p style="color: #fc7e30; font-size: 28px; font-weight: 700; margin: 0; font-family: 'Courier New', Courier, monospace; letter-spacing: 3px;">${sanitizedCouponCode}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- What happens next -->
                <tr>
                  <td style="padding: 32px 40px 0;">
                    <h2 style="color: #ffffff; font-size: 16px; font-weight: 600; margin: 0 0 16px;">What happens next</h2>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr><td style="color: #c4b5d6; font-size: 14px; line-height: 1.6; padding: 4px 0;">We'll notify you when we launch in your area</td></tr>
                      <tr><td style="color: #c4b5d6; font-size: 14px; line-height: 1.6; padding: 4px 0;">Early access before the general public</td></tr>
                      <tr><td style="color: #c4b5d6; font-size: 14px; line-height: 1.6; padding: 4px 0;">Your discount code will be applied automatically</td></tr>
                      <tr><td style="color: #c4b5d6; font-size: 14px; line-height: 1.6; padding: 4px 0;">No commitment until you're ready</td></tr>
                    </table>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding: 36px 40px 40px; text-align: center;">
                    <p style="color: #a89bb8; font-size: 13px; margin: 0 0 12px;">Questions? Reply to this email.</p>
                    <p style="color: #5a4d6b; font-size: 11px; margin: 0;">&copy; ${new Date().getFullYear()} Unbound - Gaming</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    // Add AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Unbound - Gaming <noreply@ub-gaming.com>",
          to: [sanitizedEmail],
          subject: "You're on the Unbound waitlist -- here's your 10% discount",
          html: emailHtml,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const errorData = await res.text();
        console.error("Resend API error:", errorData);
        return new Response(
          JSON.stringify({ error: `Failed to send email: ${errorData}` }),
          { status: 502, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      const emailResponse = await res.json();
      console.log("Waitlist confirmation email sent successfully:", emailResponse);

      return new Response(JSON.stringify(emailResponse), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    } catch (fetchError: unknown) {
      clearTimeout(timeoutId);
      
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        console.error("Email service timeout");
        return new Response(
          JSON.stringify({ error: "Email service timeout" }),
          { status: 504, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
      throw fetchError;
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in send-waitlist-confirmation function:", error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
