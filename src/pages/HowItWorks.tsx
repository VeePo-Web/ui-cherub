import { Helmet } from "react-helmet-async";
import { HowItWorksNav } from "@/components/howitworks/HowItWorksNav";
import { HowItWorksHero } from "@/components/howitworks/HowItWorksHero";
import { WhoItsFor } from "@/components/howitworks/WhoItsFor";
import { ThePromise } from "@/components/howitworks/ThePromise";
import { ThreeSteps } from "@/components/howitworks/ThreeSteps";
import { WhatsIncluded } from "@/components/howitworks/WhatsIncluded";
import { ComparisonSection } from "@/components/howitworks/ComparisonSection";
import { RolloutAvailability } from "@/components/howitworks/RolloutAvailability";
import { TheExperience } from "@/components/howitworks/TheExperience";
import { MicroFAQs } from "@/components/howitworks/MicroFAQs";
import { HowItWorksCTA } from "@/components/howitworks/HowItWorksCTA";
import { ComplianceFooter } from "@/components/howitworks/ComplianceFooter";

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How It Works — Connor Computer",
  "description": "Pick a tier. Join the waitlist. We deliver and keep you current with annual upgrades, trigger-based refreshes, and covered repairs.",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Pick a Tier",
      "text": "Choose Ludacris, Esports, or Pro and review the public parts list."
    },
    {
      "@type": "HowToStep",
      "name": "Join the Waitlist",
      "text": "Lock your launch window and early-adopter incentive in your region."
    },
    {
      "@type": "HowToStep",
      "name": "Delivery & Care",
      "text": "We deliver ready-to-play and handle upgrades and covered repairs (insurance required)."
    }
  ],
  "areaServed": {
    "@type": "AdministrativeArea",
    "name": "Greater Calgary, Alberta, Canada"
  },
  "inLanguage": "en-CA"
};

export default function HowItWorks() {
  return (
    <>
      <Helmet>
        <title>How It Works — Always-current gaming performance with yearly upgrades & covered repairs (Calgary)</title>
        <meta 
          name="description" 
          content="See how our three-tier monthly plan keeps your desktop competitive: annual upgrades, trigger-based refreshes, covered repairs (insurance required), and public parts lists. Join the waitlist for early access in the Greater Calgary area." 
        />
        <meta 
          name="keywords" 
          content="gaming PC subscription, Calgary gaming computer, PC upgrade plan, gaming desktop rental, covered repairs, annual upgrades"
        />
        <link rel="canonical" href={window.location.href} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="How It Works — Connor Computer" />
        <meta property="og:description" content="Annual upgrades, covered repairs, and transparent builds—under one predictable monthly plan." />
        
        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify(jsonLdSchema)}
        </script>
      </Helmet>

      <main className="min-h-screen bg-background">
        <HowItWorksNav />
        <HowItWorksHero />
        
        {/* Apply content-visibility to below-fold sections for faster LCP */}
        <div className="content-visibility-auto">
          <WhoItsFor />
        </div>
        <div className="content-visibility-auto">
          <ThePromise />
        </div>
        <div className="content-visibility-auto">
          <ThreeSteps />
        </div>
        <div className="content-visibility-auto">
          <WhatsIncluded />
        </div>
        <div className="content-visibility-auto">
          <ComparisonSection />
        </div>
        <div className="content-visibility-auto">
          <RolloutAvailability />
        </div>
        <div className="content-visibility-auto">
          <TheExperience />
        </div>
        <div className="content-visibility-auto">
          <MicroFAQs />
        </div>
        <div className="content-visibility-auto">
          <HowItWorksCTA />
        </div>
        <ComplianceFooter />
      </main>
    </>
  );
}
