import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Mail, Calendar, Check, Loader2, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { downloadLaunchReminder } from "@/lib/calendar-utils";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";

interface SaveCodeActionsProps {
  couponCode: string;
  email: string;
  queuePosition: number;
  selectedTier: string;
  firstName: string;
  emailAlreadySent?: boolean;
}

export function SaveCodeActions({
  couponCode,
  email,
  queuePosition,
  selectedTier,
  firstName,
  emailAlreadySent = true,
}: SaveCodeActionsProps) {
  const [emailState, setEmailState] = useState<"idle" | "sending" | "sent" | "error">(
    emailAlreadySent ? "sent" : "idle"
  );
  const [calendarDownloaded, setCalendarDownloaded] = useState(false);
  const isMobile = useIsMobile();

  const handleEmailCode = useCallback(async () => {
    if (emailState === "sending" || !email) return;
    
    setEmailState("sending");
    
    try {
      await supabase.functions.invoke("send-waitlist-confirmation", {
        body: {
          email,
          firstName,
          queuePosition,
          couponCode,
        },
      });
      setEmailState("sent");
    } catch (error) {
      console.error("Failed to resend email:", error);
      setEmailState("error");
      // Reset after 3 seconds so they can try again
      setTimeout(() => setEmailState("idle"), 3000);
    }
  }, [email, firstName, queuePosition, couponCode, emailState]);

  const handleAddToCalendar = useCallback(() => {
    downloadLaunchReminder({
      couponCode,
      queuePosition,
      selectedTier,
    });
    setCalendarDownloaded(true);
    
    // Haptic feedback on mobile
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  }, [couponCode, queuePosition, selectedTier]);

  const handleSMSShare = useCallback(() => {
    const tierName = selectedTier 
      ? selectedTier.charAt(0).toUpperCase() + selectedTier.slice(1) 
      : "";
    
    const message = tierName
      ? `I just locked in the ${tierName} tier for a gaming PC subscription! I'm #${queuePosition} in line for Calgary. Get 10% off your first 3 months with code ${couponCode}!`
      : `I just joined the waitlist for a gaming PC subscription! Get 10% off your first 3 months with code ${couponCode}!`;
    
    window.open(`sms:?body=${encodeURIComponent(message)}`, "_self");
  }, [selectedTier, queuePosition, couponCode]);

  const getEmailButtonContent = () => {
    switch (emailState) {
      case "sending":
        return (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Sending...</span>
          </>
        );
      case "sent":
        return (
          <>
            <Check className="w-4 h-4" />
            <span>Email Sent!</span>
          </>
        );
      case "error":
        return (
          <>
            <Mail className="w-4 h-4" />
            <span>Try Again</span>
          </>
        );
      default:
        return (
          <>
            <Mail className="w-4 h-4" />
            <span>{emailAlreadySent ? "Resend Email" : "Email My Code"}</span>
          </>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45 }}
      className="mt-4"
    >
      <p className="text-xs text-muted-foreground uppercase tracking-wider text-center mb-3">
        Save your code for launch
      </p>
      
      <div className="flex flex-col sm:flex-row gap-2">
        {/* Email My Code button */}
        <motion.button
          onClick={handleEmailCode}
          disabled={emailState === "sending"}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all min-h-[44px]",
            emailState === "sent"
              ? "bg-gaming-green/20 text-gaming-green border border-gaming-green/30"
              : emailState === "error"
              ? "bg-destructive/20 text-destructive border border-destructive/30"
              : "bg-secondary hover:bg-secondary/80 text-foreground border border-border"
          )}
          whileHover={{ scale: emailState === "idle" ? 1.02 : 1 }}
          whileTap={{ scale: emailState === "idle" ? 0.98 : 1 }}
        >
          {getEmailButtonContent()}
        </motion.button>

        {/* Add to Calendar button */}
        <motion.button
          onClick={handleAddToCalendar}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all min-h-[44px]",
            calendarDownloaded
              ? "bg-gaming-green/20 text-gaming-green border border-gaming-green/30"
              : "bg-secondary hover:bg-secondary/80 text-foreground border border-border"
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {calendarDownloaded ? (
            <>
              <Check className="w-4 h-4" />
              <span>Added!</span>
            </>
          ) : (
            <>
              <Calendar className="w-4 h-4" />
              <span>Add to Calendar</span>
            </>
          )}
        </motion.button>

        {/* SMS Share button - mobile only */}
        {isMobile && (
          <motion.button
            onClick={handleSMSShare}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium bg-secondary hover:bg-secondary/80 text-foreground border border-border transition-all min-h-[44px]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Share via SMS</span>
          </motion.button>
        )}
      </div>
      
      <p className="text-xs text-muted-foreground text-center mt-2">
        {isMobile 
          ? "Screenshot this page as a backup!" 
          : "Or screenshot this page — we'll also email you a reminder when Calgary goes live"}
      </p>
    </motion.div>
  );
}
