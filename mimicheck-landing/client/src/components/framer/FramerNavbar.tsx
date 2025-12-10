/**
 * FramerNavbar Component - Premium Navigation Header
 *
 * A Framer-style navigation bar with scroll-based background transition,
 * mobile hamburger menu, and premium styling.
 *
 * Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6
 */

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

export interface MenuItem {
  label: string;
  href: string;
}

export interface FramerNavbarProps {
  /** Logo image source */
  logo?: string;
  /** Logo alt text */
  logoAlt?: string;
  /** Brand name displayed next to logo */
  brandName?: string;
  /** Navigation menu items */
  menuItems?: MenuItem[];
  /** CTA button text */
  ctaText?: string;
  /** CTA button href */
  ctaHref?: string;
  /** Additional CSS classes */
  className?: string;
}

// Default menu items per requirements
const defaultMenuItems: MenuItem[] = [
  { label: "Home", href: "/" },
  { label: "Über uns", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Kontakt", href: "/contact" },
];

/**
 * FramerNavbar - Premium navigation with scroll effects and mobile menu
 */
export default function FramerNavbar({
  logo = "/mimicheck-logo-nav.png",
  logoAlt = "MimiCheck Logo",
  brandName = "MimiCheck",
  menuItems = defaultMenuItems,
  ctaText = "Jetzt starten",
  ctaHref = "/auth",
  className = "",
}: FramerNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Handle scroll-based background transition (Requirements: 7.4, 7.5)
  const handleScroll = useCallback(() => {
    if (typeof window !== "undefined") {
      setIsScrolled(window.scrollY > 50);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial scroll position
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Close mobile menu on escape key
  useEffect(() => {
    if (typeof document === "undefined") return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Animation variants
  const navVariants = {
    transparent: {
      backgroundColor: "rgba(10, 10, 10, 0)",
      backdropFilter: "blur(0px)",
      borderBottomColor: "rgba(255, 255, 255, 0)",
    },
    solid: {
      backgroundColor: "rgba(10, 10, 10, 0.95)",
      backdropFilter: "blur(12px)",
      borderBottomColor: "rgba(255, 255, 255, 0.1)",
    },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const menuItemVariants = {
    closed: { opacity: 0, x: 20 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1 + 0.2,
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  return (
    <>
      {/* Skip to Content Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--framer-violet)] focus:text-white focus:rounded-md"
      >
        Zum Hauptinhalt springen
      </a>

      {/* Main Navigation (Requirements: 7.1, 7.2, 7.3, 7.4, 7.5) */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 border-b ${className}`}
        initial="transparent"
        animate={isScrolled ? "solid" : "transparent"}
        variants={prefersReducedMotion ? undefined : navVariants}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          backgroundColor: isScrolled
            ? "rgba(10, 10, 10, 0.95)"
            : "transparent",
          backdropFilter: isScrolled ? "blur(12px)" : "none",
          borderBottomColor: isScrolled
            ? "rgba(255, 255, 255, 0.1)"
            : "transparent",
        }}
        aria-label="Hauptnavigation"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo (Requirement: 7.1) */}
            <a
              href="/"
              className="flex items-center gap-3 hover:opacity-90 transition-opacity group"
            >
              <img
                src={logo}
                alt={logoAlt}
                className="h-9 md:h-10 w-auto object-contain"
              />
              <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-violet-400 bg-clip-text text-transparent">
                {brandName}
              </span>
            </a>

            {/* Desktop Navigation (Requirement: 7.2) */}
            <div className="hidden md:flex items-center gap-8">
              {menuItems.map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-[var(--framer-text-secondary)] hover:text-white transition-colors duration-200"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Desktop CTA Button & Language Switcher (Requirement: 7.3) */}
            <div className="hidden md:flex items-center gap-4">
              <LanguageSwitcher />
              <Button
                asChild
                className="bg-gradient-to-r from-emerald-500 via-teal-500 to-violet-500 hover:from-emerald-400 hover:via-teal-400 hover:to-violet-400 text-white px-5 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:-translate-y-0.5"
              >
                <a href={ctaHref} className="flex items-center gap-2">
                  {ctaText}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
            </div>

            {/* Mobile Menu Button (Requirement: 7.6) */}
            <button
              type="button"
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-white hover:bg-white/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay (Requirement: 7.6) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Slide-in Menu Panel */}
            <motion.div
              id="mobile-menu"
              className="fixed top-0 right-0 bottom-0 z-50 w-[280px] bg-[var(--framer-bg)] border-l border-[var(--framer-border)] md:hidden"
              variants={prefersReducedMotion ? undefined : mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation"
            >
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-[var(--framer-border)]">
                <span className="text-lg font-bold text-white">
                  {brandName}
                </span>
                <button
                  type="button"
                  className="flex items-center justify-center w-10 h-10 rounded-lg text-white hover:bg-white/10 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Menü schließen"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Mobile Menu Items */}
              <nav className="p-4" aria-label="Mobile Navigation">
                <ul className="space-y-2">
                  {menuItems.map((item, index) => (
                    <li key={item.href}>
                      <motion.a
                        href={item.href}
                        custom={index}
                        variants={
                          prefersReducedMotion ? undefined : menuItemVariants
                        }
                        initial="closed"
                        animate="open"
                        className="block py-3 px-4 text-base font-medium text-[var(--framer-text-secondary)] hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </motion.a>
                    </li>
                  ))}
                </ul>

                {/* Mobile Language Switcher */}
                <motion.div
                  className="mt-4 pt-4 border-t border-[var(--framer-border)]"
                  custom={menuItems.length}
                  variants={prefersReducedMotion ? undefined : menuItemVariants}
                  initial="closed"
                  animate="open"
                >
                  <div className="px-4 py-2">
                    <p className="text-xs text-gray-500 uppercase mb-2">
                      Sprache / Language
                    </p>
                    <LanguageSwitcher />
                  </div>
                </motion.div>

                {/* Mobile CTA Button */}
                <motion.div
                  className="mt-4 pt-4 border-t border-[var(--framer-border)]"
                  custom={menuItems.length + 1}
                  variants={prefersReducedMotion ? undefined : menuItemVariants}
                  initial="closed"
                  animate="open"
                >
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-violet-500 hover:from-emerald-400 hover:via-teal-400 hover:to-violet-400 text-white py-3 rounded-lg font-medium"
                  >
                    <a
                      href={ctaHref}
                      className="flex items-center justify-center gap-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {ctaText}
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </Button>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// Named export for convenience
export { FramerNavbar };
