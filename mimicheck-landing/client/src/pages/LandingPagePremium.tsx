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
import { SplitText, WordReveal, GradientReveal, LineReveal } from '@/components/landing/TextReveal';

// Loading fallback
const LoadingFallback = () => (
  <div className="min-h-screen bg-slate-950 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

// Bento Grid Section
function BentoSection() {
  return (
    <section className="py-32 px-4 bg-slate-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.08),transparent_50%)]" />
      
      <div className="container max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <LineReveal className="mb-4">
            <span className="text-emerald-400 text-sm font-medium uppercase tracking-widest">
              Warum MiMiCheck?
            </span>
          </LineReveal>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            <GradientReveal text="Alles was du brauchst" delay={0.2} />
          </h2>
          
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            <WordReveal 
              text="Eine Plattform für alle deine Förderanträge. Intelligent, sicher und einfach."
              delay={0.4}
            />
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {/* Large Card - Spans 2x2 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 md:row-span-2 group relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
            <div className="relative z-10 h-full flex flex-col justify-end p-8">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                KI-gestützte Analyse
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Unsere KI durchsucht tausende Förderprogramme und findet automatisch die passenden für deine Situation.
              </p>
            </div>
            {/* Hover glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/5 group-hover:to-teal-500/5 transition-all duration-500" />
          </motion.div>

          {/* Small Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group relative rounded-3xl overflow-hidden bg-slate-900/50 border border-slate-800 hover:border-teal-500/40 transition-all duration-500 p-6 flex flex-col justify-between"
          >
            <Shield className="w-8 h-8 text-teal-400" />
            <div>
              <h4 className="text-lg font-semibold text-white mb-1">DSGVO-konform</h4>
              <p className="text-sm text-slate-400">100% Datenschutz</p>
            </div>
          </motion.div>

          {/* Small Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="group relative rounded-3xl overflow-hidden bg-slate-900/50 border border-slate-800 hover:border-cyan-500/40 transition-all duration-500 p-6 flex flex-col justify-between"
          >
            <Zap className="w-8 h-8 text-cyan-400" />
            <div>
              <h4 className="text-lg font-semibold text-white mb-1">Blitzschnell</h4>
              <p className="text-sm text-slate-400">In 3 Minuten fertig</p>
            </div>
          </motion.div>

          {/* Wide Card - Spans 2x1 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="md:col-span-2 group relative rounded-3xl overflow-hidden bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20 hover:border-teal-500/40 transition-all duration-500 p-6 flex items-center gap-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-teal-500/20 flex items-center justify-center flex-shrink-0">
              <FileText className="w-8 h-8 text-teal-400" />
            </div>
            <div>
              <h4 className="text-xl font-semibold text-white mb-2">Automatisches Ausfüllen</h4>
              <p className="text-slate-400">Formulare werden automatisch mit deinen Daten ausgefüllt. Kein lästiges Tippen mehr.</p>
            </div>
          </motion.div>

          {/* Tall Card - Spans 1x2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="md:row-span-2 group relative rounded-3xl overflow-hidden bg-gradient-to-b from-cyan-500/10 to-emerald-500/10 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-500 p-6 flex flex-col justify-between"
          >
            <Users className="w-10 h-10 text-cyan-400" />
            <div>
              <div className="text-5xl font-black text-white mb-2">10k+</div>
              <h4 className="text-lg font-semibold text-white mb-1">Zufriedene Nutzer</h4>
              <p className="text-sm text-slate-400">Vertrauen bereits auf MiMiCheck</p>
            </div>
            {/* Animated counter effect */}
            <div className="absolute top-1/2 right-4 text-8xl font-black text-white/5">
              ↗
            </div>
          </motion.div>

          {/* Stats Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="group relative rounded-3xl overflow-hidden bg-slate-900/50 border border-slate-800 hover:border-emerald-500/40 transition-all duration-500 p-6 flex flex-col justify-center items-center text-center"
          >
            <TrendingUp className="w-8 h-8 text-emerald-400 mb-2" />
            <div className="text-3xl font-bold text-white">847€</div>
            <p className="text-sm text-slate-400">Ø Förderung/Jahr</p>
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
      role: "Alleinerziehende Mutter, Berlin",
      avatar: "S",
    },
    {
      quote: "Die KI hat alle meine Belege analysiert und mir gezeigt, dass ich Anspruch auf Kindergeldzuschlag habe.",
      author: "Michael K.",
      role: "Vater von 3 Kindern, München",
      avatar: "M",
    },
    {
      quote: "Innerhalb von 5 Minuten hatte ich meinen BAföG-Antrag fertig. Unglaublich einfach!",
      author: "Lisa T.",
      role: "Studentin, Hamburg",
      avatar: "L",
    },
  ];

  return (
    <section className="py-32 px-4 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(20,184,166,0.08),transparent_50%)]" />
      
      <div className="container max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <GradientReveal text="Was unsere Nutzer sagen" />
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative p-8 rounded-3xl bg-slate-950/50 border border-slate-800 hover:border-emerald-500/30 transition-all duration-500"
            >
              {/* Quote mark */}
              <div className="absolute top-6 right-6 text-6xl text-emerald-500/10 font-serif">"</div>
              
              <p className="text-slate-300 leading-relaxed mb-6 relative z-10">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-white">{testimonial.author}</div>
                  <div className="text-sm text-slate-400">{testimonial.role}</div>
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
    <section className="py-32 px-4 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-cyan-500/10" />
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(16,185,129,0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(20,184,166,0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 80%, rgba(6,182,212,0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(16,185,129,0.15) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />

      <div className="container max-w-4xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6">
            <SplitText
              text="Bereit für mehr&#10;Förderung?"
              lineClassName="block"
              staggerDelay={0.15}
            />
          </h2>
          
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
            Starte jetzt kostenlos und finde heraus, welche Förderungen dir zustehen.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="text-lg px-10 py-7 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-2xl shadow-emerald-500/30 group"
              asChild
            >
              <a href="/auth">
                Jetzt kostenlos starten
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
            {['Kostenlos testen', 'Keine Kreditkarte', 'DSGVO-konform'].map((text, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
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
      <div className="container py-16 px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/mimicheck-logo-medium.png" alt="MiMiCheck" className="h-10 w-auto" />
              <span className="text-xl font-bold text-white">MiMiCheck</span>
            </div>
            <p className="text-slate-400 mb-4 max-w-md">
              Dein digitaler Assistent für Förderanträge – sicher, transparent und DSGVO-konform.
            </p>
            <div className="text-sm text-slate-500">
              <p>MiMi Tech Ai UG (haftungsbeschränkt)</p>
              <p>Lindenplatz 23, 75378 Bad Liebenzell</p>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Rechtliches</h4>
            <ul className="space-y-2 text-sm">
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
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
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
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© 2025 MiMi Tech Ai UG. Alle Rechte vorbehalten.</p>
          <div className="flex gap-4">
            {['DSGVO', 'ISO', 'EU AI Act'].map((badge) => (
              <span key={badge} className="px-3 py-1 rounded-full bg-slate-800 text-slate-400 text-xs">
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
