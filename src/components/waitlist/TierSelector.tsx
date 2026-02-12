import { motion } from "framer-motion";
import { TierCard } from "./TierCard";
import { tierOptions } from "@/lib/waitlist-validation";

interface TierSelectorProps {
  selectedTier: string | null;
  onSelectTier: (tier: "ludacris" | "esports" | "pro") => void;
}

// Custom CTAs for each tier
const tierCtas: Record<string, string> = {
  ludacris: "Choose Ludacris Mode",
  esports: "Lock in Esports",
  pro: "Go Pro",
};

export function TierSelector({ selectedTier, onSelectTier }: TierSelectorProps) {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Choose your tier
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Select the performance level that matches your gaming ambitions.
            You can always upgrade later.
          </p>
        </motion.div>

        {/* Tier cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tierOptions.map((tier, index) => (
            <TierCard
              key={tier.id}
              id={tier.id}
              name={tier.name}
              tagline={tier.tagline}
              description={tier.description}
              accentColor={tier.accentColor}
              isSelected={selectedTier === tier.id}
              onSelect={() => onSelectTier(tier.id)}
              index={index}
              hasSelection={selectedTier !== null}
              selectCta={tierCtas[tier.id]}
              specsUrl={tier.specsUrl}
              specs={tier.specs}
              price={tier.price}
              originalPrice={tier.originalPrice}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
