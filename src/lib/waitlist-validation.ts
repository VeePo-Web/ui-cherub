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
    tagline: "4K. Ray-traced. No compromise.",
    description: "For those who demand the absolute best. Max settings on every title, future-proofed for years.",
    accentColor: "gaming-gold" as const,
  },
  {
    id: "esports" as const,
    name: "Esports",
    tagline: "144Hz+ ready. Tournament-grade.",
    description: "Built for competitive play. Ultra-low latency, high refresh rates, zero input lag.",
    accentColor: "gaming-blue" as const,
  },
  {
    id: "pro" as const,
    name: "Pro",
    tagline: "Smooth AAA gaming. Great value.",
    description: "Reliable performance on demanding titles. Quality components, hassle-free gaming.",
    accentColor: "gaming-green" as const,
  },
] as const;

export const budgetOptions = [
  { value: "50-100", label: "$50 - $100/month" },
  { value: "100-150", label: "$100 - $150/month" },
  { value: "150-200", label: "$150 - $200/month" },
  { value: "200+", label: "$200+/month" },
] as const;
