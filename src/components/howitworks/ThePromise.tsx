import { motion } from "framer-motion";

export function ThePromise() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 md:p-12"
        >
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">
            The promise{" "}
            <span className="text-muted-foreground font-normal">
              (in plain English)
            </span>
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed">
            We keep your desktop current and reliable all year: scheduled annual 
            upgrades, trigger-based refreshes when major CPUs/components drop, 
            and covered repairs handled end-to-end. The result is predictable 
            performance and a predictable experience. (Insurance required.)
          </p>
        </motion.div>
      </div>
    </section>
  );
}
