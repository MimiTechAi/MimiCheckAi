/**
 * Premium Landing Page - Award-Winning 2025 Design
 * 
 * Combines all killer features:
 * - Custom Cursor with Physics
 * - Gradient Mesh Background (Lusion-style)
 * - Text Reveal Animations
 * - Marquee Banners
 * - Premium Hero
 * 
 * Inspired by: Lusion, Basement Studio, Obys, Cuberto, Locomotive
 */

import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Sparkles, Shield, Zap, FileText, Users, TrendingUp, Star, Upload, Brain, Send, BadgeCheck, Clock, Euro, Award } from 'lucide-react';
import Navbar from '@/components/Navbar';
import CookieBanner from '@/components/CookieBanner';

// Lazy load heavy components
const CustomCursor = lazy(() => import('@/components/landing/CustomCursor'));
const HeroUltraPremium = lazy(() => import('@/components/landing/HeroUltraPremium'));
const GradientMeshBackground = lazy(() => import('@/components/landing/GradientMeshBackground'));

import { MarqueeHeadline, MarqueeTrust } from '@/components/landing/MarqueeText';

// Loading fallback
const LoadingFallback = () => (
  <div className="min-h-screen bg-slate-950 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

// Bento Grid Section
function BentoSection() {
  return (
    <section id="features" className="py-16 sm:py-24 lg:py-32 px-4 relative overflow-hidden">
      {/* Subtle overlay for contrast */}
      <div className="absolute inset-0 bg-slate-950/30 backdrop-blur-[1px]" />
      
      <div className="container max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="text-emerald-400 text-xs sm:text-sm font-medium uppercase tracking-widest mb-3 sm:mb-4 block">
            Warum MiMiCheck?
          </span>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            Alles was du brauchst
          </h2>
          
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto px-4">
            Eine Plattform für alle deine Förderanträge. Intelligent, sicher und einfach.
          </p>
        </motion.div>

        {/* Bento Grid - Mobile optimized */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 auto-rows-[160px] sm:auto-rows-[180px] lg:auto-rows-[200px]">
          {/* Large Card - Spans 2x2 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="sm:col-span-2 sm:row-span-2 group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-500/15 to-teal-500/10 border border-emerald-500/30 hover:border-emerald-400/50 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
            <div className="relative z-10 h-full flex flex-col justify-end p-5 sm:p-6 lg:p-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl sm:rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-3 sm:mb-4">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-emerald-400" />
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3">
                KI-gestützte Analyse
              </h3>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                Unsere KI durchsucht tausende Förderprogramme und findet automatisch die passenden für deine Situation.
              </p>
            </div>
          </motion.div>

          {/* Small Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            whileHover={{ scale: 1.05, y: -3 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900/70 backdrop-blur-sm border border-slate-700/50 hover:border-teal-400/50 hover:bg-slate-800/80 hover:shadow-xl hover:shadow-teal-500/10 transition-all duration-300 p-4 sm:p-5 lg:p-6 flex flex-col justify-between"
          >
            <Shield className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-teal-400 group-hover:scale-110 transition-transform duration-300" />
            <div>
              <h4 className="text-base sm:text-lg font-semibold text-white mb-0.5 sm:mb-1">DSGVO-konform</h4>
              <p className="text-xs sm:text-sm text-slate-400">100% Datenschutz</p>
            </div>
          </motion.div>

          {/* Small Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            whileHover={{ scale: 1.05, y: -3 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900/70 backdrop-blur-sm border border-slate-700/50 hover:border-cyan-400/50 hover:bg-slate-800/80 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 p-4 sm:p-5 lg:p-6 flex flex-col justify-between"
          >
            <Zap className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
            <div>
              <h4 className="text-base sm:text-lg font-semibold text-white mb-0.5 sm:mb-1">Blitzschnell</h4>
              <p className="text-xs sm:text-sm text-slate-400">In 3 Minuten fertig</p>
            </div>
          </motion.div>

          {/* Wide Card - Spans 2x1 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            whileHover={{ scale: 1.02, y: -3 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="sm:col-span-2 group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r from-teal-500/15 to-cyan-500/10 border border-teal-500/30 hover:border-teal-400/50 hover:shadow-xl hover:shadow-teal-500/15 transition-all duration-300 p-4 sm:p-5 lg:p-6 flex items-center gap-4 sm:gap-6"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-teal-500/20 flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-teal-400" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-1 sm:mb-2">Automatisches Ausfüllen</h4>
              <p className="text-xs sm:text-sm lg:text-base text-slate-400">Formulare werden automatisch ausgefüllt.</p>
            </div>
          </motion.div>

          {/* Tall Card - Spans 1x2 - Hidden on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            whileHover={{ scale: 1.03, y: -5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="hidden lg:flex lg:row-span-2 group relative rounded-3xl overflow-hidden bg-gradient-to-b from-cyan-500/15 to-emerald-500/10 border border-cyan-500/30 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 p-6 flex-col justify-between"
          >
            <Users className="w-8 h-8 lg:w-10 lg:h-10 text-cyan-400" />
            <div>
              <div className="text-4xl lg:text-5xl font-black text-white mb-2">10k+</div>
              <h4 className="text-base lg:text-lg font-semibold text-white mb-1">Zufriedene Nutzer</h4>
              <p className="text-xs sm:text-sm text-slate-400">Vertrauen auf MiMiCheck</p>
            </div>
          </motion.div>

          {/* Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            whileHover={{ scale: 1.05, y: -3 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900/70 backdrop-blur-sm border border-slate-700/50 hover:border-emerald-400/50 hover:bg-slate-800/80 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 p-4 sm:p-5 lg:p-6 flex flex-col justify-center items-center text-center"
          >
            <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-emerald-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300" />
            <div className="text-2xl sm:text-3xl font-bold text-white">847€</div>
            <p className="text-xs sm:text-sm text-slate-400">Ø Förderung/Jahr</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// How it Works Section - Animated Steps
function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      icon: Upload,
      title: 'Daten hochladen',
      description: 'Lade deine Dokumente hoch oder beantworte ein paar einfache Fragen zu deiner Situation.',
      color: 'emerald',
    },
    {
      number: '02',
      icon: Brain,
      title: 'KI analysiert',
      description: 'Unsere KI prüft über 1.000 Förderprogramme und findet alle passenden Optionen für dich.',
      color: 'teal',
    },
    {
      number: '03',
      icon: Send,
      title: 'Antrag absenden',
      description: 'Mit einem Klick werden deine Anträge automatisch ausgefüllt und eingereicht.',
      color: 'cyan',
    },
  ];

  return (
    <section className="py-16 sm:py-24 lg:py-32 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-[1px]" />
      
      <div className="container max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-20"
        >
          <span className="text-emerald-400 text-xs sm:text-sm font-medium uppercase tracking-widest mb-3 block">
            So funktioniert's
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            In 3 Schritten zur Förderung
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Einfacher geht's nicht. Keine Bürokratie, keine Wartezeiten.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-emerald-500/50 to-transparent" />
              )}
              
              <div className="relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-slate-900/70 backdrop-blur-sm border border-slate-700/50 hover:border-emerald-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10">
                {/* Step number */}
                <div className="absolute -top-4 -right-2 text-6xl sm:text-7xl font-black text-slate-800/50 select-none">
                  {step.number}
                </div>
                
                {/* Icon */}
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-${step.color}-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className={`w-7 h-7 sm:w-8 sm:h-8 text-${step.color}-400`} />
                </div>
                
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Stats Showcase Section
function StatsShowcase() {
  const stats = [
    { value: '10.000+', label: 'Zufriedene Nutzer', icon: Users },
    { value: '847€', label: 'Ø Förderung pro Jahr', icon: Euro },
    { value: '98%', label: 'Erfolgsquote', icon: BadgeCheck },
    { value: '<5 Min', label: 'Durchschnittliche Antragszeit', icon: Clock },
  ];

  return (
    <section className="py-16 sm:py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent" />
      
      <div className="container max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group text-center p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-slate-900/50 backdrop-blur-sm border border-slate-800 hover:border-emerald-500/30 transition-all duration-300"
            >
              <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-slate-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonials Section - Echte Testimonials mit Fotos
function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Endlich verstehe ich, welche Förderungen mir zustehen. MiMiCheck hat mir geholfen, über 2.000€ Wohngeld zu beantragen.",
      author: "Sarah M.",
      role: "Alleinerziehende Mutter",
      // Real avatar from UI Faces
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      rating: 5,
    },
    {
      quote: "Die KI hat alle meine Belege analysiert und mir gezeigt, dass ich Anspruch auf Kindergeldzuschlag habe. Fantastisch!",
      author: "Michael K.",
      role: "Vater von 3 Kindern",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rating: 5,
    },
    {
      quote: "Innerhalb von 5 Minuten hatte ich meinen BAföG-Antrag fertig. Unglaublich einfach und zeitsparend!",
      author: "Lisa T.",
      role: "Studentin, TU München",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 sm:py-24 lg:py-32 px-4 relative overflow-hidden">
      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]" />
      
      <div className="container max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="text-emerald-400 text-xs sm:text-sm font-medium uppercase tracking-widest mb-3 block">
            Kundenstimmen
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Was unsere Nutzer sagen
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Über 10.000 zufriedene Nutzer vertrauen auf MiMiCheck
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-slate-900/70 backdrop-blur-sm border border-slate-700/50 hover:border-emerald-400/50 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 relative z-10">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center gap-3 sm:gap-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.author}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover ring-2 ring-emerald-500/20"
                  loading="lazy"
                />
                <div>
                  <div className="font-semibold text-white text-sm sm:text-base">{testimonial.author}</div>
                  <div className="text-xs sm:text-sm text-slate-400">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-slate-400"
        >
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=face" className="w-8 h-8 rounded-full border-2 border-slate-950" alt="" />
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face" className="w-8 h-8 rounded-full border-2 border-slate-950" alt="" />
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face" className="w-8 h-8 rounded-full border-2 border-slate-950" alt="" />
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" className="w-8 h-8 rounded-full border-2 border-slate-950" alt="" />
            </div>
            <span>10.000+ aktive Nutzer</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>4.9/5.0 Bewertung</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Förderungen Preview Section
function FoerderungenPreview() {
  const foerderungen = [
    { name: 'Wohngeld', amount: 'bis 600€/Monat', icon: '🏠', color: 'emerald' },
    { name: 'Kindergeld', amount: '250€/Kind', icon: '👶', color: 'teal' },
    { name: 'BAföG', amount: 'bis 934€/Monat', icon: '🎓', color: 'cyan' },
    { name: 'Elterngeld', amount: 'bis 1.800€/Monat', icon: '👨‍👩‍👧', color: 'emerald' },
    { name: 'Bürgergeld', amount: '563€ + Miete', icon: '💼', color: 'teal' },
    { name: 'Kinderzuschlag', amount: 'bis 292€/Kind', icon: '🧒', color: 'cyan' },
  ];

  return (
    <section className="py-16 sm:py-24 lg:py-32 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-slate-950/30" />
      
      <div className="container max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-emerald-400 text-xs sm:text-sm font-medium uppercase tracking-widest mb-3 block">
            Verfügbare Förderungen
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Diese Förderungen warten auf dich
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Finde heraus, welche Förderungen dir zustehen – kostenlos und unverbindlich.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {foerderungen.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl bg-slate-900/70 backdrop-blur-sm border border-slate-700/50 hover:border-emerald-400/50 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 cursor-pointer"
            >
              <div className="text-3xl sm:text-4xl mb-3">{item.icon}</div>
              <h4 className="text-base sm:text-lg font-semibold text-white mb-1">{item.name}</h4>
              <p className="text-sm sm:text-base text-emerald-400 font-medium">{item.amount}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8 sm:mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            className="border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-500/10 text-white"
            asChild
          >
            <a href="/auth">
              Alle Förderungen entdecken
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

// Final CTA Section
function FinalCTA() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 px-4 relative overflow-hidden">
      {/* Glowing overlay for CTA emphasis */}
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/5 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.15),transparent_70%)]" />

      <div className="container max-w-4xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-6">
            Bereit für mehr<br />Förderung?
          </h2>
          
          <p className="text-base sm:text-lg lg:text-xl text-slate-400 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
            Starte jetzt kostenlos und finde heraus, welche Förderungen dir zustehen.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4">
            <Button
              size="lg"
              className="text-sm sm:text-base lg:text-lg px-6 sm:px-8 lg:px-10 py-5 sm:py-6 lg:py-7 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-xl shadow-emerald-500/25 group w-full sm:w-auto"
              asChild
            >
              <a href="/auth">
                Jetzt kostenlos starten
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-400">
            {['Kostenlos testen', 'Keine Kreditkarte', 'DSGVO-konform'].map((text, i) => (
              <div key={i} className="flex items-center gap-1.5 sm:gap-2">
                <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Premium Footer
function PremiumFooter() {
  return (
    <footer className="relative bg-slate-950 border-t border-slate-800">
      {/* Gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
      
      <div className="container py-12 sm:py-16 lg:py-20 px-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-16">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
              <img src="/mimicheck-logo-medium.png" alt="MiMiCheck" className="h-9 sm:h-11 w-auto" />
              <span className="text-xl sm:text-2xl font-bold text-white">MiMiCheck</span>
            </div>
            <p className="text-sm sm:text-base text-slate-400 mb-5 max-w-sm leading-relaxed">
              Dein digitaler Assistent für Förderanträge. KI-gestützt, sicher und 100% DSGVO-konform.
            </p>
            
            {/* Trust badges */}
            <div className="flex flex-wrap gap-2 mb-5">
              {['🇩🇪 Made in Germany', '🔒 DSGVO', '🤖 EU AI Act'].map((badge) => (
                <span key={badge} className="px-3 py-1.5 rounded-full bg-slate-800/80 text-slate-300 text-xs font-medium">
                  {badge}
                </span>
              ))}
            </div>
            
            <div className="text-xs sm:text-sm text-slate-500">
              <p className="font-medium text-slate-400">MiMi Tech Ai UG (haftungsbeschränkt)</p>
              <p>Lindenplatz 23, 75378 Bad Liebenzell</p>
              <p className="mt-1">info@mimicheck.de</p>
            </div>
          </div>

          {/* Förderungen */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm sm:text-base">Förderungen</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {['Wohngeld', 'Kindergeld', 'BAföG', 'Elterngeld', 'Bürgergeld'].map((item) => (
                <li key={item}>
                  <a href="/auth" className="text-slate-400 hover:text-emerald-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Rechtliches */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm sm:text-base">Rechtliches</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {[
                { href: '/impressum', label: 'Impressum' },
                { href: '/datenschutz', label: 'Datenschutz' },
                { href: '/agb', label: 'AGB' },
                { href: '/barrierefreiheit', label: 'Barrierefreiheit' },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-slate-400 hover:text-emerald-400 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm sm:text-base">Support</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {[
                { href: '/contact', label: 'Kontakt' },
                { href: '/hilfe', label: 'Hilfe & FAQ' },
                { href: '/auth', label: 'Anmelden' },
                { href: '/ki-transparenz', label: 'KI-Transparenz' },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-slate-400 hover:text-emerald-400 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-slate-800/50 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-slate-500">
          <p>© 2025 MiMi Tech Ai UG. Alle Rechte vorbehalten.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-500" />
              <span>Trusted by 10.000+ users</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main Landing Page Component
export default function LandingPagePremium() {
  return (
    <div className="min-h-screen bg-slate-950 relative">
      {/* Animated Gradient Mesh Background - Lusion Style */}
      <Suspense fallback={null}>
        <GradientMeshBackground />
      </Suspense>

      {/* Custom Cursor - Desktop only */}
      <Suspense fallback={null}>
        <CustomCursor />
      </Suspense>

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Suspense fallback={<LoadingFallback />}>
        <HeroUltraPremium />
      </Suspense>

      {/* Trust Marquee */}
      <MarqueeTrust 
        items={['DSGVO-konform', 'EU AI Act', 'ISO zertifiziert', 'Made in Germany', '10.000+ Nutzer']} 
      />

      {/* Bento Grid Features */}
      <BentoSection />

      {/* How it Works */}
      <HowItWorksSection />

      {/* Big Statement Marquee */}
      <MarqueeHeadline text="Förderungen automatisiert" className="bg-slate-900/50" />

      {/* Stats Section */}
      <StatsShowcase />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Förderungen Preview */}
      <FoerderungenPreview />

      {/* Final CTA */}
      <FinalCTA />

      {/* Footer */}
      <PremiumFooter />

      {/* Cookie Banner */}
      <CookieBanner />
    </div>
  );
}
