import { motion } from "framer-motion";

export function ComplianceFooter() {
  return (
    <section className="py-8 px-6 border-t border-border">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
            Compliance
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            All repairs are covered under the plan; insurance is required. Yearly upgrades 
            apply to gaming desktops; interim refreshes follow major CPU/component releases. 
            Full terms, response times, and swap/loaner policies will be published in a short, 
            readable SLA at launch.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
