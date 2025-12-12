/**
 * FramerHero Component - Premium Hero with Writer Effect
 * Top-Experten Design Level
 */

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import { useTranslation } from "@/i18n";

// Lazy load 3D component for performance
const HeroSphere3D = lazy(() => import("./HeroSphere3D"));

// Writer Effect Hook - Typewriter animation
function useWriterEffect(
  words: string[],
  typingSpeed: number = 100,
  deletingSpeed: number = 50,
  pauseDuration: number = 2000
) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const animate = useCallback(() => {
    const currentWord = words[currentWordIndex];

    if (!currentWord) return undefined;

    if (!isDeleting) {
      // Typing
      if (currentText.length < currentWord.length) {
        return setTimeout(() => {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        }, typingSpeed);
      } else {
        // Pause before deleting
        return setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      // Deleting
      if (currentText.length > 0) {
        return setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, deletingSpeed);
      } else {
        // Move to next word
        setIsDeleting(false);
        setCurrentWordIndex(prev => (prev + 1) % words.length);
        return undefined;
      }
    }
  }, [
    currentText,
    currentWordIndex,
    isDeleting,
    words,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
  ]);

  useEffect(() => {
    const timeout = animate();
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [animate]);

  return currentText;
}

export interface FramerHeroProps {
  className?: string;
}

export default function FramerHero({ className = "" }: FramerHeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useTranslation();

  // Get rotating words from translations
  const rotatingWordsRaw = t("hero.rotatingWords");
  const rotatingWords = Array.isArray(rotatingWordsRaw)
    ? rotatingWordsRaw
    : ["Geld", "Wohngeld", "BAföG", "Kindergeld", "Förderung"];
  const typedWord = useWriterEffect(rotatingWords, 120, 80, 2500);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      className={`relative min-h-[100svh] flex items-center justify-center overflow-hidden ${className}`}
    >
      {/* 3D Holographic Sphere - Background Element */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[420px] h-[420px] sm:w-[600px] sm:h-[600px] md:w-[800px] md:h-[800px] opacity-60">
          <Suspense fallback={<div className="w-full h-full" />}>
            <HeroSphere3D prefersReducedMotion={prefersReducedMotion} />
          </Suspense>
        </div>
      </div>

      {/* Content - sits above global background */}
      <motion.div
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-5xl pt-20"
        variants={prefersReducedMotion ? undefined : containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div
          variants={prefersReducedMotion ? undefined : itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-sm text-white/80">{t("hero.badge")}</span>
        </motion.div>

        {/* Headline with Writer Effect */}
        <motion.div
          variants={prefersReducedMotion ? undefined : itemVariants}
          className="mb-6"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
            <span className="text-white">{t("hero.title1")}</span>
            <br />
            <span className="relative inline-block min-w-[200px] sm:min-w-[280px] md:min-w-[350px]">
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                {prefersReducedMotion ? t("hero.titleHighlight") : typedWord}
              </span>
              {!prefersReducedMotion && (
                <motion.span
                  className="inline-block w-[3px] h-[0.9em] bg-emerald-400 ml-1 align-middle"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              )}
            </span>
            <br />
            <span className="text-white">{t("hero.title2")}</span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={prefersReducedMotion ? undefined : itemVariants}
          className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t("hero.subtitle")}{" "}
          <span className="text-emerald-400 font-medium">
            {t("hero.subtitleHighlight")}
          </span>{" "}
          {t("hero.subtitleEnd")}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={prefersReducedMotion ? undefined : itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Button
            asChild
            size="lg"
            className="group w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white px-8 py-6 text-base font-semibold rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:-translate-y-0.5"
          >
            <a href="/auth" className="flex items-center gap-2">
              {t("hero.ctaPrimary")}
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full sm:w-auto px-8 py-6 text-base font-semibold rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-300"
          >
            <a href="#so-funktionierts">{t("hero.ctaSecondary")}</a>
          </Button>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          variants={prefersReducedMotion ? undefined : itemVariants}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-8 max-w-2xl mx-auto"
        >
          <div className="text-center p-3 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
            <p className="text-2xl sm:text-3xl font-bold text-white">
              {t("stats.savings")}
            </p>
            <p className="text-xs sm:text-sm text-white/40 mt-1">
              {t("stats.savingsLabel")}
            </p>
          </div>
          <div className="text-center p-3 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
            <p className="text-2xl sm:text-3xl font-bold text-emerald-400">
              {t("stats.time")}
            </p>
            <p className="text-xs sm:text-sm text-white/40 mt-1">
              {t("stats.timeLabel")}
            </p>
          </div>
          <div className="text-center p-3 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
            <p className="text-2xl sm:text-3xl font-bold text-white">
              {t("stats.success")}
            </p>
            <p className="text-xs sm:text-sm text-white/40 mt-1">
              {t("stats.successLabel")}
            </p>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          variants={prefersReducedMotion ? undefined : itemVariants}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-white/40"
        >
          <div className="flex items-center gap-2">
            <span className="text-yellow-400">★★★★★</span>
            <span>{t("trust.rating")}</span>
          </div>
          <span className="hidden sm:inline text-white/20">•</span>
          <span>{t("trust.gdpr")}</span>
          <span className="hidden sm:inline text-white/20">•</span>
          <span className="text-emerald-400/80">{t("trust.madeIn")}</span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-white/20"
        >
          <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5">
            <motion.div
              animate={
                prefersReducedMotion
                  ? {}
                  : { y: [0, 10, 0], opacity: [1, 0, 1] }
              }
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-1 rounded-full bg-white/40"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export { FramerHero };
