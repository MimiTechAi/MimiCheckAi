/**
 * AI Profile Helper Utilities
 * 
 * Helfer-Funktionen für die KI, um User-Profil zu verstehen
 * und intelligente Vorschläge zu machen
 */

/**
 * User Lebenssituation
 */
export interface Lebenssituation {
  wohnadresse?: {
    plz?: string;
    ort?: string;
    strasse?: string;
  };
  monatliches_nettoeinkommen?: number;
  wohnart?: string;
  monatliche_miete_kalt?: number;
  vermoegen?: number;
  anzahl_kinder?: number;
}

/**
 * User Profil
 */
export interface UserProfile {
  vorname?: string;
  nachname?: string;
  full_name?: string;
  geburtsdatum?: string;
  lebenssituation?: Lebenssituation;
}

/**
 * Profil-Vollständigkeit
 */
export interface ProfileCompletion {
  percentage: number;
  missingFields: string[];
  filledFields: string[];
  totalFields: number;
}

/**
 * Generiert einen formatierten Profil-Context für AI System Prompt
 * 
 * @param user - User object from database
 * @returns Formatted context string for AI
 */
export function generateAIProfileContext(user: UserProfile | null): string {
  if (!user) {
    return "User-Profil nicht geladen. Frage nach benötigten Informationen.";
  }

  const completion = calculateProfileCompletion(user);
  const ctx: string[] = [];

  ctx.push(`**Profil-Status**: ${completion.percentage}% vollständig\n`);

  if (completion.percentage === 100) {
    ctx.push("✅ **Das Profil ist vollständig!** Du kannst direkt Anträge ausfüllen.\n");
  } else {
    ctx.push(`⚠️  **Fehlende Felder**: ${completion.missingFields.join(', ')}\n`);
  }

  // Basic Info
  if (user.vorname || user.full_name) {
    ctx.push(`**Name**: ${user.vorname || user.full_name}`);
  }

  if (user.geburtsdatum) {
    ctx.push(`**Geburtsdatum**: ${user.geburtsdatum}`);
  }

  // Address
  const addr = user.lebenssituation?.wohnadresse;
  if (addr?.plz && addr?.ort) {
    ctx.push(`**Adresse**: ${addr.plz} ${addr.ort}`);
  }

  // Financial
  const einkommen = user.lebenssituation?.monatliches_nettoeinkommen;
  if (einkommen) {
    ctx.push(`**Einkommen**: ${einkommen}€/Monat`);
  }

  const wohnart = user.lebenssituation?.wohnart;
  if (wohnart) {
    ctx.push(`**Wohnart**: ${wohnart}`);
  }

  const miete = user.lebenssituation?.monatliche_miete_kalt;
  if (miete) {
    ctx.push(`**Miete (kalt)**: ${miete}€/Monat`);
  }

  return ctx.join('\n');
}

/**
 * Feld-Definition für Profil-Vollständigkeit
 */
interface RequiredField {
  key: string;
  label: string;
  getter: (user: UserProfile) => string | number | undefined;
}

/**
 * Berechnet Profil-Vollständigkeit
 * 
 * @param user - User object
 * @returns Profil-Vollständigkeit mit fehlenden und ausgefüllten Feldern
 */
export function calculateProfileCompletion(user: UserProfile): ProfileCompletion {
  const requiredFields: RequiredField[] = [
    { key: 'vorname', label: 'Vorname', getter: (u) => u.vorname || u.full_name },
    { key: 'geburtsdatum', label: 'Geburtsdatum', getter: (u) => u.geburtsdatum },
    { key: 'plz', label: 'PLZ', getter: (u) => u.lebenssituation?.wohnadresse?.plz },
    { key: 'ort', label: 'Ort', getter: (u) => u.lebenssituation?.wohnadresse?.ort },
    { key: 'wohnart', label: 'Wohnart', getter: (u) => u.lebenssituation?.wohnart },
    { key: 'einkommen', label: 'Einkommen', getter: (u) => u.lebenssituation?.monatliches_nettoeinkommen },
  ];

  const missingFields: string[] = [];
  const filledFields: string[] = [];

  requiredFields.forEach(field => {
    const value = field.getter(user);
    if (value !== null && value !== undefined && value !== '') {
      filledFields.push(field.label);
    } else {
      missingFields.push(field.label);
    }
  });

  const percentage = Math.round((filledFields.length / requiredFields.length) * 100);

  return {
    percentage,
    missingFields,
    filledFields,
    totalFields: requiredFields.length
  };
}

/**
 * Feld-Getter Map
 */
type FieldGetter = (user: UserProfile) => string | number | undefined;

const fieldMap: Record<string, FieldGetter> = {
  'vorname': (u) => u.vorname || u.full_name?.split(' ')[0],
  'nachname': (u) => u.nachname || u.full_name?.split(' ').slice(1).join(' '),
  'geburtsdatum': (u) => u.geburtsdatum,
  'plz': (u) => u.lebenssituation?.wohnadresse?.plz,
  'ort': (u) => u.lebenssituation?.wohnadresse?.ort,
  'strasse': (u) => u.lebenssituation?.wohnadresse?.strasse,
  'wohnart': (u) => u.lebenssituation?.wohnart,
  'einkommen': (u) => u.lebenssituation?.monatliches_nettoeinkommen,
  'miete': (u) => u.lebenssituation?.monatliche_miete_kalt,
  'vermogen': (u) => u.lebenssituation?.vermoegen,
  'anzahl_kinder': (u) => u.lebenssituation?.anzahl_kinder,
};

/**
 * Prüft, ob User ein bestimmtes Feld ausgefüllt hat
 * 
 * @param user - User object
 * @param fieldName - Field name to check
 * @returns true wenn Feld ausgefüllt ist
 */
export function hasProfileField(user: UserProfile, fieldName: string): boolean {
  const getter = fieldMap[fieldName];
  if (!getter) return false;

  const value = getter(user);
  return value !== null && value !== undefined && value !== '';
}

/**
 * Antragstypen
 */
export type FormType = 'wohngeld' | 'buergergeld' | 'kindergeld' | 'elterngeld' | 'bafoeg';

/**
 * Liefert fehlende Felder für einen bestimmten Antragstyp
 * 
 * @param user - User object
 * @param formType - Form type (wohngeld, buergergeld, etc.)
 * @returns Array of missing field labels
 */
export function getMissingFieldsForForm(user: UserProfile, formType: FormType): string[] {
  const baseFields = ['vorname', 'nachname', 'geburtsdatum', 'plz', 'ort'];

  const formSpecificFields: Record<FormType, string[]> = {
    'wohngeld': ['wohnart', 'miete', 'einkommen'],
    'buergergeld': ['einkommen', 'vermogen'],
    'kindergeld': ['anzahl_kinder'],
    'elterngeld': ['anzahl_kinder', 'einkommen'],
    'bafoeg': ['einkommen'],
  };

  const requiredFields = [...baseFields, ...(formSpecificFields[formType] || [])];

  return requiredFields.filter(field => !hasProfileField(user, field));
}
