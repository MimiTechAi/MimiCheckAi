// Script zum Erstellen eines Test-Users in Supabase
// Führe aus mit: node CREATE-TEST-USER.js
//
// WICHTIG: Erstelle zuerst eine .env Datei mit:
//   VITE_SUPABASE_URL=https://your-project.supabase.co
//   VITE_SUPABASE_ANON_KEY=your-anon-key

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

// Lade .env Datei
config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'YOUR_ANON_KEY';

// Validierung
if (supabaseUrl === 'YOUR_SUPABASE_URL' || supabaseAnonKey === 'YOUR_ANON_KEY') {
  console.error('❌ FEHLER: Bitte .env Datei mit Supabase Credentials erstellen!');
  console.error('   VITE_SUPABASE_URL=https://your-project.supabase.co');
  console.error('   VITE_SUPABASE_ANON_KEY=your-anon-key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createTestUser() {
  console.log('🔧 Erstelle Test-User...\n');
  
  const testEmail = 'test@example.com';
  const testPassword = 'Test123456!';
  
  console.log('📧 Email:', testEmail);
  console.log('🔑 Passwort:', testPassword);
  console.log('');
  
  try {
    // Versuche zuerst zu registrieren
    console.log('1️⃣ Versuche Registrierung...');
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
      options: {
        data: {
          name: 'Test User'
        }
      }
    });
    
    if (signUpError) {
      // User existiert bereits oder anderer Fehler
      if (signUpError.message.includes('already registered')) {
        console.log('✅ User existiert bereits!');
        console.log('');
        
        // Versuche Login
        console.log('2️⃣ Versuche Login...');
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email: testEmail,
          password: testPassword
        });
        
        if (signInError) {
          console.error('❌ Login fehlgeschlagen:', signInError.message);
          console.log('');
          console.log('🔧 LÖSUNG: Passwort zurücksetzen');
          console.log('   Gehe zu Supabase Dashboard → Authentication → Users');
          console.log('   Finde User:', testEmail);
          console.log('   Klicke auf "..." → "Reset Password"');
        } else {
          console.log('✅ Login erfolgreich!');
          console.log('');
          console.log('👤 User Info:');
          console.log('   ID:', signInData.user.id);
          console.log('   Email:', signInData.user.email);
          console.log('   Email Confirmed:', signInData.user.email_confirmed_at ? '✅ Ja' : '❌ Nein');
        }
      } else {
        console.error('❌ Registrierung fehlgeschlagen:', signUpError.message);
      }
    } else {
      console.log('✅ User erfolgreich erstellt!');
      console.log('');
      console.log('👤 User Info:');
      console.log('   ID:', signUpData.user.id);
      console.log('   Email:', signUpData.user.email);
      console.log('   Email Confirmed:', signUpData.user.email_confirmed_at ? '✅ Ja' : '❌ Nein');
      console.log('');
      
      if (!signUpData.user.email_confirmed_at) {
        console.log('⚠️ Email ist NICHT bestätigt!');
        console.log('   Das kann Login verhindern wenn Email-Bestätigung erforderlich ist.');
        console.log('');
        console.log('🔧 LÖSUNG:');
        console.log('   1. Supabase Dashboard → Authentication → Users');
        console.log('   2. Finde User:', testEmail);
        console.log('   3. Klicke auf "..." → "Verify Email"');
      }
    }
    
  } catch (error) {
    console.error('❌ Fehler:', error.message);
  }
  
  console.log('');
  console.log('═══════════════════════════════════════════════════');
  console.log('📋 TEST-CREDENTIALS:');
  console.log('   Email:    test@example.com');
  console.log('   Passwort: Test123456!');
  console.log('═══════════════════════════════════════════════════');
}

createTestUser();
