import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { UnboundLogo } from "@/components/brand/UnboundLogo";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/how-it-works", label: "How It Works" },
];

export function HowItWorksNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Scroll-aware visibility - hidden at top, slides in on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Escape key to close mobile menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen]);

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Floating mobile menu button when nav is hidden */}
      <AnimatePresence>
        {!isScrolled && !isMobileMenuOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden fixed top-4 right-4 z-50 p-3 bg-background/80 backdrop-blur-sm rounded-full shadow-lg border border-border/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-foreground" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main nav - only renders when scrolled */}
      <AnimatePresence>
        {isScrolled && (
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-lg shadow-black/5"
          >
            <div className="max-w-6xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                {/* Logo with icon */}
                <Link
                  to="/"
                  className="group flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg"
                >
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center justify-center"
                  >
                    <UnboundLogo size={22} className="text-primary group-hover:text-foreground transition-colors duration-200" />
                  </motion.div>
                  <span className="text-xl text-foreground">
                    <span className="font-bold">Unbound</span>
                    <span className="font-normal text-muted-foreground"> · Gaming</span>
                  </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={cn(
                        "relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                        location.pathname === link.href
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                      )}
                    >
                      <span>{link.label}</span>
                      {location.pathname === link.href && (
                        <motion.div
                          layoutId="nav-indicator"
                          className="absolute -bottom-1 left-3 right-3 h-0.5 bg-primary rounded-full"
                          style={{ boxShadow: "0 0 8px hsl(var(--primary) / 0.5)" }}
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>
                  ))}

                  {/* CTA Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="ml-4"
                  >
                    <Button
                      asChild
                      className="glow-pulse-subtle gap-2 px-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      <Link to="/#waitlist-form" className="flex items-center gap-2">
                        <span>Join Waitlist</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </Button>
                  </motion.div>
                </div>

                {/* Mobile Menu Button */}
                <motion.button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-3 -mr-3 rounded-lg hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isMobileMenuOpen ? (
                      <X className="w-6 h-6 text-foreground" />
                    ) : (
                      <Menu className="w-6 h-6 text-foreground" />
                    )}
                  </motion.div>
                </motion.button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile Menu - Full Screen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-background/95 backdrop-blur-lg z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex flex-col"
            >
              {/* Header with logo and close */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border/30">
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="group flex items-center gap-2.5"
                >
                  <UnboundLogo size={22} className="text-primary" />
                  <span className="text-xl text-foreground">
                    <span className="font-bold">Unbound</span>
                    <span className="font-normal text-muted-foreground"> · Gaming</span>
                  </span>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-3 -mr-3 rounded-lg hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6 text-foreground" />
                </button>
              </div>

              {/* Links centered */}
              <nav className="flex-1 flex flex-col items-center justify-center gap-8">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1, duration: 0.3 }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "text-2xl font-medium transition-colors focus:outline-none focus-visible:text-primary",
                        location.pathname === link.href
                          ? "text-primary"
                          : "text-foreground hover:text-primary"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="flex flex-col items-center gap-3 mt-8"
                >
                  <Button
                    asChild
                    size="lg"
                    className="glow-pulse px-8 py-4 text-lg font-semibold"
                  >
                    <Link
                      to="/#waitlist-form"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Join Waitlist
                    </Link>
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    10% off your first 3 months
                  </span>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
