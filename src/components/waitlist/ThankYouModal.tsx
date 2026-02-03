import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, Twitter, Facebook, Link } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
  firstName: string;
  queuePosition: number;
  couponCode: string;
}

export function ThankYouModal({
  isOpen,
  onClose,
  firstName,
  queuePosition,
  couponCode,
}: ThankYouModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `I just joined the waitlist for the gaming PC subscription service! 🎮 Check it out:`;

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
    await navigator.clipboard.writeText(shareUrl);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-md bg-card border border-border rounded-3xl p-8 shadow-2xl shadow-primary/20"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Content */}
            <div className="text-center">
              {/* Celebration emoji */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="text-6xl mb-4"
              >
                🎮
              </motion.div>

              {/* Headline */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold text-foreground mb-2"
              >
                You're on the list!
              </motion.h2>

              {/* Personalized message */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-muted-foreground mb-6"
              >
                Thanks, {firstName}! You're{" "}
                <span className="text-primary font-bold">#{queuePosition}</span> in line.
              </motion.p>

              {/* Coupon code box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-primary/10 border-2 border-dashed border-primary rounded-xl p-6 mb-6"
              >
                <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wider">
                  Your 10% discount code
                </p>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-2xl font-mono font-bold text-primary tracking-widest">
                    {couponCode}
                  </span>
                  <button
                    onClick={handleCopyCode}
                    className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
                  >
                    {copied ? (
                      <Check className="w-5 h-5 text-gaming-green" />
                    ) : (
                      <Copy className="w-5 h-5 text-primary" />
                    )}
                  </button>
                </div>
              </motion.div>

              {/* Next steps */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-sm text-muted-foreground mb-6"
              >
                Check your email for your welcome message and coupon code.
              </motion.p>

              {/* Social share buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex items-center justify-center gap-3"
              >
                <span className="text-sm text-muted-foreground">Share:</span>
                <SocialButton onClick={handleTwitterShare} icon={Twitter} />
                <SocialButton onClick={handleFacebookShare} icon={Facebook} />
                <SocialButton onClick={handleCopyLink} icon={Link} />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SocialButton({
  onClick,
  icon: Icon,
}: {
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "p-3 rounded-full transition-all duration-200",
        "bg-secondary/50 hover:bg-primary/20",
        "text-muted-foreground hover:text-primary"
      )}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}
