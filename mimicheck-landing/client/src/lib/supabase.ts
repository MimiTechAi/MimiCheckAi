import { createClient } from '@supabase/supabase-js';

// Environment Variables - KEINE Fallback-Werte für Sicherheit!
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validierung der Umgebungsvariablen
if (!supabaseUrl || !supabaseAnonKey) {
  const missing = [];
  if (!supabaseUrl) missing.push('VITE_SUPABASE_URL');
  if (!supabaseAnonKey) missing.push('VITE_SUPABASE_ANON_KEY');
  
  const errorMsg = `❌ Supabase Konfiguration fehlt: ${missing.join(', ')}. Bitte .env Datei prüfen.`;
  
  // In Production: Fehler werfen
  if (import.meta.env.PROD) {
    throw new Error(errorMsg);
  }
  
  // In Development: Warnung ausgeben
  console.error(errorMsg);
  console.error('Erstellen Sie eine .env Datei mit:');
  console.error('  VITE_SUPABASE_URL=https://your-project.supabase.co');
  console.error('  VITE_SUPABASE_ANON_KEY=your-anon-key');
}

// KRITISCH: Storage Key muss dem Supabase-Standard entsprechen
// Format: sb-<project-ref>-auth-token
// Für Project yjjauvmjyhlxcoumwqlj: sb-yjjauvmjyhlxcoumwqlj-auth-token
const STORAGE_KEY = 'sb-yjjauvmjyhlxcoumwqlj-auth-token';

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || '',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: STORAGE_KEY,
      flowType: 'pkce', // SOTA 2025: PKCE ist Standard für OAuth
    },
  }
);

// Health Check Funktion
export async function supabaseHealthcheck(): Promise<boolean> {
  try {
    const { error } = await supabase.from('contact_requests').select('id', { count: 'exact', head: true }).limit(1);
    return !error;
  } catch {
    return false;
  }
}
