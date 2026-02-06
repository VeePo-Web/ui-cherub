import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export function ThePromise() {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden"
        >
          {/* Animated gradient border effect */}
          <div className="absolute inset-0 rounded-3xl gradient-border-animated opacity-50" />
          
          {/* Background glow */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
          
          {/* Content */}
          <div className="relative z-10">
            {/* Icon and header */}
            <div className="flex items-start gap-4 mb-8">
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
                className="flex-shrink-0 w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center"
              >
                <Shield className="w-7 h-7 text-primary" />
              </motion.div>
              
              <div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                  The promise
                </h2>
                <p className="text-muted-foreground text-lg mt-1">
                  (in plain English)
                </p>
              </div>
            </div>

            {/* Promise content with highlighted terms */}
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed md:leading-relaxed">
              We keep your desktop{" "}
              <span className="text-foreground font-semibold">current</span> and{" "}
              <span className="text-foreground font-semibold">reliable</span> all 
              year: scheduled annual upgrades, trigger-based refreshes when major 
              CPUs/components drop, and covered repairs handled end-to-end. The 
              result is{" "}
              <span className="text-primary font-semibold">predictable performance</span>{" "}
              and a{" "}
              <span className="text-primary font-semibold">predictable experience</span>.
            </p>
            
            {/* Insurance note - styled subtly */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-sm text-muted-foreground/70 mt-6 flex items-center gap-2"
            >
              <span className="w-1 h-1 rounded-full bg-primary/50" />
              Company-provided insurance included for repair coverage
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
