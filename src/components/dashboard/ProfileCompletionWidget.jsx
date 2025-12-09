import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUserProfile } from '@/components/UserProfileContext';
import { Button } from '@/components/ui/button';
import SpotlightCard from '@/components/ui/SpotlightCard';
import {
  User, MapPin, CreditCard, Baby, Briefcase, Home,
  CheckCircle, AlertCircle, ChevronRight, Sparkles, X
} from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import ProfileQuickEdit from './ProfileQuickEdit';

const PROFILE_SECTIONS = [
  { id: 'persoenlich', label: 'Persönliche Daten', icon: User, fields: ['vorname', 'nachname', 'geburtsdatum'], priority: 1 },
  { id: 'kontakt', label: 'Adresse', icon: MapPin, fields: ['strasse', 'plz', 'ort'], priority: 2 },
  { id: 'einkommen', label: 'Einkommen', icon: Briefcase, fields: ['monatliches_nettoeinkommen', 'beschaeftigungsstatus'], priority: 3 },
  { id: 'wohnung', label: 'Wohnsituation', icon: Home, fields: ['wohnart', 'monatliche_miete', 'haushaltsmitglieder_anzahl'], priority: 4 },
  { id: 'kinder', label: 'Kinder', icon: Baby, fields: ['kinder_anzahl'], priority: 5 },
  { id: 'bank', label: 'Bankverbindung', icon: CreditCard, fields: ['iban', 'kontoinhaber'], priority: 6 }
];

export default function ProfileCompletionWidget({ onAnalysisReady }) {
  const navigate = useNavigate();
  const { user: userProfile, updateUserProfile, profileVersion } = useUserProfile();
  const [completionData, setCompletionData] = useState({ overall: 0, sections: [] });
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    if (userProfile) {
      calculateCompletion();
    }
  }, [userProfile, profileVersion]);

  const getNestedValue = (obj, path) => {
    if (!obj) return undefined;
    const parts = path.split('.');
    let current = obj;
    for (const part of parts) {
      if (current === null || current === undefined) return undefined;
      // Check both direct and nested in lebenssituation
      if (current[part] !== undefined) {
        current = current[part];
      } else if (current.lebenssituation?.[part] !== undefined) {
        current = current.lebenssituation[part];
      } else {
        return undefined;
      }
    }
    return current;
  };

  const calculateCompletion = () => {
    const sectionResults = PROFILE_SECTIONS.map(section => {
      const filledFields = section.fields.filter(field => {
        const value = getNestedValue(userProfile, field);
        return value !== null && value !== undefined && value !== '' && value !== 0;
      });
      
      return {
        ...section,
        filled: filledFields.length,
        total: section.fields.length,
        percentage: Math.round((filledFields.length / section.fields.length) * 100),
        isComplete: filledFields.length === section.fields.length,
        missingFields: section.fields.filter(field => {
          const value = getNestedValue(userProfile, field);
          return value === null || value === undefined || value === '' || value === 0;
        })
      };
    });

    const totalFields = sectionResults.reduce((sum, s) => sum + s.total, 0);
    const filledFields = sectionResults.reduce((sum, s) => sum + s.filled, 0);
    const overall = Math.round((filledFields / totalFields) * 100);

    setCompletionData({
      overall,
      sections: sectionResults,
      isReady: overall >= 60 // Mindestens 60% für AI-Analyse
    });

    // Callback wenn Profil bereit für Analyse
    if (overall >= 60 && onAnalysisReady) {
      onAnalysisReady(true);
    }
  };

  const handleSectionClick = (section) => {
    setActiveSection(section);
    setIsSheetOpen(true);
  };

  const handleSheetClose = () => {
    setIsSheetOpen(false);
    setActiveSection(null);
  };

  const incompleteSections = completionData.sections.filter(s => !s.isComplete);
  const nextSection = incompleteSections.sort((a, b) => a.priority - b.priority)[0];

  return (
    <>
      <SpotlightCard 
        className="p-6 border-white/10" 
        spotlightColor={completionData.overall >= 60 ? "rgba(16, 185, 129, 0.15)" : "rgba(249, 115, 22, 0.15)"}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl ${completionData.overall >= 60 ? 'bg-emerald-500/10' : 'bg-orange-500/10'}`}>
              {completionData.overall >= 60 ? (
                <Sparkles className="w-6 h-6 text-emerald-400" />
              ) : (
                <AlertCircle className="w-6 h-6 text-orange-400" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Profil-Status</h3>
              <p className="text-sm text-slate-400">
                {completionData.overall >= 60 
                  ? 'Bereit für AI-Analyse' 
                  : 'Vervollständige dein Profil'}
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className={`text-3xl font-bold ${completionData.overall >= 60 ? 'text-emerald-400' : 'text-orange-400'}`}>
              {completionData.overall}%
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-3 bg-white/5 rounded-full overflow-hidden mb-6">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completionData.overall}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`h-full rounded-full ${
              completionData.overall >= 60 
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500' 
                : 'bg-gradient-to-r from-orange-500 to-amber-500'
            }`}
          />
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {completionData.sections.map((section) => {
            const Icon = section.icon;
            return (
              <motion.button
                key={section.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSectionClick(section)}
                className={`p-4 rounded-xl border transition-all text-left ${
                  section.isComplete
                    ? 'bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-500/50'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`w-4 h-4 ${section.isComplete ? 'text-emerald-400' : 'text-slate-400'}`} />
                  {section.isComplete && <CheckCircle className="w-3 h-3 text-emerald-400" />}
                </div>
                <p className={`text-sm font-medium ${section.isComplete ? 'text-emerald-300' : 'text-white'}`}>
                  {section.label}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {section.filled}/{section.total} Felder
                </p>
              </motion.button>
            );
          })}
        </div>

        {/* CTA */}
        {completionData.overall < 100 && nextSection && (
          <Button
            onClick={() => handleSectionClick(nextSection)}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white"
          >
            <nextSection.icon className="w-4 h-4 mr-2" />
            {nextSection.label} ausfüllen
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        )}

        {completionData.overall >= 60 && completionData.overall < 100 && (
          <p className="text-xs text-center text-slate-500 mt-4">
            Tipp: Je vollständiger dein Profil, desto bessere Empfehlungen!
          </p>
        )}
      </SpotlightCard>

      {/* Side Sheet für Quick Edit */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent 
          side="right" 
          className="w-full sm:max-w-lg bg-slate-900 border-white/10 text-white overflow-y-auto"
        >
          <SheetHeader className="mb-6">
            <SheetTitle className="text-white flex items-center gap-3">
              {activeSection && (
                <>
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <activeSection.icon className="w-5 h-5 text-blue-400" />
                  </div>
                  {activeSection.label}
                </>
              )}
            </SheetTitle>
          </SheetHeader>
          
          {activeSection && (
            <ProfileQuickEdit
              section={activeSection}
              userProfile={userProfile}
              onSave={async (data) => {
                await updateUserProfile(data);
                handleSheetClose();
              }}
              onCancel={handleSheetClose}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
