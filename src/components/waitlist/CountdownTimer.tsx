import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
  className?: string;
}

export function CountdownTimer({ className }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    // Initialize with time remaining until midnight or a fixed duration
    const getInitialTime = () => {
      // Use session storage to persist countdown across page refreshes
      const stored = sessionStorage.getItem("waitlist-countdown-end");
      if (stored) {
        const endTime = parseInt(stored, 10);
        const remaining = endTime - Date.now();
        if (remaining > 0) {
          return remaining;
        }
      }
      
      // Set countdown to 24 hours from now
      const endTime = Date.now() + 24 * 60 * 60 * 1000;
      sessionStorage.setItem("waitlist-countdown-end", endTime.toString());
      return 24 * 60 * 60 * 1000;
    };

    const updateTimer = () => {
      const stored = sessionStorage.getItem("waitlist-countdown-end");
      if (!stored) return;
      
      const endTime = parseInt(stored, 10);
      const remaining = Math.max(0, endTime - Date.now());
      
      const hours = Math.floor(remaining / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
      
      setTimeLeft({ hours, minutes, seconds });
      
      // Reset if expired
      if (remaining === 0) {
        const newEndTime = Date.now() + 24 * 60 * 60 * 1000;
        sessionStorage.setItem("waitlist-countdown-end", newEndTime.toString());
      }
    };

    // Initialize
    getInitialTime();
    updateTimer();

    // Update every second
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (n: number) => n.toString().padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
    >
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-destructive/10 border border-destructive/30 rounded-full">
        <Clock className="w-4 h-4 text-destructive animate-pulse" />
        <span className="text-sm text-foreground">
          <span className="text-destructive font-semibold">10% discount</span> expires in{" "}
          <span className="font-mono font-bold text-foreground">
            {formatNumber(timeLeft.hours)}:{formatNumber(timeLeft.minutes)}:{formatNumber(timeLeft.seconds)}
          </span>
        </span>
      </div>
    </motion.div>
  );
}
