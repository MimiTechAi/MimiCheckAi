import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, Upload, Sparkles, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';

import HeroSOTA from '@/components/landing/HeroSOTA';
import ScrollStory from '@/components/landing/ScrollStory';
import QuoteSlide from '@/components/landing/QuoteSlide';
import CTAEnhanced from '@/components/landing/CTAEnhanced';
import CookieBanner from '@/components/CookieBanner';

export default function LandingPage() {

  return (
    <div className="min-h-screen bg-background">
      <div id="main-content" />
      <Navbar />

      {/* Hero Section - SOTA 2025 */}
      <HeroSOTA />

      {/* Scroll Story 1: Upload */}
      <ScrollStory
        title="Dokumente hochladen"
        description="Lade deine Abrechnungen, Belege und Nachweise einfach hoch. Unsere KI erkennt automatisch relevante Informationen und prüft, welche Förderungen für dich in Frage kommen. Drag & Drop oder Datei auswählen – fertig."
        imageUrl="/story-upload.jpg"
        imageAlt="Person lädt Dokumente hoch"
      />

      {/* Scroll Story 2: AI Analysis */}
      <ScrollStory
        title="KI analysiert"
        description="Unsere KI durchsucht tausende Förderprogramme und findet die passenden Leistungen für dich. Sie prüft Anspruchsvoraussetzungen und bereitet alle Formulare automatisch vor. EU AI Act konform & transparent."
        imageUrl="/story-ai-analysis.jpg"
        imageAlt="KI analysiert Dokumente"
        reverse
      />

      {/* Scroll Story 3: Success */}
      <ScrollStory
        title="Geld erhalten"
        description="Prüfe die KI-vorbereiteten Anträge in Sekunden, reiche sie digital ein und verfolge den Status in Echtzeit. Vollautomatisch und sicher."
        stat="847€"
        statLabel="Mehr Förderung pro Jahr"
        imageUrl="/story-success-v2.jpg"
        imageAlt="Erfolgreiche Förderung genehmigt"
      />

      {/* Wie es funktioniert - 3 Steps */}
      <section className="py-32 px-4 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.15),transparent_70%)]" />
        
        <div className="container max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-teal-600 bg-clip-text text-transparent">
              So einfach geht's
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              In nur 3 Schritten zu deiner Förderung
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              <div className="absolute -top-6 -left-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-3xl font-bold text-white shadow-2xl shadow-emerald-500/50">
                1
              </div>
              <div className="pt-12 pl-12">
                <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
                  <Upload className="w-10 h-10 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Dokumente hochladen
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Lade deine Belege und Nachweise hoch. Drag & Drop oder Datei auswählen – fertig in Sekunden.
                </p>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -top-6 -left-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-3xl font-bold text-white shadow-2xl shadow-teal-500/50">
                2
              </div>
              <div className="pt-12 pl-12">
                <div className="w-20 h-20 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-6">
                  <Sparkles className="w-10 h-10 text-teal-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  KI analysiert
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Unsere KI durchsucht tausende Förderprogramme und findet die passenden für dich. Vollautomatisch.
                </p>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              <div className="absolute -top-6 -left-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-3xl font-bold text-white shadow-2xl shadow-cyan-500/50">
                3
              </div>
              <div className="pt-12 pl-12">
                <div className="w-20 h-20 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Antrag einreichen
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Prüfe die vorbereiteten Anträge und reiche sie digital ein. Status-Tracking inklusive.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quote Slide 1 */}
      <QuoteSlide
        quote="Endlich verstehe ich, welche Förderungen mir zustehen. MiMiCheck hat mir geholfen, über 2.000€ Wohngeld zu beantragen – einfach und schnell!"
        author="Sarah M."
        role="Alleinerziehende Mutter, Berlin"
        bgColor="bg-gradient-to-br from-emerald-500/10 to-teal-500/10"
      />

      {/* Quote Slide 2 */}
      <QuoteSlide
        quote="Die KI hat alle meine Belege analysiert und mir gezeigt, dass ich Anspruch auf Kindergeldzuschlag habe. Das hätte ich alleine nie herausgefunden."
        author="Michael K."
        role="Vater von 3 Kindern, München"
        bgColor="bg-gradient-to-br from-teal-500/10 to-cyan-500/10"
      />

      {/* Förderungen Section - SOTA 2025 mit konsistenten Farben */}
      <section id="features" className="py-32 px-4 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98120_1px,transparent_1px),linear-gradient(to_bottom,#10b98120_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        <div className="container max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-teal-600 bg-clip-text text-transparent">
              Diese Förderungen findest du
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Unsere KI durchsucht automatisch alle relevanten Förderprogramme für deine Situation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Wohngeld Card - Emerald Theme */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group relative aspect-square rounded-3xl overflow-hidden shadow-2xl cursor-pointer border border-emerald-500/20 hover:border-emerald-500/50 transition-all duration-500"
            >
              {/* Glassmorphism Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-600/10 backdrop-blur-sm" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
              
              {/* Animated Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-teal-600/0 group-hover:from-emerald-500/20 group-hover:to-teal-600/20 transition-all duration-700" />
              
              {/* Content */}
              <div className="relative z-10 p-10 h-full flex flex-col justify-end">
                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/50">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                  Wohngeld
                </h3>
                <p className="text-slate-300 text-lg leading-relaxed">
                  Bis zu <span className="text-emerald-400 font-semibold">3.600€ pro Jahr</span> für Miete oder Eigentum. Automatische Prüfung deiner Anspruchsvoraussetzungen.
                </p>
              </div>
            </motion.div>

            {/* Kindergeld Card - Teal Theme */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative aspect-square rounded-3xl overflow-hidden shadow-2xl cursor-pointer border border-teal-500/20 hover:border-teal-500/50 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-cyan-600/10 backdrop-blur-sm" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 to-cyan-600/0 group-hover:from-teal-500/20 group-hover:to-cyan-600/20 transition-all duration-700" />
              
              <div className="relative z-10 p-10 h-full flex flex-col justify-end">
                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 shadow-lg shadow-teal-500/50">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                  Kindergeld & Zuschlag
                </h3>
                <p className="text-slate-300 text-lg leading-relaxed">
                  <span className="text-teal-400 font-semibold">250€ pro Kind</span> + bis zu 292€ Zuschlag. Wir prüfen alle Varianten für dich.
                </p>
              </div>
            </motion.div>

            {/* Elterngeld Card - Emerald Theme */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group relative aspect-square rounded-3xl overflow-hidden shadow-2xl cursor-pointer border border-emerald-500/20 hover:border-emerald-500/50 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-600/10 backdrop-blur-sm" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-teal-600/0 group-hover:from-emerald-500/20 group-hover:to-teal-600/20 transition-all duration-700" />
              
              <div className="relative z-10 p-10 h-full flex flex-col justify-end">
                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/50">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                  Elterngeld
                </h3>
                <p className="text-slate-300 text-lg leading-relaxed">
                  65-100% deines Nettoeinkommens, bis zu <span className="text-emerald-400 font-semibold">1.800€/Monat</span>. Optimale Aufteilung berechnen.
                </p>
              </div>
            </motion.div>

            {/* BAföG Card - Cyan Theme */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="group relative aspect-square rounded-3xl overflow-hidden shadow-2xl cursor-pointer border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-teal-600/10 backdrop-blur-sm" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-teal-600/0 group-hover:from-cyan-500/20 group-hover:to-teal-600/20 transition-all duration-700" />
              
              <div className="relative z-10 p-10 h-full flex flex-col justify-end">
                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-600 shadow-lg shadow-cyan-500/50">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                  BAföG & Bildung
                </h3>
                <p className="text-slate-300 text-lg leading-relaxed">
                  Bis zu <span className="text-cyan-400 font-semibold">934€/Monat</span> für Studium oder Ausbildung. Inklusive Wohnzuschlag.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-muted/30" aria-label="KI-Transparenz und EU AI Act Konformität">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Transparente KI-Nutzung
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              Gemäß EU AI Act informieren wir transparent über unsere KI-Systeme
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'KI-Einsatz',
                  desc: 'Unsere KI-Systeme sind klar dokumentiert und dürfen Formulare automatisch ausfüllen. Die finale Kontrolle liegt immer bei dir.',
                },
                {
                  title: 'Nachvollziehbarkeit',
                  desc: 'Alle KI-Vorschläge sind transparent dokumentiert und können jederzeit überprüft werden.',
                },
                {
                  title: 'Menschliche Aufsicht',
                  desc: 'Jeder Antrag wird von qualifizierten Mitarbeitern überprüft und freigegeben.',
                },
                {
                  title: 'Risikoklassifizierung',
                  desc: 'Unser System ist als AI-Assistent mit niedrigem Risiko AI klassifiziert und erfüllt alle Transparenzpflichten des EU AI Acts.',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors duration-300"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section - Jetzt starten */}
      <section className="py-32 px-4 bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-cyan-500/10 relative overflow-hidden">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)] animate-pulse" />
        
        <div className="container max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-teal-600 bg-clip-text text-transparent">
              Bereit für mehr Förderung?
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Starte jetzt kostenlos und finde heraus, welche Förderungen dir zustehen.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-2xl shadow-emerald-500/50 group"
                asChild
              >
                <a href="/auth">
                  Jetzt kostenlos starten
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 border-2 border-emerald-500/50 hover:border-emerald-500 hover:bg-emerald-500/10"
                asChild
              >
                <a href="#features">
                  Mehr erfahren
                </a>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span>Kostenlos testen</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span>Keine Kreditkarte nötig</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span>DSGVO-konform</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <CTAEnhanced />

      {/* Premium Footer - SOTA 2025 */}
      <footer id="footer" className="relative bg-slate-950 border-t border-emerald-500/20">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-emerald-500/5 pointer-events-none" />
        
        <div className="container relative z-10">
          {/* Main Footer Content */}
          <div className="py-16 px-4">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              {/* Brand Column */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/50">
                    <CheckCircle className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">MiMiCheck</h3>
                </div>
                <p className="text-slate-400 mb-6 leading-relaxed max-w-md">
                  Dein digitaler Assistent für Förderanträge – sicher, transparent und DSGVO-konform. Entwickelt mit ❤️ für EU AI Act & ISO Konformität.
                </p>
                
                {/* Company Info */}
                <div className="text-sm text-slate-500 space-y-1">
                  <p className="font-medium text-slate-400">MiMi Tech Ai UG (haftungsbeschränkt)</p>
                  <p>Lindenplatz 23, 75378 Bad Liebenzell</p>
                  <div className="flex flex-col gap-1 mt-3">
                    <a href="mailto:info@mimitechai.com" className="hover:text-emerald-400 transition-colors inline-flex items-center gap-2">
                      <span>✉</span> info@mimitechai.com
                    </a>
                    <a href="tel:+4915758805737" className="hover:text-emerald-400 transition-colors inline-flex items-center gap-2">
                      <span>📞</span> +49 1575 8805737
                    </a>
                  </div>
                </div>
              </div>

              {/* Links Column 1 */}
              <div>
                <h4 className="text-white font-semibold mb-4">Rechtliches</h4>
                <ul className="space-y-3 text-sm">
                  <li>
                    <a href="/impressum" className="text-slate-400 hover:text-emerald-400 transition-colors">
                      Impressum
                    </a>
                  </li>
                  <li>
                    <a href="/datenschutz" className="text-slate-400 hover:text-emerald-400 transition-colors">
                      Datenschutz
                    </a>
                  </li>
                  <li>
                    <a href="/agb" className="text-slate-400 hover:text-emerald-400 transition-colors">
                      AGB
                    </a>
                  </li>
                  <li>
                    <button 
                      onClick={() => {
                        localStorage.removeItem('cookie-consent');
                        window.location.reload();
                      }}
                      className="text-slate-400 hover:text-emerald-400 transition-colors text-left"
                    >
                      Cookie-Einstellungen
                    </button>
                  </li>
                </ul>
              </div>

              {/* Links Column 2 */}
              <div>
                <h4 className="text-white font-semibold mb-4">Support</h4>
                <ul className="space-y-3 text-sm">
                  <li>
                    <a href="/contact" className="text-slate-400 hover:text-emerald-400 transition-colors">
                      Hilfe & FAQ
                    </a>
                  </li>
                  <li>
                    <a href="/auth" className="text-slate-400 hover:text-emerald-400 transition-colors">
                      Anmelden
                    </a>
                  </li>
                  <li>
                    <a href="/#features" className="text-slate-400 hover:text-emerald-400 transition-colors">
                      Förderungen
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="py-6 px-4 border-t border-slate-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
              <p>
                © 2025 MiMi Tech Ai UG. Alle Rechte vorbehalten.
              </p>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center gap-4 text-xs">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <CheckCircle className="w-3.5 h-3.5" />
                  DSGVO-konform
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  <CheckCircle className="w-3.5 h-3.5" />
                  ISO zertifiziert
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <CheckCircle className="w-3.5 h-3.5" />
                  EU AI Act
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      <CookieBanner />
    </div>
  );
}
