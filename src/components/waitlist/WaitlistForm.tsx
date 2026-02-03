import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2, Check, Users, Crown, Zap, Gamepad2 } from "lucide-react";
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

interface WaitlistFormProps {
  selectedTier: "ludacris" | "esports" | "pro" | null;
  onSubmit: (data: WaitlistFormData) => Promise<void>;
  isSubmitting: boolean;
  onScrollToTiers?: () => void;
}

// Tier icons for the confirmation badge
const tierIcons = {
  ludacris: Crown,
  esports: Zap,
  pro: Gamepad2,
};

export function WaitlistForm({
  selectedTier,
  onSubmit,
  isSubmitting,
  onScrollToTiers,
}: WaitlistFormProps) {
  const isMobile = useIsMobile();
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
      tradeInInterest: false,
      mailingListOptIn: false,
    },
  });

  // Update tier when selected from TierSelector
  if (selectedTier && watch("preferredTier") !== selectedTier) {
    setValue("preferredTier", selectedTier);
  }

  const selectedTierInfo = tierOptions.find((t) => t.id === selectedTier);
  const TierIcon = selectedTier ? tierIcons[selectedTier] : null;
  
  // Calculate progress - tier counts as 1 of 4
  const email = watch("email");
  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const filledRequired = [email, firstName, lastName, selectedTier].filter(Boolean).length;
  const totalRequired = 4;
  const progressPercent = (filledRequired / totalRequired) * 100;

  const handleFormSubmit = handleSubmit(async (data) => {
    await onSubmit(data);
  });

  // Handle submit button click when tier is missing
  const handleSubmitClick = () => {
    if (!selectedTier && onScrollToTiers) {
      onScrollToTiers();
    }
  };

  return (
    <section className="py-20 px-6 pb-32 md:pb-20" id="waitlist-form">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-lg mx-auto"
      >
        {/* Section header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Lock your spot
          </h2>
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

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground uppercase tracking-wide">
              {progressPercent === 100 ? "Ready to submit!" : "Almost there..."}
            </span>
            <span className="text-xs text-muted-foreground">
              {filledRequired}/{totalRequired} complete
            </span>
          </div>
          <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
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

          {/* Phone number (optional) - inline label */}
          <FormField label="Phone Number" error={errors.phoneNumber?.message} optional fieldId="phoneNumber">
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="+1 (555) 123-4567"
              {...register("phoneNumber")}
              className="h-12 bg-card/50 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </FormField>

          {/* Budget range (optional) - inline label */}
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

          {/* Trade-in interest - improved copy */}
          <div className="flex items-center gap-3 py-1">
            <Checkbox
              id="tradeInInterest"
              onCheckedChange={(checked) =>
                setValue("tradeInInterest", checked as boolean)
              }
              className="h-5 w-5 border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <Label
              htmlFor="tradeInInterest"
              className="text-foreground/80 cursor-pointer text-sm"
            >
              I have a PC to trade in (potential discount)
            </Label>
          </div>

          {/* Mailing list - improved copy */}
          <div className="flex items-center gap-3 py-1">
            <Checkbox
              id="mailingListOptIn"
              onCheckedChange={(checked) =>
                setValue("mailingListOptIn", checked as boolean)
              }
              className="h-5 w-5 border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <Label
              htmlFor="mailingListOptIn"
              className="text-foreground/80 cursor-pointer text-sm"
            >
              Keep me updated on launch and gaming news
            </Label>
          </div>

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
                  <span>↑ Select a tier first</span>
                </span>
              ) : (
                <span className="flex flex-col items-center">
                  <span>Reserve my spot</span>
                  <span className="text-sm opacity-80 font-normal">— 10% off first 3 months</span>
                </span>
              )}

              {/* Button glow */}
              <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </motion.button>
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
              <span>↑ Select a tier first</span>
            ) : (
              <span>Reserve my spot — 10% off</span>
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
