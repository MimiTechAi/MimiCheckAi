import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// SECURITY: API-Keys müssen aus Umgebungsvariablen kommen, KEINE Fallbacks!
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnon = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// Validierung der Umgebungsvariablen - KEINE Key-Fragmente loggen!
const missingVars: string[] = [];
if (!supabaseUrl) missingVars.push('VITE_SUPABASE_URL');
if (!supabaseAnon) missingVars.push('VITE_SUPABASE_ANON_KEY');

if (missingVars.length > 0) {
  const errorMsg = `Supabase Konfiguration fehlt: ${missingVars.join(', ')}. Bitte .env Datei prüfen.`;
  
  // In Production: Fehler werfen
  if (import.meta.env.PROD) {
    throw new Error(errorMsg);
  }
  
  // In Development: Warnung ausgeben
  console.error('❌ KRITISCH:', errorMsg);
  console.error('Erstellen Sie eine .env Datei mit:');
  console.error('  VITE_SUPABASE_URL=https://your-project.supabase.co');
  console.error('  VITE_SUPABASE_ANON_KEY=your-anon-key');
}

// Status-Log ohne sensible Daten
if (import.meta.env.DEV) {
  console.log('🔐 Supabase Config:', { 
    url: supabaseUrl ? '✅ SET' : '❌ MISSING', 
    key: supabaseAnon ? '✅ SET' : '❌ MISSING' 
  });
}

// KRITISCH: Storage Key muss dem Supabase-Standard entsprechen
// Format: sb-<project-ref>-auth-token
// Für Project yjjauvmjyhlxcoumwqlj: sb-yjjauvmjyhlxcoumwqlj-auth-token
const STORAGE_KEY = 'sb-yjjauvmjyhlxcoumwqlj-auth-token';

export const supabase: SupabaseClient = createClient(supabaseUrl || '', supabaseAnon || '', {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: STORAGE_KEY,
    storage: window.localStorage,
    flowType: 'pkce', // SOTA 2025: PKCE ist Standard für OAuth
  },
});

/**
 * Health Check für Supabase-Verbindung
 * @returns true wenn Verbindung erfolgreich
 */
export async function supabaseHealthcheck(): Promise<boolean> {
  try {
    const { data, error } = await supabase.functions.invoke('health', { body: {} });
    if (error) return false;
    return Boolean(data?.ok);
  } catch {
    return false;
  }
}

/**
 * Initialisiert Supabase und prüft die Verbindung
 * Wirft einen Fehler wenn die Konfiguration fehlt
 */
export function validateSupabaseConfig(): boolean {
  if (!supabaseUrl || !supabaseAnon) {
    throw new Error(`Supabase Konfiguration fehlt: ${missingVars.join(', ')}`);
  }
  return true;
}
