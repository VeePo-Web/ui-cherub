import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, Gamepad2, Mail, Phone, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { SaveCodeActions } from "./SaveCodeActions";
import { Separator } from "@/components/ui/separator";

interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
  firstName: string;
  queuePosition: number;
  couponCode: string;
  selectedTier?: string;
  emailSent?: boolean;
  email?: string;
}

export function ThankYouModal({
  isOpen,
  onClose,
  firstName,
  queuePosition,
  couponCode,
  selectedTier,
  emailSent = true,
  email,
}: ThankYouModalProps) {
  const [copied, setCopied] = useState(false);
  const [displayPosition, setDisplayPosition] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== "undefined" 
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches 
    : false;

  // Animate queue position counter with proper cleanup
  useEffect(() => {
    if (!isOpen) {
      setDisplayPosition(1);
      return;
    }

    // Trigger confetti only if user doesn't prefer reduced motion
    if (!prefersReducedMotion) {
      setShowConfetti(true);
      const confettiTimeout = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(confettiTimeout);
    }
  }, [isOpen, prefersReducedMotion]);

  // Separate effect for counter animation with proper cleanup
  useEffect(() => {
    if (!isOpen || queuePosition <= 1) {
      setDisplayPosition(queuePosition || 1);
      return;
    }

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Small delay before starting counter for better visual effect
    const startDelay = setTimeout(() => {
      const duration = 800;
      const steps = 20;
      const increment = queuePosition / steps;
      let current = 1;

      intervalRef.current = setInterval(() => {
        current += increment;
        if (current >= queuePosition) {
          setDisplayPosition(queuePosition);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        } else {
          setDisplayPosition(Math.floor(current));
        }
      }, duration / steps);
    }, 300);

    // Proper cleanup
    return () => {
      clearTimeout(startDelay);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isOpen, queuePosition]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(couponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [couponCode]);

  // Calculate percentile for dopamine hit
  const percentile = Math.min(99, Math.floor((1 - (queuePosition / 500)) * 100));

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md overflow-y-auto"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="thank-you-title"
        >
          {/* Confetti effect - reduced count and optimized for performance */}
          {showConfetti && !prefersReducedMotion && (
            <div className="fixed inset-0 pointer-events-none overflow-hidden contain-paint">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    opacity: 1,
                    x: "50vw",
                    y: "50vh",
                    scale: 0,
                  }}
                  animate={{
                    opacity: [1, 1, 0],
                    x: `${Math.random() * 100}vw`,
                    y: `${Math.random() * 100}vh`,
                    scale: [0, 1, 0.5],
                    rotate: Math.random() * 720,
                  }}
                  transition={{
                    duration: 1.5 + Math.random() * 0.5,
                    ease: "easeOut",
                  }}
                  className={cn(
                    "absolute w-2 h-2 rounded-sm will-change-transform",
                    i % 3 === 0 && "bg-primary",
                    i % 3 === 1 && "bg-gaming-gold",
                    i % 3 === 2 && "bg-gaming-blue"
                  )}
                />
              ))}
            </div>
          )}

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-card border border-border rounded-2xl p-6 md:p-8 shadow-2xl my-8"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-secondary min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Gaming icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.1 }}
              className="flex justify-center mb-6"
            >
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <Gamepad2 className="w-8 h-8 text-primary" />
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-6"
            >
              <h2 id="thank-you-title" className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                You're locked in!
              </h2>
              <p className="text-muted-foreground">
                Thanks, <span className="text-foreground font-medium">{firstName}</span>! 
                You're <span className="text-primary font-bold">#{displayPosition}</span> in the Calgary queue.
              </p>
              
              {/* "You beat others" dopamine hit */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-gaming-gold/10 border border-gaming-gold/30 rounded-full text-sm"
              >
                <Trophy className="w-4 h-4 text-gaming-gold" />
                <span className="text-gaming-gold font-medium">
                  You joined before {percentile}% of Calgary gamers!
                </span>
              </motion.div>
            </motion.div>

            {/* Coupon box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-4"
            >
              <p className="text-xs text-muted-foreground uppercase tracking-wider text-center mb-3">
                Your 10% discount code <span className="text-primary">(first 3 months)</span>
              </p>
              <div className="relative bg-primary/10 border-2 border-dashed border-primary/40 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <code className="text-2xl md:text-3xl font-mono font-bold text-primary tracking-widest">
                    {couponCode}
                  </code>
                  <button
                    onClick={handleCopy}
                    className={cn(
                      "p-2 rounded-lg transition-all duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center",
                      copied
                        ? "bg-gaming-green/20 text-gaming-green"
                        : "bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground"
                    )}
                    aria-label={copied ? "Copied!" : "Copy coupon code"}
                  >
                    {copied ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Valid for your first 3 months. First 100 users get an extra 5% at launch!
                </p>
              </div>
              
              {/* Save code actions */}
              {email && (
                <SaveCodeActions
                  couponCode={couponCode}
                  email={email}
                  queuePosition={queuePosition}
                  selectedTier={selectedTier || ""}
                  firstName={firstName}
                  emailAlreadySent={emailSent}
                />
              )}
            </motion.div>
            
            <Separator className="my-4" />

            {/* What happens next - clear steps with timeline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-xs text-muted-foreground uppercase tracking-wider text-center mb-3">
                What happens next
              </p>
              <div className="relative space-y-0">
                {/* Timeline connector line */}
                <div className="absolute left-3 top-3 bottom-3 w-px bg-border" aria-hidden="true" />
                
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55 }}
                  className="flex items-center gap-3 text-sm relative py-2"
                >
                  <div className="w-6 h-6 rounded-full bg-gaming-green/20 flex items-center justify-center flex-shrink-0 z-10">
                    <Check className="w-3 h-3 text-gaming-green" />
                  </div>
                  <span className="text-foreground font-medium">You're on the list!</span>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center gap-3 text-sm relative py-2"
                >
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 z-10",
                    emailSent ? "bg-gaming-green/20" : "bg-secondary"
                  )}>
                    <Mail className={cn("w-3 h-3", emailSent ? "text-gaming-green" : "text-muted-foreground")} />
                  </div>
                  <span className={emailSent ? "text-foreground" : "text-muted-foreground"}>
                    {emailSent ? "Check your email (confirmation incoming)" : `Code saved: ${couponCode}`}
                  </span>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.65 }}
                  className="flex items-center gap-3 text-sm relative py-2"
                >
                  <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 z-10">
                    <Phone className="w-3 h-3 text-muted-foreground" />
                  </div>
                  <span className="text-muted-foreground">We'll text you when Calgary goes live</span>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center gap-3 text-sm relative py-2"
                >
                  <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 z-10">
                    <Gamepad2 className="w-3 h-3 text-muted-foreground" />
                  </div>
                  <span className="text-muted-foreground">First access + 10% off (first 3 months) guaranteed</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
