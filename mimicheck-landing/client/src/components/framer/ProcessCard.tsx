/**
 * ProcessCard Component - Individual Process Step Card
 *
 * A card displaying a single process step with step number,
 * title, description, and visualization. Features dark background
 * with violet/emerald border accents and hover effects.
 *
 * Requirements: 6.5, 6.6, 6.7, 6.8, 6.9
 */

import { motion, useReducedMotion } from "framer-motion";
import {
  UploadVisualization,
  AnalysisVisualization,
  SubmitVisualization,
} from "./ProcessVisualizations";

export type VisualizationType = "upload" | "analysis" | "submit";
export type AccentColor = "violet" | "emerald";

export interface ProcessCardProps {
  /** Step number label (e.g., "Step 1") */
  number: string;
  /** Step title */
  title: string;
  /** Step description */
  description: string;
  /** Visualization type for the step */
  visualization: VisualizationType;
  /** Accent color for the card border */
  accentColor?: AccentColor;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Get the appropriate visualization component based on type
 */
function getVisualization(type: VisualizationType) {
  switch (type) {
    case "upload":
      return <UploadVisualization />;
    case "analysis":
      return <AnalysisVisualization />;
    case "submit":
      return <SubmitVisualization />;
    default:
      return <UploadVisualization />;
  }
}

/**
 * Get accent color CSS classes based on color type
 */
function getAccentClasses(color: AccentColor) {
  if (color === "emerald") {
    return {
      border: "border-[var(--framer-emerald)]/30",
      hoverBorder: "hover:border-[var(--framer-emerald)]/60",
      glow: "group-hover:shadow-[0_0_40px_rgba(16,185,129,0.15)]",
      numberBg: "bg-[var(--framer-emerald-subtle)]",
      numberText: "text-[var(--framer-emerald-light)]",
    };
  }
  return {
    border: "border-[var(--framer-violet)]/30",
    hoverBorder: "hover:border-[var(--framer-violet)]/60",
    glow: "group-hover:shadow-[0_0_40px_rgba(139,92,246,0.15)]",
    numberBg: "bg-[var(--framer-violet-subtle)]",
    numberText: "text-[var(--framer-violet-light)]",
  };
}

/**
 * ProcessCard - Individual process step card with visualization
 *
 * Features:
 * - Step number label (Requirement: 6.5, 6.6, 6.7)
 * - Title and description
 * - Dark card with violet/emerald border accent (Requirement: 6.8)
 * - Hover lift and glow effect (Requirement: 6.9)
 * - Step-specific visualizations
 */
export default function ProcessCard({
  number,
  title,
  description,
  visualization,
  accentColor = "violet",
  className = "",
}: ProcessCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const accent = getAccentClasses(accentColor);

  return (
    <motion.div
      className={`group relative h-full ${className}`}
      whileHover={prefersReducedMotion ? undefined : { y: -8 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Card Container (Requirement: 6.8) - Responsive padding */}
      <div
        className={`
          relative h-full p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl
          bg-[var(--framer-bg-card)] 
          border ${accent.border} ${accent.hoverBorder}
          transition-all duration-300 ease-out
          ${accent.glow}
        `}
      >
        {/* Step Number Label - Responsive sizing */}
        <div
          className={`
            inline-flex items-center px-2.5 sm:px-3 py-0.5 sm:py-1 mb-3 sm:mb-4 rounded-full
            ${accent.numberBg} border border-[var(--framer-border)]
          `}
        >
          <span
            className={`text-[10px] sm:text-xs font-semibold uppercase tracking-wider ${accent.numberText}`}
          >
            {number}
          </span>
        </div>

        {/* Visualization Area - Responsive height */}
        <div className="relative h-32 sm:h-36 md:h-40 mb-4 sm:mb-6 rounded-lg sm:rounded-xl overflow-hidden bg-[var(--framer-bg)]/50 border border-[var(--framer-border-subtle)]">
          {getVisualization(visualization)}
        </div>

        {/* Title - Responsive font size */}
        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3 tracking-tight">
          {title}
        </h3>

        {/* Description - Responsive font size */}
        <p className="text-sm sm:text-base text-[var(--framer-text-secondary)] leading-relaxed">
          {description}
        </p>

        {/* Subtle gradient overlay on hover */}
        <div
          className={`
            absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100
            transition-opacity duration-300 pointer-events-none
            bg-gradient-to-t from-${accentColor === "emerald" ? "[var(--framer-emerald)]" : "[var(--framer-violet)]"}/5 to-transparent
          `}
        />
      </div>
    </motion.div>
  );
}

// Named export for convenience
export { ProcessCard };
