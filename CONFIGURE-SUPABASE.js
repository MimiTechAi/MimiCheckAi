/**
 * SUPABASE KONFIGURATION FÜR AUTO-CONFIRM
 * 
 * WICHTIG: Erstelle zuerst eine .env Datei mit:
 *   VITE_SUPABASE_URL=https://your-project.supabase.co
 *   VITE_SUPABASE_ANON_KEY=your-anon-key
 *   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key (optional, für Admin-Funktionen)
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

// Lade .env Datei
config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'YOUR_SERVICE_ROLE_KEY';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'YOUR_ANON_KEY';

// Validierung
if (supabaseUrl === 'YOUR_SUPABASE_URL') {
  console.error('❌ FEHLER: Bitte .env Datei mit Supabase Credentials erstellen!');
  process.exit(1);
}

// Service Client mit Admin-Rechten (nur wenn Service Key vorhanden)
const adminClient = supabaseServiceKey !== 'YOUR_SERVICE_ROLE_KEY' 
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null;

async function configureAutoConfirm() {
  console.log('🔧 KONFIGURIERE SUPABASE FÜR AUTO-CONFIRM\n');
  
  if (!adminClient) {
    console.error('❌ Service Role Key nicht konfiguriert!');
    console.log('   Füge SUPABASE_SERVICE_ROLE_KEY zur .env Datei hinzu.');
    console.log('   Alternativ: Nutze quickUserSetup() ohne Admin-Rechte.');
    return;
  }
  
  try {
    // 1. Alle existierenden User bestätigen
    console.log('1️⃣ Bestätige alle existierenden User...');
    
    const { data: users, error: listError } = await adminClient.auth.admin.listUsers();
    
    if (listError) {
      console.error('❌ Fehler beim Abrufen der User:', listError);
      return;
    }
    
    console.log(`📊 ${users.users.length} User gefunden`);
    
    for (const user of users.users) {
      if (!user.email_confirmed_at) {
        console.log(`✉️ Bestätige ${user.email}...`);
        
        const { error: updateError } = await adminClient.auth.admin.updateUserById(
          user.id,
          { 
            email_confirmed_at: new Date().toISOString(),
            user_metadata: { ...user.user_metadata, email_verified: true }
          }
        );
        
        if (updateError) {
          console.error(`❌ Fehler bei ${user.email}:`, updateError);
        } else {
          console.log(`✅ ${user.email} bestätigt`);
        }
      }
    }
    
    console.log('\n✅ KONFIGURATION ABGESCHLOSSEN!');
    
  } catch (error) {
    console.error('❌ Unerwarteter Fehler:', error);
  }
}

// Alternative: Ohne Service Key - Nutze normale Auth
async function quickUserSetup() {
  console.log('🚀 QUICK USER SETUP (ohne Admin-Rechte)\n');
  
  if (supabaseAnonKey === 'YOUR_ANON_KEY') {
    console.error('❌ FEHLER: Bitte .env Datei mit VITE_SUPABASE_ANON_KEY erstellen!');
    return;
  }
  
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  
  // Erstelle Test-User
  const testUsers = [
    { email: 'test1@test.com', password: 'Test123!' },
    { email: 'test2@test.com', password: 'Test123!' },
    { email: 'demo@demo.com', password: 'Demo123!' }
  ];
  
  for (const user of testUsers) {
    console.log(`📧 Erstelle ${user.email}...`);
    
    const { data, error } = await supabase.auth.signUp({
      email: user.email,
      password: user.password,
      options: {
        emailRedirectTo: 'http://localhost:8005/auth-bridge',
        data: { 
          name: 'Test User'
        }
      }
    });
    
    if (error) {
      if (error.message?.includes('already registered')) {
        console.log(`ℹ️ ${user.email} existiert bereits`);
      } else {
        console.error(`❌ Fehler bei ${user.email}:`, error.message);
      }
    } else {
      console.log(`✅ ${user.email} erstellt`);
    }
  }
  
  console.log('\n✅ Test-User erstellt!');
  console.log('\nVerwende einen dieser User:');
  testUsers.forEach(u => {
    console.log(`📧 ${u.email} / 🔑 ${u.password}`);
  });
}

// Export für Browser-Konsole
if (typeof window !== 'undefined') {
  window.configureAutoConfirm = configureAutoConfirm;
  window.quickUserSetup = quickUserSetup;
  
  console.log('=====================================');
  console.log('🔧 SUPABASE CONFIGURATION HELPER');
  console.log('=====================================\n');
  console.log('Verfügbare Funktionen:\n');
  console.log('1️⃣ quickUserSetup() - Erstelle Test-User (empfohlen)');
  console.log('2️⃣ configureAutoConfirm() - Benötigt Service Key\n');
  console.log('Starte mit: quickUserSetup()');
}

// Auto-run für Node.js
if (typeof window === 'undefined') {
  quickUserSetup().catch(console.error);
}
