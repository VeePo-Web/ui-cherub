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
  // Trade-in spec fields (all optional)
  tradeInGpu: z
    .string()
    .trim()
    .max(100, "GPU must be less than 100 characters")
    .optional()
    .or(z.literal("")),
  tradeInCpu: z
    .string()
    .trim()
    .max(100, "CPU must be less than 100 characters")
    .optional()
    .or(z.literal("")),
  tradeInRam: z
    .string()
    .trim()
    .max(50, "RAM must be less than 50 characters")
    .optional()
    .or(z.literal("")),
  tradeInStorage: z
    .string()
    .trim()
    .max(100, "Storage must be less than 100 characters")
    .optional()
    .or(z.literal("")),
  tradeInMotherboard: z
    .string()
    .trim()
    .max(100, "Motherboard must be less than 100 characters")
    .optional()
    .or(z.literal("")),
  tradeInUptime: z
    .string()
    .trim()
    .max(50, "Computer age must be less than 50 characters")
    .optional()
    .or(z.literal("")),
});

export type WaitlistFormData = z.infer<typeof waitlistFormSchema>;

export const tierOptions = [
  {
    id: "ludacris" as const,
    name: "Ludacris",
    tagline: "Peak Gaming Performance",
    description: "For those who demand the absolute best. Max settings on every title, future-proofed for years.",
    accentColor: "gaming-gold" as const,
    specsUrl: "https://ca.pcpartpicker.com/list/GcVLC8",
    specs: ["RTX 5070 Ti", "Ryzen 7 7800X3D", "32GB DDR5"],
    price: "$139.99/mo",
    originalPrice: "$155.55/mo",
  },
  {
    id: "esports" as const,
    name: "Esports",
    tagline: "Competition-Ready Performance",
    description: "Built for competitive play. Ultra-low latency, high refresh rates, zero input lag.",
    accentColor: "gaming-blue" as const,
    specsUrl: "https://ca.pcpartpicker.com/list/9NwCpK",
    specs: ["RTX 5070", "Ryzen 5 7600X", "32GB DDR5"],
    price: "$109.99/mo",
    originalPrice: "$122.21/mo",
  },
  {
    id: "pro" as const,
    name: "Pro",
    tagline: "AAA-Title Performance",
    description: "Reliable performance on demanding titles. Quality components, hassle-free gaming.",
    accentColor: "gaming-green" as const,
    specsUrl: "https://ca.pcpartpicker.com/list/VJdJzP",
    specs: ["RTX 5060", "Ryzen 5 7600X", "16GB DDR5"],
    price: "$89.99/mo",
    originalPrice: "$99.99/mo",
  },
] as const;

export const budgetOptions = [
  { value: "50-100", label: "$50 - $100/month" },
  { value: "100-150", label: "$100 - $150/month" },
  { value: "150-200", label: "$150 - $200/month" },
  { value: "200+", label: "$200+/month" },
] as const;
