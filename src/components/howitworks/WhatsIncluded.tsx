import { motion } from "framer-motion";
import { RefreshCw, Shield, FileCheck, ArrowUpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: RefreshCw,
    title: "Annual upgrade plan",
    description: "With interim refresh triggers tied to major releases.",
  },
  {
    icon: Shield,
    title: "Covered repairs",
    description: "Fast turnaround; we handle the workflow end-to-end. (Insurance required.)",
  },
  {
    icon: FileCheck,
    title: "Public parts lists",
    description: "Model numbers visible so you know exactly what's inside.",
  },
  {
    icon: ArrowUpCircle,
    title: "Planned trade-in path",
    description: "Simplify moving up a tier when you're ready.",
  },
];

export function WhatsIncluded() {
  return (
    <section className="py-20 px-6 bg-card/30">
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
            What's included across all tiers
          </h2>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className={cn(
                "bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 text-center",
                "transition-all duration-300 hover:border-primary/30"
              )}
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>

              {/* Title */}
              <h3 className="text-base font-semibold text-foreground mb-2">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
