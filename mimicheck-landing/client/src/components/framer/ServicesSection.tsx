/**
 * ServicesSection Component - Framer-Style Services Overview
 *
 * A section displaying the services overview with badge, headline,
 * subtitle, and scroll-triggered fade-in animations.
 *
 * Requirements: 4.1, 4.2, 4.3, 4.4
 */

import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";

export interface ServicesSectionProps {
  /** Badge text displayed above the headline (default: "Our Services") */
  badge?: string;
  /** Main headline text */
  headline?: string;
  /** Subtitle/description text */
  subtitle?: string;
  /** Additional CSS classes */
  className?: string;
  /** Section ID for navigation */
  id?: string;
}

// Default content per requirements 4.1, 4.2, 4.3
const defaultBadge = "Our Services";
const defaultHeadline =
  "KI-Lösungen die dein Business auf das nächste Level bringen";
const defaultSubtitle =
  "Wir automatisieren deine Förderanträge mit modernster KI-Technologie. Von der Analyse bis zur Einreichung – alles aus einer Hand.";

/**
 * ServicesSection - Services overview with scroll-triggered animations
 */
export default function ServicesSection({
  badge = defaultBadge,
  headline = defaultHeadline,
  subtitle = defaultSubtitle,
  className = "",
  id = "services",
}: ServicesSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  // Animation variants for scroll-triggered reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section
      id={id}
      className={`py-16 sm:py-20 md:py-24 lg:py-32 bg-[var(--framer-bg)] relative overflow-hidden ${className}`}
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--framer-violet-subtle)] to-transparent opacity-30 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={prefersReducedMotion ? undefined : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Badge (Requirement: 4.1) */}
          <motion.div
            variants={prefersReducedMotion ? undefined : itemVariants}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6 rounded-full bg-[var(--framer-violet-subtle)] border border-[var(--framer-border)] backdrop-blur-sm"
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--framer-violet-light)]" />
            <span className="text-xs sm:text-sm font-medium text-[var(--framer-violet-light)]">
              {badge}
            </span>
          </motion.div>

          {/* Headline (Requirement: 4.2) - Responsive font sizes */}
          <motion.h2
            variants={prefersReducedMotion ? undefined : itemVariants}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.1] tracking-tight mb-4 sm:mb-6 px-2 sm:px-0"
          >
            <span className="bg-gradient-to-r from-white via-white to-[var(--framer-text-secondary)] bg-clip-text text-transparent">
              {headline}
            </span>
          </motion.h2>

          {/* Subtitle (Requirement: 4.3) */}
          <motion.p
            variants={prefersReducedMotion ? undefined : itemVariants}
            className="text-base sm:text-lg md:text-xl text-[var(--framer-text-secondary)] max-w-2xl mx-auto leading-relaxed px-2 sm:px-0"
          >
            {subtitle}
          </motion.p>
        </motion.div>
      </div>

      {/* Decorative elements - Hidden on mobile for performance */}
      <div className="hidden md:block absolute top-1/2 left-0 w-48 md:w-64 h-48 md:h-64 bg-[var(--framer-violet)] rounded-full filter blur-[100px] md:blur-[150px] opacity-10 -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="hidden md:block absolute top-1/2 right-0 w-48 md:w-64 h-48 md:h-64 bg-[var(--framer-emerald)] rounded-full filter blur-[100px] md:blur-[150px] opacity-10 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
    </section>
  );
}

// Named export for convenience
export { ServicesSection };
