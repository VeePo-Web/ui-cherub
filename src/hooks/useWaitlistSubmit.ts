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
      // Call edge function instead of direct insert (bypasses RLS securely)
      const { data: responseData, error: invokeError } = await supabase.functions.invoke(
        "waitlist-signup",
        {
          body: {
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            preferredTier: data.preferredTier,
            phoneNumber: data.phoneNumber || null,
            budgetRange: data.budgetRange || null,
            tradeInInterest: data.tradeInInterest,
            mailingListOptIn: data.mailingListOptIn,
            tradeInGpu: data.tradeInGpu || null,
            tradeInCpu: data.tradeInCpu || null,
            tradeInRam: data.tradeInRam || null,
            tradeInStorage: data.tradeInStorage || null,
            tradeInMotherboard: data.tradeInMotherboard || null,
            tradeInUptime: data.tradeInUptime || null,
          },
        }
      );

      if (invokeError) {
        console.error("Edge function error:", invokeError);
        return {
          success: false,
          error: "Something went wrong. Please try again.",
        };
      }

      // Check if the response indicates failure
      if (!responseData.success) {
        return {
          success: false,
          error: responseData.error || "Something went wrong. Please try again.",
        };
      }

      // Trigger confirmation email via edge function
      let emailSent = true;
      try {
        await supabase.functions.invoke("send-waitlist-confirmation", {
          body: {
            email: data.email,
            firstName: data.firstName,
            queuePosition: responseData.queuePosition,
            couponCode: responseData.couponCode,
          },
        });
      } catch (emailError) {
        // Don't fail the signup if email fails - just log it
        console.error("Failed to send confirmation email:", emailError);
        emailSent = false;
      }

      return {
        success: true,
        queuePosition: responseData.queuePosition,
        couponCode: responseData.couponCode,
        firstName: responseData.firstName,
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
