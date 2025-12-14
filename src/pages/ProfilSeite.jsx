import { useState, useEffect, useRef } from 'react';
import { User, MapPin, CreditCard, Heart, Home, Briefcase, Users, PiggyBank, Shield, ChevronDown, Check, AlertCircle, Save, Lock, Sparkles, Baby, Info, Loader2, GraduationCap, TriangleAlert } from 'lucide-react';
import { useUserProfile } from '@/components/UserProfileContext.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { track, AREA, SEVERITY } from '@/components/core/telemetry';

import {
  PersoenlichesDatenSection,
  EinwilligungenSection,
  KontaktSection,
  BankSection,
  KrankenversicherungSection,
  WohnungSection,
  EinkommenSection,
  PartnerSection,
  KinderSection,
  VermoegenSection,
  BesonderesSection,
  BildungSection
} from '@/components/profil';

const INITIAL_PROFIL = {
  anrede: '', vorname: '', nachname: '', geburtsdatum: '',
  steuer_id: '', sozialversicherungsnummer: '',

  strasse: '', hausnummer: '', adresszusatz: '', plz: '', ort: '',
  bundesland: '', landkreis: '', telefon_mobil: '', telefon_festnetz: '',
  email: '', de_mail: '',

  iban: '', bic: '', kontoinhaber: '', bank_name: '',

  dsgvo_einwilligung: false, ki_verarbeitung_einwilligung: false,
  datenweitergabe_behoerden: false
};

export default function ProfilSeite() {
  const { user: userProfile, updateUserProfile } = useUserProfile();
  const [activeSection, setActiveSection] = useState('persoenlich');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [profil, setProfil] = useState(INITIAL_PROFIL);
  const trackedFieldsRef = useRef(new Set());

  // Load local draft first (fast path)
  useEffect(() => {
    const localData = localStorage.getItem('mimicheck-profil');
    if (!localData) return;
    try {
      const parsed = JSON.parse(localData);
      setProfil(prev => ({ ...prev, ...parsed }));
    } catch {
      // ignore invalid local storage
    }
  }, []);

  // Auto-save draft to localStorage
  useEffect(() => {
    const dataToSave = {};
    Object.keys(profil).forEach((key) => {
      const value = profil[key];
      if (typeof value === 'boolean') {
        dataToSave[key] = value;
      } else if (value && value !== '') {
        dataToSave[key] = value;
      }
    });

    try {
      localStorage.setItem('mimicheck-profil', JSON.stringify(dataToSave));
    } catch {
      // ignore write issues
    }
  }, [profil]);

  useEffect(() => {
    if (!userProfile) return;
    const cleanData = {};
    Object.keys(userProfile).forEach((key) => {
      const value = userProfile[key];
      if (value !== null && value !== undefined) {
        cleanData[key] = value;
      }
    });
    setProfil(prev => ({ ...prev, ...cleanData }));
  }, [userProfile]);

  const calculateCompleteness = () => {
    const requiredFields = [
      profil.vorname,
      profil.nachname,
      profil.geburtsdatum,
      profil.strasse,
      profil.plz,
      profil.ort,
      profil.dsgvo_einwilligung
    ];
    const filledFields = requiredFields.filter(f => f && f !== '').length;
    return Math.round((filledFields / requiredFields.length) * 100);
  };

  const profileCompleteness = calculateCompleteness();

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage(null);
    try {
      const dataToSave = {};
      Object.keys(profil).forEach((key) => {
        const value = profil[key];
        if (typeof value === 'boolean') {
          dataToSave[key] = value;
        } else if (value && value !== '') {
          dataToSave[key] = value;
        }
      });

      try {
        localStorage.setItem('mimicheck-profil', JSON.stringify(dataToSave));
      } catch {
        // ignore local save issues
      }

      if (!profil.dsgvo_einwilligung) {
        setSaveMessage({ type: 'error', text: 'Bitte im Bereich „Datenschutz“ die Einwilligung erteilen, damit wir in der Cloud speichern dürfen.' });
        return;
      }

      await updateUserProfile({
        ...dataToSave,
        name: `${profil.vorname} ${profil.nachname}`.trim(),
        geburtsdatum: profil.geburtsdatum || null,
        profile_completeness: profileCompleteness
      });

      track('funnel.profile_saved', AREA.PROFILE, { profile_completeness: profileCompleteness }, SEVERITY.MEDIUM);

      setSaveMessage({ type: 'success', text: 'Profil erfolgreich gespeichert!' });
    } catch (error) {
      console.error('Save error:', error);
      setSaveMessage({ type: 'error', text: 'Fehler beim Speichern.' });
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveMessage(null), 3000);
    }
  };

  const handleChange = (field) => (e) => {
    const value = e?.target?.type === 'checkbox' ? e.target.checked : e?.target?.value;
    setProfil(prev => {
      const prevVal = prev?.[field];
      const prevFilled = prevVal === true || (typeof prevVal === 'string' && prevVal.trim() !== '') || (typeof prevVal === 'number' && Number.isFinite(prevVal));
      const nextFilled = value === true || (typeof value === 'string' && value.trim() !== '') || (typeof value === 'number' && Number.isFinite(value));

      if (!prevFilled && nextFilled && !trackedFieldsRef.current.has(field)) {
        trackedFieldsRef.current.add(field);
        track('funnel.completed_profile_field', AREA.PROFILE, { field }, SEVERITY.LOW);
      }

      return ({ ...prev, [field]: value });
    });
  };

  const sections = [
    { id: 'persoenlich', label: 'Persönliche Daten', icon: User, emoji: '👤' },
    { id: 'kontakt', label: 'Kontakt & Adresse', icon: MapPin, emoji: '📍' },
    { id: 'bank', label: 'Bankverbindung', icon: CreditCard, emoji: '💳' },
    { id: 'krankenversicherung', label: 'Krankenversicherung', icon: Heart, emoji: '❤️' },
    { id: 'wohnung', label: 'Wohnsituation', icon: Home, emoji: '🏠' },
    { id: 'einkommen', label: 'Einkommen', icon: Briefcase, emoji: '💼' },
    { id: 'partner', label: 'Partner/in', icon: Users, emoji: '👫' },
    { id: 'kinder', label: 'Kinder', icon: Baby, emoji: '👶' },
    { id: 'vermoegen', label: 'Vermögen', icon: PiggyBank, emoji: '💰' },
    { id: 'besonderes', label: 'Besondere Umstände', icon: TriangleAlert, emoji: '⚠️' },
    { id: 'bildung', label: 'Bildung', icon: GraduationCap, emoji: '🎓' },
    { id: 'einwilligungen', label: 'Datenschutz', icon: Shield, emoji: '🔒' }
  ];

  const currentSection = sections.find(s => s.id === activeSection);
  const Icon = currentSection?.icon || User;

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    setIsDropdownOpen(false);
  };

  const renderContent = () => {
    const props = { profil, handleChange, setProfil, handleSave, saving: isSaving };
    switch (activeSection) {
      case 'persoenlich':
        return <PersoenlichesDatenSection {...props} />;
      case 'kontakt':
        return <KontaktSection {...props} />;
      case 'bank':
        return <BankSection {...props} />;
      case 'krankenversicherung':
        return <KrankenversicherungSection {...props} />;
      case 'wohnung':
        return <WohnungSection {...props} />;
      case 'einkommen':
        return <EinkommenSection {...props} />;
      case 'partner':
        return <PartnerSection {...props} />;
      case 'kinder':
        return <KinderSection {...props} />;
      case 'vermoegen':
        return <VermoegenSection {...props} />;
      case 'besonderes':
        return <BesonderesSection {...props} />;
      case 'bildung':
        return <BildungSection {...props} />;
      case 'einwilligungen':
        return <EinwilligungenSection {...props} />;
      default:
        return <PersoenlichesDatenSection {...props} />;
    }
  };

  return (
    <div className="min-h-full bg-slate-950 text-white">
      {/* DEBUG: Screen width indicator */}
      <div className="fixed top-8 right-2 z-[9999] text-[10px] font-mono bg-yellow-500 text-black px-2 py-1 rounded">
        <span className="sm:hidden">XS</span>
        <span className="hidden sm:inline md:hidden">SM</span>
        <span className="hidden md:inline lg:hidden">MD</span>
        <span className="hidden lg:inline xl:hidden">LG</span>
        <span className="hidden xl:inline">XL</span>
      </div>
      
      {/* Mobile: Single Column Layout */}
      <div className="lg:hidden flex flex-col min-h-full">
        <div className="px-4 py-4 pb-[calc(7.5rem+env(safe-area-inset-bottom))] flex-1">
          {/* Header */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-1">
              <Shield size={12} className="text-cyan-400" />
              <span className="text-[10px] text-cyan-300">DSGVO konform</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Mein Profil
            </h1>
          </div>

          {/* Progress */}
          <div className="mb-4 p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="flex justify-between mb-2">
              <span className="text-xs text-white/60">Vollständigkeit</span>
              <span className="text-xs font-bold text-cyan-400">{profileCompleteness}%</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500"
                initial={{ width: 0 }}
                animate={{ width: `${profileCompleteness}%` }}
              />
            </div>
          </div>

          {/* Save Message */}
          {saveMessage && (
            <div className={`mb-4 p-3 rounded-xl text-sm ${saveMessage.type === 'success' ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300' : 'bg-red-500/10 border border-red-500/30 text-red-300'}`}>
              {saveMessage.text}
            </div>
          )}

          {/* DROPDOWN NAVIGATION - Klickt auf, zeigt alle Bereiche */}
          <div className="mb-4 relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-cyan-500/20 to-teal-500/15 border border-cyan-500/30"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{currentSection?.emoji}</span>
                <span className="font-medium">{currentSection?.label}</span>
              </div>
              <ChevronDown size={20} className={`text-cyan-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Dropdown Menu - Klappt NACH UNTEN auf */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-2 p-2 rounded-xl bg-slate-900 border border-white/10 space-y-1">
                    {sections.map(s => (
                      <button
                        key={s.id}
                        onClick={() => handleSectionChange(s.id)}
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-all ${
                          activeSection === s.id 
                            ? 'bg-cyan-500/20 border border-cyan-500/30' 
                            : 'hover:bg-white/5'
                        }`}
                      >
                        <span className="text-lg">{s.emoji}</span>
                        <span className={`text-sm flex-1 ${activeSection === s.id ? 'text-white font-medium' : 'text-white/70'}`}>
                          {s.label}
                        </span>
                        {activeSection === s.id && <Check size={16} className="text-cyan-400" />}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Content Card */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/10">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center">
                <Icon size={18} className="text-white" />
              </div>
              <div>
                <h2 className="font-semibold">{currentSection?.label}</h2>
                <p className="text-[10px] text-white/50">* Pflichtfelder</p>
              </div>
            </div>
            {renderContent()}
          </div>

          {/* DSGVO Warning */}
          {!profil.dsgvo_einwilligung && activeSection !== 'einwilligungen' && (
            <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <div className="flex items-start gap-2">
                <AlertCircle size={16} className="text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-amber-200">Bitte erst Datenschutz akzeptieren</p>
                  <button onClick={() => setActiveSection('einwilligungen')} className="text-xs text-amber-300 underline mt-1">
                    Zu Datenschutz →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Floating Save Button */}
        <div className="sticky bottom-0 z-30 px-4 pt-3 pb-[calc(1rem+env(safe-area-inset-bottom))] bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-teal-500 disabled:opacity-40 shadow-xl shadow-cyan-500/30"
          >
            {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {isSaving ? 'Speichern...' : 'Speichern'}
          </button>
          <p className="text-center text-[8px] text-white/20 mt-1 font-mono">mobile-v2.1-dec10</p>
        </div>
      </div>

      {/* Desktop: Original Sidebar Layout */}
      <div className="hidden lg:block p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Shield size={14} className="text-cyan-400" />
              <span className="text-xs text-cyan-300">EU AI Act & DSGVO konform</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Mein Profil
            </h1>
            <p className="text-white/60 mt-2">Einmal erfassen – alle Anträge ausfüllen.</p>
          </div>

          {saveMessage && (
            <div className={`mb-4 p-4 rounded-xl border text-sm ${saveMessage.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-red-500/10 border-red-500/30 text-red-300'}`}>
              {saveMessage.text}
            </div>
          )}

          {/* Progress */}
          <div className="mb-8 p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex justify-between mb-3">
              <span className="text-sm text-white/60">Profil-Vollständigkeit</span>
              <span className="text-sm font-bold text-cyan-400">{profileCompleteness}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500"
                initial={{ width: 0 }}
                animate={{ width: `${profileCompleteness}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="col-span-1">
              <nav className="space-y-1 sticky top-4">
                {sections.map(s => (
                  <button key={s.id} onClick={() => setActiveSection(s.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm transition-all ${activeSection === s.id ? 'bg-gradient-to-r from-cyan-500/15 to-teal-500/10 border border-cyan-500/30 text-white font-medium' : 'text-white/70 hover:bg-white/5'}`}>
                    <span>{s.emoji}</span>
                    {s.label}
                  </button>
                ))}
              </nav>
              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex flex-wrap gap-2 text-[10px] text-white/40">
                  <span className="flex items-center gap-1 px-2 py-1 rounded bg-white/5"><Shield size={10} /> DSGVO</span>
                  <span className="flex items-center gap-1 px-2 py-1 rounded bg-white/5"><Lock size={10} /> AES-256</span>
                  <span className="flex items-center gap-1 px-2 py-1 rounded bg-white/5"><Sparkles size={10} /> EU AI Act</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="col-span-3">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center">
                      <Icon size={24} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{currentSection?.label}</h2>
                      <p className="text-xs text-white/50">Pflichtfelder mit * markiert</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 text-sm bg-gradient-to-r from-cyan-500 to-teal-500 disabled:opacity-40"
                  >
                    {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    Speichern
                  </button>
                </div>
                {renderContent()}
                {!profil.dsgvo_einwilligung && activeSection !== 'einwilligungen' && (
                  <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-4">
                    <AlertCircle size={20} className="text-amber-400" />
                    <p className="text-sm text-amber-200 flex-1">Bitte akzeptieren Sie im Bereich "Datenschutz" die Datenverarbeitung.</p>
                    <button onClick={() => setActiveSection('einwilligungen')} className="px-4 py-2 rounded-lg bg-amber-500/20 text-amber-200 text-sm">
                      Zu Datenschutz →
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
