import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ExitIntentModalProps {
  onSubmitEmail: (email: string) => void;
  spotsRemaining: number;
}

export function ExitIntentModal({ onSubmitEmail, spotsRemaining }: ExitIntentModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [hasShown, setHasShown] = useState(false);

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    // Only trigger when mouse leaves toward top of page (exit intent)
    if (e.clientY <= 10 && !hasShown) {
      // Check if already dismissed this session
      const dismissed = sessionStorage.getItem("exit-intent-dismissed");
      if (!dismissed) {
        setIsOpen(true);
        setHasShown(true);
      }
    }
  }, [hasShown]);

  useEffect(() => {
    // Only on desktop
    if (window.innerWidth < 768) return;

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [handleMouseLeave]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("exit-intent-dismissed", "true");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      onSubmitEmail(email);
      handleClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-card border-2 border-destructive/50 rounded-2xl p-6 md:p-8 shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-secondary"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Warning icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.1 }}
              className="flex justify-center mb-6"
            >
              <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-destructive" />
              </div>
            </motion.div>

            {/* Content */}
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Wait! Don't miss out
              </h2>
              <p className="text-muted-foreground">
                Only <span className="text-destructive font-bold">{spotsRemaining}</span> Calgary beta spots remaining.
                Lock in your <span className="text-primary font-semibold">10% discount</span> now!
              </p>
            </div>

            {/* Quick signup form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-card/50 border-border focus:border-primary text-center text-lg"
                autoFocus
              />
              <motion.button
                type="submit"
                className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all glow-pulse"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                🎮 SAVE MY SPOT NOW
              </motion.button>
            </form>

            {/* Skip link */}
            <button
              onClick={handleClose}
              className="w-full mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              No thanks, I'll miss out
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
