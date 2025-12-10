import { useState, useEffect } from 'react';
import { User, MapPin, CreditCard, Heart, Home, Briefcase, Users, PiggyBank, Shield, ChevronRight, Check, AlertCircle, Save, Lock, Sparkles, Baby, Info, Loader2, ChevronDown, X } from 'lucide-react';
import { useUserProfile } from '@/components/UserProfileContext.jsx';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProfilSeite() {
  const { user: userProfile, updateUserProfile } = useUserProfile();
  const [activeSection, setActiveSection] = useState('persoenlich');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  
  // Initialize profil state from userProfile
  const [profil, setProfil] = useState({
    persoenlich: { anrede: '', vorname: '', nachname: '', geburtsdatum: '', steuer_id: '' },
    kontakt: { strasse: '', hausnummer: '', plz: '', ort: '', email: '' },
    bank: { kontoinhaber: '', iban: '' },
    einwilligungen: { dsgvo_einwilligung: false }
  });

  // Load profile data when userProfile changes
  useEffect(() => {
    if (userProfile) {
      setProfil({
        persoenlich: {
          anrede: userProfile.anrede || '',
          vorname: userProfile.vorname || userProfile.name?.split(' ')[0] || '',
          nachname: userProfile.nachname || userProfile.name?.split(' ').slice(1).join(' ') || '',
          geburtsdatum: userProfile.geburtsdatum || '',
          steuer_id: userProfile.steuer_id || ''
        },
        kontakt: {
          strasse: userProfile.strasse || '',
          hausnummer: userProfile.hausnummer || '',
          plz: userProfile.plz || '',
          ort: userProfile.ort || '',
          email: userProfile.email || ''
        },
        bank: {
          kontoinhaber: userProfile.kontoinhaber || '',
          iban: userProfile.iban || ''
        },
        einwilligungen: {
          dsgvo_einwilligung: userProfile.dsgvo_einwilligung || false
        }
      });
    }
  }, [userProfile]);

  // Calculate profile completeness
  const calculateCompleteness = () => {
    const requiredFields = [
      profil.persoenlich.vorname,
      profil.persoenlich.nachname,
      profil.persoenlich.geburtsdatum,
      profil.kontakt.strasse,
      profil.kontakt.plz,
      profil.kontakt.ort,
      profil.einwilligungen.dsgvo_einwilligung
    ];
    const filledFields = requiredFields.filter(f => f && f !== '').length;
    return Math.round((filledFields / requiredFields.length) * 100);
  };

  const profileCompleteness = calculateCompleteness();

  // Save profile
  const handleSave = async () => {
    if (!profil.einwilligungen.dsgvo_einwilligung) return;
    
    setIsSaving(true);
    setSaveMessage(null);
    
    try {
      await updateUserProfile({
        anrede: profil.persoenlich.anrede,
        vorname: profil.persoenlich.vorname,
        nachname: profil.persoenlich.nachname,
        name: `${profil.persoenlich.vorname} ${profil.persoenlich.nachname}`.trim(),
        geburtsdatum: profil.persoenlich.geburtsdatum || null,
        steuer_id: profil.persoenlich.steuer_id,
        strasse: profil.kontakt.strasse,
        hausnummer: profil.kontakt.hausnummer,
        plz: profil.kontakt.plz,
        ort: profil.kontakt.ort,
        kontoinhaber: profil.bank.kontoinhaber,
        iban: profil.bank.iban,
        dsgvo_einwilligung: profil.einwilligungen.dsgvo_einwilligung,
        profile_completeness: profileCompleteness
      });
      setSaveMessage({ type: 'success', text: 'Profil erfolgreich gespeichert!' });
    } catch (error) {
      console.error('Save error:', error);
      setSaveMessage({ type: 'error', text: 'Fehler beim Speichern. Bitte versuchen Sie es erneut.' });
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveMessage(null), 3000);
    }
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
    { id: 'einwilligungen', label: 'Datenschutz', icon: Shield, emoji: '🔒' }
  ];

  const updateField = (section, field, value) => {
    setProfil(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const currentSection = sections.find(s => s.id === activeSection);
  const Icon = currentSection?.icon || User;

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    setIsMobileNavOpen(false);
  };

  const renderContent = () => {
    if (activeSection === 'persoenlich') {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-xs font-medium text-cyan-300/80 mb-1.5">Anrede</label>
            <select value={profil.persoenlich.anrede} onChange={(e) => updateField('persoenlich', 'anrede', e.target.value)}
              className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500/50">
              <option value="" className="bg-slate-900">Bitte wählen...</option>
              <option value="herr" className="bg-slate-900">Herr</option>
              <option value="frau" className="bg-slate-900">Frau</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-cyan-300/80 mb-1.5">Vorname <span className="text-rose-400">*</span></label>
            <input type="text" value={profil.persoenlich.vorname} onChange={(e) => updateField('persoenlich', 'vorname', e.target.value)}
              className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500/50" />
          </div>
          <div>
            <label className="block text-xs font-medium text-cyan-300/80 mb-1.5">Nachname <span className="text-rose-400">*</span></label>
            <input type="text" value={profil.persoenlich.nachname} onChange={(e) => updateField('persoenlich', 'nachname', e.target.value)}
              className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500/50" />
          </div>
          <div>
            <label className="block text-xs font-medium text-cyan-300/80 mb-1.5">Geburtsdatum <span className="text-rose-400">*</span></label>
            <input type="date" value={profil.persoenlich.geburtsdatum} onChange={(e) => updateField('persoenlich', 'geburtsdatum', e.target.value)}
              className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500/50" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-cyan-300/80 mb-1.5">Steuer-ID <span className="text-rose-400">*</span></label>
            <input type="text" placeholder="11-stellig" value={profil.persoenlich.steuer_id} onChange={(e) => updateField('persoenlich', 'steuer_id', e.target.value)}
              className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-cyan-500/50" />
          </div>
        </div>
      );
    }
    
    if (activeSection === 'kontakt') {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-cyan-300/80 mb-1.5">Straße <span className="text-rose-400">*</span></label>
            <input type="text" value={profil.kontakt.strasse} onChange={(e) => updateField('kontakt', 'strasse', e.target.value)}
              className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500/50" />
          </div>
          <div>
            <label className="block text-xs font-medium text-cyan-300/80 mb-1.5">Hausnummer</label>
            <input type="text" value={profil.kontakt.hausnummer} onChange={(e) => updateField('kontakt', 'hausnummer', e.target.value)}
              className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500/50" />
          </div>
          <div>
            <label className="block text-xs font-medium text-cyan-300/80 mb-1.5">PLZ <span className="text-rose-400">*</span></label>
            <input type="text" value={profil.kontakt.plz} onChange={(e) => updateField('kontakt', 'plz', e.target.value)}
              className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500/50" />
          </div>
          <div>
            <label className="block text-xs font-medium text-cyan-300/80 mb-1.5">Ort <span className="text-rose-400">*</span></label>
            <input type="text" value={profil.kontakt.ort} onChange={(e) => updateField('kontakt', 'ort', e.target.value)}
              className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500/50" />
          </div>
          <div>
            <label className="block text-xs font-medium text-cyan-300/80 mb-1.5">E-Mail</label>
            <input type="email" value={profil.kontakt.email} onChange={(e) => updateField('kontakt', 'email', e.target.value)}
              className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500/50" />
          </div>
        </div>
      );
    }

    if (activeSection === 'bank') {
      return (
        <div className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs font-medium text-cyan-300/80 mb-1.5">Kontoinhaber <span className="text-rose-400">*</span></label>
              <input type="text" value={profil.bank.kontoinhaber} onChange={(e) => updateField('bank', 'kontoinhaber', e.target.value)}
                className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500/50" />
            </div>
            <div>
              <label className="block text-xs font-medium text-cyan-300/80 mb-1.5">IBAN <span className="text-rose-400">*</span></label>
              <input type="text" placeholder="DE00 0000 0000 0000 0000 00" value={profil.bank.iban} onChange={(e) => updateField('bank', 'iban', e.target.value)}
                className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-cyan-500/50" />
            </div>
          </div>
          <div className="p-3 sm:p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <p className="text-xs sm:text-sm text-emerald-300 flex items-start gap-2">
              <Info size={16} className="shrink-0 mt-0.5" />
              <span>Ihre Bankverbindung wird für die Auszahlung von Kindergeld, Wohngeld und anderen Leistungen benötigt.</span>
            </p>
          </div>
        </div>
      );
    }

    if (activeSection === 'einwilligungen') {
      return (
        <div className="space-y-3 sm:space-y-4">
          <div className="p-4 sm:p-5 rounded-xl bg-slate-800 border border-white/10">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center shrink-0">
                <Shield size={20} className="text-white sm:hidden" />
                <Shield size={28} className="text-white hidden sm:block" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm sm:text-base mb-2">Datenschutz nach EU-Standards</h4>
                <ul className="text-xs sm:text-sm text-white/70 space-y-1">
                  <li>✓ AES-256 Verschlüsselung</li>
                  <li>✓ Server in Deutschland</li>
                  <li>✓ EU AI Act konform</li>
                </ul>
              </div>
            </div>
          </div>
          <div className={`p-4 sm:p-5 rounded-xl border transition-all cursor-pointer ${profil.einwilligungen.dsgvo_einwilligung ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-white/5 border-white/10'}`}
            onClick={() => updateField('einwilligungen', 'dsgvo_einwilligung', !profil.einwilligungen.dsgvo_einwilligung)}>
            <div className="flex items-start gap-3">
              <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center mt-0.5 shrink-0 ${profil.einwilligungen.dsgvo_einwilligung ? 'bg-gradient-to-r from-cyan-500 to-teal-500 border-transparent' : 'border-white/20'}`}>
                {profil.einwilligungen.dsgvo_einwilligung && <Check size={12} className="text-white" />}
              </div>
              <div>
                <span className="text-xs sm:text-sm text-white/90 font-medium">Einwilligung zur Datenverarbeitung (DSGVO) *</span>
                <p className="text-[10px] sm:text-xs text-white/40 mt-1">Ich willige ein, dass meine Daten zur Antragsbearbeitung gespeichert werden.</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="text-center py-8 sm:py-12">
        <Sparkles size={40} className="mx-auto mb-4 text-cyan-400/50" />
        <h3 className="text-base sm:text-lg font-medium text-white/80 mb-2">Sektion: {currentSection?.label}</h3>
        <p className="text-xs sm:text-sm text-white/40">Diese Sektion wird noch implementiert.</p>
      </div>
    );
  };

  return (
    <div className="min-h-full bg-slate-950 text-white px-4 py-4 sm:p-6 pb-24 lg:pb-6">
      <div className="max-w-6xl mx-auto pt-12 lg:pt-0">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Shield size={14} className="text-cyan-400" />
            <span className="text-[10px] sm:text-xs text-cyan-300">EU AI Act & DSGVO konform</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Mein Profil
          </h1>
          <p className="text-white/60 text-sm sm:text-base mt-2">Einmal erfassen – alle Anträge ausfüllen.</p>
        </div>

        {/* Save Message */}
        {saveMessage && (
          <div className={`mb-4 p-3 sm:p-4 rounded-xl border text-sm ${saveMessage.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-red-500/10 border-red-500/30 text-red-300'}`}>
            {saveMessage.text}
          </div>
        )}

        {/* Progress Bar */}
        <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex justify-between mb-3">
            <span className="text-sm text-white/60">Profil-Vollständigkeit</span>
            <span className="text-sm font-bold text-cyan-400">{profileCompleteness}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500"
              initial={{ width: 0 }}
              animate={{ width: `${profileCompleteness}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Mobile Section Selector - Sticky */}
        <div className="lg:hidden mb-6 sticky top-0 z-40 -mx-4 px-4 py-3 bg-slate-950/95 backdrop-blur-lg">
          <button
            onClick={() => setIsMobileNavOpen(true)}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-cyan-500/15 to-teal-500/10 border border-cyan-500/30 active:scale-[0.98] transition-transform"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{currentSection?.emoji}</span>
              <span className="font-semibold text-base">{currentSection?.label}</span>
            </div>
            <ChevronDown size={24} className="text-cyan-400" />
          </button>
        </div>

        {/* Mobile Navigation Sheet */}
        <AnimatePresence>
          {isMobileNavOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
                onClick={() => setIsMobileNavOpen(false)}
              />
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="fixed bottom-0 left-0 right-0 bg-slate-900 rounded-t-3xl z-50 lg:hidden max-h-[80vh] overflow-hidden"
              >
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                  <h3 className="font-semibold text-white">Bereich wählen</h3>
                  <button onClick={() => setIsMobileNavOpen(false)} className="p-2 hover:bg-white/10 rounded-full">
                    <X size={20} className="text-white/60" />
                  </button>
                </div>
                <div className="p-2 overflow-y-auto max-h-[60vh]">
                  {sections.map(s => (
                    <button
                      key={s.id}
                      onClick={() => handleSectionChange(s.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all ${
                        activeSection === s.id 
                          ? 'bg-gradient-to-r from-cyan-500/15 to-teal-500/10 border border-cyan-500/30' 
                          : 'hover:bg-white/5'
                      }`}
                    >
                      <span className="text-xl">{s.emoji}</span>
                      <span className={`text-sm ${activeSection === s.id ? 'text-white font-medium' : 'text-white/70'}`}>
                        {s.label}
                      </span>
                      {activeSection === s.id && <Check size={16} className="ml-auto text-cyan-400" />}
                    </button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <nav className="space-y-1 sticky top-4">
              {sections.map(s => (
                <button key={s.id} onClick={() => setActiveSection(s.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm transition-all ${activeSection === s.id ? 'bg-gradient-to-r from-cyan-500/15 to-teal-500/10 border border-cyan-500/30 text-white font-medium' : 'text-white/70 hover:bg-white/5'}`}>
                  <span className="text-base">{s.emoji}</span>
                  {s.label}
                  {activeSection === s.id && <ChevronRight size={14} className="ml-auto text-cyan-400" />}
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

          {/* Content Area */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10"
              >
                {/* Section Header - Mobile optimized */}
                <div className="flex flex-col gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                      <Icon size={24} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold">{currentSection?.label}</h2>
                      <p className="text-xs text-white/50">Pflichtfelder mit * markiert</p>
                    </div>
                  </div>
                </div>
                
                {renderContent()}
                
                {/* DSGVO Warning */}
                {!profil.einwilligungen.dsgvo_einwilligung && activeSection !== 'einwilligungen' && (
                  <div className="mt-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                    <div className="flex items-start gap-3">
                      <AlertCircle size={20} className="text-amber-400 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm text-amber-200 font-medium mb-3">Bitte akzeptieren Sie im Bereich &quot;Datenschutz&quot; die Datenverarbeitung.</p>
                        <button 
                          onClick={() => setActiveSection('einwilligungen')} 
                          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-amber-500/20 text-amber-200 text-sm font-medium hover:bg-amber-500/30 transition-colors"
                        >
                          Zu Datenschutz →
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
            
            {/* Floating Save Button - Mobile */}
            <div className="lg:hidden fixed bottom-6 left-4 right-4 z-50">
              <button 
                onClick={handleSave}
                disabled={!profil.einwilligungen.dsgvo_einwilligung || isSaving}
                className="w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 text-base bg-gradient-to-r from-cyan-500 to-teal-500 disabled:opacity-40 disabled:cursor-not-allowed shadow-xl shadow-cyan-500/30 active:scale-[0.98] transition-all"
              >
                {isSaving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                {isSaving ? 'Wird gespeichert...' : 'Änderungen speichern'}
              </button>
            </div>
            
            {/* Desktop Save Button */}
            <div className="hidden lg:flex justify-end mt-6">
              <button 
                onClick={handleSave}
                disabled={!profil.einwilligungen.dsgvo_einwilligung || isSaving}
                className="px-6 py-3 rounded-xl font-medium flex items-center gap-2 text-sm bg-gradient-to-r from-cyan-500 to-teal-500 disabled:opacity-40 disabled:cursor-not-allowed hover:from-cyan-400 hover:to-teal-400 transition-all"
              >
                {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                {isSaving ? 'Speichern...' : 'Änderungen speichern'}
              </button>
            </div>
          </div>
        </div>

        {/* Footer - Mobile optimized */}
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/10 text-center text-[10px] sm:text-xs text-white/30">
          © 2025 MiMiCheck - Made with ❤️ in Deutschland
        </div>
      </div>
    </div>
  );
}
