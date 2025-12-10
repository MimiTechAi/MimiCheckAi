import { useState, useEffect } from 'react';
import { User, MapPin, CreditCard, Heart, Home, Briefcase, Users, PiggyBank, Shield, ChevronDown, Check, AlertCircle, Save, Lock, Sparkles, Baby, Info, Loader2 } from 'lucide-react';
import { useUserProfile } from '@/components/UserProfileContext.jsx';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProfilSeite() {
  const { user: userProfile, updateUserProfile } = useUserProfile();
  const [activeSection, setActiveSection] = useState('persoenlich');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const [profil, setProfil] = useState({
    persoenlich: { anrede: '', vorname: '', nachname: '', geburtsdatum: '', steuer_id: '' },
    kontakt: { strasse: '', hausnummer: '', plz: '', ort: '', email: '' },
    bank: { kontoinhaber: '', iban: '' },
    einwilligungen: { dsgvo_einwilligung: false }
  });

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
      setSaveMessage({ type: 'error', text: 'Fehler beim Speichern.' });
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
    setIsDropdownOpen(false);
  };

  const renderContent = () => {
    if (activeSection === 'persoenlich') {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-xs font-medium text-cyan-300/80 mb-1.5">Anrede</label>
              <select value={profil.persoenlich.anrede} onChange={(e) => updateField('persoenlich', 'anrede', e.target.value)}
                className="w-full px-3 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500/50">
                <option value="" className="bg-slate-900">Bitte wählen...</option>
                <option value="herr" className="bg-slate-900">Herr</option>
                <option value="frau" className="bg-slate-900">Frau</option>
              </select>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-xs font-medium text-cyan-300/80 mb-1.5">Vorname *</label>
              <input type="text" value={profil.persoenlich.vorname} onChange={(e) => updateField('persoenlich', 'vorname', e.target.value)}
                className="w-full px-3 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500/50" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-xs font-medium text-cyan-300/80 mb-1.5">Nachname *</label>
              <input type="text" value={profil.persoenlich.nachname} onChange={(e) => updateField('persoenlich', 'nachname', e.target.value)}
                className="w-full px-3 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500/50" />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-xs font-medium text-cyan-300/80 mb-1.5">Geburtsdatum *</label>
              <input type="date" value={profil.persoenlich.geburtsdatum} onChange={(e) => updateField('persoenlich', 'geburtsdatum', e.target.value)}
                className="w-full px-3 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500/50" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-cyan-300/80 mb-1.5">Steuer-ID *</label>
            <input type="text" placeholder="11-stellig" value={profil.persoenlich.steuer_id} onChange={(e) => updateField('persoenlich', 'steuer_id', e.target.value)}
              className="w-full px-3 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-cyan-500/50" />
          </div>
        </div>
      );
    }
    
    if (activeSection === 'kontakt') {
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-cyan-300/80 mb-1.5">Straße *</label>
            <input type="text" value={profil.kontakt.strasse} onChange={(e) => updateField('kontakt', 'strasse', e.target.value)}
              className="w-full px-3 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500/50" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-cyan-300/80 mb-1.5">Nr.</label>
              <input type="text" value={profil.kontakt.hausnummer} onChange={(e) => updateField('kontakt', 'hausnummer', e.target.value)}
                className="w-full px-3 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500/50" />
            </div>
            <div>
              <label className="block text-xs font-medium text-cyan-300/80 mb-1.5">PLZ *</label>
              <input type="text" value={profil.kontakt.plz} onChange={(e) => updateField('kontakt', 'plz', e.target.value)}
                className="w-full px-3 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500/50" />
            </div>
            <div>
              <label className="block text-xs font-medium text-cyan-300/80 mb-1.5">Ort *</label>
              <input type="text" value={profil.kontakt.ort} onChange={(e) => updateField('kontakt', 'ort', e.target.value)}
                className="w-full px-3 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500/50" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-cyan-300/80 mb-1.5">E-Mail</label>
            <input type="email" value={profil.kontakt.email} onChange={(e) => updateField('kontakt', 'email', e.target.value)}
              className="w-full px-3 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500/50" />
          </div>
        </div>
      );
    }

    if (activeSection === 'bank') {
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-cyan-300/80 mb-1.5">Kontoinhaber *</label>
            <input type="text" value={profil.bank.kontoinhaber} onChange={(e) => updateField('bank', 'kontoinhaber', e.target.value)}
              className="w-full px-3 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500/50" />
          </div>
          <div>
            <label className="block text-xs font-medium text-cyan-300/80 mb-1.5">IBAN *</label>
            <input type="text" placeholder="DE00 0000 0000 0000 0000 00" value={profil.bank.iban} onChange={(e) => updateField('bank', 'iban', e.target.value)}
              className="w-full px-3 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-cyan-500/50" />
          </div>
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <p className="text-xs text-emerald-300 flex items-start gap-2">
              <Info size={14} className="shrink-0 mt-0.5" />
              <span>Für Auszahlung von Kindergeld, Wohngeld etc.</span>
            </p>
          </div>
        </div>
      );
    }

    if (activeSection === 'einwilligungen') {
      return (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-800 border border-white/10">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center shrink-0">
                <Shield size={18} className="text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm mb-1">EU-Datenschutz</h4>
                <ul className="text-xs text-white/70 space-y-0.5">
                  <li>✓ AES-256 Verschlüsselung</li>
                  <li>✓ Server in Deutschland</li>
                </ul>
              </div>
            </div>
          </div>
          <div className={`p-4 rounded-xl border cursor-pointer ${profil.einwilligungen.dsgvo_einwilligung ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-white/5 border-white/10'}`}
            onClick={() => updateField('einwilligungen', 'dsgvo_einwilligung', !profil.einwilligungen.dsgvo_einwilligung)}>
            <div className="flex items-start gap-3">
              <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 ${profil.einwilligungen.dsgvo_einwilligung ? 'bg-gradient-to-r from-cyan-500 to-teal-500 border-transparent' : 'border-white/20'}`}>
                {profil.einwilligungen.dsgvo_einwilligung && <Check size={12} className="text-white" />}
              </div>
              <div>
                <span className="text-sm text-white/90 font-medium">DSGVO Einwilligung *</span>
                <p className="text-xs text-white/40 mt-1">Daten zur Antragsbearbeitung speichern</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="text-center py-8">
        <Sparkles size={32} className="mx-auto mb-3 text-cyan-400/50" />
        <p className="text-sm text-white/60">Wird noch implementiert</p>
      </div>
    );
  };

  return (
    <div className="min-h-full bg-slate-950 text-white">
      {/* Mobile: Single Column Layout */}
      <div className="lg:hidden">
        <div className="px-4 py-4 pb-32">
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
          {!profil.einwilligungen.dsgvo_einwilligung && activeSection !== 'einwilligungen' && (
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
        <div className="fixed bottom-4 left-4 right-4 z-50">
          <button 
            onClick={handleSave}
            disabled={!profil.einwilligungen.dsgvo_einwilligung || isSaving}
            className="w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-teal-500 disabled:opacity-40 shadow-xl shadow-cyan-500/30"
          >
            {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {isSaving ? 'Speichern...' : 'Speichern'}
          </button>
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
                    disabled={!profil.einwilligungen.dsgvo_einwilligung || isSaving}
                    className="px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 text-sm bg-gradient-to-r from-cyan-500 to-teal-500 disabled:opacity-40"
                  >
                    {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    Speichern
                  </button>
                </div>
                {renderContent()}
                {!profil.einwilligungen.dsgvo_einwilligung && activeSection !== 'einwilligungen' && (
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
