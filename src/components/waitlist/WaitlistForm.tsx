import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Check, Users, Crown, Zap, Gamepad2, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  waitlistFormSchema,
  type WaitlistFormData,
  tierOptions,
  budgetOptions,
} from "@/lib/waitlist-validation";
import { useIsMobile } from "@/hooks/use-mobile";
import { TrustBadges } from "./TrustBadges";
import { useState, useEffect } from "react";

interface WaitlistFormProps {
  selectedTier: "ludacris" | "esports" | "pro" | null;
  onSubmit: (data: WaitlistFormData) => Promise<void>;
  isSubmitting: boolean;
  onScrollToTiers?: () => void;
  spotsRemaining?: number;
}

// Tier icons for the confirmation badge
const tierIcons = {
  ludacris: Crown,
  esports: Zap,
  pro: Gamepad2,
};

// Progress messages for dopamine hits (no emojis)
const progressMessages = [
  { threshold: 0, message: "Let's get started..." },
  { threshold: 25, message: "Great start!" },
  { threshold: 50, message: "Halfway there!" },
  { threshold: 75, message: "Almost done!" },
  { threshold: 100, message: "Ready to go!" },
];

export function WaitlistForm({
  selectedTier,
  onSubmit,
  isSubmitting,
  onScrollToTiers,
  spotsRemaining = 250,
}: WaitlistFormProps) {
  const isMobile = useIsMobile();
  const [showOptional, setShowOptional] = useState(false);
  const [prevProgress, setPrevProgress] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, dirtyFields },
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistFormSchema),
    defaultValues: {
      preferredTier: selectedTier || undefined,
      tradeInInterest: true, // Pre-checked for better conversion
      mailingListOptIn: true, // Pre-checked for better conversion
    },
  });

  // Update tier when selected from TierSelector
  if (selectedTier && watch("preferredTier") !== selectedTier) {
    setValue("preferredTier", selectedTier);
  }

  const selectedTierInfo = tierOptions.find((t) => t.id === selectedTier);
  const TierIcon = selectedTier ? tierIcons[selectedTier] : null;
  
  // Watch form values for personalization
  const email = watch("email");
  const firstName = watch("firstName");
  const lastName = watch("lastName");
  
  // Calculate progress - tier counts as 1 of 4
  const filledRequired = [email, firstName, lastName, selectedTier].filter(Boolean).length;
  const totalRequired = 4;
  const progressPercent = (filledRequired / totalRequired) * 100;
  
  // Get current progress message
  const currentMessage = progressMessages
    .filter(m => progressPercent >= m.threshold)
    .pop()?.message || progressMessages[0].message;

  // Trigger celebration on milestone progress
  useEffect(() => {
    const milestones = [50, 75, 100];
    const crossed = milestones.find(m => progressPercent >= m && prevProgress < m);
    if (crossed) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 500);
      // Haptic feedback on mobile
      if (navigator.vibrate) {
        navigator.vibrate(30);
      }
    }
    setPrevProgress(progressPercent);
  }, [progressPercent, prevProgress]);

  const handleFormSubmit = handleSubmit(async (data) => {
    await onSubmit(data);
  });

  // Handle submit button click when tier is missing
  const handleSubmitClick = () => {
    if (!selectedTier && onScrollToTiers) {
      onScrollToTiers();
    }
  };

  // Personalized header based on first name
  const personalizedHeader = firstName 
    ? `Lock your spot, ${firstName}!` 
    : "Lock your spot";

  return (
    <section className="py-20 px-6 pb-32 md:pb-20" id="waitlist-form">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-lg mx-auto"
      >
        {/* Section header - personalized */}
        <div className="text-center mb-8">
          <motion.h2 
            key={personalizedHeader}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            {personalizedHeader}
          </motion.h2>
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-lg">
              Join Calgary gamers on the waitlist
            </span>
          </div>
          
          {/* Tier confirmation badge */}
          {selectedTierInfo && TierIcon && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30"
            >
              <TierIcon className="w-4 h-4 text-primary" />
              <span className="text-primary font-semibold text-sm">
                {selectedTierInfo.name} tier selected
              </span>
              <Check className="w-4 h-4 text-gaming-green" />
            </motion.div>
          )}
        </div>

        {/* Progress bar with celebration */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <motion.span 
              key={currentMessage}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xs text-muted-foreground uppercase tracking-wide"
            >
              {currentMessage}
            </motion.span>
            <span className="text-xs text-muted-foreground">
              {filledRequired}/{totalRequired} complete
            </span>
          </div>
          <div className="relative h-1.5 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className={cn(
                "h-full bg-primary rounded-full",
                showCelebration && "progress-flash"
              )}
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
            {/* Celebration burst */}
            <AnimatePresence>
              {showCelebration && (
                <motion.div
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full"
                  style={{ right: `${100 - progressPercent}%` }}
                />
              )}
            </AnimatePresence>
          </div>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-5">
          {/* Email */}
          <FormField
            label="Email"
            error={errors.email?.message}
            isValid={dirtyFields.email && !errors.email}
            required
            fieldId="email"
          >
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={cn(
                "h-12 bg-card/50 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all",
                errors.email && "border-destructive shake"
              )}
            />
          </FormField>

          {/* Name fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="First Name"
              error={errors.firstName?.message}
              isValid={dirtyFields.firstName && !errors.firstName}
              required
              fieldId="firstName"
            >
              <Input
                id="firstName"
                type="text"
                placeholder="Casey"
                {...register("firstName")}
                aria-invalid={errors.firstName ? "true" : "false"}
                aria-describedby={errors.firstName ? "firstName-error" : undefined}
                className={cn(
                  "h-12 bg-card/50 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all",
                  errors.firstName && "border-destructive shake"
                )}
              />
            </FormField>

            <FormField
              label="Last Name"
              error={errors.lastName?.message}
              isValid={dirtyFields.lastName && !errors.lastName}
              required
              fieldId="lastName"
            >
              <Input
                id="lastName"
                type="text"
                placeholder="GG"
                {...register("lastName")}
                aria-invalid={errors.lastName ? "true" : "false"}
                aria-describedby={errors.lastName ? "lastName-error" : undefined}
                className={cn(
                  "h-12 bg-card/50 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all",
                  errors.lastName && "border-destructive shake"
                )}
              />
            </FormField>
          </div>

          {/* Tier selection (hidden if already selected via cards) */}
          {!selectedTier && (
            <FormField
              label="Preferred Tier"
              error={errors.preferredTier?.message}
              required
              fieldId="preferredTier"
            >
              <Select
                onValueChange={(value: "ludacris" | "esports" | "pro") =>
                  setValue("preferredTier", value)
                }
              >
                <SelectTrigger className="h-12 bg-card/50 border-border">
                  <SelectValue placeholder="Select a tier" />
                </SelectTrigger>
                <SelectContent>
                  {tierOptions.map((tier) => (
                    <SelectItem key={tier.id} value={tier.id}>
                      {tier.name} — {tier.tagline}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          )}

          {/* Pre-checked benefit checkboxes - above optional fields */}
          <div className="space-y-3 py-2">
            <div className="flex items-center gap-3">
              <Checkbox
                id="tradeInInterest"
                defaultChecked={true}
                onCheckedChange={(checked) =>
                  setValue("tradeInInterest", checked as boolean)
                }
                className="h-5 w-5 border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label
                htmlFor="tradeInInterest"
                className="text-foreground cursor-pointer text-sm"
              >
                Check my PC for a bonus discount
              </Label>
            </div>

            <div className="flex items-center gap-3">
              <Checkbox
                id="mailingListOptIn"
                defaultChecked={true}
                onCheckedChange={(checked) =>
                  setValue("mailingListOptIn", checked as boolean)
                }
                className="h-5 w-5 border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label
                htmlFor="mailingListOptIn"
                className="text-foreground cursor-pointer text-sm"
              >
                Send me exclusive gaming deals + early access
              </Label>
            </div>
          </div>

          {/* Collapsible optional fields */}
          <div className="border-t border-border/50 pt-4">
            <button
              type="button"
              onClick={() => setShowOptional(!showOptional)}
              className="flex items-center justify-between w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>Tell us more (optional)</span>
              <motion.div
                animate={{ rotate: showOptional ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>
            
            <AnimatePresence>
              {showOptional && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-4 pt-4">
                    {/* Phone number (optional) */}
                    <FormField label="Phone Number" error={errors.phoneNumber?.message} optional fieldId="phoneNumber">
                      <Input
                        id="phoneNumber"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        {...register("phoneNumber")}
                        className="h-12 bg-card/50 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </FormField>

                    {/* Budget range (optional) */}
                    <FormField label="Monthly Budget" optional fieldId="budgetRange">
                      <Select
                        onValueChange={(value: "50-100" | "100-150" | "150-200" | "200+") =>
                          setValue("budgetRange", value)
                        }
                      >
                        <SelectTrigger className="h-12 bg-card/50 border-border">
                          <SelectValue placeholder="Select your budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          {budgetOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormField>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Spots remaining reminder near submit */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-2 py-2 text-sm"
          >
            <span className="text-muted-foreground">
              <span className="text-foreground font-semibold">{spotsRemaining}</span> spots remaining
            </span>
          </motion.div>

          {/* Submit button - desktop version */}
          <div className="hidden md:block">
            <motion.button
              type={selectedTier ? "submit" : "button"}
              onClick={selectedTier ? undefined : handleSubmitClick}
              disabled={isSubmitting}
              className={cn(
                "w-full py-4 mt-4 rounded-xl font-semibold text-lg transition-all duration-300",
                "bg-primary text-primary-foreground",
                "shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "relative overflow-hidden group glow-pulse-subtle",
                !selectedTier && "opacity-90"
              )}
              whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Joining the queue...
                </span>
              ) : !selectedTier ? (
                <span className="flex flex-col items-center">
                  <span>Select a tier first</span>
                </span>
              ) : (
                <span className="flex flex-col items-center">
                  <span>Reserve My Spot</span>
                  <span className="text-sm opacity-80 font-normal">10% discount included</span>
                </span>
              )}

              {/* Button glow */}
              <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </motion.button>
          </div>

          {/* Trust badges */}
          <div className="pt-4">
            <TrustBadges />
          </div>
        </form>
      </motion.div>

      {/* Sticky mobile submit button */}
      {isMobile && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-md border-t border-border z-40"
        >
          <motion.button
            type={selectedTier ? "submit" : "button"}
            onClick={selectedTier ? handleFormSubmit : handleSubmitClick}
            disabled={isSubmitting}
            className={cn(
              "w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300",
              "bg-primary text-primary-foreground",
              "shadow-lg shadow-primary/30",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              !selectedTier && "opacity-90"
            )}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Joining...
              </span>
            ) : !selectedTier ? (
              <span>Select a tier first</span>
            ) : (
              <span>Reserve My Spot</span>
            )}
          </motion.button>
        </motion.div>
      )}
    </section>
  );
}

// Helper component for form fields with accessibility
function FormField({
  label,
  error,
  isValid,
  required,
  optional,
  children,
  fieldId,
}: {
  label: string;
  error?: string;
  isValid?: boolean;
  required?: boolean;
  optional?: boolean;
  children: React.ReactNode;
  fieldId?: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={fieldId} className="text-foreground text-sm">
          {label}
          {required && <span className="text-primary ml-1">*</span>}
          {optional && <span className="text-muted-foreground text-xs ml-2">(optional)</span>}
        </Label>
        {isValid && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="text-gaming-green"
          >
            <Check className="w-4 h-4" />
          </motion.div>
        )}
      </div>
      {children}
      {error && (
        <motion.p
          id={fieldId ? `${fieldId}-error` : undefined}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-sm text-destructive"
          role="alert"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
