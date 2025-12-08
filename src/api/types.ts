/**
 * TypeScript Types für Supabase Entities
 */

// ============================================
// USER PROFILE
// ============================================

export interface UserProfile {
  id: string;
  auth_id: string;
  email: string;
  name?: string;
  full_name?: string; // Alias for name
  vorname?: string;
  nachname?: string;
  geburtsdatum?: string;
  lebenssituation?: Lebenssituation;
  created_at: string;
  updated_at?: string;
}

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

// ============================================
// APPLICATION / ABRECHNUNG
// ============================================

export interface Application {
  id: string;
  user_id: string;
  title: string;
  filename?: string; // Alias for title
  type: string;
  status?: string;
  data?: Record<string, unknown>;
  file_url?: string;
  created_at: string;
  created_date?: string; // Alias for created_at
  updated_at?: string;
}

export interface Abrechnung extends Application {
  // Abrechnung is mapped to applications table
}

// ============================================
// FÖRDERLEISTUNG
// ============================================

export interface Foerderleistung {
  id: string;
  user_id?: string | null; // null for global entries
  typ: string;
  titel: string;
  beschreibung?: string;
  betrag?: number;
  status?: string;
  created_at: string;
  updated_at?: string;
}

// ============================================
// ANTRAG
// ============================================

export interface Antrag extends Application {
  // Antrag is also mapped to applications table
}

// ============================================
// NOTIFICATION
// ============================================

export interface Notification {
  id: string;
  user_id: string;
  titel: string;
  nachricht: string;
  typ?: string;
  gelesen: boolean;
  gelesen_am?: string;
  created_at: string;
}

// ============================================
// STORAGE
// ============================================

export interface UploadResult {
  path: string;
  url: string;
  key: string;
}

// ============================================
// QUERY OPTIONS
// ============================================

export interface ListOptions {
  orderBy?: string;
  ascending?: boolean;
  limit?: number;
  status?: string;
  typ?: string;
  unreadOnly?: boolean;
}
