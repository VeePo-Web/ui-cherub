import { motion } from "framer-motion";
import { X, Check, Star } from "lucide-react";
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
    <section className="py-24 md:py-32 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/10 to-background" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Why this beats buying once{" "}
            <span className="text-muted-foreground font-normal">(and hoping)</span>
          </h2>
        </motion.div>

        {/* Comparison grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Retail column - appears first, muted */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-card/20 border border-border/50 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10"
          >
            <h3 className="text-sm font-semibold text-muted-foreground mb-6 uppercase tracking-widest">
              Retail
            </h3>
            <p className="text-muted-foreground mb-8 text-base md:text-lg leading-relaxed">
              Retail makes you the project manager. You shoulder upgrade timing, 
              resale, repair costs, and downtime.
            </p>
            <ul className="space-y-4">
              {retailPains.map((pain, index) => (
                <motion.li
                  key={pain}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-4 text-muted-foreground"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center">
                    <X className="w-4 h-4 text-destructive" />
                  </div>
                  <span className="text-base md:text-lg">{pain}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* This plan column - slides in with glow */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className={cn(
              "relative glass-card rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10",
              "border-2 border-primary/30",
              "shadow-[0_0_60px_-10px_hsl(var(--primary)/0.3)]"
            )}
          >
            {/* Recommended badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute -top-4 right-6 flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wide shadow-lg"
            >
              <Star className="w-3 h-3 fill-current" />
              Recommended
            </motion.div>

            <h3 className="text-sm font-semibold text-primary mb-6 uppercase tracking-widest">
              This Plan
            </h3>
            <p className="text-foreground mb-8 text-base md:text-lg leading-relaxed">
              This plan makes us accountable. We publish the parts, schedule the upgrade, 
              and cover repairs under one monthly line item—local, transparent, performance-first.
            </p>
            <ul className="space-y-4">
              {planBenefits.map((benefit, index) => (
                <motion.li
                  key={benefit}
                  initial={{ opacity: 0, x: 20, scale: 0.9 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1, type: "spring" }}
                  className="flex items-center gap-4 text-foreground"
                >
                  <motion.div 
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-gaming-green/20 flex items-center justify-center"
                    whileInView={{ scale: [0, 1.2, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  >
                    <Check className="w-4 h-4 text-gaming-green" />
                  </motion.div>
                  <span className="text-base md:text-lg font-medium">{benefit}</span>
                </motion.li>
              ))}
            </ul>
            
            {/* Corner glow accent */}
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-[80px]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
