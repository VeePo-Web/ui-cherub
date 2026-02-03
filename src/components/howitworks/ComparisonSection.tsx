import { motion } from "framer-motion";
import { X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const retailPains = [
  "You shoulder upgrade timing",
  "You manage resale",
  "You pay repair costs",
  "You absorb downtime",
];

const planBenefits = [
  "We publish the parts",
  "We schedule the upgrade",
  "We cover repairs",
  "One monthly line item",
];

export function ComparisonSection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Why this beats buying once (and hoping)
          </h2>
        </motion.div>

        {/* Comparison grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Retail column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card/30 border border-border rounded-2xl p-6 md:p-8"
          >
            <h3 className="text-lg font-semibold text-muted-foreground mb-6 uppercase tracking-wide">
              Retail
            </h3>
            <p className="text-muted-foreground mb-6">
              Retail makes you the project manager. You shoulder upgrade timing, 
              resale, repair costs, and downtime.
            </p>
            <ul className="space-y-3">
              {retailPains.map((pain, index) => (
                <motion.li
                  key={pain}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3 text-muted-foreground"
                >
                  <X className="w-5 h-5 text-destructive shrink-0" />
                  {pain}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* This plan column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={cn(
              "bg-card/50 border-2 border-primary/30 rounded-2xl p-6 md:p-8",
              "shadow-[0_0_30px_hsl(var(--primary)/0.1)]"
            )}
          >
            <h3 className="text-lg font-semibold text-primary mb-6 uppercase tracking-wide">
              This Plan
            </h3>
            <p className="text-foreground mb-6">
              This plan makes us accountable. We publish the parts, schedule the upgrade, 
              and cover repairs under one monthly line item—local, transparent, performance-first.
            </p>
            <ul className="space-y-3">
              {planBenefits.map((benefit, index) => (
                <motion.li
                  key={benefit}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3 text-foreground"
                >
                  <Check className="w-5 h-5 text-gaming-green shrink-0" />
                  {benefit}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-sm text-muted-foreground italic max-w-2xl mx-auto"
        >
          We avoid "lease," "rental," and "finance" language on purpose—this is a 
          clarity-first model built around performance, trust, and ease.
        </motion.p>
      </div>
    </section>
  );
}
