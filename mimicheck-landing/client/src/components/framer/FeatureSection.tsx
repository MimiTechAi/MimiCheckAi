/**
 * FeatureSection Component - Framer-Style Feature Display
 *
 * A section displaying individual features with UI mockups in an
 * alternating layout (left/right positioning). Includes category
 * badge, headline, description, and feature tags.
 *
 * Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6
 */

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { TaskListMockup } from "./TaskListMockup";
import { ChatMockup } from "./ChatMockup";
import { FormFillMockup } from "./FormFillMockup";

export type MockupType = "task-list" | "chat" | "form-fill";

export interface FeatureSectionProps {
  /** Category badge text (e.g., "Förder-Analyse") */
  badge: string;
  /** Main headline text */
  headline: string;
  /** Feature description text */
  description: string;
  /** Feature tags displayed as pill buttons */
  tags: string[];
  /** Position of the mockup: 'left' or 'right' */
  mockupPosition: "left" | "right";
  /** Type of mockup to display */
  mockupType: MockupType;
  /** Custom mockup component (optional, overrides mockupType) */
  customMockup?: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Section ID for navigation */
  id?: string;
}

/**
 * Get the appropriate mockup component based on type
 */
function getMockupComponent(type: MockupType): ReactNode {
  switch (type) {
    case "task-list":
      return <TaskListMockup />;
    case "chat":
      return <ChatMockup />;
    case "form-fill":
      return <FormFillMockup />;
    default:
      return <TaskListMockup />;
  }
}

/**
 * FeatureSection - Feature display with alternating mockup layout
 *
 * Features:
 * - Grid layout with mockup and text columns
 * - Support for left/right mockup positioning
 * - Category badge above headline
 * - Pill buttons for feature tags
 * - Scroll-triggered animations
 * - Hover effects on mockup
 */
export default function FeatureSection({
  badge,
  headline,
  description,
  tags,
  mockupPosition,
  mockupType,
  customMockup,
  className = "",
  id,
}: FeatureSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const textVariants = {
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

  const mockupVariants = {
    hidden: {
      opacity: 0,
      x: mockupPosition === "left" ? -50 : 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.3 + i * 0.05,
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  // Get mockup component
  const mockupContent = customMockup ?? getMockupComponent(mockupType);

  // Determine grid order based on mockup position
  const mockupOrder = mockupPosition === "left" ? "order-1" : "order-2";
  const textOrder = mockupPosition === "left" ? "order-2" : "order-1";

  return (
    <section
      id={id}
      className={`py-12 sm:py-16 md:py-20 lg:py-24 bg-[var(--framer-bg)] relative overflow-hidden ${className}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center"
          variants={prefersReducedMotion ? undefined : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Mockup Column - Always first on mobile (stacked above text) per Requirement 9.2 */}
          <motion.div
            className={`order-1 lg:${mockupOrder}`}
            variants={prefersReducedMotion ? undefined : mockupVariants}
          >
            <div className="max-w-sm sm:max-w-md mx-auto lg:max-w-none">
              {mockupContent}
            </div>
          </motion.div>

          {/* Text Content Column - Always second on mobile */}
          <motion.div
            className={`order-2 lg:${textOrder} flex flex-col text-center lg:text-left`}
            variants={prefersReducedMotion ? undefined : textVariants}
          >
            {/* Category Badge (Requirement: 5.5) */}
            <motion.div
              variants={prefersReducedMotion ? undefined : textVariants}
              className="inline-flex items-center self-center lg:self-start px-3 py-1.5 mb-4 rounded-full bg-[var(--framer-violet-subtle)] border border-[var(--framer-border)]"
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--framer-violet-light)]">
                {badge}
              </span>
            </motion.div>

            {/* Headline - Reduced font sizes on mobile per Requirement 9.5 */}
            <motion.h3
              variants={prefersReducedMotion ? undefined : textVariants}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight mb-3 sm:mb-4"
            >
              <span className="bg-gradient-to-r from-white to-[var(--framer-text-secondary)] bg-clip-text text-transparent">
                {headline}
              </span>
            </motion.h3>

            {/* Description */}
            <motion.p
              variants={prefersReducedMotion ? undefined : textVariants}
              className="text-sm sm:text-base md:text-lg text-[var(--framer-text-secondary)] leading-relaxed mb-4 sm:mb-6"
            >
              {description}
            </motion.p>

            {/* Feature Tags (Requirement: 5.6) - Centered on mobile */}
            <motion.div
              className="flex flex-wrap gap-2 justify-center lg:justify-start"
              variants={prefersReducedMotion ? undefined : containerVariants}
            >
              {tags.map((tag, index) => (
                <motion.span
                  key={tag}
                  custom={index}
                  variants={prefersReducedMotion ? undefined : tagVariants}
                  className="inline-flex items-center px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium bg-slate-800/60 text-slate-300 border border-slate-700/50 hover:border-[var(--framer-violet)]/50 hover:text-white transition-all duration-200 cursor-default"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle decorative gradient - Hidden on mobile for performance */}
      <div
        className={`hidden md:block absolute top-1/2 ${mockupPosition === "left" ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2"} w-72 lg:w-96 h-72 lg:h-96 bg-[var(--framer-violet)] rounded-full filter blur-[150px] lg:blur-[200px] opacity-5 -translate-y-1/2 pointer-events-none`}
      />
    </section>
  );
}

// Named export
export { FeatureSection };
