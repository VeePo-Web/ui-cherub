import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const locations = [
  { name: "Calgary", status: "active", delay: 0 },
  { name: "Alberta", status: "expanding", delay: 0.3 },
  { name: "British Columbia", status: "coming", delay: 0.6 },
];

export function RolloutAvailability() {
  return (
    <section className="py-24 md:py-32 px-6 relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card rounded-3xl p-8 md:p-12 lg:p-16 text-center relative overflow-hidden"
        >
          {/* Decorative gradient border */}
          <div className="absolute inset-0 rounded-3xl gradient-border-animated opacity-30" />
          
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
            className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-primary/10 border border-primary/20 mb-8"
          >
            <MapPin className="w-8 h-8 md:w-10 md:h-10 text-primary" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6"
          >
            Rollout & availability
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto"
          >
            We're opening in the Greater Calgary area, then expanding across 
            Alberta and into British Columbia. Join the waitlist to lock 
            early access in your region.
          </motion.p>

          {/* Location indicators */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {locations.map((location, index) => (
              <motion.div
                key={location.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + location.delay }}
                className="flex items-center gap-3 px-5 py-3 rounded-full bg-card/50 border border-border/50"
              >
                {/* Status indicator */}
                <div className="relative">
                  <div 
                    className={cn(
                      "w-3 h-3 rounded-full",
                      location.status === "active" && "bg-gaming-green",
                      location.status === "expanding" && "bg-gaming-gold",
                      location.status === "coming" && "bg-muted-foreground/50"
                    )}
                  />
                  {location.status === "active" && (
                    <div className="absolute inset-0 w-3 h-3 rounded-full bg-gaming-green pulse-ring" />
                  )}
                </div>
                
                <span 
                  className={cn(
                    "text-sm md:text-base font-medium",
                    location.status === "active" && "text-foreground",
                    location.status === "expanding" && "text-foreground/80",
                    location.status === "coming" && "text-muted-foreground"
                  )}
                >
                  {location.name}
                </span>
                
                {location.status !== "active" && (
                  <span className="text-xs text-muted-foreground/70">
                    {location.status === "expanding" ? "expanding" : "coming soon"}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
