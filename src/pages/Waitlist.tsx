import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { WaitlistHero } from "@/components/waitlist/WaitlistHero";
import { TierSelector } from "@/components/waitlist/TierSelector";
import { WaitlistForm } from "@/components/waitlist/WaitlistForm";
import { GeoCoverage } from "@/components/waitlist/GeoCoverage";
import { ThankYouModal } from "@/components/waitlist/ThankYouModal";

import { HowItWorksNav } from "@/components/howitworks/HowItWorksNav";
import { useActualSpotsRemaining } from "@/hooks/useActualSpotsRemaining";
import { useWaitlistSubmit } from "@/hooks/useWaitlistSubmit";
import { useToast } from "@/hooks/use-toast";
import type { WaitlistFormData } from "@/lib/waitlist-validation";

export default function Waitlist() {
  const [selectedTier, setSelectedTier] = useState<"ludacris" | "esports" | "pro" | null>(null);
  const [showThankYou, setShowThankYou] = useState(false);
  const [signupData, setSignupData] = useState<{
    firstName: string;
    queuePosition: number;
    couponCode: string;
    selectedTier: string;
    emailSent: boolean;
    email: string;
  } | null>(null);

  const tierRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const { submitWaitlist, isSubmitting } = useWaitlistSubmit();
  const { toast } = useToast();
  const { spotsRemaining, isLoading: spotsLoading } = useActualSpotsRemaining();
  const location = useLocation();

  // Handle hash navigation from How It Works page
  useEffect(() => {
    if (location.hash === "#waitlist-form") {
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  }, [location]);

  const scrollToTiers = () => {
    tierRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleTierSelect = (tier: "ludacris" | "esports" | "pro") => {
    setSelectedTier(tier);
    // Haptic feedback on mobile
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    // Auto-scroll to form after selecting tier
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 300);
  };

  const handleSubmit = async (data: WaitlistFormData) => {
    const result = await submitWaitlist(data);

    if (result.success) {
      // Haptic feedback on mobile
      if (navigator.vibrate) {
        navigator.vibrate([50, 50, 100]);
      }
      setSignupData({
        firstName: result.firstName || data.firstName,
        queuePosition: result.queuePosition || 1,
        couponCode: result.couponCode || "EARLY10",
        selectedTier: data.preferredTier,
        emailSent: result.emailSent ?? true,
        email: data.email,
      });
      setShowThankYou(true);
    } else {
      toast({
        title: "Oops!",
        description: result.error || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <HowItWorksNav />

      {/* Skip to content for accessibility */}
      <a
        href="#waitlist-form"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg"
      >
        Skip to form
      </a>


      {/* Hero section */}
      <WaitlistHero 
        onScrollToTiers={scrollToTiers} 
        spotsRemaining={spotsRemaining}
        spotsLoading={spotsLoading}
      />

      {/* Tier selection */}
      <div ref={tierRef}>
        <TierSelector selectedTier={selectedTier} onSelectTier={handleTierSelect} />
      </div>

      {/* Form section with ref for scrolling */}
      <div ref={formRef}>
        <WaitlistForm
          selectedTier={selectedTier}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          onScrollToTiers={scrollToTiers}
          spotsRemaining={spotsRemaining}
        />
      </div>

      {/* Geographic coverage */}
      <GeoCoverage />

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border/50">
        <div className="max-w-5xl mx-auto text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Gaming PC Subscription. All rights reserved.</p>
          <p className="mt-2 text-xs">
            By joining the waitlist, you agree to receive email communications about our service.
          </p>
        </div>
      </footer>

      {/* Thank you modal */}
      {signupData && (
        <ThankYouModal
          isOpen={showThankYou}
          onClose={() => setShowThankYou(false)}
          firstName={signupData.firstName}
          queuePosition={signupData.queuePosition}
          couponCode={signupData.couponCode}
          selectedTier={signupData.selectedTier}
          emailSent={signupData.emailSent}
          email={signupData.email}
        />
      )}
    </div>
  );
}
