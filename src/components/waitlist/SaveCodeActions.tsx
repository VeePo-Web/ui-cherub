import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Mail, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

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
  firstName,
  emailAlreadySent = true,
}: SaveCodeActionsProps) {
  const [emailState, setEmailState] = useState<"idle" | "sending" | "sent" | "error">(
    emailAlreadySent ? "sent" : "idle"
  );

  const handleEmailCode = useCallback(async () => {
    if (emailState === "sending" || !email) return;
    
    setEmailState("sending");
    
    try {
      const { error } = await supabase.functions.invoke("send-waitlist-confirmation", {
        body: {
          email,
          firstName,
          queuePosition,
          couponCode,
        },
      });
      
      if (error) {
        throw error;
      }
      
      setEmailState("sent");
    } catch (error) {
      console.error("Failed to resend email:", error);
      setEmailState("error");
      // Reset after 3 seconds so they can try again
      setTimeout(() => setEmailState("idle"), 3000);
    }
  }, [email, firstName, queuePosition, couponCode, emailState]);

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
      
      <div className="flex justify-center">
        {/* Email My Code button */}
        <motion.button
          onClick={handleEmailCode}
          disabled={emailState === "sending"}
          className={cn(
            "flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all min-h-[44px]",
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
      </div>
      
      <p className="text-xs text-muted-foreground text-center mt-3">
        Screenshot this page as a backup!
      </p>
    </motion.div>
  );
}
