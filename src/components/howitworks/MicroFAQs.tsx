import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is this a lease or rental?",
    answer:
      "Think of it as a performance partnership. You pay one predictable monthly fee and we take care of everything—from day-one setup to annual upgrades to covered repairs. No hidden costs, no depreciation headaches, no obsolescence anxiety. Just always-current hardware that keeps you competitive, month after month.",
  },
  {
    question: "Will I know the exact parts?",
    answer:
      "Absolutely—we believe in radical transparency. Every tier includes a public parts list with exact model numbers, so you know precisely what's powering your gaming. When we make any upgrade or swap, it's documented in our public change-log with full reasoning. No mystery boxes, no corners cut. You see exactly what you're getting, always.",
  },
  {
    question: "What if a part fails?",
    answer:
      "We've got you covered—literally. If something fails, you contact us and we handle the rest: diagnosis, parts, labour, and logistics. Our goal is minimal downtime so you're back to gaming fast. That's why we require insurance as part of the plan—it ensures rapid, no-excuses coverage for hardware issues. You focus on playing; we focus on keeping you running.",
  },
  {
    question: "Do you publish benchmarks?",
    answer:
      "We're building comprehensive benchmark data for every tier—real-world FPS and frametime results across flagship titles so you can see exactly how your rig performs. Waitlist members will be the first to access these results. Want to help shape what games we test? Join the waitlist and let us know your must-play titles.",
  },
];

export function MicroFAQs() {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Quick answers
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Common questions, straight talk
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="glass-card border border-border/50 rounded-2xl px-6 overflow-hidden data-[state=open]:border-primary/30 data-[state=open]:shadow-[0_0_30px_-10px_hsl(var(--primary)/0.3)] transition-all duration-300"
                >
                  <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline py-6 text-base md:text-lg font-medium [&[data-state=open]>svg]:rotate-180 [&>svg]:transition-transform [&>svg]:duration-300">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 text-base leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
