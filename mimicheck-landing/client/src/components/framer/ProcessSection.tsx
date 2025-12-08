/**
 * ProcessSection Component - Framer-Style Process Steps Display
 *
 * A section displaying the MimiCheck process in 3 steps with
 * visualizations, dark cards with violet/emerald accents, and
 * hover effects.
 *
 * Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9
 */

import { motion, useReducedMotion } from "framer-motion";
import { Workflow } from "lucide-react";
import ProcessCard from "./ProcessCard";

export interface ProcessStep {
  /** Step number label (e.g., "Step 1") */
  number: string;
  /** Step title */
  title: string;
  /** Step description */
  description: string;
  /** Visualization type for the step */
  visualization: "upload" | "analysis" | "submit";
}

export interface ProcessSectionProps {
  /** Badge text displayed above the headline (default: "Unser Prozess") */
  badge?: string;
  /** Main headline text */
  headline?: string;
  /** Subtitle/description text */
  subtitle?: string;
  /** Process steps to display */
  steps?: ProcessStep[];
  /** Additional CSS classes */
  className?: string;
  /** Section ID for navigation */
  id?: string;
}

// Default content per requirements 6.1, 6.2, 6.3
const defaultBadge = "Unser Prozess";
const defaultHeadline = "Dein Weg zur Förderung in 3 Schritten";
const defaultSubtitle =
  "Von der Dokumenten-Analyse bis zur Antrags-Einreichung – wir begleiten dich durch den gesamten Prozess.";

// Default process steps per requirements 6.5, 6.6, 6.7
const defaultSteps: ProcessStep[] = [
  {
    number: "Step 1",
    title: "Daten hochladen",
    description:
      "Lade deine Dokumente hoch – Gehaltsabrechnungen, Mietvertrag oder andere relevante Unterlagen.",
    visualization: "upload",
  },
  {
    number: "Step 2",
    title: "KI analysiert",
    description:
      "Unsere KI scannt deine Dokumente und findet automatisch passende Förderungen für dich.",
    visualization: "analysis",
  },
  {
    number: "Step 3",
    title: "Antrag absenden",
    description:
      "Dein Antrag wird automatisch ausgefüllt und ist bereit zur Einreichung bei der Behörde.",
    visualization: "submit",
  },
];

/**
 * ProcessSection - Process steps display with scroll-triggered animations
 *
 * Features:
 * - "Unser Prozess" badge (Requirement: 6.1)
 * - "Dein Weg zur Förderung in 3 Schritten" headline (Requirement: 6.2)
 * - Subtitle explaining the approach (Requirement: 6.3)
 * - Horizontal card layout with 3 columns (Requirement: 6.4)
 * - Step visualizations for upload, analysis, submit (Requirements: 6.5, 6.6, 6.7)
 * - Dark cards with violet/emerald borders (Requirement: 6.8)
 * - Hover lift and glow effects (Requirement: 6.9)
 */
export default function ProcessSection({
  badge = defaultBadge,
  headline = defaultHeadline,
  subtitle = defaultSubtitle,
  steps = defaultSteps,
  className = "",
  id = "process",
}: ProcessSectionProps) {
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

  const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
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
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--framer-emerald-subtle)] to-transparent opacity-20 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          className="max-w-4xl mx-auto text-center mb-10 sm:mb-12 md:mb-16"
          variants={prefersReducedMotion ? undefined : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Badge (Requirement: 6.1) */}
          <motion.div
            variants={prefersReducedMotion ? undefined : itemVariants}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6 rounded-full bg-[var(--framer-emerald-subtle)] border border-[var(--framer-border)] backdrop-blur-sm"
          >
            <Workflow className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--framer-emerald-light)]" />
            <span className="text-xs sm:text-sm font-medium text-[var(--framer-emerald-light)]">
              {badge}
            </span>
          </motion.div>

          {/* Headline (Requirement: 6.2) - Responsive font sizes */}
          <motion.h2
            variants={prefersReducedMotion ? undefined : itemVariants}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.1] tracking-tight mb-4 sm:mb-6 px-2 sm:px-0"
          >
            <span className="bg-gradient-to-r from-white via-white to-[var(--framer-text-secondary)] bg-clip-text text-transparent">
              {headline}
            </span>
          </motion.h2>

          {/* Subtitle (Requirement: 6.3) */}
          <motion.p
            variants={prefersReducedMotion ? undefined : itemVariants}
            className="text-base sm:text-lg md:text-xl text-[var(--framer-text-secondary)] max-w-2xl mx-auto leading-relaxed px-2 sm:px-0"
          >
            {subtitle}
          </motion.p>
        </motion.div>

        {/* Process Cards Grid (Requirement: 6.4, 9.3) - Vertical stack on mobile */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-sm sm:max-w-none mx-auto"
          variants={prefersReducedMotion ? undefined : cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={prefersReducedMotion ? undefined : cardVariants}
            >
              <ProcessCard
                number={step.number}
                title={step.title}
                description={step.description}
                visualization={step.visualization}
                accentColor={index === 1 ? "emerald" : "violet"}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Decorative elements - Hidden on mobile for performance */}
      <div className="hidden md:block absolute top-1/4 left-0 w-48 md:w-72 h-48 md:h-72 bg-[var(--framer-violet)] rounded-full filter blur-[120px] md:blur-[180px] opacity-10 -translate-x-1/2 pointer-events-none" />
      <div className="hidden md:block absolute bottom-1/4 right-0 w-48 md:w-72 h-48 md:h-72 bg-[var(--framer-emerald)] rounded-full filter blur-[120px] md:blur-[180px] opacity-10 translate-x-1/2 pointer-events-none" />
    </section>
  );
}

// Named export for convenience
export { ProcessSection };
