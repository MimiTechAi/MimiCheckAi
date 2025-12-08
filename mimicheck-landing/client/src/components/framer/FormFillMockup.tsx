/**
 * FormFillMockup Component - Framer-Style Auto-Fill Form Interface
 *
 * A mockup showing form fields being automatically filled with
 * user data, including a progress indicator.
 *
 * Requirements: 5.4
 */

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Loader2, FileText, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { UIMockup } from "./UIMockup";

export interface FormField {
  id: string;
  label: string;
  value: string;
  type: "text" | "date" | "number" | "select";
  filled: boolean;
}

export interface FormFillMockupProps {
  /** Custom form fields to display (optional) */
  fields?: FormField[];
  /** Form title */
  formTitle?: string;
  /** Whether to animate the auto-fill */
  animate?: boolean;
  /** Additional CSS classes */
  className?: string;
}

// Default form fields for Wohngeld application
const defaultFields: FormField[] = [
  { id: "1", label: "Vorname", value: "Max", type: "text", filled: true },
  {
    id: "2",
    label: "Nachname",
    value: "Mustermann",
    type: "text",
    filled: true,
  },
  {
    id: "3",
    label: "Geburtsdatum",
    value: "15.03.1990",
    type: "date",
    filled: true,
  },
  {
    id: "4",
    label: "Monatliches Einkommen",
    value: "2.450 €",
    type: "number",
    filled: true,
  },
  { id: "5", label: "Warmmiete", value: "850 €", type: "number", filled: true },
  {
    id: "6",
    label: "Haushaltsgröße",
    value: "2 Personen",
    type: "select",
    filled: false,
  },
];

/**
 * FormFillMockup - Auto-fill form interface mockup
 */
export default function FormFillMockup({
  fields: initialFields = defaultFields,
  formTitle = "Wohngeld-Antrag",
  animate = true,
  className = "",
}: FormFillMockupProps) {
  const prefersReducedMotion = useReducedMotion();
  const [fields, setFields] = useState(initialFields);
  const [currentFieldIndex, setCurrentFieldIndex] = useState(
    initialFields.filter(f => f.filled).length
  );

  // Calculate progress
  const filledCount = fields.filter(f => f.filled).length;
  const progress = Math.round((filledCount / fields.length) * 100);

  // Auto-fill animation effect
  useEffect(() => {
    if (!animate || prefersReducedMotion || currentFieldIndex >= fields.length)
      return;

    const timer = setTimeout(() => {
      setFields(prev =>
        prev.map((field, index) =>
          index === currentFieldIndex ? { ...field, filled: true } : field
        )
      );
      setCurrentFieldIndex(prev => prev + 1);
    }, 1500);

    return () => clearTimeout(timer);
  }, [animate, currentFieldIndex, fields.length, prefersReducedMotion]);

  const fieldVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  const fillVariants = {
    empty: {
      backgroundColor: "rgba(51, 65, 85, 0.3)",
      borderColor: "rgba(71, 85, 105, 0.5)",
    },
    filling: {
      backgroundColor: "rgba(139, 92, 246, 0.1)",
      borderColor: "rgba(139, 92, 246, 0.5)",
    },
    filled: {
      backgroundColor: "rgba(16, 185, 129, 0.1)",
      borderColor: "rgba(16, 185, 129, 0.3)",
    },
  };

  return (
    <UIMockup title={formTitle} className={className}>
      <div className="p-4">
        {/* Header with Progress */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium text-white">{formTitle}</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-xs text-slate-400">Auto-Fill aktiv</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-slate-400">Fortschritt</span>
            <span className="text-xs font-medium text-emerald-400">
              {progress}%
            </span>
          </div>
          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-3">
          {fields.map((field, index) => {
            const isCurrent = index === currentFieldIndex && animate;
            const status = field.filled
              ? "filled"
              : isCurrent
                ? "filling"
                : "empty";

            return (
              <motion.div
                key={field.id}
                custom={index}
                variants={prefersReducedMotion ? undefined : fieldVariants}
                initial="hidden"
                animate="visible"
              >
                <label className="block text-xs text-slate-400 mb-1">
                  {field.label}
                </label>
                <motion.div
                  className="relative flex items-center px-3 py-2.5 rounded-lg border transition-colors"
                  variants={fillVariants}
                  animate={status}
                  transition={{ duration: 0.3 }}
                >
                  {/* Field Value */}
                  <span
                    className={`flex-1 text-sm ${
                      field.filled ? "text-white" : "text-slate-500"
                    }`}
                  >
                    {field.filled ? field.value : "..."}
                  </span>

                  {/* Status Indicator */}
                  <div className="flex-shrink-0 ml-2">
                    {field.filled ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : isCurrent ? (
                      <motion.div
                        animate={prefersReducedMotion ? {} : { rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <Loader2 className="w-4 h-4 text-violet-400" />
                      </motion.div>
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-600" />
                    )}
                  </div>

                  {/* Typing Animation Cursor */}
                  {isCurrent && !prefersReducedMotion && (
                    <motion.div
                      className="absolute right-12 w-0.5 h-4 bg-violet-400"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    />
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-700/30 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {filledCount} von {fields.length} Feldern ausgefüllt
          </span>
          <button
            className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${
              progress === 100
                ? "bg-emerald-500 text-white hover:bg-emerald-400"
                : "bg-slate-700 text-slate-400 cursor-not-allowed"
            }`}
            disabled={progress !== 100}
          >
            {progress === 100 ? "Absenden" : "Wird ausgefüllt..."}
          </button>
        </div>
      </div>
    </UIMockup>
  );
}

// Named export
export { FormFillMockup };
