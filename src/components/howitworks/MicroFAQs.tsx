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
      "No. We avoid that language and model. We emphasise performance, trust, reliability, ease, and style.",
  },
  {
    question: "Will I know the exact parts?",
    answer:
      "Yes. Each tier links to a public parts list with model numbers and a change-log.",
  },
  {
    question: "What if a part fails?",
    answer:
      "We act fast per our SLA and handle repairs end-to-end. (Insurance required.)",
  },
  {
    question: "Do you publish benchmarks?",
    answer:
      "Yes—coming soon. We'll add flagship game examples and FPS/frametime charts to this page.",
  },
];

export function MicroFAQs() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Micro-FAQs
          </h2>
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
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card/30 border border-border rounded-xl px-6 overflow-hidden"
              >
                <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
