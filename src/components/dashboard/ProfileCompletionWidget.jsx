import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useUserProfile } from '@/components/UserProfileContext';
import { Button } from '@/components/ui/button';
import SpotlightCard from '@/components/ui/SpotlightCard';
import {
  User, MapPin, CreditCard, Baby, Briefcase, Home,
  CheckCircle, AlertCircle, ChevronRight, Sparkles, ChevronDown,
  Heart, Users, PiggyBank
} from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import ProfileQuickEdit from './ProfileQuickEdit';
import { useTranslation } from 'react-i18next';

const PROFILE_SECTIONS = [
  { id: 'persoenlich', labelKey: 'personal', icon: User, fields: ['vorname', 'nachname', 'geburtsdatum'], priority: 1 },
  { id: 'kontakt', labelKey: 'address', icon: MapPin, fields: ['strasse', 'plz', 'ort'], priority: 2 },
  { id: 'einkommen', labelKey: 'income', icon: Briefcase, fields: ['monatliches_nettoeinkommen', 'beschaeftigungsstatus'], priority: 3 },
  { id: 'wohnung', labelKey: 'living', icon: Home, fields: ['wohnart', 'monatliche_miete', 'haushaltsmitglieder_anzahl'], priority: 4 },
  { id: 'kinder', labelKey: 'children', icon: Baby, fields: ['kinder_anzahl'], priority: 5 },
  { id: 'bank', labelKey: 'bank', icon: CreditCard, fields: ['iban', 'kontoinhaber'], priority: 6 },
  { id: 'versicherung', labelKey: 'insurance', icon: Heart, fields: ['krankenversicherung_art', 'krankenkasse_name'], priority: 7 },
  { id: 'partner', labelKey: 'partner', icon: Users, fields: ['partner_vorname', 'partner_nachname'], priority: 8 },
  { id: 'vermoegen', labelKey: 'assets', icon: PiggyBank, fields: ['gesamtvermoegen'], priority: 9 }
];

export default function ProfileCompletionWidget({ onAnalysisReady }) {
  const { t } = useTranslation();
  const { user: userProfile, updateUserProfile, profileVersion } = useUserProfile();
  const [completionData, setCompletionData] = useState({ overall: 0, sections: [] });
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Get translated section label
  const getSectionLabel = useCallback((labelKey) => {
    return t(`dashboard.profileWidget.sections.${labelKey}`, labelKey);
  }, [t]);

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

  const calculateCompletion = useCallback(() => {
    const sectionResults = PROFILE_SECTIONS.map(section => {
      const filledFields = section.fields.filter(field => {
        const value = getNestedValue(userProfile, field);
        return value !== null && value !== undefined && value !== '' && value !== 0;
      });
      
      return {
        ...section,
        label: getSectionLabel(section.labelKey),
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
      isReady: overall >= 60
    });

    if (overall >= 60 && onAnalysisReady) {
      onAnalysisReady(true);
    }
  }, [userProfile, getSectionLabel, onAnalysisReady]);

  useEffect(() => {
    if (userProfile) {
      calculateCompletion();
    }
  }, [userProfile, profileVersion, calculateCompletion]);

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

  // Visible sections based on expansion state (mobile: show 4, expanded: all)
  const visibleSections = isExpanded 
    ? completionData.sections 
    : completionData.sections.slice(0, 6);
  const hasMoreSections = completionData.sections.length > 6;

  return (
    <>
      <SpotlightCard 
        className="p-4 sm:p-6 border-white/10" 
        spotlightColor={completionData.overall >= 60 ? "rgba(16, 185, 129, 0.15)" : "rgba(249, 115, 22, 0.15)"}
      >
        {/* Header - Mobile optimized */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className={`p-2 sm:p-3 rounded-xl ${completionData.overall >= 60 ? 'bg-emerald-500/10' : 'bg-orange-500/10'}`}>
              {completionData.overall >= 60 ? (
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
              ) : (
                <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
              )}
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                {t('dashboard.profileWidget.status', 'Profil-Status')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                {completionData.overall >= 60 
                  ? t('dashboard.profileWidget.readyForAnalysis', 'Bereit für AI-Analyse')
                  : t('dashboard.profileWidget.completeYourProfile', 'Vervollständige dein Profil')}
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className={`text-2xl sm:text-3xl font-bold ${completionData.overall >= 60 ? 'text-emerald-400' : 'text-orange-400'}`}>
              {completionData.overall}%
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-2 sm:h-3 bg-white/5 rounded-full overflow-hidden mb-4 sm:mb-6">
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

        {/* Section Grid - Responsive with collapsible */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
          {visibleSections.map((section) => {
            const Icon = section.icon;
            return (
              <motion.button
                key={section.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSectionClick(section)}
                className={`p-3 sm:p-4 rounded-xl border transition-all text-left ${
                  section.isComplete
                    ? 'bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-500/50'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                  <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${section.isComplete ? 'text-emerald-400' : 'text-slate-400'}`} />
                  {section.isComplete && <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-400" />}
                </div>
                <p className={`text-xs sm:text-sm font-medium truncate ${section.isComplete ? 'text-emerald-300' : 'text-white'}`}>
                  {section.label}
                </p>
                <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1">
                  {section.filled}/{section.total} {t('dashboard.profileWidget.fields', 'Felder')}
                </p>
              </motion.button>
            );
          })}
        </div>

        {/* Expand/Collapse Button for mobile */}
        {hasMoreSections && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-center gap-2 py-2 mb-4 text-xs sm:text-sm text-slate-400 hover:text-white transition-colors"
          >
            <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            {isExpanded 
              ? t('common.showLess', 'Weniger anzeigen')
              : t('common.showMore', `+${completionData.sections.length - 6} mehr`)}
          </button>
        )}

        {/* CTA */}
        {completionData.overall < 100 && nextSection && (
          <Button
            onClick={() => handleSectionClick(nextSection)}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm sm:text-base"
          >
            <nextSection.icon className="w-4 h-4 mr-2" />
            {t('dashboard.profileWidget.fillSection', '{{section}} ausfüllen', { section: nextSection.label })}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        )}

        {completionData.overall >= 60 && completionData.overall < 100 && (
          <p className="text-[10px] sm:text-xs text-center text-slate-500 mt-3 sm:mt-4">
            {t('dashboard.profileWidget.tip', 'Tipp: Je vollständiger dein Profil, desto bessere Empfehlungen!')}
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
