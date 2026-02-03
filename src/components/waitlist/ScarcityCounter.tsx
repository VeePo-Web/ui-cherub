import { motion } from "framer-motion";
import { Flame, TrendingUp } from "lucide-react";

interface ScarcityCounterProps {
  spotsRemaining: number;
  isLoading?: boolean;
  className?: string;
}

export function ScarcityCounter({ spotsRemaining, isLoading = false, className }: ScarcityCounterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={className}
    >
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-destructive/10 border border-destructive/30 rounded-full">
        <Flame className="w-4 h-4 text-destructive" />
        <span className="text-sm font-medium">
          {isLoading ? (
            "Loading..."
          ) : (
            <>
              Only <span className="text-destructive font-bold">{spotsRemaining}</span> Calgary beta spots left
            </>
          )}
        </span>
        <TrendingUp className="w-3 h-3 text-muted-foreground" />
      </div>
    </motion.div>
  );
}
