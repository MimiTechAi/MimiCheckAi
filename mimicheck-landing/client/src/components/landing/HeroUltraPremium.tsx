/**
 * Ultra Premium Hero Section - Award-Winning 2025 Design
 * 
 * Combines all killer features:
 * - Morphing Blob Background
 * - Split-Screen Layout
 * - Text Reveal Animations
 * - Marquee Banner
 * - Magnetic CTA
 * - Custom Cursor integration
 * 
 * Inspired by: Lusion, Basement Studio, Obys, Cuberto
 */

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Shield, Zap } from 'lucide-react';
import { SplitText, WordReveal } from './TextReveal';
import MarqueeText from './MarqueeText';

// Magnetic Button Component
interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  size?: string;
  variant?: string;
  asChild?: boolean;
}

function MagneticButton({ children, className = '', ...props }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Button ref={buttonRef} className={className} {...props}>
        {children}
      </Button>
    </motion.div>
  );
}

// Floating Badge Component
function FloatingBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm mb-8"
    >
      <motion.span 
        className="relative flex h-2 w-2"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </motion.span>
      <span className="text-emerald-400 text-sm font-medium tracking-wide">
        KI-gestützte Förderanträge
      </span>
    </motion.div>
  );
}

// Noise Texture Overlay
function NoiseOverlay() {
  return (
    <div
      className="absolute inset-0 opacity-[0.015] pointer-events-none z-10"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
      }}
    />
  );
}

// Grid Pattern
function GridPattern() {
  return (
    <div 
      className="absolute inset-0 opacity-[0.03] pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(16,185,129,0.5) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(16,185,129,0.5) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }}
    />
  );
}

// Animated Orbs (CSS-based for performance)
function AnimatedOrbs() {
  return (
    <>
      {/* Primary Orb */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          x: [0, 100, 50, 0],
          y: [0, -50, 50, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Secondary Orb */}
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(20,184,166,0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          x: [0, -80, -40, 0],
          y: [0, 60, -30, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Accent Orb */}
      <motion.div
        className="absolute top-1/2 right-1/3 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -40, 80, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
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
      transition={{ delay: 1.2, duration: 0.8 }}
      className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-slate-400"
    >
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 + i * 0.1 }}
          className="flex items-center gap-2 group"
        >
          <item.icon className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-transform" />
          <span className="group-hover:text-emerald-400 transition-colors">{item.text}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}

// Stats Section
function StatsSection() {
  const stats = [
    { value: '847€', label: 'Ø Förderung' },
    { value: '<5 Min', label: 'Antragszeit' },
    { value: '98%', label: 'Erfolgsquote' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      className="grid grid-cols-3 gap-4 mt-12"
    >
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.6 + i * 0.1, type: 'spring' }}
          className="text-center p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-emerald-500/30 transition-colors"
        >
          <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
          <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function HeroUltraPremium() {
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-slate-950"
    >
      {/* Background Layers */}
      <NoiseOverlay />
      <GridPattern />
      <AnimatedOrbs />

      {/* Main Content */}
      <motion.div 
        className="relative z-20 container mx-auto px-6 py-20 lg:py-32"
        style={{ y, opacity, scale }}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Text */}
          <div className="text-center lg:text-left">
            <FloatingBadge />

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-6">
              <SplitText
                text="Förderungen"
                className="block"
                lineClassName="text-white"
                delay={0.3}
              />
              <SplitText
                text="automatisiert."
                className="block mt-2"
                lineClassName="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent"
                delay={0.5}
              />
            </h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              <WordReveal
                text="Spare Zeit und Nerven mit intelligenter Antragsautomatisierung. KI-gestützt, sicher und DSGVO-konform."
                delay={0.9}
                highlightWords={['KI-gestützt', 'sicher', 'DSGVO-konform']}
                highlightClassName="text-emerald-400 font-medium"
              />
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <MagneticButton
                size="lg"
                className="magnetic-btn text-lg px-8 py-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-2xl shadow-emerald-500/30 group relative overflow-hidden"
                asChild
              >
                <a href="/auth">
                  <span className="relative z-10">Jetzt kostenlos starten</span>
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </a>
              </MagneticButton>

              <MagneticButton
                size="lg"
                variant="outline"
                className="magnetic-btn text-lg px-8 py-6 border-2 border-slate-700 hover:border-emerald-500/50 hover:bg-emerald-500/5 backdrop-blur-sm"
                asChild
              >
                <a href="#features">
                  <Sparkles className="mr-2 w-5 h-5" />
                  Demo ansehen
                </a>
              </MagneticButton>
            </motion.div>

            {/* Trust Indicators */}
            <TrustIndicators />
          </div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ delay: 0.6, duration: 1, type: 'spring' }}
            className="relative hidden lg:block"
          >
            {/* 3D Card Stack Effect */}
            <div className="relative perspective-1000">
              {/* Back Card */}
              <motion.div
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 border border-white/10 backdrop-blur-sm"
                style={{ transform: 'translateZ(-40px) translateX(40px) translateY(40px)' }}
                animate={{ 
                  rotateY: [0, 2, 0],
                  rotateX: [0, -2, 0],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              />
              
              {/* Middle Card */}
              <motion.div
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-white/10 backdrop-blur-sm"
                style={{ transform: 'translateZ(-20px) translateX(20px) translateY(20px)' }}
                animate={{ 
                  rotateY: [0, -2, 0],
                  rotateX: [0, 2, 0],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />
              
              {/* Front Card - Main Content */}
              <motion.div
                className="relative rounded-3xl bg-slate-900/80 border border-emerald-500/20 backdrop-blur-xl p-8 shadow-2xl"
                animate={{ 
                  rotateY: [0, 1, 0],
                  rotateX: [0, -1, 0],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                {/* Mock Dashboard Preview */}
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">MiMiCheck</div>
                        <div className="text-xs text-slate-400">Dashboard</div>
                      </div>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium">
                      3 neue Förderungen
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Gefunden', value: '12' },
                      { label: 'Beantragt', value: '8' },
                      { label: 'Genehmigt', value: '6' },
                    ].map((stat, i) => (
                      <div key={i} className="p-3 rounded-xl bg-slate-800/50 text-center">
                        <div className="text-xl font-bold text-white">{stat.value}</div>
                        <div className="text-xs text-slate-400">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Progress Bar */}
                  <div className="p-4 rounded-xl bg-slate-800/50">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">Wohngeld-Antrag</span>
                      <span className="text-emerald-400">75%</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '75%' }}
                        transition={{ delay: 1.5, duration: 1, ease: 'easeOut' }}
                      />
                    </div>
                  </div>

                  {/* Action Items */}
                  <div className="space-y-2">
                    {[
                      { text: 'Einkommensnachweis hochladen', done: true },
                      { text: 'Mietvertrag prüfen', done: true },
                      { text: 'Antrag unterschreiben', done: false },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/30">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${item.done ? 'bg-emerald-500' : 'border-2 border-slate-600'}`}>
                          {item.done && <span className="text-white text-xs">✓</span>}
                        </div>
                        <span className={`text-sm ${item.done ? 'text-slate-400 line-through' : 'text-white'}`}>
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Stats below card */}
            <StatsSection />
          </motion.div>
        </div>
      </motion.div>

      {/* Marquee Banner at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <MarqueeText
          speed="slow"
          className="py-4 border-t border-emerald-500/10 bg-slate-950/80 backdrop-blur-sm"
          separator={<span className="mx-8 text-emerald-500/50">◆</span>}
        >
          <span className="text-sm font-medium text-slate-500 uppercase tracking-widest">
            Wohngeld • Kindergeld • BAföG • Elterngeld • Bürgergeld • Kinderzuschlag
          </span>
        </MarqueeText>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-slate-600 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 rounded-full bg-emerald-500"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
