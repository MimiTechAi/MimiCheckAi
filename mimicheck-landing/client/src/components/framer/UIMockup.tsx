/**
 * UIMockup Component - Framer-Style UI Mockup Container
 *
 * A dark-themed card component for displaying UI mockups with
 * hover effects, glow animations, and window chrome styling.
 *
 * Requirements: 5.7, 5.8
 */

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

export interface UIMockupProps {
  /** Content to display inside the mockup */
  children: ReactNode;
  /** Optional title for the window header */
  title?: string;
  /** Whether to show window chrome (dots) */
  showWindowChrome?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Hover animation intensity */
  hoverScale?: number;
}

/**
 * UIMockup - Base container for UI mockup displays
 * Features dark slate-900 background, subtle border, and hover effects
 */
export default function UIMockup({
  children,
  title,
  showWindowChrome = true,
  className = "",
  hoverScale = 1.02,
}: UIMockupProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl bg-slate-900/80 border border-slate-700/50 shadow-xl backdrop-blur-sm ${className}`}
      whileHover={
        prefersReducedMotion
          ? undefined
          : {
              scale: hoverScale,
              borderColor: "rgba(139, 92, 246, 0.3)",
              boxShadow: "0 0 40px rgba(139, 92, 246, 0.2)",
            }
      }
      transition={{
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Window Chrome Header */}
      {showWindowChrome && (
        <div className="flex items-center gap-2 px-4 py-3 bg-slate-950/60 border-b border-slate-700/30">
          {/* Traffic Light Dots */}
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>

          {/* Optional Title */}
          {title && (
            <span className="ml-3 text-xs text-slate-400 font-medium">
              {title}
            </span>
          )}
        </div>
      )}

      {/* Content Area */}
      <div className="relative">{children}</div>

      {/* Subtle inner glow effect */}
      <div className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-inset ring-white/5" />
    </motion.div>
  );
}

// Named export
export { UIMockup };
