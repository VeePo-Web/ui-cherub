import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, MapPin, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const trustBadges = [
  { icon: Shield, label: "Secure" },
  { icon: MapPin, label: "Local" },
  { icon: Eye, label: "Transparent" },
];

export function HowItWorksCTA() {
  return (
    <section className="py-28 md:py-36 px-6 relative overflow-hidden">
      {/* Multi-layered gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-gaming-purple-mid/20" />
      
      {/* Floating orbs at different depths */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px] float"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gaming-blue/10 rounded-full blur-[100px] float-delayed"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
      />
      <motion.div
        className="absolute top-1/2 right-1/3 w-[200px] h-[200px] bg-gaming-gold/8 rounded-full blur-[60px] float-slow"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.6 }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ready to stay{" "}
            <span className="gradient-text-animated">competitive</span>?
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
            Lock your upgrade window and early-access pricing today.
          </p>

          {/* CTA Button group */}
          <div className="flex flex-col items-center gap-4 mb-12">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="relative group"
            >
              <Button 
                asChild 
                size="lg" 
                className="glow-pulse px-10 py-6 text-lg font-semibold relative overflow-hidden"
              >
                <Link to="/#waitlist-form" className="flex items-center gap-3">
                  Join the Waitlist
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                </Link>
              </Button>
            </motion.div>
            
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-sm text-primary font-medium"
            >
              10% off your first 3 months
            </motion.span>
          </div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6 md:gap-8"
          >
            {trustBadges.map((badge, index) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                className="flex items-center gap-2 text-muted-foreground/80"
              >
                <badge.icon className="w-4 h-4 text-primary/70" />
                <span className="text-sm font-medium">{badge.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
