import { useState, useRef } from "react";
import { WaitlistHero } from "@/components/waitlist/WaitlistHero";
import { TierSelector } from "@/components/waitlist/TierSelector";
import { WaitlistForm } from "@/components/waitlist/WaitlistForm";
import { GeoCoverage } from "@/components/waitlist/GeoCoverage";
import { ThankYouModal } from "@/components/waitlist/ThankYouModal";
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
  } | null>(null);

  const tierRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const { submitWaitlist, isSubmitting } = useWaitlistSubmit();
  const { toast } = useToast();

  const scrollToTiers = () => {
    tierRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleTierSelect = (tier: "ludacris" | "esports" | "pro") => {
    setSelectedTier(tier);
    // Auto-scroll to form after selecting tier
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 300);
  };

  const handleSubmit = async (data: WaitlistFormData) => {
    const result = await submitWaitlist(data);

    if (result.success) {
      setSignupData({
        firstName: result.firstName || data.firstName,
        queuePosition: result.queuePosition || 1,
        couponCode: result.couponCode || "EARLY10",
        selectedTier: data.preferredTier,
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
      {/* Hero section */}
      <WaitlistHero onScrollToTiers={scrollToTiers} />

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
        />
      )}
    </div>
  );
}
