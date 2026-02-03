import { motion } from "framer-motion";

export function WhoItsFor() {
  return (
    <section className="py-28 md:py-36 px-6 relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Decorative quote mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="absolute -top-8 -left-4 md:-left-12 decorative-quote"
          aria-hidden="true"
        >
          "
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
            Who it's for
          </h2>
          <p className="text-lg text-muted-foreground italic">
            (read this if you value your time)
          </p>
        </motion.div>

        {/* Main content - styled as pull quote */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <p className="text-xl md:text-2xl lg:text-3xl text-foreground/90 leading-relaxed md:leading-relaxed font-light">
            You want the{" "}
            <span className="text-primary font-medium">performance</span>, not the 
            parts-hunt. You want stable frametimes, fast support, and to feel{" "}
            <span className="text-foreground font-medium">taken care of</span>—with 
            a spend that's{" "}
            <span className="text-primary font-medium">predictable</span> every 
            month. You want to be the dependable teammate, not the friend 
            reinstalling drivers on patch day.
          </p>
          
          {/* Decorative accent line */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="h-1 bg-gradient-to-r from-primary to-primary/30 mt-10 rounded-full"
          />
        </motion.div>
      </div>
    </section>
  );
}
