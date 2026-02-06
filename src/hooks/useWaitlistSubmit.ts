import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { WaitlistFormData } from "@/lib/waitlist-validation";

interface SubmitResult {
  success: boolean;
  queuePosition?: number;
  couponCode?: string;
  firstName?: string;
  emailSent?: boolean;
  error?: string;
}

export function useWaitlistSubmit() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitWaitlist = async (data: WaitlistFormData): Promise<SubmitResult> => {
    setIsSubmitting(true);
    
    try {
      // Insert into waitlist_signups table
      const { data: insertedData, error: insertError } = await supabase
        .from("waitlist_signups")
        .insert({
          email: data.email,
          first_name: data.firstName,
          last_name: data.lastName,
          preferred_tier: data.preferredTier,
          phone_number: data.phoneNumber || null,
          budget_range: data.budgetRange || null,
          trade_in_interest: data.tradeInInterest,
          mailing_list_opt_in: data.mailingListOptIn,
          trade_in_gpu: data.tradeInGpu || null,
          trade_in_cpu: data.tradeInCpu || null,
          trade_in_ram: data.tradeInRam || null,
          trade_in_storage: data.tradeInStorage || null,
          trade_in_motherboard: data.tradeInMotherboard || null,
          trade_in_uptime: data.tradeInUptime || null,
        })
        .select("queue_position, coupon_code, first_name")
        .single();

      if (insertError) {
        // Handle duplicate email
        if (insertError.code === "23505") {
          return {
            success: false,
            error: "This email is already on the waitlist!",
          };
        }
        throw insertError;
      }

      // Trigger confirmation email via edge function
      let emailSent = true;
      try {
        await supabase.functions.invoke("send-waitlist-confirmation", {
          body: {
            email: data.email,
            firstName: data.firstName,
            queuePosition: insertedData.queue_position,
            couponCode: insertedData.coupon_code,
          },
        });
      } catch (emailError) {
        // Don't fail the signup if email fails - just log it
        console.error("Failed to send confirmation email:", emailError);
        emailSent = false;
      }

      return {
        success: true,
        queuePosition: insertedData.queue_position,
        couponCode: insertedData.coupon_code,
        firstName: insertedData.first_name,
        emailSent,
      };
    } catch (error) {
      console.error("Waitlist submission error:", error);
      return {
        success: false,
        error: "Something went wrong. Please try again.",
      };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitWaitlist,
    isSubmitting,
  };
}
