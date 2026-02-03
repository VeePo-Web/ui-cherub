import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const locations = [
  { name: "Greater Calgary Area", status: "soon" },
  { name: "All of Alberta", status: "next" },
  { name: "British Columbia", status: "future" },
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
          {/* Connecting line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-border hidden md:block" />

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
                {/* Pin icon */}
                <div
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center mb-4
                    ${index === 0 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-secondary text-muted-foreground"
                    }
                  `}
                >
                  <MapPin className="w-5 h-5" />
                </div>

                {/* Location name */}
                <h3 className="font-semibold text-foreground mb-1">
                  {location.name}
                </h3>

                {/* Status badge */}
                <span
                  className={`
                    text-xs uppercase tracking-wider px-3 py-1 rounded-full
                    ${index === 0 
                      ? "bg-primary/20 text-primary" 
                      : "bg-secondary text-muted-foreground"
                    }
                  `}
                >
                  {location.status === "soon" && "Coming Soon"}
                  {location.status === "next" && "Up Next"}
                  {location.status === "future" && "Future"}
                </span>

                {/* Arrow for desktop */}
                {index < locations.length - 1 && (
                  <div className="hidden md:block absolute top-6 text-muted-foreground" 
                       style={{ left: `${33 * (index + 1)}%`, transform: 'translateX(-50%)' }}>
                    →
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
