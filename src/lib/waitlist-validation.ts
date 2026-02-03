import { z } from "zod";

export const waitlistFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters"),
  preferredTier: z.enum(["ludacris", "esports", "pro"], {
    required_error: "Please select a tier",
  }),
  phoneNumber: z
    .string()
    .trim()
    .max(20, "Phone number must be less than 20 characters")
    .optional()
    .or(z.literal("")),
  budgetRange: z
    .enum(["50-100", "100-150", "150-200", "200+"])
    .optional()
    .or(z.literal("")),
  tradeInInterest: z.boolean().default(false),
  mailingListOptIn: z.boolean().default(false),
});

export type WaitlistFormData = z.infer<typeof waitlistFormSchema>;

export const tierOptions = [
  {
    id: "ludacris" as const,
    name: "Ludacris",
    tagline: "Peak Gaming Performance",
    description: "For those who demand the absolute best. 4K gaming, ray tracing, zero compromises.",
    accentColor: "gaming-gold",
  },
  {
    id: "esports" as const,
    name: "Esports",
    tagline: "Competition-Ready Performance",
    description: "Built for competitive play. High refresh rates, low latency, tournament-grade specs.",
    accentColor: "gaming-blue",
  },
  {
    id: "pro" as const,
    name: "Pro",
    tagline: "AAA-Title Performance",
    description: "Smooth gameplay on demanding titles. Great visuals, excellent value.",
    accentColor: "gaming-green",
  },
] as const;

export const budgetOptions = [
  { value: "50-100", label: "$50 - $100/month" },
  { value: "100-150", label: "$100 - $150/month" },
  { value: "150-200", label: "$150 - $200/month" },
  { value: "200+", label: "$200+/month" },
] as const;
