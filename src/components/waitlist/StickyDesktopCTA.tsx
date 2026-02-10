import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UnboundLogo } from "@/components/brand/UnboundLogo";

interface StickyDesktopCTAProps {
  spotsRemaining: number;
  onCtaClick: () => void;
}

export function StickyDesktopCTA({ spotsRemaining, onCtaClick }: StickyDesktopCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (approximately 100vh)
      const scrolled = window.scrollY > window.innerHeight * 0.8;
      setIsVisible(scrolled);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed top-0 left-0 right-0 z-50 hidden md:block"
        >
          <div className="bg-card/95 backdrop-blur-md border-b border-border px-6 py-3">
            <div className="max-w-5xl mx-auto flex items-center justify-between">
              {/* Left: Brand */}
              <div className="flex items-center gap-3">
                <UnboundLogo size={20} className="text-primary" />
                <span className="text-foreground"><span className="font-bold">Unbound</span><span className="font-normal text-muted-foreground"> · Gaming</span></span>
              </div>

              {/* Center: Spots info */}
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">
                  <span className="text-foreground font-bold">{spotsRemaining}</span> Calgary spots left
                </span>
              </div>

              {/* Right: CTA */}
              <motion.button
                onClick={onCtaClick}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-semibold text-sm shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join the waitlist - 10% discount
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
