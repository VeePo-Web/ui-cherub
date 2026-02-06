import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { RefreshCw, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HowItWorksTierPreview } from "./HowItWorksTierPreview";
import { useRef } from "react";

const steps = [
  {
    number: 1,
    title: "Pick your performance tier",
    description:
      "Each tier publishes the exact parts list—no vague configs, no down-binning. Choose your outcome; we keep it current.",
    hasContent: true,
  },
  {
    number: 2,
    title: "Join the competitive waitlist",
    description:
      "Lock your launch window and early-adopter incentive. (10% off your first three months.) We'll notify you as we open your region.",
    hasCta: true,
  },
  {
    number: 3,
    title: "Delivery & care",
    description:
      "When your region opens, we prep your rig, verify performance, and hand it over ready to play. From there, we own the lifecycle so you don't have to: annual upgrades scheduled, interim refreshes when releases justify it, and covered repairs with a zero-downtime mindset. (Company-provided insurance included.)",
    hasIcons: true,
  },
];

const step3Features = [
  { icon: RefreshCw, label: "Annual upgrades" },
  { icon: Zap, label: "Interim refreshes" },
  { icon: Shield, label: "Covered repairs" },
];

export function ThreeSteps() {
  return (
    <section className="py-24 md:py-32 px-6 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/30 via-background to-background" />
      
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            The three steps
          </h2>
        </motion.div>

        {/* Steps with timeline */}
        <div className="relative">
          {/* Vertical timeline line - animated */}
          <div className="absolute left-[27px] md:left-[35px] top-0 bottom-0 w-px bg-border/30" />
          
          <div className="space-y-8 md:space-y-12">
            {steps.map((step, index) => (
              <StepCard key={step.number} step={step} index={index} isLast={index === steps.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepCard({ 
  step, 
  index, 
  isLast 
}: { 
  step: typeof steps[0]; 
  index: number;
  isLast: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="relative pl-16 md:pl-24"
    >
      {/* Large background number */}
      <div 
        className="absolute -left-4 md:left-0 top-0 text-[80px] md:text-[120px] font-bold text-primary/[0.04] select-none leading-none pointer-events-none"
        aria-hidden="true"
      >
        0{step.number}
      </div>

      {/* Step number circle on timeline */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.5, delay: index * 0.15 + 0.2, type: "spring" }}
        className="absolute left-0 md:left-2 top-0 w-[54px] h-[54px] md:w-[70px] md:h-[70px] rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30 z-10"
      >
        <span className="text-xl md:text-2xl font-bold text-primary-foreground">
          {step.number}
        </span>
      </motion.div>

      {/* Animated line segment */}
      {!isLast && (
        <motion.div
          initial={{ height: 0 }}
          animate={isInView ? { height: "100%" } : { height: 0 }}
          transition={{ duration: 0.8, delay: index * 0.15 + 0.4 }}
          className="absolute left-[27px] md:left-[35px] top-[54px] md:top-[70px] w-px bg-gradient-to-b from-primary/50 to-transparent"
          style={{ maxHeight: "calc(100% + 2rem)" }}
        />
      )}

      {/* Step card */}
      <motion.div 
        className="glass-card rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 premium-card"
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3 }}
      >
        {/* Title */}
        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-4">
          {step.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-6">
          {step.description}
        </p>

        {/* Step 1: Tier preview cards */}
        {step.hasContent && (
          <>
            <HowItWorksTierPreview />
            <p className="text-sm text-muted-foreground mt-6 italic border-l-2 border-primary/30 pl-4">
              Transparency is a feature: every tier maps to a live PCPartPicker build so you know what's inside before you join.
            </p>
          </>
        )}

        {/* Step 2: CTA button */}
        {step.hasCta && (
          <motion.div 
            className="mt-8 flex flex-col items-start gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button asChild size="lg" className="glow-pulse text-base px-8">
              <Link to="/#waitlist-form">
                Join the Waitlist
              </Link>
            </Button>
            <span className="text-sm text-primary/80 font-medium">
              10% off your first 3 months
            </span>
          </motion.div>
        )}

        {/* Step 3: Feature icons */}
        {step.hasIcons && (
          <div className="flex flex-wrap gap-3 mt-8">
            {step3Features.map((feature, i) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-secondary/50 border border-border/50 hover-spin"
              >
                <feature.icon className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground font-medium">
                  {feature.label}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
