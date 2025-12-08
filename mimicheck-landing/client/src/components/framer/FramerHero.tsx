/**
 * FramerHero Component - Clean Framer-Style Hero
 * Minimalistisch, lesbar, premium - wie XTRACT Template
 */

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface FramerHeroProps {
  className?: string;
}

export default function FramerHero({ className = "" }: FramerHeroProps) {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      className={`relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a] ${className}`}
    >
      {/* Subtle Glow Orb - Behind text, not interfering */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 pointer-events-none">
        <div
          className="w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(139, 92, 246, 0.1) 40%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* Subtle particles/dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }, (_, i) => i).map(i => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/20"
            style={{
              left: `${(i * 5) % 100}%`,
              top: `${(i * 7) % 100}%`,
            }}
            animate={
              prefersReducedMotion
                ? {}
                : {
                    opacity: [0.1, 0.4, 0.1],
                    scale: [1, 1.2, 1],
                  }
            }
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl"
        variants={prefersReducedMotion ? undefined : containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div
          variants={prefersReducedMotion ? undefined : itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-violet-500/10 border border-violet-500/20"
        >
          <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider">
            Neu
          </span>
          <span className="w-px h-3 bg-white/20" />
          <span className="text-sm text-white/70">
            Automatische Förder-Erkennung
          </span>
        </motion.div>

        {/* Headline - Clean, readable, large */}
        <motion.h1
          variants={prefersReducedMotion ? undefined : itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-white mb-6"
        >
          Intelligente Förderanträge
          <br />
          <span className="text-white">für moderne Menschen.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={prefersReducedMotion ? undefined : itemVariants}
          className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          MimiCheck AI bringt KI-Automatisierung zu deinen Fingerspitzen &
          vereinfacht Anträge.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={prefersReducedMotion ? undefined : itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            asChild
            size="lg"
            className="group bg-violet-600 hover:bg-violet-500 text-white px-8 py-6 text-base font-semibold rounded-xl transition-all duration-300"
          >
            <a href="/auth" className="flex items-center gap-2">
              Jetzt starten
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="px-8 py-6 text-base font-semibold rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all duration-300"
          >
            <a href="#services">Services ansehen</a>
          </Button>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
    </section>
  );
}

export { FramerHero };
