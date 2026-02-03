import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { RefreshCw, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HowItWorksTierPreview } from "./HowItWorksTierPreview";

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
      "When your region opens, we prep your rig, verify performance, and hand it over ready to play. From there, we own the lifecycle so you don't have to: annual upgrades scheduled, interim refreshes when releases justify it, and covered repairs with a zero-downtime mindset. (Insurance required.)",
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
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            The three steps
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="space-y-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative"
            >
              {/* Step card */}
              <div className="bg-card/30 backdrop-blur-sm border border-border rounded-2xl p-6 md:p-8">
                {/* Number badge */}
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg mb-4">
                  {step.number}
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {step.description}
                </p>

                {/* Step 1: Tier preview cards */}
                {step.hasContent && (
                  <>
                    <HowItWorksTierPreview />
                    <p className="text-sm text-muted-foreground mt-6 italic">
                      Transparency is a feature: every tier maps to a live PCPartPicker build so you know what's inside before you join.
                    </p>
                  </>
                )}

                {/* Step 2: CTA button */}
                {step.hasCta && (
                  <div className="mt-6 flex flex-col items-start gap-2">
                    <Button asChild className="glow-pulse">
                      <Link to="/#waitlist-form">
                        Join the Waitlist
                      </Link>
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      10% off your first 3 months
                    </span>
                  </div>
                )}

                {/* Step 3: Feature icons */}
                {step.hasIcons && (
                  <div className="flex flex-wrap gap-4 mt-6">
                    {step3Features.map((feature) => (
                      <div
                        key={feature.label}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50"
                      >
                        <feature.icon className="w-4 h-4 text-primary" />
                        <span className="text-sm text-muted-foreground">
                          {feature.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Connector line (except last) */}
              {index < steps.length - 1 && (
                <div className="absolute left-8 top-full w-0.5 h-12 bg-gradient-to-b from-border to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
