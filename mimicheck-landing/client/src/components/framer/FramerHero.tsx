/**
 * FramerHero Component - Premium Hero Section
 *
 * A Framer-style hero section with animated glow orb, badge,
 * headline with text reveal, and CTA buttons.
 *
 * Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 8.1, 8.2
 */

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowOrb } from "./GlowOrb";

export interface FramerHeroProps {
  /** Badge configuration */
  badge?: {
    label: string;
    text: string;
  };
  /** Main headline text */
  headline?: string;
  /** Subtitle text */
  subtitle?: string;
  /** Primary CTA button */
  primaryCta?: {
    text: string;
    href: string;
  };
  /** Secondary CTA button */
  secondaryCta?: {
    text: string;
    href: string;
  };
  /** Additional CSS classes */
  className?: string;
}

// Default content per requirements
const defaultBadge = {
  label: "Neu",
  text: "Automatische Förder-Erkennung",
};

const defaultHeadline = "Intelligente Förderanträge für moderne Menschen.";
const defaultSubtitle =
  "MimiCheck AI bringt KI-Automatisierung zu deinen Fingerspitzen & vereinfacht Anträge.";

const defaultPrimaryCta = {
  text: "Jetzt starten",
  href: "/auth",
};

const defaultSecondaryCta = {
  text: "Services ansehen",
  href: "#services",
};

/**
 * FramerHero - Premium hero section with animations
 */
export default function FramerHero({
  badge = defaultBadge,
  headline = defaultHeadline,
  subtitle = defaultSubtitle,
  primaryCta = defaultPrimaryCta,
  secondaryCta = defaultSecondaryCta,
  className = "",
}: FramerHeroProps) {
  const prefersReducedMotion = useReducedMotion();

  // Split headline into words for staggered animation
  const headlineWords = headline.split(" ");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section
      className={`relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--framer-bg)] ${className}`}
    >
      {/* Animated Glow Orb Background (Requirements: 2.1, 2.6, 2.7) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <GlowOrb
          size={500}
          color="mixed"
          pulseSpeed={5}
          blur={120}
          showParticles={true}
          particleCount={30}
          className="opacity-70"
        />
      </div>

      {/* Gradient Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--framer-bg)]/50 to-[var(--framer-bg)] pointer-events-none" />

      {/* Content Container */}
      <motion.div
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-5xl"
        variants={prefersReducedMotion ? undefined : containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge (Requirement: 2.2) */}
        <motion.div
          variants={prefersReducedMotion ? undefined : itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-violet-500/10 border border-emerald-500/20 backdrop-blur-sm"
        >
          <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
            <Sparkles className="w-3.5 h-3.5" />
            {badge.label}
          </span>
          <span className="w-px h-4 bg-white/20" />
          <span className="text-sm text-[var(--framer-text-secondary)]">
            {badge.text}
          </span>
        </motion.div>

        {/* Headline with staggered word animation (Requirements: 2.3, 8.1, 8.2, 9.5) */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight mb-4 sm:mb-6"
          variants={prefersReducedMotion ? undefined : itemVariants}
        >
          {headlineWords.map((word, index) => (
            <motion.span
              key={index}
              variants={prefersReducedMotion ? undefined : wordVariants}
              className="inline-block mr-[0.25em]"
            >
              <span
                className={
                  word.toLowerCase().includes("intelligente") ||
                  word.toLowerCase().includes("förderanträge")
                    ? "bg-gradient-to-r from-emerald-400 via-teal-400 to-violet-400 bg-clip-text text-transparent"
                    : "text-white"
                }
              >
                {word}
              </span>
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle (Requirement: 2.4) */}
        <motion.p
          variants={prefersReducedMotion ? undefined : itemVariants}
          className="text-base sm:text-lg md:text-xl text-[var(--framer-text-secondary)] max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2 sm:px-0"
        >
          {subtitle}
        </motion.p>

        {/* CTA Buttons (Requirement: 2.5) - Full-width on mobile per Requirement 9.1 */}
        <motion.div
          variants={prefersReducedMotion ? undefined : itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0"
        >
          {/* Primary CTA - Full-width on mobile */}
          <Button
            asChild
            size="lg"
            className="group w-full sm:w-auto bg-gradient-to-r from-emerald-500 via-teal-500 to-violet-500 hover:from-emerald-400 hover:via-teal-400 hover:to-violet-400 text-white px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-semibold rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:-translate-y-1"
          >
            <a
              href={primaryCta.href}
              className="flex items-center justify-center gap-2"
            >
              {primaryCta.text}
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Button>

          {/* Secondary CTA - Full-width on mobile */}
          <Button
            asChild
            size="lg"
            variant="outline"
            className="group w-full sm:w-auto px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-semibold rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-emerald-500/30 transition-all duration-300"
          >
            <a
              href={secondaryCta.href}
              className="flex items-center justify-center gap-2"
            >
              {secondaryCta.text}
            </a>
          </Button>
        </motion.div>

        {/* Trust Indicators - Responsive layout for mobile */}
        <motion.div
          variants={prefersReducedMotion ? undefined : itemVariants}
          className="mt-10 sm:mt-16 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-[var(--framer-text-muted)]"
        >
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map(i => (
                <div
                  key={i}
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-emerald-500/30 to-teal-500/30 border-2 border-[var(--framer-bg)] flex items-center justify-center text-[10px] sm:text-xs font-bold text-emerald-400"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <span>10.000+ aktive Nutzer</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-white/10" />
          <div className="flex items-center gap-1">
            <span className="text-yellow-400 text-xs sm:text-sm">★★★★★</span>
            <span>4.9/5.0 Bewertung</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-white/10" />
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] sm:text-xs font-medium">
              DSGVO
            </span>
            <span>konform</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--framer-bg)] to-transparent pointer-events-none" />
    </section>
  );
}

// Named export for convenience
export { FramerHero };
