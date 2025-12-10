/**
 * TrustMarquee Component - Clean Framer-Style
 * Minimalistisch wie XTRACT Template
 */

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import { useTranslation } from "@/i18n";

export interface TrustMarqueeProps {
  speed?: number;
  className?: string;
}

export default function TrustMarquee({
  speed = 30,
  className = "",
}: TrustMarqueeProps) {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useTranslation();

  // Get trust items from translations
  const trustItemsRaw = t("trustMarquee.items");
  const trustItems = Array.isArray(trustItemsRaw)
    ? trustItemsRaw
    : [
        "Wohngeld",
        "BAföG",
        "Kindergeld",
        "Elterngeld",
        "Bürgergeld",
        "Kinderzuschlag",
        "Wohnungsbauprämie",
        "Grundsicherung",
      ];

  const duplicatedItems = useMemo((): string[] => {
    return [...trustItems, ...trustItems, ...trustItems];
  }, [trustItems]);

  return (
    <section className={`py-16 bg-[#0a0a0a] overflow-hidden ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-sm text-white/40 mb-10"
        >
          {t("trustMarquee.title")}
        </motion.p>

        {/* Marquee */}
        <div className="relative">
          {/* Gradient fades */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

          {/* Scrolling Track */}
          <motion.div
            className="flex items-center gap-8"
            style={{ width: "max-content" }}
            animate={prefersReducedMotion ? {} : { x: ["0%", "-33.33%"] }}
            transition={
              prefersReducedMotion
                ? undefined
                : { x: { duration: speed, repeat: Infinity, ease: "linear" } }
            }
          >
            {duplicatedItems.map((item, index) => (
              <div
                key={`${item}-${index}`}
                className="px-6 py-3 rounded-full bg-white/[0.03] border border-white/[0.06] text-white/50 text-sm font-medium whitespace-nowrap hover:text-white/80 hover:border-white/10 transition-all duration-300"
              >
                {item}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { TrustMarquee };
