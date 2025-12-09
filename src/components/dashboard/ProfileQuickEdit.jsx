import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { NativeSelect } from '@/components/ui/native-select';
import { Loader2, Save, CheckCircle } from 'lucide-react';

// Field configurations for each section
const FIELD_CONFIGS = {
  persoenlich: [
    { name: 'vorname', label: 'Vorname', type: 'text', required: true, placeholder: 'Max' },
    { name: 'nachname', label: 'Nachname', type: 'text', required: true, placeholder: 'Mustermann' },
    { name: 'geburtsdatum', label: 'Geburtsdatum', type: 'date', required: true }
  ],
  kontakt: [
    { name: 'strasse', label: 'Straße & Hausnummer', type: 'text', required: true, placeholder: 'Musterstraße 123' },
    { name: 'plz', label: 'PLZ', type: 'text', required: true, placeholder: '12345', pattern: '[0-9]{5}' },
    { name: 'ort', label: 'Ort', type: 'text', required: true, placeholder: 'Berlin' }
  ],
  einkommen: [
    { 
      name: 'beschaeftigungsstatus', 
      label: 'Beschäftigungsstatus', 
      type: 'select', 
      required: true,
      options: [
        { value: 'angestellt', label: 'Angestellt' },
        { value: 'selbststaendig', label: 'Selbstständig' },
        { value: 'arbeitslos', label: 'Arbeitslos' },
        { value: 'student', label: 'Student/in' },
        { value: 'rentner', label: 'Rentner/in' },
        { value: 'elternzeit', label: 'Elternzeit' }
      ]
    },
    { name: 'monatliches_nettoeinkommen', label: 'Monatliches Nettoeinkommen (€)', type: 'number', required: true, placeholder: '2500', min: 0 }
  ],
  wohnung: [
    { 
      name: 'wohnart', 
      label: 'Wohnart', 
      type: 'select', 
      required: true,
      options: [
        { value: 'miete', label: 'Zur Miete' },
        { value: 'eigentum', label: 'Eigentum' },
        { value: 'untermiete', label: 'Untermiete' },
        { value: 'wohngemeinschaft', label: 'WG' }
      ]
    },
    { name: 'monatliche_miete', label: 'Monatliche Miete/Kosten (€)', type: 'number', required: false, placeholder: '800', min: 0 },
    { name: 'haushaltsmitglieder_anzahl', label: 'Personen im Haushalt', type: 'number', required: true, placeholder: '2', min: 1, max: 20 }
  ],
  kinder: [
    { name: 'kinder_anzahl', label: 'Anzahl Kinder', type: 'number', required: false, placeholder: '0', min: 0, max: 20 }
  ],
  bank: [
    { name: 'kontoinhaber', label: 'Kontoinhaber', type: 'text', required: false, placeholder: 'Max Mustermann' },
    { name: 'iban', label: 'IBAN', type: 'text', required: false, placeholder: 'DE89 3704 0044 0532 0130 00' }
  ]
};

// Fields that should be stored in lebenssituation
const LEBENSSITUATION_FIELDS = [
  'beschaeftigungsstatus', 'monatliches_nettoeinkommen', 'wohnart', 
  'monatliche_miete', 'haushaltsmitglieder_anzahl', 'kinder_anzahl'
];

export default function ProfileQuickEdit({ section, userProfile, onSave, onCancel }) {
  const [formData, setFormData] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const fields = FIELD_CONFIGS[section.id] || [];

  useEffect(() => {
    // Initialize form data from user profile
    const initialData = {};
    fields.forEach(field => {
      let value = userProfile?.[field.name];
      // Check in lebenssituation if not found at root
      if (value === undefined && userProfile?.lebenssituation) {
        value = userProfile.lebenssituation[field.name];
      }
      initialData[field.name] = value ?? '';
    });
    setFormData(initialData);
  }, [section, userProfile]);

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} ist erforderlich`;
      }
      if (field.pattern && formData[field.name]) {
        const regex = new RegExp(`^${field.pattern}$`);
        if (!regex.test(formData[field.name])) {
          newErrors[field.name] = `${field.label} hat ein ungültiges Format`;
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    setIsSaving(true);
    try {
      // Prepare data - separate root fields from lebenssituation fields
      const rootData = {};
      const lebenssituationData = {};

      Object.entries(formData).forEach(([key, value]) => {
        if (LEBENSSITUATION_FIELDS.includes(key)) {
          lebenssituationData[key] = value;
        } else {
          rootData[key] = value;
        }
      });

      const updateData = { ...rootData };
      if (Object.keys(lebenssituationData).length > 0) {
        updateData.lebenssituation = {
          ...(userProfile?.lebenssituation || {}),
          ...lebenssituationData
        };
      }

      await onSave(updateData);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
      }, 1500);
    } catch (error) {
      console.error('Save error:', error);
      setErrors({ _form: 'Fehler beim Speichern. Bitte versuche es erneut.' });
    } finally {
      setIsSaving(false);
    }
  };

  const renderField = (field) => {
    const value = formData[field.name] ?? '';
    const error = errors[field.name];

    if (field.type === 'select') {
      return (
        <div key={field.name} className="space-y-2">
          <Label className="text-slate-300">
            {field.label}
            {field.required && <span className="text-red-400 ml-1">*</span>}
          </Label>
          <NativeSelect
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            placeholder="Bitte wählen..."
            options={field.options}
            className="bg-slate-800 border-white/10 text-white"
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
        </div>
      );
    }

    return (
      <div key={field.name} className="space-y-2">
        <Label className="text-slate-300">
          {field.label}
          {field.required && <span className="text-red-400 ml-1">*</span>}
        </Label>
        <Input
          type={field.type}
          value={value}
          onChange={(e) => handleChange(field.name, field.type === 'number' ? (e.target.value === '' ? '' : Number(e.target.value)) : e.target.value)}
          placeholder={field.placeholder}
          min={field.min}
          max={field.max}
          pattern={field.pattern}
          className="bg-slate-800 border-white/10 text-white placeholder:text-slate-500"
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors._form && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
          {errors._form}
        </div>
      )}

      <div className="space-y-4">
        {fields.map(renderField)}
      </div>

      {/* Info Box */}
      <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
        <p className="text-sm text-blue-300">
          💡 Diese Daten werden für die AI-Analyse deiner Ansprüche verwendet und sicher verschlüsselt gespeichert.
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1 border-white/10 text-slate-300 hover:bg-white/5"
        >
          Abbrechen
        </Button>
        <Button
          type="submit"
          disabled={isSaving || saveSuccess}
          className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Speichern...
            </>
          ) : saveSuccess ? (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Gespeichert!
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Speichern
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
