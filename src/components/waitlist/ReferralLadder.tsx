import { motion } from "framer-motion";
import { Copy, Check, Gift, Users, Star } from "lucide-react";
import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface ReferralLadderProps {
  couponCode: string;
  queuePosition: number;
}

const referralTiers = [
  { referrals: 1, reward: "Jump 10 spots", icon: Users },
  { referrals: 3, reward: "Jump 50 spots", icon: Gift },
  { referrals: 5, reward: "VIP Beta Access", icon: Star, highlight: true },
];

export function ReferralLadder({ couponCode, queuePosition }: ReferralLadderProps) {
  const [copied, setCopied] = useState(false);
  const referralUrl = typeof window !== "undefined" 
    ? `${window.location.origin}?ref=${couponCode}` 
    : "";

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(referralUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [referralUrl]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="mt-6 pt-6 border-t border-border"
    >
      {/* Queue FOMO */}
      <div className="text-center mb-6">
        <p className="text-muted-foreground mb-1">
          You're behind <span className="text-primary font-bold">{Math.max(0, queuePosition - 1)}</span> people in line
        </p>
        <p className="text-foreground font-medium">
          Share to jump ahead!
        </p>
      </div>

      {/* Referral tiers */}
      <div className="space-y-3 mb-6">
        {referralTiers.map((tier, index) => (
          <motion.div
            key={tier.referrals}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + index * 0.1 }}
            className={cn(
              "flex items-center justify-between px-4 py-3 rounded-xl border",
              tier.highlight 
                ? "bg-primary/10 border-primary/30" 
                : "bg-secondary/50 border-border"
            )}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                tier.highlight ? "bg-primary/20" : "bg-secondary"
              )}>
                <tier.icon className={cn(
                  "w-4 h-4",
                  tier.highlight ? "text-primary" : "text-muted-foreground"
                )} />
              </div>
              <span className={cn(
                "text-sm font-medium",
                tier.highlight ? "text-primary" : "text-foreground"
              )}>
                {tier.referrals} referral{tier.referrals > 1 ? "s" : ""}
              </span>
            </div>
            <span className={cn(
              "text-sm",
              tier.highlight ? "text-primary font-semibold" : "text-muted-foreground"
            )}>
              {tier.reward}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Referral link */}
      <div className="bg-secondary/50 rounded-xl p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wider text-center mb-3">
          Your referral link
        </p>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={referralUrl}
            readOnly
            className="flex-1 px-3 py-2 bg-card/50 border border-border rounded-lg text-sm text-muted-foreground truncate"
          />
          <motion.button
            onClick={handleCopyLink}
            className={cn(
              "px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2",
              copied 
                ? "bg-gaming-green/20 text-gaming-green" 
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied!" : "Copy"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
