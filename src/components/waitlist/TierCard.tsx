import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface TierCardProps {
  id: string;
  name: string;
  tagline: string;
  description: string;
  accentColor: "gaming-gold" | "gaming-blue" | "gaming-green";
  isSelected: boolean;
  onSelect: () => void;
  index: number;
}

const accentColorMap = {
  "gaming-gold": {
    border: "border-gaming-gold/50",
    glow: "shadow-gaming-gold/30",
    text: "text-gaming-gold",
    bg: "bg-gaming-gold",
  },
  "gaming-blue": {
    border: "border-gaming-blue/50",
    glow: "shadow-gaming-blue/30",
    text: "text-gaming-blue",
    bg: "bg-gaming-blue",
  },
  "gaming-green": {
    border: "border-gaming-green/50",
    glow: "shadow-gaming-green/30",
    text: "text-gaming-green",
    bg: "bg-gaming-green",
  },
};

export function TierCard({
  id,
  name,
  tagline,
  description,
  accentColor,
  isSelected,
  onSelect,
  index,
}: TierCardProps) {
  const colors = accentColorMap[accentColor];

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative w-full p-6 rounded-2xl border-2 text-left transition-all duration-300",
        "bg-card/50 backdrop-blur-sm",
        isSelected
          ? "border-primary shadow-lg shadow-primary/20"
          : `${colors.border} hover:${colors.glow} hover:shadow-lg`
      )}
    >
      {/* Selected checkmark */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-4 right-4 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
        >
          <Check className="w-4 h-4 text-primary-foreground" />
        </motion.div>
      )}

      {/* Tier name */}
      <h3 className={cn("text-2xl font-bold mb-2", colors.text)}>
        {name}
      </h3>

      {/* Tagline */}
      <p className="text-foreground font-medium mb-3">{tagline}</p>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>

      {/* Select indicator */}
      <div className="mt-4 pt-4 border-t border-border/50">
        <span
          className={cn(
            "text-sm font-medium uppercase tracking-wider",
            isSelected ? "text-primary" : "text-muted-foreground"
          )}
        >
          {isSelected ? "Selected" : "Select tier"}
        </span>
      </div>

      {/* Hover glow effect */}
      <div
        className={cn(
          "absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 -z-10",
          isSelected ? "opacity-100 bg-primary/5" : "group-hover:opacity-100"
        )}
      />
    </motion.button>
  );
}
