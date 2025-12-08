import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, CheckCircle2 } from 'lucide-react';

/**
 * Ultra-Modern Hero Section 2025
 * Inspired by: Framer, Linear, Vercel, Apple
 * 
 * Features:
 * - MASSIVE Bold Typography
 * - Gradient Text
 * - Animated Background Orbs
 * - Glassmorphism Cards
 * - Magnetic Buttons
 * - Scroll Indicator
 */
export default function HeroUltraModern() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background Orbs - SUPER VISIBLE */}
      <div className="absolute inset-0 -z-10">
        {/* Orb 1 - Emerald */}
        <motion.div
          className="absolute top-20 left-10 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(16,185,129,0.4) 0%, rgba(16,185,129,0.1) 50%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Orb 2 - Teal */}
        <motion.div
          className="absolute top-40 right-10 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(20,184,166,0.3) 0%, rgba(20,184,166,0.1) 50%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Orb 3 - Cyan */}
        <motion.div
          className="absolute bottom-20 left-1/3 w-[550px] h-[550px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.35) 0%, rgba(6,182,212,0.1) 50%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{
            x: [0, 60, 0],
            y: [0, -60, 0],
            scale: [1, 1.25, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(16,185,129,0.5) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(16,185,129,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm mb-8"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-300">
              KI-gestützt • DSGVO-konform • EU AI Act
            </span>
          </motion.div>

          {/* Headline - MASSIVE */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-[1.1]"
          >
            <span className="block text-white">Deine Anträge.</span>
            <span 
              className="block bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent"
              style={{
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Automatisiert.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-3xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Spare Zeit und Nerven mit intelligenter Antragsautomatisierung.{' '}
            <span className="text-emerald-400 font-semibold">KI-gestützt</span>,{' '}
            <span className="text-teal-400 font-semibold">sicher</span> und{' '}
            <span className="text-cyan-400 font-semibold">DSGVO-konform</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Button 
              size="lg" 
              className="text-lg px-10 py-7 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-2xl shadow-emerald-500/50 group relative overflow-hidden"
              asChild
            >
              <a href="/auth" className="relative z-10">
                <span className="relative z-10">Jetzt kostenlos starten</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              </a>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-10 py-7 border-2 border-emerald-500/50 hover:border-emerald-500 hover:bg-emerald-500/10 backdrop-blur-sm"
              asChild
            >
              <a href="#features">
                <Zap className="mr-2 w-5 h-5" />
                Demo ansehen
              </a>
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-8 text-sm text-slate-400"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Kostenlos testen</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Keine Kreditkarte nötig</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>10.000+ Nutzer</span>
            </div>
          </motion.div>

          {/* Glassmorphism Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-4xl mx-auto"
          >
            {[
              { value: '847€', label: 'Durchschnittliche Förderung', icon: '💰' },
              { value: '< 5 Min', label: 'Antrag ausfüllen', icon: '⚡' },
              { value: '98%', label: 'Erfolgsquote', icon: '✅' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                className="relative group"
              >
                {/* Glassmorphism Card */}
                <div className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105">
                  {/* Glow Effect on Hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/10 group-hover:to-teal-500/10 transition-all duration-300" />
                  
                  <div className="relative z-10">
                    <div className="text-4xl mb-3">{stat.icon}</div>
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-400">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-emerald-500/50 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-emerald-400"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
