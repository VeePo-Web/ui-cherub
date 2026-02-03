import { motion } from "framer-motion";

export function TheExperience() {
  return (
    <section className="py-20 px-6 bg-card/30">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-sm uppercase tracking-widest text-primary font-medium mb-8">
            The Experience
          </h2>

          <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed italic">
            "From first click to first game, the experience should feel effortless. 
            Minimal decisions. Clear promises. Human support that speaks 'gamer.' 
            Your job is to play; our job is to keep you current—without drama, 
            delays, or driver roulette."
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}
