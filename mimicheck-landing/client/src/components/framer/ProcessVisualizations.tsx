/**
 * ProcessVisualizations - Step-specific visualizations for ProcessCard
 *
 * Contains three visualization components:
 * - UploadVisualization: Document upload with PDF icons and progress
 * - AnalysisVisualization: AI scanning animation with checkmarks
 * - SubmitVisualization: Form auto-fill and send animation
 *
 * Requirements: 6.5, 6.6, 6.7
 */

import { motion, useReducedMotion } from "framer-motion";
import {
  FileText,
  Upload,
  CheckCircle2,
  Scan,
  Sparkles,
  Send,
  FileCheck,
  ArrowRight,
  Loader2,
} from "lucide-react";

/**
 * UploadVisualization - Document upload visualization (Requirement: 6.5)
 * Shows PDF/document icons with upload progress animation
 */
export function UploadVisualization() {
  const prefersReducedMotion = useReducedMotion();

  const documentVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  const floatAnimation = {
    y: [-2, 2, -2],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4">
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--framer-violet) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Document icons */}
      <div className="relative flex items-end gap-3">
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            custom={i}
            variants={prefersReducedMotion ? undefined : documentVariants}
            initial="hidden"
            animate="visible"
            className={`relative ${i === 1 ? "z-10" : "z-0"}`}
          >
            <motion.div
              animate={prefersReducedMotion ? undefined : floatAnimation}
              className={`
                flex flex-col items-center justify-center
                ${i === 1 ? "w-16 h-20" : "w-12 h-16"}
                rounded-lg bg-[var(--framer-bg-elevated)] border border-[var(--framer-border)]
                ${i === 1 ? "shadow-lg shadow-[var(--framer-violet)]/20" : ""}
              `}
            >
              <FileText
                className={`
                  ${i === 1 ? "w-8 h-8" : "w-6 h-6"} 
                  text-[var(--framer-violet-light)]
                `}
              />
              <span className="text-[8px] mt-1 text-[var(--framer-text-muted)] font-medium">
                PDF
              </span>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Upload indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-full bg-[var(--framer-violet-subtle)] border border-[var(--framer-violet)]/30"
      >
        <Upload className="w-3 h-3 text-[var(--framer-violet-light)]" />
        <span className="text-[10px] font-medium text-[var(--framer-violet-light)]">
          Hochladen...
        </span>
      </motion.div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--framer-bg)]">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "75%" }}
          transition={{ delay: 0.3, duration: 2, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-[var(--framer-violet)] to-[var(--framer-violet-light)]"
        />
      </div>
    </div>
  );
}

/**
 * AnalysisVisualization - AI analysis visualization (Requirement: 6.6)
 * Shows scanning animation with checkmarks for found Förderungen
 */
export function AnalysisVisualization() {
  const prefersReducedMotion = useReducedMotion();

  const scanLineAnimation = {
    y: [0, 100, 0],
    opacity: [0.8, 0.4, 0.8],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  };

  const checkmarkVariants = {
    hidden: { opacity: 0, scale: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        delay: 0.8 + i * 0.3,
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  const foerderungen = ["Wohngeld", "BAföG", "Kindergeld"];

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4 overflow-hidden">
      {/* Scanning effect */}
      <motion.div
        animate={prefersReducedMotion ? undefined : scanLineAnimation}
        className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--framer-emerald)] to-transparent"
        style={{ top: "20%" }}
      />

      {/* Document being scanned */}
      <div className="relative flex items-center gap-4">
        {/* Document */}
        <div className="relative w-14 h-18 rounded-lg bg-[var(--framer-bg-elevated)] border border-[var(--framer-border)] flex items-center justify-center">
          <Scan className="w-6 h-6 text-[var(--framer-emerald-light)]" />

          {/* Scanning glow */}
          <motion.div
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    opacity: [0.3, 0.6, 0.3],
                    transition: { duration: 1.5, repeat: Infinity },
                  }
            }
            className="absolute inset-0 rounded-lg bg-[var(--framer-emerald)]/10"
          />
        </div>

        {/* Arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <ArrowRight className="w-4 h-4 text-[var(--framer-text-muted)]" />
        </motion.div>

        {/* Found Förderungen list */}
        <div className="flex flex-col gap-1.5">
          {foerderungen.map((item, i) => (
            <motion.div
              key={item}
              custom={i}
              variants={prefersReducedMotion ? undefined : checkmarkVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[var(--framer-emerald-subtle)] border border-[var(--framer-emerald)]/20"
            >
              <CheckCircle2 className="w-3 h-3 text-[var(--framer-emerald)]" />
              <span className="text-[10px] font-medium text-[var(--framer-emerald-light)]">
                {item}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI sparkle indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-[var(--framer-emerald-subtle)] border border-[var(--framer-emerald)]/30"
      >
        <motion.div
          animate={prefersReducedMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-3 h-3 text-[var(--framer-emerald)]" />
        </motion.div>
        <span className="text-[10px] font-medium text-[var(--framer-emerald-light)]">
          KI aktiv
        </span>
      </motion.div>
    </div>
  );
}

/**
 * SubmitVisualization - Form submission visualization (Requirement: 6.7)
 * Shows auto-filled form with send animation
 */
export function SubmitVisualization() {
  const prefersReducedMotion = useReducedMotion();

  const fieldVariants = {
    hidden: { opacity: 0, width: "0%" },
    visible: (i: number) => ({
      opacity: 1,
      width: "100%",
      transition: {
        delay: 0.2 + i * 0.2,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  const sendAnimation = {
    x: [0, 5, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  };

  const formFields = [
    { label: "Name", width: "80%" },
    { label: "Adresse", width: "90%" },
    { label: "Einkommen", width: "60%" },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4">
      {/* Form mockup */}
      <div className="relative w-full max-w-[140px]">
        {/* Form container */}
        <div className="bg-[var(--framer-bg-elevated)] rounded-lg border border-[var(--framer-border)] p-3 space-y-2">
          {/* Form fields */}
          {formFields.map((field, i) => (
            <div key={field.label} className="space-y-0.5">
              <span className="text-[8px] text-[var(--framer-text-muted)]">
                {field.label}
              </span>
              <div className="h-4 rounded bg-[var(--framer-bg)] border border-[var(--framer-border-subtle)] overflow-hidden">
                <motion.div
                  custom={i}
                  variants={prefersReducedMotion ? undefined : fieldVariants}
                  initial="hidden"
                  animate="visible"
                  className="h-full bg-gradient-to-r from-[var(--framer-violet-subtle)] to-[var(--framer-violet)]/20"
                  style={{ maxWidth: field.width }}
                />
              </div>
            </div>
          ))}

          {/* Submit button */}
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.3 }}
            className="flex items-center justify-center gap-1 mt-2 py-1.5 rounded bg-[var(--framer-violet)] text-white"
          >
            <span className="text-[9px] font-medium">Absenden</span>
            <motion.div
              animate={prefersReducedMotion ? undefined : sendAnimation}
            >
              <Send className="w-2.5 h-2.5" />
            </motion.div>
          </motion.div>
        </div>

        {/* Success checkmark */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[var(--framer-emerald)] flex items-center justify-center shadow-lg shadow-[var(--framer-emerald)]/30"
        >
          <FileCheck className="w-3.5 h-3.5 text-white" />
        </motion.div>
      </div>

      {/* Auto-fill indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full bg-[var(--framer-violet-subtle)] border border-[var(--framer-violet)]/30"
      >
        <motion.div
          animate={prefersReducedMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="w-3 h-3 text-[var(--framer-violet-light)]" />
        </motion.div>
        <span className="text-[10px] font-medium text-[var(--framer-violet-light)]">
          Auto-Fill
        </span>
      </motion.div>
    </div>
  );
}

// Export all visualizations
export default {
  UploadVisualization,
  AnalysisVisualization,
  SubmitVisualization,
};
