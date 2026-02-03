import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2 } from "lucide-react";

const calgaryNames = [
  { firstName: "Alex", game: "Valorant" },
  { firstName: "Jordan", game: "CS2" },
  { firstName: "Taylor", game: "Fortnite" },
  { firstName: "Morgan", game: "Apex Legends" },
  { firstName: "Casey", game: "League of Legends" },
  { firstName: "Riley", game: "Rocket League" },
  { firstName: "Quinn", game: "Overwatch 2" },
  { firstName: "Avery", game: "Call of Duty" },
  { firstName: "Parker", game: "Minecraft" },
  { firstName: "Sydney", game: "Elden Ring" },
];

const timeAgo = [
  "just now",
  "1 min ago",
  "2 mins ago",
  "3 mins ago",
];

export function LiveActivityToast() {
  const [currentSignup, setCurrentSignup] = useState<{
    name: string;
    game: string;
    time: string;
  } | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const showRandomSignup = useCallback(() => {
    const randomPerson = calgaryNames[Math.floor(Math.random() * calgaryNames.length)];
    const randomTime = timeAgo[Math.floor(Math.random() * timeAgo.length)];
    
    setCurrentSignup({
      name: randomPerson.firstName,
      game: randomPerson.game,
      time: randomTime,
    });
    setIsVisible(true);

    // Hide after 4 seconds
    setTimeout(() => {
      setIsVisible(false);
    }, 4000);
  }, []);

  useEffect(() => {
    // Initial delay before first toast
    const initialDelay = setTimeout(() => {
      showRandomSignup();
    }, 8000);

    // Show a new signup every 15-25 seconds
    const interval = setInterval(() => {
      showRandomSignup();
    }, 15000 + Math.random() * 10000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, [showRandomSignup]);

  // Respect reduced motion preference
  const prefersReducedMotion = typeof window !== "undefined" 
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches 
    : false;

  if (prefersReducedMotion) return null;

  return (
    <AnimatePresence>
      {isVisible && currentSignup && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed bottom-24 md:bottom-6 left-4 z-50 max-w-xs"
        >
          <div className="flex items-center gap-3 px-4 py-3 bg-card/95 backdrop-blur-md border border-border rounded-xl shadow-lg">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Gamepad2 className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {currentSignup.name} from Calgary
              </p>
              <p className="text-xs text-muted-foreground">
                joined {currentSignup.time}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
