/**
 * FramerHero Component - Ultra Premium Hero Section
 * 5-Star Plus Level Design für normale Bürger
 *
 * Features:
 * - Typewriter text animation mit wechselnden Texten
 * - Premium animated background mit Particles
 * - Glassmorphism cards
 * - Animated statistics
 */

import {
  motion,
  useReducedMotion,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowRight,
  Shield,
  Clock,
  Euro,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowOrb } from "./GlowOrb";
import { useRef, useState, useEffect } from "react";

// ============================================
// TYPEWRITER HOOK
// ============================================
function useTypewriter(
  words: string[],
  typingSpeed: number = 80,
  deletingSpeed: number = 50,
  pauseDuration: number = 2000
) {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex] || "";

    const handleTyping = () => {
      if (isPaused) {
        setTimeout(() => setIsPaused(false), pauseDuration);
        return;
      }

      if (isDeleting) {
        setDisplayText(currentWord.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setWordIndex(prev => (prev + 1) % words.length);
        }
      } else {
        setDisplayText(currentWord.substring(0, displayText.length + 1));
        if (displayText.length === currentWord.length) {
          setIsPaused(true);
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      }
    };

    const timeout = setTimeout(
      handleTyping,
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [
    displayText,
    isDeleting,
    isPaused,
    wordIndex,
    words,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
  ]);

  return { displayText, wordIndex };
}

// ============================================
// ANIMATED COUNTER HOOK
// ============================================
function useAnimatedCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration, isInView]);

  return { count, ref };
}

// ============================================
// FLOATING PARTICLES BACKGROUND
// ============================================
function FloatingParticles({ count = 50 }: { count?: number }) {
  const prefersReducedMotion = useReducedMotion();

  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.5 + 0.1,
  }));

  if (prefersReducedMotion) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: particle.opacity,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [
              particle.opacity,
              particle.opacity * 1.5,
              particle.opacity,
            ],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ============================================
// ANIMATED GRADIENT MESH
// ============================================
function GradientMesh() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Primary gradient blob */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(20,184,166,0.1) 40%, transparent 70%)",
          left: "50%",
          top: "30%",
          transform: "translate(-50%, -50%)",
          filter: "blur(60px)",
        }}
        animate={
          prefersReducedMotion
            ? {}
            : {
                scale: [1, 1.2, 1],
                opacity: [0.6, 0.8, 0.6],
              }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Secondary violet blob */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.12) 0%, rgba(168,85,247,0.08) 40%, transparent 70%)",
          right: "-10%",
          top: "20%",
          filter: "blur(80px)",
        }}
        animate={
          prefersReducedMotion
            ? {}
            : {
                x: [0, 50, 0],
                y: [0, -30, 0],
                scale: [1, 1.15, 1],
              }
        }
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Tertiary cyan blob */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(6,182,212,0.1) 0%, rgba(34,211,238,0.06) 40%, transparent 70%)",
          left: "-5%",
          bottom: "10%",
          filter: "blur(70px)",
        }}
        animate={
          prefersReducedMotion
            ? {}
            : {
                x: [0, 30, 0],
                y: [0, 40, 0],
                scale: [1, 1.1, 1],
              }
        }
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Animated aurora effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(45deg, transparent 30%, rgba(16,185,129,0.03) 50%, transparent 70%)",
        }}
        animate={
          prefersReducedMotion
            ? {}
            : {
                backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
              }
        }
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

// ============================================
// BENEFIT CARD COMPONENT
// ============================================
function BenefitCard({
  icon: Icon,
  title,
  value,
  delay,
  gradient,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: React.ReactNode;
  delay: number;
  gradient: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 40, scale: 0.9 }}
      animate={prefersReducedMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={prefersReducedMotion ? {} : { y: -8, scale: 1.03 }}
      className="relative group"
    >
      {/* Glow effect on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
        style={{
          background: `linear-gradient(135deg, ${gradient.includes("emerald") ? "rgba(16,185,129,0.3)" : gradient.includes("violet") ? "rgba(139,92,246,0.3)" : "rgba(6,182,212,0.3)"}, transparent)`,
        }}
      />
      <div className="relative p-5 sm:p-6 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:border-white/20 transition-all duration-300">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient}`}>
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white">
              {value}
            </div>
            <p className="text-xs sm:text-sm text-white/50">{title}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// MAIN HERO COMPONENT
// ============================================
export default function FramerHero({ className = "" }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  // Typewriter für wechselnde Texte
  const rotatingWords = [
    "Wohngeld",
    "Kindergeld",
    "BAföG",
    "Elterngeld",
    "Bürgergeld",
    "Energiepauschale",
  ];
  const { displayText, wordIndex } = useTypewriter(
    rotatingWords,
    100,
    60,
    1800
  );

  // Animated counters
  const euroCounter = useAnimatedCounter(847, 2500);
  const timeCounter = useAnimatedCounter(3, 1500);
  const successCounter = useAnimatedCounter(98, 2200);

  // Color mapping for typewriter
  const wordColors = [
    "from-emerald-400 to-teal-400",
    "from-pink-400 to-rose-400",
    "from-violet-400 to-purple-400",
    "from-red-400 to-orange-400",
    "from-amber-400 to-yellow-400",
    "from-cyan-400 to-blue-400",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      className={`relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--framer-bg)] ${className}`}
    >
      {/* ===== ANIMATED BACKGROUND ===== */}

      {/* Gradient Mesh */}
      <GradientMesh />

      {/* Floating Particles */}
      <FloatingParticles count={40} />

      {/* Central Glow Orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <GlowOrb
          size={700}
          color="mixed"
          pulseSpeed={5}
          blur={180}
          showParticles={true}
          particleCount={35}
          className="opacity-50"
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--framer-bg)_70%)] pointer-events-none" />

      {/* ===== MAIN CONTENT ===== */}
      <motion.div
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16"
        variants={prefersReducedMotion ? undefined : containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Top Badge */}
          <motion.div
            variants={prefersReducedMotion ? undefined : itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-violet-500/10 border border-emerald-500/20 backdrop-blur-sm"
          >
            <motion.div
              animate={prefersReducedMotion ? {} : { rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </motion.div>
            <span className="text-sm font-medium text-white/90">
              <span className="text-emerald-400 font-bold">
                50+ Förderungen
              </span>{" "}
              automatisch prüfen
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.div
            variants={prefersReducedMotion ? undefined : itemVariants}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-4">
              <span className="text-white">Hol dir dein</span>
            </h1>

            {/* Typewriter Line */}
            <div className="h-[1.2em] sm:h-[1.15em] mb-4 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={wordIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight bg-gradient-to-r ${wordColors[wordIndex]} bg-clip-text text-transparent`}
                >
                  {displayText}
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-[3px] sm:w-[4px] h-[0.9em] ml-1 bg-current align-middle"
                  />
                </motion.h1>
              </AnimatePresence>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white">
              zurück.
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={prefersReducedMotion ? undefined : itemVariants}
            className="mt-6 sm:mt-8 text-lg sm:text-xl md:text-2xl text-white/50 max-w-2xl mx-auto leading-relaxed"
          >
            Finde in{" "}
            <span className="text-emerald-400 font-semibold">3 Minuten</span>{" "}
            heraus, welche Förderungen dir zustehen –
            <span className="text-white/80">
              {" "}
              KI-gestützt & 100% kostenlos.
            </span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={prefersReducedMotion ? undefined : itemVariants}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              asChild
              size="lg"
              className="group relative w-full sm:w-auto overflow-hidden bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:via-teal-400 hover:to-cyan-400 text-white px-8 py-7 text-lg font-bold rounded-2xl transition-all duration-300 hover:shadow-[0_0_50px_rgba(16,185,129,0.4)] hover:-translate-y-1"
            >
              <a
                href="/auth"
                className="flex items-center justify-center gap-3"
              >
                <span>Jetzt Förderung prüfen</span>
                <motion.div
                  animate={prefersReducedMotion ? {} : { x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto px-8 py-7 text-lg font-semibold rounded-2xl border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-emerald-500/30 backdrop-blur-sm transition-all duration-300"
            >
              <a href="#so-funktionierts">So funktioniert's</a>
            </Button>
          </motion.div>

          {/* Benefit Cards */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <BenefitCard
              icon={Euro}
              title="Ø Ersparnis pro Jahr"
              value={<span ref={euroCounter.ref}>{euroCounter.count}€</span>}
              delay={0.5}
              gradient="from-emerald-500 to-teal-500"
            />
            <BenefitCard
              icon={Clock}
              title="Minuten bis zum Ergebnis"
              value={<span ref={timeCounter.ref}>{timeCounter.count}</span>}
              delay={0.65}
              gradient="from-violet-500 to-purple-500"
            />
            <BenefitCard
              icon={CheckCircle2}
              title="Erfolgsquote"
              value={
                <span ref={successCounter.ref}>{successCounter.count}%</span>
              }
              delay={0.8}
              gradient="from-cyan-500 to-blue-500"
            />
          </div>

          {/* Trust Indicators */}
          <motion.div
            variants={prefersReducedMotion ? undefined : itemVariants}
            className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-white/40"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>DSGVO konform</span>
            </div>
            <div className="w-px h-4 bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-1.5">
              <span className="text-yellow-400 text-sm">★★★★★</span>
              <span>4.9/5 Bewertung</span>
            </div>
            <div className="w-px h-4 bg-white/10 hidden sm:block" />
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-xs font-medium">
              Made in Germany
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-white/20"
        >
          <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5">
            <motion.div
              animate={
                prefersReducedMotion
                  ? {}
                  : { y: [0, 10, 0], opacity: [1, 0.3, 1] }
              }
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-1 rounded-full bg-white/40"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--framer-bg)] to-transparent pointer-events-none" />
    </section>
  );
}

export { FramerHero };
