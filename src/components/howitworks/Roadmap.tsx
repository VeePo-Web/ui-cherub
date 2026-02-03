import { motion } from "framer-motion";
import { BarChart3, FileText, Users, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

const roadmapItems = [
  {
    icon: BarChart3,
    title: "Benchmarks & flagship games",
    description: "FPS/frametime examples added here as soon as they're ready.",
    comingSoon: true,
  },
  {
    icon: FileText,
    title: "Spec Integrity Ledger",
    description: "A public change-log for any parts updates so you can track exactly what changed and why.",
  },
  {
    icon: Users,
    title: "Referral & queue position",
    description: "After signup, see your place in line and ways to move up by inviting friends.",
  },
  {
    icon: Trophy,
    title: "Community flywheel",
    description: "Esports tournaments and sign-ups to build early momentum and social proof.",
  },
];

export function Roadmap() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Roadmap: what you'll see next
          </h2>
          <p className="text-muted-foreground">(building anticipation)</p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

          <div className="space-y-6">
            {roadmapItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex gap-4 md:gap-6"
              >
                {/* Icon container */}
                <div className={cn(
                  "relative z-10 shrink-0 w-12 h-12 rounded-xl flex items-center justify-center",
                  "bg-card border border-border",
                  item.comingSoon && "border-primary/50"
                )}>
                  <item.icon className={cn(
                    "w-5 h-5",
                    item.comingSoon ? "text-primary" : "text-muted-foreground"
                  )} />
                  
                  {/* Pulsing indicator for coming soon */}
                  {item.comingSoon && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 bg-card/30 border border-border rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">
                      {item.title}
                    </h3>
                    {item.comingSoon && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary font-medium">
                        Coming soon
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
