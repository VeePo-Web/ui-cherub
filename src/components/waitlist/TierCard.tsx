import { motion } from "framer-motion";
import { Check, Crown, Zap, Gamepad2, ExternalLink, Star, Flame, Users } from "lucide-react";
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
  hasSelection: boolean;
  isPopular?: boolean;
  specsUrl?: string;
  selectCta?: string;
  estimatedPrice?: string;
  savings?: string;
  waitingCount?: number;
  spotsLeft?: number;
}

const accentColorMap = {
  "gaming-gold": {
    border: "border-gaming-gold/40",
    borderHover: "hover:border-gaming-gold/60",
    glow: "shadow-[0_0_30px_hsl(45_100%_60%/0.2)]",
    glowSelected: "shadow-[0_0_40px_hsl(45_100%_60%/0.3)]",
    text: "text-gaming-gold",
    bg: "bg-gaming-gold",
    iconBg: "bg-gaming-gold/20",
  },
  "gaming-blue": {
    border: "border-gaming-blue/40",
    borderHover: "hover:border-gaming-blue/60",
    glow: "shadow-[0_0_30px_hsl(210_100%_60%/0.2)]",
    glowSelected: "shadow-[0_0_40px_hsl(210_100%_60%/0.3)]",
    text: "text-gaming-blue",
    bg: "bg-gaming-blue",
    iconBg: "bg-gaming-blue/20",
  },
  "gaming-green": {
    border: "border-gaming-green/40",
    borderHover: "hover:border-gaming-green/60",
    glow: "shadow-[0_0_30px_hsl(145_70%_50%/0.2)]",
    glowSelected: "shadow-[0_0_40px_hsl(145_70%_50%/0.3)]",
    text: "text-gaming-green",
    bg: "bg-gaming-green",
    iconBg: "bg-gaming-green/20",
  },
};

const tierIcons = {
  "gaming-gold": Crown,
  "gaming-blue": Zap,
  "gaming-green": Gamepad2,
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
  hasSelection,
  isPopular = false,
  specsUrl,
  selectCta,
  estimatedPrice,
  savings,
  waitingCount,
  spotsLeft,
}: TierCardProps) {
  const colors = accentColorMap[accentColor];
  const TierIcon = tierIcons[accentColor];
  const isDimmed = hasSelection && !isSelected;

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
      animate={isSelected ? { scale: [1, 1.03, 1] } : {}}
      className={cn(
        "relative w-full p-6 rounded-2xl border-2 text-left transition-all duration-300",
        "bg-card/50 backdrop-blur-sm",
        "active:scale-[0.98] active:brightness-95", // Mobile tap feedback
        isSelected
          ? `border-primary ${colors.glowSelected}`
          : `${colors.border} ${colors.borderHover} ${colors.glow}`,
        isDimmed && "opacity-60"
      )}
    >
      {/* Most Popular badge - LARGER and more prominent */}
      {isPopular && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gaming-blue text-white text-xs font-bold uppercase tracking-wider rounded-full flex items-center gap-1.5 shadow-lg shadow-gaming-blue/30"
        >
          <Star className="w-3.5 h-3.5 fill-current" />
          <span>Most Popular — 67% choose this</span>
          <motion.div
            className="absolute inset-0 rounded-full bg-gaming-blue/50"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      )}

      {/* Selected checkmark */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute top-4 right-4 w-7 h-7 rounded-full bg-primary flex items-center justify-center"
        >
          <Check className="w-4 h-4 text-primary-foreground" />
        </motion.div>
      )}

      {/* Tier icon badge */}
      <motion.div
        className={cn(
          "inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4",
          colors.iconBg
        )}
        whileHover={{ rotate: [0, -5, 5, 0] }}
        transition={{ duration: 0.3 }}
      >
        <TierIcon className={cn("w-6 h-6", colors.text)} />
      </motion.div>

      {/* Tier name and price */}
      <div className="flex items-baseline justify-between mb-1">
        <h3 className={cn("text-2xl font-bold", colors.text)}>
          {name}
        </h3>
        {estimatedPrice && (
          <div className="text-right">
            <span className="text-lg font-bold text-foreground">{estimatedPrice}</span>
            <span className="text-xs text-muted-foreground">/mo</span>
          </div>
        )}
      </div>

      {/* Savings badge */}
      {savings && (
        <div className="mb-3">
          <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-gaming-green/20 text-gaming-green font-medium">
            Save {savings} vs. financing
          </span>
        </div>
      )}

      {/* Tagline */}
      <p className="text-foreground font-medium mb-3">{tagline}</p>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {description}
      </p>

      {/* Included features */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground">
          Yearly upgrade
        </span>
        <span className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground">
          Covered repairs
        </span>
      </div>

      {/* Social proof per tier */}
      {waitingCount && (
        <div className="flex items-center gap-1.5 mb-3 text-xs text-muted-foreground">
          <Users className="w-3 h-3" />
          <span>{waitingCount} Calgary gamers waiting</span>
        </div>
      )}

      {/* Scarcity per tier */}
      {spotsLeft && (
        <div className="flex items-center gap-1.5 mb-3 text-xs text-destructive">
          <Flame className="w-3 h-3 animate-pulse" />
          <span className="font-medium">Only {spotsLeft} beta spots</span>
        </div>
      )}

      {/* Specs link placeholder */}
      {specsUrl && (
        <a
          href={specsUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "inline-flex items-center gap-1 text-xs mb-4 transition-colors",
            colors.text,
            "hover:underline"
          )}
        >
          View exact specs <ExternalLink className="w-3 h-3" />
        </a>
      )}

      {/* Select indicator */}
      <div className="pt-4 border-t border-border/50">
        <span
          className={cn(
            "text-sm font-medium uppercase tracking-wider transition-colors",
            isSelected ? "text-primary" : "text-muted-foreground"
          )}
        >
          {isSelected ? "✓ Selected" : selectCta || "Select tier"}
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
