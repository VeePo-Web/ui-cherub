import { motion } from "framer-motion";
import { RefreshCw, Shield, FileCheck, ArrowUpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: RefreshCw,
    title: "Annual upgrade plan",
    description: "With interim refresh triggers tied to major releases.",
    size: "large",
    gradient: "from-primary/20 to-gaming-gold/10",
  },
  {
    icon: Shield,
    title: "Covered repairs",
    description: "Fast turnaround; we handle the workflow end-to-end. (Company-provided insurance included.)",
    size: "small",
    gradient: "from-gaming-blue/20 to-primary/10",
  },
  {
    icon: FileCheck,
    title: "Public parts lists",
    description: "Model numbers visible so you know exactly what's inside.",
    size: "small",
    gradient: "from-gaming-green/20 to-gaming-blue/10",
  },
  {
    icon: ArrowUpCircle,
    title: "Planned trade-in path",
    description: "Simplify moving up a tier when you're ready.",
    size: "small",
    gradient: "from-gaming-gold/20 to-primary/10",
  },
];

export function WhatsIncluded() {
  return (
    <section className="py-24 md:py-32 px-6 bg-gradient-to-b from-card/30 via-card/20 to-background">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            What's included across all tiers
          </h2>
        </motion.div>

        {/* Bento grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              className={cn(
                "group relative overflow-hidden rounded-2xl md:rounded-3xl p-6 md:p-8",
                "bg-card/50 backdrop-blur-sm border border-border/50",
                "premium-card",
                feature.size === "large" && "md:col-span-2 md:row-span-2"
              )}
            >
              {/* Background gradient */}
              <div 
                className={cn(
                  "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                  `bg-gradient-to-br ${feature.gradient}`
                )}
              />
              
              {/* Glow effect on hover */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-[60px] group-hover:bg-primary/15 transition-colors duration-500" />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col">
                {/* Icon */}
                <motion.div 
                  className={cn(
                    "inline-flex items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 mb-6 hover-spin",
                    feature.size === "large" ? "w-16 h-16 md:w-20 md:h-20" : "w-12 h-12 md:w-14 md:h-14"
                  )}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <feature.icon 
                    className={cn(
                      "text-primary",
                      feature.size === "large" ? "w-8 h-8 md:w-10 md:h-10" : "w-6 h-6 md:w-7 md:h-7"
                    )} 
                  />
                </motion.div>

                {/* Title */}
                <h3 
                  className={cn(
                    "font-bold text-foreground mb-3",
                    feature.size === "large" 
                      ? "text-xl md:text-2xl lg:text-3xl" 
                      : "text-lg md:text-xl"
                  )}
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p 
                  className={cn(
                    "text-muted-foreground leading-relaxed",
                    feature.size === "large" ? "text-base md:text-lg" : "text-sm md:text-base"
                  )}
                >
                  {feature.description}
                </p>

                {/* Decorative corner accent for large card */}
                {feature.size === "large" && (
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-primary/10 to-transparent rounded-tl-[100px]" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
