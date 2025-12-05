import React from 'react';
import { supabase } from '@/api/supabaseClient';

export default function AuthBridge() {
  const [debugMsg, setDebugMsg] = React.useState('Initialisierung...');
  
  React.useEffect(() => {
    const url = new URL(window.location.href);
    const access_token = url.searchParams.get('access_token');
    const refresh_token = url.searchParams.get('refresh_token');
    
    console.warn('🔐 AuthBridge: Start', { 
      hasAccessToken: !!access_token, 
      hasRefreshToken: !!refresh_token
    });
    
    if (!access_token || !refresh_token) {
      setDebugMsg('Keine Tokens - Redirect zu /auth');
      setTimeout(() => {
        window.location.href = '/auth';
      }, 1000);
      return;
    }

    setDebugMsg('Tokens empfangen - setze Session...');

    // KRITISCH: Direkt localStorage setzen für sofortige Verfügbarkeit
    const STORAGE_KEY = 'sb-yjjauvmjyhlxcoumwqlj-auth-token';
    
    (async () => {
      try {
        setDebugMsg('Schritt 1: Session wird gesetzt...');
        
        // METHODE 1: Direkt in localStorage schreiben (schneller & zuverlässiger)
        const sessionData = {
          access_token,
          refresh_token,
          token_type: 'bearer',
          expires_in: 3600,
          expires_at: Math.floor(Date.now() / 1000) + 3600
        };
        
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData));
          console.warn('✅ AuthBridge: Session direkt in localStorage gesetzt');
        } catch (storageError) {
          console.warn('⚠️ localStorage write failed:', storageError);
        }
        
        setDebugMsg('Schritt 2: Supabase Session wird initialisiert...');
        
        // METHODE 2: Auch über Supabase API setzen (für Auth State)
        const { data, error } = await supabase.auth.setSession({
          access_token,
          refresh_token
        });
        
        if (error) {
          console.warn('⚠️ setSession error (ignoriert):', error.message);
          // Nicht abbrechen - localStorage sollte funktionieren
        }
        
        if (data?.session) {
          console.warn('✅ AuthBridge: Supabase Session gesetzt:', {
            userId: data.session.user?.id,
            email: data.session.user?.email
          });
        }
        
        setDebugMsg('Schritt 3: Session wird verifiziert...');
        
        // Kurz warten für Persistierung
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Verifiziere Session
        const { data: verifyData } = await supabase.auth.getSession();
        const hasSession = !!verifyData?.session;
        const hasLocalStorage = !!localStorage.getItem(STORAGE_KEY);
        
        console.warn('🔍 AuthBridge: Verification', { hasSession, hasLocalStorage });
        
        if (!hasSession && !hasLocalStorage) {
          throw new Error('Session konnte nicht gesetzt werden');
        }
        
        // Markiere als "gerade eingeloggt" um Onboarding-Redirect zu verhindern
        localStorage.setItem('justLoggedIn', '1');
        
        setDebugMsg('✅ Erfolgreich! Weiterleitung...');
        
        // URL bereinigen und weiterleiten
        setTimeout(() => {
          window.location.replace('/profilseite');
        }, 200);
        
      } catch (e) {
        console.error('❌ AuthBridge Fehler:', e);
        setDebugMsg(`FEHLER: ${e.message}`);
        
        // Bei Fehler: Zur Auth-Seite
        setTimeout(() => {
          window.location.href = '/auth';
        }, 3000);
      }
    })();
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      backgroundColor: '#000',
      color: '#fff'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '60px',
          height: '60px',
          border: '4px solid rgba(16, 185, 129, 0.3)',
          borderTop: '4px solid rgb(16, 185, 129)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 20px'
        }} />
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>🔐 Authentifizierung läuft...</h2>
        <p style={{ color: '#888' }}>Bitte warten, Sie werden weitergeleitet...</p>
        <p style={{ color: '#10b981', marginTop: '20px', fontSize: '14px' }}>{debugMsg}</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}
