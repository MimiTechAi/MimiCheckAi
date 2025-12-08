/**
 * Premium Landing Page - Award-Winning 2025 Design
 * 
 * Combines all killer features:
 * - Custom Cursor with Physics
 * - Morphing Blob Background
 * - Text Reveal Animations
 * - Horizontal Scroll Section
 * - Marquee Banners
 * - Premium Hero
 * 
 * Inspired by: Lusion, Basement Studio, Obys, Cuberto, Locomotive
 */

import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Sparkles, Shield, Zap, FileText, Users, TrendingUp } from 'lucide-react';
import Navbar from '@/components/Navbar';
import CookieBanner from '@/components/CookieBanner';

// Lazy load heavy components
const CustomCursor = lazy(() => import('@/components/landing/CustomCursor'));
const HeroUltraPremium = lazy(() => import('@/components/landing/HeroUltraPremium'));

import { MarqueeHeadline, MarqueeTrust } from '@/components/landing/MarqueeText';
import { SplitText, WordReveal } from '@/components/landing/TextReveal';

// Loading fallback
const LoadingFallback = () => (
  <div className="min-h-screen bg-slate-950 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

// Bento Grid Section
function BentoSection() {
  return (
    <section id="features" className="py-16 sm:py-24 lg:py-32 px-4 bg-slate-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.08),transparent_50%)]" />
      
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
            className="sm:col-span-2 sm:row-span-2 group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 hover:border-emerald-500/40 transition-colors duration-300"
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
            className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900/50 border border-slate-800 hover:border-teal-500/40 transition-colors duration-300 p-4 sm:p-5 lg:p-6 flex flex-col justify-between"
          >
            <Shield className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-teal-400" />
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
            className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900/50 border border-slate-800 hover:border-cyan-500/40 transition-colors duration-300 p-4 sm:p-5 lg:p-6 flex flex-col justify-between"
          >
            <Zap className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-cyan-400" />
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
            className="sm:col-span-2 group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20 hover:border-teal-500/40 transition-colors duration-300 p-4 sm:p-5 lg:p-6 flex items-center gap-4 sm:gap-6"
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
            className="hidden lg:flex lg:row-span-2 group relative rounded-3xl overflow-hidden bg-gradient-to-b from-cyan-500/10 to-emerald-500/10 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors duration-300 p-6 flex-col justify-between"
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
            className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900/50 border border-slate-800 hover:border-emerald-500/40 transition-colors duration-300 p-4 sm:p-5 lg:p-6 flex flex-col justify-center items-center text-center"
          >
            <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-emerald-400 mb-1 sm:mb-2" />
            <div className="text-2xl sm:text-3xl font-bold text-white">847€</div>
            <p className="text-xs sm:text-sm text-slate-400">Ø Förderung/Jahr</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Endlich verstehe ich, welche Förderungen mir zustehen. MiMiCheck hat mir geholfen, über 2.000€ Wohngeld zu beantragen.",
      author: "Sarah M.",
      role: "Alleinerziehende Mutter",
      avatar: "S",
    },
    {
      quote: "Die KI hat alle meine Belege analysiert und mir gezeigt, dass ich Anspruch auf Kindergeldzuschlag habe.",
      author: "Michael K.",
      role: "Vater von 3 Kindern",
      avatar: "M",
    },
    {
      quote: "Innerhalb von 5 Minuten hatte ich meinen BAföG-Antrag fertig. Unglaublich einfach!",
      author: "Lisa T.",
      role: "Studentin",
      avatar: "L",
    },
  ];

  return (
    <section className="py-16 sm:py-24 lg:py-32 px-4 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(20,184,166,0.08),transparent_50%)]" />
      
      <div className="container max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Was unsere Nutzer sagen
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              className="group relative p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-slate-950/50 border border-slate-800 hover:border-emerald-500/30 transition-colors duration-300"
            >
              {/* Quote mark */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 text-4xl sm:text-6xl text-emerald-500/10 font-serif">"</div>
              
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-4 sm:mb-6 relative z-10">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm sm:text-base">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-white text-sm sm:text-base">{testimonial.author}</div>
                  <div className="text-xs sm:text-sm text-slate-400">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Final CTA Section
function FinalCTA() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 px-4 relative overflow-hidden">
      {/* Static gradient background - better performance */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-cyan-500/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_60%)]" />

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
      <div className="container py-10 sm:py-12 lg:py-16 px-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <img src="/mimicheck-logo-medium.png" alt="MiMiCheck" className="h-8 sm:h-10 w-auto" />
              <span className="text-lg sm:text-xl font-bold text-white">MiMiCheck</span>
            </div>
            <p className="text-sm sm:text-base text-slate-400 mb-3 sm:mb-4 max-w-md">
              Dein digitaler Assistent für Förderanträge – sicher und DSGVO-konform.
            </p>
            <div className="text-xs sm:text-sm text-slate-500">
              <p>MiMi Tech Ai UG (haftungsbeschränkt)</p>
              <p>Lindenplatz 23, 75378 Bad Liebenzell</p>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">Rechtliches</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {[
                { href: '/impressum', label: 'Impressum' },
                { href: '/datenschutz', label: 'Datenschutz' },
                { href: '/agb', label: 'AGB' },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-slate-400 hover:text-emerald-400 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">Support</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {[
                { href: '/contact', label: 'Kontakt' },
                { href: '/auth', label: 'Anmelden' },
                { href: '/#features', label: 'Förderungen' },
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
        <div className="pt-6 sm:pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm text-slate-500">
          <p>© 2025 MiMi Tech Ai UG</p>
          <div className="flex gap-2 sm:gap-4">
            {['DSGVO', 'ISO', 'EU AI Act'].map((badge) => (
              <span key={badge} className="px-2 sm:px-3 py-1 rounded-full bg-slate-800 text-slate-400 text-[10px] sm:text-xs">
                {badge}
              </span>
            ))}
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

      {/* Big Statement Marquee */}
      <MarqueeHeadline text="Förderungen automatisiert" className="bg-slate-900" />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Final CTA */}
      <FinalCTA />

      {/* Footer */}
      <PremiumFooter />

      {/* Cookie Banner */}
      <CookieBanner />
    </div>
  );
}
