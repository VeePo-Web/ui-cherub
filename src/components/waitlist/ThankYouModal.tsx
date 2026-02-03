import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, Twitter, Facebook, Link2, Gamepad2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
  firstName: string;
  queuePosition: number;
  couponCode: string;
  selectedTier?: string;
  emailSent?: boolean;
}

export function ThankYouModal({
  isOpen,
  onClose,
  firstName,
  queuePosition,
  couponCode,
  selectedTier,
  emailSent = true,
}: ThankYouModalProps) {
  const [copied, setCopied] = useState(false);
  const [displayPosition, setDisplayPosition] = useState(1); // Start at 1 to avoid showing #0
  const [showConfetti, setShowConfetti] = useState(false);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== "undefined" 
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches 
    : false;

  // Animate queue position counter
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

  // Separate effect for counter animation
  useEffect(() => {
    if (!isOpen || queuePosition <= 1) {
      setDisplayPosition(queuePosition || 1);
      return;
    }

    // Small delay before starting counter for better visual effect
    const startDelay = setTimeout(() => {
      const duration = 800;
      const steps = 20;
      const increment = queuePosition / steps;
      let current = 1;

      const interval = setInterval(() => {
        current += increment;
        if (current >= queuePosition) {
          setDisplayPosition(queuePosition);
          clearInterval(interval);
        } else {
          setDisplayPosition(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }, 300);

    return () => clearTimeout(startDelay);
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

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  
  // Personalized share text with tier
  const tierName = selectedTier 
    ? selectedTier.charAt(0).toUpperCase() + selectedTier.slice(1) 
    : "";
  const shareText = selectedTier
    ? `I just locked in the ${tierName} tier for a gaming PC subscription! 🎮 I'm #${queuePosition} in line. Get 10% off with code ${couponCode}`
    : `I just joined the waitlist for a gaming PC subscription! 🎮 Get 10% off with code ${couponCode}`;

  const handleTwitterShare = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  const handleFacebookShare = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${shareUrl}?ref=${couponCode}`);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="thank-you-title"
        >
          {/* Confetti effect - reduced count for performance */}
          {showConfetti && !prefersReducedMotion && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(25)].map((_, i) => (
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
                    duration: 2 + Math.random(),
                    ease: "easeOut",
                  }}
                  className={cn(
                    "absolute w-3 h-3 rounded-sm will-change-transform",
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
            className="relative w-full max-w-md bg-card border border-border rounded-2xl p-6 md:p-8 shadow-2xl"
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
            </motion.div>

            {/* Coupon box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-6"
            >
              <p className="text-xs text-muted-foreground uppercase tracking-wider text-center mb-3">
                Your 10% discount code
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
              </div>
            </motion.div>

            {/* Email reminder - with fallback */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center text-sm text-muted-foreground mb-6"
            >
              {emailSent 
                ? "Check your email for your welcome message and coupon code."
                : `Your discount code is ${couponCode}. Save it now!`
              }
            </motion.p>

            {/* Divider */}
            <div className="border-t border-border my-6" />

            {/* Share section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <p className="text-sm text-muted-foreground mb-4">
                Share & move up the queue
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handleTwitterShare}
                  className="p-3 rounded-xl bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-all hover:scale-105 min-w-[44px] min-h-[44px]"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </button>
                <button
                  onClick={handleFacebookShare}
                  className="p-3 rounded-xl bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-all hover:scale-105 min-w-[44px] min-h-[44px]"
                  aria-label="Share on Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </button>
                <button
                  onClick={handleCopyLink}
                  className="p-3 rounded-xl bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-all hover:scale-105 min-w-[44px] min-h-[44px]"
                  aria-label="Copy share link"
                >
                  <Link2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
