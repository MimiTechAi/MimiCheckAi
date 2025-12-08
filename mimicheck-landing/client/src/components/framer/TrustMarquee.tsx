/**
 * TrustMarquee Component - Framer-Style Trust Logos Banner
 *
 * A horizontally scrolling marquee of partner/trust logos with
 * seamless infinite animation and grayscale hover effects.
 *
 * Requirements: 3.1, 3.2, 3.3, 3.4, 3.5
 */

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

export interface TrustLogo {
  /** Name of the company/partner */
  name: string;
  /** Logo image source URL or path */
  src?: string;
  /** Optional alt text (defaults to name) */
  alt?: string;
}

export interface TrustMarqueeProps {
  /** Title text displayed above the logos (default: "Über 50+ Unternehmen vertrauen uns") */
  title?: string;
  /** Array of trust logos to display */
  logos?: TrustLogo[];
  /** Animation speed in seconds for one complete scroll (default: 30) */
  speed?: number;
  /** Additional CSS classes */
  className?: string;
  /** Whether to pause animation on hover (default: true) */
  pauseOnHover?: boolean;
}

// Default trust logos - German companies and institutions
const defaultLogos: TrustLogo[] = [
  { name: "Deutsche Bank", src: "/images/logos/deutsche-bank.svg" },
  { name: "Allianz", src: "/images/logos/allianz.svg" },
  { name: "SAP", src: "/images/logos/sap.svg" },
  { name: "Siemens", src: "/images/logos/siemens.svg" },
  { name: "BMW", src: "/images/logos/bmw.svg" },
  { name: "Bosch", src: "/images/logos/bosch.svg" },
  { name: "Telekom", src: "/images/logos/telekom.svg" },
  { name: "Volkswagen", src: "/images/logos/volkswagen.svg" },
];

/**
 * LogoItem - Individual logo with grayscale filter and hover effect
 */
function LogoItem({
  logo,
  reducedMotion,
}: {
  logo: TrustLogo;
  reducedMotion: boolean;
}) {
  // If no src provided, render a placeholder with the company name
  if (!logo.src) {
    return (
      <div
        className={`
          flex items-center justify-center px-6 py-3
          bg-[var(--framer-bg-elevated)] rounded-lg
          border border-[var(--framer-border)]
          transition-all duration-300
          ${reducedMotion ? "" : "hover:border-[var(--framer-border-hover)] hover:bg-[var(--framer-bg-hover)]"}
        `}
      >
        <span className="text-[var(--framer-text-muted)] font-medium text-sm whitespace-nowrap">
          {logo.name}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`
        flex items-center justify-center h-12 px-4
        transition-all duration-300
        ${reducedMotion ? "opacity-50 grayscale" : "opacity-50 grayscale hover:opacity-100 hover:grayscale-0"}
      `}
    >
      <img
        src={logo.src}
        alt={logo.alt || logo.name}
        className="h-8 w-auto object-contain"
        loading="lazy"
      />
    </div>
  );
}

/**
 * TrustMarquee - Animated trust logos banner
 */
export default function TrustMarquee({
  title = "Über 50+ Unternehmen vertrauen uns",
  logos = defaultLogos,
  speed = 30,
  className = "",
  pauseOnHover = true,
}: TrustMarqueeProps) {
  const prefersReducedMotion = useReducedMotion();

  // Duplicate logos for seamless infinite scroll
  // We need at least 2 copies to create the seamless loop effect
  const duplicatedLogos = useMemo(() => {
    return [...logos, ...logos];
  }, [logos]);

  // Animation variants for the title
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
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
      className={`py-16 sm:py-20 bg-[var(--framer-bg)] overflow-hidden ${className}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title (Requirement: 3.1) */}
        <motion.p
          variants={prefersReducedMotion ? undefined : titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center text-sm sm:text-base text-[var(--framer-text-muted)] mb-10 sm:mb-12"
        >
          {title}
        </motion.p>

        {/* Marquee Container (Requirement: 3.2) */}
        <div className="framer-marquee-container relative">
          {/* Gradient fade edges for seamless look */}
          <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-[var(--framer-bg)] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-[var(--framer-bg)] to-transparent z-10 pointer-events-none" />

          {/* Scrolling Track (Requirements: 3.3, 3.4, 3.5) */}
          {/* 
            Using Framer Motion for smooth, GPU-accelerated animation.
            The animation translates from 0% to -50% because we duplicate the logos,
            creating a seamless infinite loop effect.
          */}
          <motion.div
            className={`
              framer-marquee-track flex items-center gap-8 sm:gap-12
              ${pauseOnHover && !prefersReducedMotion ? "hover:[animation-play-state:paused]" : ""}
            `}
            style={{
              // Ensure the track is wide enough for seamless scrolling
              width: "max-content",
            }}
            animate={
              prefersReducedMotion
                ? {}
                : {
                    x: ["0%", "-50%"],
                  }
            }
            transition={
              prefersReducedMotion
                ? undefined
                : {
                    x: {
                      duration: speed,
                      repeat: Infinity,
                      ease: "linear",
                    },
                  }
            }
          >
            {duplicatedLogos.map((logo, index) => (
              <LogoItem
                key={`${logo.name}-${index}`}
                logo={logo}
                reducedMotion={prefersReducedMotion ?? false}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Named export for convenience
export { TrustMarquee };
