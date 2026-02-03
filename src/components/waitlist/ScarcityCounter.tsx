import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Flame, TrendingUp } from "lucide-react";

interface ScarcityCounterProps {
  initialSpots?: number;
  className?: string;
}

export function ScarcityCounter({ initialSpots = 247, className }: ScarcityCounterProps) {
  const [spotsRemaining, setSpotsRemaining] = useState(initialSpots);

  useEffect(() => {
    // Get persisted spots from session storage or use initial
    const stored = sessionStorage.getItem("waitlist-spots-remaining");
    if (stored) {
      setSpotsRemaining(parseInt(stored, 10));
    } else {
      sessionStorage.setItem("waitlist-spots-remaining", initialSpots.toString());
    }

    // Occasionally decrement (every 30-60 seconds)
    const interval = setInterval(() => {
      setSpotsRemaining((prev) => {
        if (prev <= 100) return prev; // Don't go too low
        const newValue = prev - 1;
        sessionStorage.setItem("waitlist-spots-remaining", newValue.toString());
        return newValue;
      });
    }, 30000 + Math.random() * 30000);

    return () => clearInterval(interval);
  }, [initialSpots]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={className}
    >
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-destructive/10 border border-destructive/30 rounded-full">
        <Flame className="w-4 h-4 text-destructive animate-pulse" />
        <span className="text-sm font-medium">
          Only <span className="text-destructive font-bold">{spotsRemaining}</span> Calgary beta spots left
        </span>
        <TrendingUp className="w-3 h-3 text-muted-foreground" />
      </div>
    </motion.div>
  );
}

export function useSpotsRemaining(initial = 247): number {
  const [spots, setSpots] = useState(initial);

  useEffect(() => {
    const stored = sessionStorage.getItem("waitlist-spots-remaining");
    if (stored) {
      setSpots(parseInt(stored, 10));
    }

    const handleStorageChange = () => {
      const current = sessionStorage.getItem("waitlist-spots-remaining");
      if (current) setSpots(parseInt(current, 10));
    };

    window.addEventListener("storage", handleStorageChange);
    
    // Also poll for changes (session storage doesn't trigger events in same tab)
    const interval = setInterval(handleStorageChange, 5000);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return spots;
}
