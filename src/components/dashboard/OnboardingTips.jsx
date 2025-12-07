import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, FileSearch, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

/**
 * OnboardingTips Component
 * 
 * Displays helpful tips for new users with no documents.
 * Can be dismissed and won't show again in the session.
 */
export function OnboardingTips() {
  const [isDismissed, setIsDismissed] = useState(false);
  
  const tips = [
    {
      icon: Upload,
      title: 'Dokument hochladen',
      description: 'Lade deine erste Nebenkostenabrechnung hoch',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: FileSearch,
      title: 'KI-Analyse',
      description: 'Unsere KI prüft dein Dokument automatisch',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      icon: TrendingUp,
      title: 'Geld zurück',
      description: 'Erhalte Rückforderungen direkt angezeigt',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
  ];
  
  if (isDismissed) return null;
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 via-background to-accent/10 border border-border p-6"
      >
        {/* Dismiss button */}
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Schließen"
        >
          <X className="h-5 w-5" />
        </button>
        
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-foreground mb-2">
            Willkommen bei MimiCheck! 👋
          </h3>
          <p className="text-muted-foreground">
            So einfach funktioniert&apos;s:
          </p>
        </div>
        
        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {tips.map((tip, index) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-4 rounded-lg bg-card border border-border"
            >
              <div className={`${tip.bgColor} p-3 rounded-lg mb-3`}>
                <tip.icon className={`h-6 w-6 ${tip.color}`} />
              </div>
              <h4 className="font-semibold text-foreground mb-1">
                {tip.title}
              </h4>
              <p className="text-sm text-muted-foreground">
                {tip.description}
              </p>
            </motion.div>
          ))}
        </div>
        
        {/* CTA */}
        <div className="flex justify-center">
          <Link to="/upload">
            <Button size="lg" className="group">
              Jetzt starten
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl -z-10" />
      </motion.div>
    </AnimatePresence>
  );
}
