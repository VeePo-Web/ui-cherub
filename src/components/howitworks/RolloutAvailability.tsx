import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export function RolloutAvailability() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 text-center"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
            <MapPin className="w-6 h-6 text-primary" />
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
            Rollout & availability
          </h2>

          <p className="text-muted-foreground leading-relaxed">
            We're opening in the Greater Calgary area, then expanding across 
            Alberta and into British Columbia. Join the waitlist to lock 
            early access in your region.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
