/**
 * Ultra Premium Hero Section - Award-Winning 2025 Design
 * PERFORMANCE OPTIMIZED + FULLY RESPONSIVE
 */

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Shield, Zap } from 'lucide-react';
import { SplitText, WordReveal } from './TextReveal';
import MarqueeText from './MarqueeText';

// Magnetic Button Component
interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'sm' | 'lg' | 'icon';
  variant?: 'default' | 'outline' | 'ghost';
  asChild?: boolean;
}

function MagneticButton({ children, className = '', ...props }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.2, y: y * 0.2 });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <Button ref={buttonRef} className={className} {...props}>
        {children}
      </Button>
    </motion.div>
  );
}

// Floating Badge
function FloatingBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm mb-6 sm:mb-8"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>
      <span className="text-emerald-400 text-xs sm:text-sm font-medium tracking-wide">
        KI-gestützte Förderanträge
      </span>
    </motion.div>
  );
}

// Optimized CSS-only Animated Orbs
function AnimatedOrbs() {
  const prefersReducedMotion = useReducedMotion();
  
  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-teal-500/10" />
    );
  }

  return (
    <>
      <div 
        className="absolute top-1/4 left-1/4 w-[300px] sm:w-[400px] lg:w-[500px] h-[300px] sm:h-[400px] lg:h-[500px] rounded-full pointer-events-none animate-blob hero-orb-primary"
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-[250px] sm:w-[350px] lg:w-[400px] h-[250px] sm:h-[350px] lg:h-[400px] rounded-full pointer-events-none animate-blob animation-delay-2000 hero-orb-secondary"
      />
    </>
  );
}

// Trust Indicators
function TrustIndicators() {
  const items = [
    { icon: Shield, text: 'DSGVO-konform' },
    { icon: Zap, text: 'In 3 Min startklar' },
    { icon: Sparkles, text: 'KI-gestützt' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm text-slate-400"
    >
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-1.5 sm:gap-2">
          <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500" />
          <span>{item.text}</span>
        </div>
      ))}
    </motion.div>
  );
}

// Stats Section - Mobile optimized
function StatsSection() {
  const stats = [
    { value: '847€', label: 'Ø Förderung' },
    { value: '<5 Min', label: 'Antragszeit' },
    { value: '98%', label: 'Erfolgsquote' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      className="grid grid-cols-3 gap-2 sm:gap-4 mt-8 lg:mt-12"
    >
      {stats.map((stat, i) => (
        <div
          key={i}
          className="text-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
        >
          <div className="text-lg sm:text-2xl lg:text-3xl font-bold text-white">{stat.value}</div>
          <div className="text-[10px] sm:text-xs text-slate-400 mt-0.5 sm:mt-1">{stat.label}</div>
        </div>
      ))}
    </motion.div>
  );
}

// Dashboard Preview - Simplified for performance
function DashboardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      className="relative"
    >
      <div className="relative rounded-2xl sm:rounded-3xl bg-slate-900/80 border border-emerald-500/20 backdrop-blur-xl p-4 sm:p-6 lg:p-8 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-semibold text-white">MiMiCheck</div>
              <div className="text-[10px] sm:text-xs text-slate-400">Dashboard</div>
            </div>
          </div>
          <div className="px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] sm:text-xs font-medium">
            3 neue
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
          {[
            { label: 'Gefunden', value: '12' },
            { label: 'Beantragt', value: '8' },
            { label: 'Genehmigt', value: '6' },
          ].map((stat, i) => (
            <div key={i} className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-slate-800/50 text-center">
              <div className="text-base sm:text-xl font-bold text-white">{stat.value}</div>
              <div className="text-[10px] sm:text-xs text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-slate-800/50">
          <div className="flex justify-between text-xs sm:text-sm mb-2">
            <span className="text-slate-400">Wohngeld-Antrag</span>
            <span className="text-emerald-400">75%</span>
          </div>
          <div className="h-1.5 sm:h-2 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '75%' }}
              transition={{ delay: 1, duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function HeroUltraPremium() {
  const heroRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, prefersReducedMotion ? 1 : 0]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-slate-950 pt-16 sm:pt-20"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:60px_60px]" />
      <AnimatedOrbs />

      {/* Main Content */}
      <motion.div 
        className="relative z-20 container mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-20"
        style={{ y, opacity }}
      >
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Column - Text */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <FloatingBadge />

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.95] mb-4 sm:mb-6">
              {prefersReducedMotion ? (
                <>
                  <span className="block text-white">Förderungen</span>
                  <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                    automatisiert.
                  </span>
                </>
              ) : (
                <>
                  <SplitText
                    text="Förderungen"
                    className="block"
                    lineClassName="text-white"
                    delay={0.3}
                  />
                  <SplitText
                    text="automatisiert."
                    className="block mt-1 sm:mt-2"
                    lineClassName="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent"
                    delay={0.5}
                  />
                </>
              )}
            </h1>

            {/* Subheadline */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-400 max-w-xl mx-auto lg:mx-0 mb-6 sm:mb-8 leading-relaxed">
              {prefersReducedMotion ? (
                "Spare Zeit und Nerven mit intelligenter Antragsautomatisierung. KI-gestützt, sicher und DSGVO-konform."
              ) : (
                <WordReveal
                  text="Spare Zeit und Nerven mit intelligenter Antragsautomatisierung. KI-gestützt, sicher und DSGVO-konform."
                  delay={0.7}
                  highlightWords={['KI-gestützt', 'sicher', 'DSGVO-konform']}
                  highlightClassName="text-emerald-400 font-medium"
                />
              )}
            </p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-6 sm:mb-8"
            >
              <MagneticButton
                size="lg"
                className="magnetic-btn text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-5 sm:py-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-xl shadow-emerald-500/25 group w-full sm:w-auto"
                asChild
              >
                <a href="/auth">
                  <span>Jetzt kostenlos starten</span>
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </MagneticButton>

              <MagneticButton
                size="lg"
                variant="outline"
                className="magnetic-btn text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-5 sm:py-6 border-2 border-slate-700 hover:border-emerald-500/50 hover:bg-emerald-500/5 w-full sm:w-auto"
                asChild
              >
                <a href="#features">
                  <Sparkles className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                  Demo ansehen
                </a>
              </MagneticButton>
            </motion.div>

            {/* Trust Indicators */}
            <TrustIndicators />

            {/* Stats - Mobile only */}
            <div className="lg:hidden">
              <StatsSection />
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="hidden lg:block order-1 lg:order-2">
            <DashboardPreview />
            <StatsSection />
          </div>
        </div>
      </motion.div>

      {/* Marquee Banner */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <MarqueeText
          speed="slow"
          className="py-3 sm:py-4 border-t border-emerald-500/10 bg-slate-950/80 backdrop-blur-sm"
          separator={<span className="mx-4 sm:mx-8 text-emerald-500/50">◆</span>}
        >
          <span className="text-xs sm:text-sm font-medium text-slate-500 uppercase tracking-widest">
            Wohngeld • Kindergeld • BAföG • Elterngeld • Bürgergeld • Kinderzuschlag
          </span>
        </MarqueeText>
      </div>

      {/* Scroll Indicator - Desktop only */}
      <motion.div
        className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 z-30 hidden sm:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border-2 border-slate-600 flex items-start justify-center p-1.5 sm:p-2"
        >
          <div className="w-1 h-1.5 sm:h-2 rounded-full bg-emerald-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
