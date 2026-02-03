import { motion } from "framer-motion";

export function TheExperience() {
  return (
    <section className="py-28 md:py-36 px-6 relative overflow-hidden">
      {/* Ambient background gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-radial from-primary/5 to-transparent rounded-full blur-[80px]" />
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/50" />
          <span className="text-xs sm:text-sm uppercase tracking-[0.3em] text-primary font-medium">
            The Experience
          </span>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/50" />
        </motion.div>

        {/* Quote container */}
        <div className="relative">
          {/* Large decorative opening quote */}
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -top-16 -left-4 md:-top-20 md:-left-8 decorative-quote"
            aria-hidden="true"
          >
            "
          </motion.span>

          {/* Quote text */}
          <motion.blockquote
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10 text-xl md:text-2xl lg:text-3xl text-foreground leading-relaxed md:leading-relaxed font-light px-4 md:px-8"
          >
            From first click to first game, the experience should feel{" "}
            <span className="text-primary font-medium">effortless</span>. Minimal 
            decisions. Clear promises. Human support that speaks 'gamer.' Your job 
            is to play; our job is to keep you{" "}
            <span className="text-primary font-medium">current</span>—without 
            drama, delays, or driver roulette.
          </motion.blockquote>

          {/* Large decorative closing quote */}
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -bottom-20 -right-4 md:-bottom-24 md:-right-8 decorative-quote rotate-180"
            aria-hidden="true"
          >
            "
          </motion.span>
        </div>

        {/* Decorative bottom line */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "80px" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="h-1 bg-gradient-to-r from-primary to-primary/30 mx-auto mt-16 rounded-full"
        />
      </div>
    </section>
  );
}
