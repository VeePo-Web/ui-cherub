import { motion } from "framer-motion";

export function WhoItsFor() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold text-foreground mb-8"
        >
          Who it's for{" "}
          <span className="text-muted-foreground font-normal">
            (read this if you value your time)
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground leading-relaxed"
        >
          You want the performance, not the parts-hunt. You want stable frametimes, 
          fast support, and to feel taken care of—with a spend that's predictable 
          every month. You want to be the dependable teammate, not the friend 
          reinstalling drivers on patch day.
        </motion.p>
      </div>
    </section>
  );
}
