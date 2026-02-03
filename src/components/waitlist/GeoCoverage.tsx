import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const locations = [
  { name: "Greater Calgary Area", status: "soon" as const },
  { name: "All of Alberta", status: "next" as const },
  { name: "British Columbia", status: "future" as const },
];

export function GeoCoverage() {
  return (
    <section className="py-20 px-6 border-t border-border/50">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Launching soon in Canada
          </h2>
          <p className="text-muted-foreground">
            We're rolling out across the country, starting in Alberta.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line - desktop */}
          <div className="absolute top-6 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent hidden md:block" />

          <div className="space-y-8 md:space-y-0 md:flex md:items-start md:justify-between">
            {locations.map((location, index) => (
              <motion.div
                key={location.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="flex flex-col items-center text-center md:flex-1"
              >
                {/* Pin icon with pulse for first */}
                <div className="relative">
                  <motion.div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center mb-4 z-10 relative",
                      index === 0 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-secondary text-muted-foreground"
                    )}
                    animate={index === 0 ? {
                      boxShadow: [
                        "0 0 0 0 hsl(var(--primary) / 0.4)",
                        "0 0 0 15px hsl(var(--primary) / 0)",
                      ],
                    } : {}}
                    transition={index === 0 ? {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut",
                    } : {}}
                  >
                    <MapPin className="w-5 h-5" />
                  </motion.div>
                </div>

                {/* Location name */}
                <h3 className={cn(
                  "font-semibold mb-1",
                  index === 0 ? "text-foreground" : "text-muted-foreground"
                )}>
                  {location.name}
                </h3>

                {/* Status badge */}
                <span
                  className={cn(
                    "text-xs uppercase tracking-wider px-3 py-1 rounded-full",
                    index === 0 
                      ? "bg-primary/20 text-primary font-medium" 
                      : "bg-secondary text-muted-foreground"
                  )}
                >
                  {location.status === "soon" && "Coming Soon"}
                  {location.status === "next" && "Up Next"}
                  {location.status === "future" && "Future"}
                </span>

                {/* Arrow connector for mobile */}
                {index < locations.length - 1 && (
                  <div className="md:hidden mt-6 text-muted-foreground/50">
                    ↓
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
