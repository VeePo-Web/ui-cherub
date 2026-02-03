import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export function HowItWorksHero() {
  const isMobile = useIsMobile();

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight * 0.8, behavior: "smooth" });
  };

  // Staggered animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const lineVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: {
      width: "100%",
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
      {/* Animated gradient background - GPU accelerated */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-gaming-purple-mid to-background contain-paint">
        <div className="absolute inset-0">
          {/* Primary orb - large, slow float */}
          <motion.div 
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[100px] float will-change-transform gpu-accelerated"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          
          {/* Secondary orb - blue accent */}
          <motion.div 
            className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-gaming-blue/15 rounded-full blur-[80px] float-delayed will-change-transform gpu-accelerated"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          />
          
          {/* Tertiary orb - gold accent (desktop only) */}
          {!isMobile && (
            <motion.div 
              className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-gaming-gold/8 rounded-full blur-[60px] float-slow will-change-transform gpu-accelerated"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
            />
          )}
        </div>
      </div>

      {/* Refined grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Content */}
      <motion.div 
        className="relative z-10 max-w-5xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Section label with decorative elements */}
        <motion.div 
          variants={itemVariants}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/50" />
          <span className="text-xs sm:text-sm uppercase tracking-[0.3em] text-primary font-medium">
            HOW IT WORKS
          </span>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/50" />
        </motion.div>

        {/* Main headline - split for dramatic reveal */}
        <motion.h1 
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-4 leading-[1.1]"
          style={{ textShadow: '0 4px 40px rgba(0,0,0,0.4)' }}
        >
          The{" "}
          <span className="gradient-text-animated">competitive</span>
          {" "}PC
        </motion.h1>
        
        <motion.h1 
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-8 leading-[1.1]"
          style={{ textShadow: '0 4px 40px rgba(0,0,0,0.4)' }}
        >
          that just stays competitive.
        </motion.h1>

        {/* Animated horizontal accent line */}
        <motion.div 
          className="flex justify-center mb-10"
          variants={lineVariants}
        >
          <div className="h-px w-32 md:w-48 bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
        </motion.div>

        {/* Sub-headline */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
        >
          Annual upgrades, covered repairs{" "}
          <span className="text-foreground/70">(insurance required)</span>, and 
          transparent builds—under one predictable monthly plan.
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      {!isMobile && (
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <motion.button
            onClick={scrollToContent}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            aria-label="Scroll to content"
          >
            <span className="text-xs uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
              Explore
            </span>
            <ChevronDown className="w-6 h-6" />
          </motion.button>
        </motion.div>
      )}
    </section>
  );
}
