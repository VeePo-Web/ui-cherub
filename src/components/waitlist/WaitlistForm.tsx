import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2, Check } from "lucide-react";
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

interface WaitlistFormProps {
  selectedTier: "ludacris" | "esports" | "pro" | null;
  onSubmit: (data: WaitlistFormData) => Promise<void>;
  isSubmitting: boolean;
}

export function WaitlistForm({
  selectedTier,
  onSubmit,
  isSubmitting,
}: WaitlistFormProps) {
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

  const handleFormSubmit = handleSubmit(async (data) => {
    await onSubmit(data);
  });

  return (
    <section className="py-20 px-6" id="waitlist-form">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-lg mx-auto"
      >
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Join the waitlist
          </h2>
          <p className="text-muted-foreground text-lg">
            Be first in line when we launch in your area.
            {selectedTierInfo && (
              <span className="block mt-2 text-primary font-medium">
                Selected: {selectedTierInfo.name} tier
              </span>
            )}
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          {/* Email */}
          <FormField
            label="Email"
            error={errors.email?.message}
            isValid={dirtyFields.email && !errors.email}
            required
          >
            <Input
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              className={cn(
                "bg-card/50 border-border focus:border-primary focus:ring-primary/30",
                errors.email && "border-destructive"
              )}
            />
          </FormField>

          {/* Name fields */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="First Name"
              error={errors.firstName?.message}
              isValid={dirtyFields.firstName && !errors.firstName}
              required
            >
              <Input
                type="text"
                placeholder="Alex"
                {...register("firstName")}
                className={cn(
                  "bg-card/50 border-border focus:border-primary focus:ring-primary/30",
                  errors.firstName && "border-destructive"
                )}
              />
            </FormField>

            <FormField
              label="Last Name"
              error={errors.lastName?.message}
              isValid={dirtyFields.lastName && !errors.lastName}
              required
            >
              <Input
                type="text"
                placeholder="Chen"
                {...register("lastName")}
                className={cn(
                  "bg-card/50 border-border focus:border-primary focus:ring-primary/30",
                  errors.lastName && "border-destructive"
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
            >
              <Select
                onValueChange={(value: "ludacris" | "esports" | "pro") =>
                  setValue("preferredTier", value)
                }
              >
                <SelectTrigger className="bg-card/50 border-border">
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

          {/* Phone number (optional) */}
          <FormField label="Phone Number" error={errors.phoneNumber?.message}>
            <Input
              type="tel"
              placeholder="+1 (555) 123-4567"
              {...register("phoneNumber")}
              className="bg-card/50 border-border focus:border-primary focus:ring-primary/30"
            />
          </FormField>

          {/* Budget range (optional) */}
          <FormField label="Monthly Budget">
            <Select
              onValueChange={(value: "50-100" | "100-150" | "150-200" | "200+") =>
                setValue("budgetRange", value)
              }
            >
              <SelectTrigger className="bg-card/50 border-border">
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

          {/* Trade-in interest */}
          <div className="flex items-center gap-3">
            <Checkbox
              id="tradeInInterest"
              onCheckedChange={(checked) =>
                setValue("tradeInInterest", checked as boolean)
              }
              className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <Label
              htmlFor="tradeInInterest"
              className="text-muted-foreground cursor-pointer"
            >
              I'm interested in trading in my current PC
            </Label>
          </div>

          {/* Mailing list */}
          <div className="flex items-center gap-3">
            <Checkbox
              id="mailingListOptIn"
              onCheckedChange={(checked) =>
                setValue("mailingListOptIn", checked as boolean)
              }
              className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <Label
              htmlFor="mailingListOptIn"
              className="text-muted-foreground cursor-pointer"
            >
              Send me updates and gaming news
            </Label>
          </div>

          {/* Submit button */}
          <motion.button
            type="submit"
            disabled={isSubmitting || !selectedTier}
            className={cn(
              "w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300",
              "bg-primary text-primary-foreground",
              "shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "relative overflow-hidden group"
            )}
            whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Joining...
              </span>
            ) : (
              <span>Join the Waitlist</span>
            )}

            {/* Button glow */}
            <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          </motion.button>

          {!selectedTier && (
            <p className="text-center text-sm text-muted-foreground">
              ↑ Please select a tier above first
            </p>
          )}
        </form>
      </motion.div>
    </section>
  );
}

// Helper component for form fields
function FormField({
  label,
  error,
  isValid,
  required,
  children,
}: {
  label: string;
  error?: string;
  isValid?: boolean;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-foreground">
          {label}
          {required && <span className="text-primary ml-1">*</span>}
        </Label>
        {isValid && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-gaming-green"
          >
            <Check className="w-4 h-4" />
          </motion.div>
        )}
      </div>
      {children}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-destructive"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
