import { motion } from "framer-motion";
import { Lock, Ban, RotateCcw } from "lucide-react";

export function TrustBadges() {
  const badges = [
    { icon: Lock, text: "Your info is secure" },
    { icon: Ban, text: "No spam ever" },
    { icon: RotateCcw, text: "Cancel anytime" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs text-muted-foreground"
    >
      {badges.map((badge, index) => (
        <div key={badge.text} className="flex items-center gap-1.5">
          <badge.icon className="w-3.5 h-3.5" />
          <span>{badge.text}</span>
          {index < badges.length - 1 && (
            <span className="hidden md:inline ml-4 text-border">|</span>
          )}
        </div>
      ))}
    </motion.div>
  );
}
