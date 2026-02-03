import { motion } from "framer-motion";
import { Crown, Zap, Gamepad2, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const tiers = [
  {
    id: "ludacris",
    name: "Ludacris",
    tagline: "Peak Gaming Performance",
    icon: Crown,
    accentColor: "gaming-gold",
    specsUrl: "#", // Placeholder for PCPartPicker link
  },
  {
    id: "esports",
    name: "Esports",
    tagline: "Competition-Ready Performance",
    icon: Zap,
    accentColor: "gaming-blue",
    specsUrl: "#",
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "AAA-Title Performance",
    icon: Gamepad2,
    accentColor: "gaming-green",
    specsUrl: "#",
  },
];

const colorMap = {
  "gaming-gold": {
    text: "text-gaming-gold",
    bg: "bg-gaming-gold/20",
    border: "border-gaming-gold/30",
    hoverBorder: "hover:border-gaming-gold/50",
  },
  "gaming-blue": {
    text: "text-gaming-blue",
    bg: "bg-gaming-blue/20",
    border: "border-gaming-blue/30",
    hoverBorder: "hover:border-gaming-blue/50",
  },
  "gaming-green": {
    text: "text-gaming-green",
    bg: "bg-gaming-green/20",
    border: "border-gaming-green/30",
    hoverBorder: "hover:border-gaming-green/50",
  },
};

export function HowItWorksTierPreview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      {tiers.map((tier, index) => {
        const TierIcon = tier.icon;
        const colors = colorMap[tier.accentColor as keyof typeof colorMap];

        return (
          <motion.div
            key={tier.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className={cn(
              "bg-card/50 backdrop-blur-sm border rounded-xl p-5 transition-all duration-300",
              colors.border,
              colors.hoverBorder
            )}
          >
            {/* Icon */}
            <div className={cn("inline-flex items-center justify-center w-10 h-10 rounded-lg mb-3", colors.bg)}>
              <TierIcon className={cn("w-5 h-5", colors.text)} />
            </div>

            {/* Name & Tagline */}
            <h4 className={cn("text-lg font-bold mb-1", colors.text)}>
              {tier.name}
            </h4>
            <p className="text-sm text-muted-foreground mb-3">
              {tier.tagline}
            </p>

            {/* Specs link */}
            <a
              href={tier.specsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              See exact parts via public list
              <ExternalLink className="w-3 h-3" />
            </a>

            {/* Price placeholder */}
            <p className="text-xs text-muted-foreground mt-2">
              (Monthly subscription: TBD.)
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
