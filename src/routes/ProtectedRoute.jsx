import React from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/api/supabaseClient';

// Storage Key muss mit supabaseClient.js übereinstimmen
const STORAGE_KEY = 'sb-yjjauvmjyhlxcoumwqlj-auth-token';

export default function ProtectedRoute({ children }) {
  // 🔧 DEV MODE: Bypass Auth für lokale Entwicklung
  const DEV_BYPASS = false; // ✅ Production-ready
  
  const [ready, setReady] = React.useState(DEV_BYPASS);
  const [session, setSession] = React.useState(DEV_BYPASS ? { user: { id: 'dev-user' } } : null);

  React.useEffect(() => {
    // Im Dev-Mode keine Auth-Prüfung
    if (DEV_BYPASS) {
      console.log('🔧 DEV MODE: Auth bypassed');
      return;
    }
    
    let mounted = true;
    let retryCount = 0;
    const MAX_RETRIES = 2; // Reduziert für schnellere Antwort
    
    async function checkSession() {
      console.log(`🔍 ProtectedRoute: Checking session (attempt ${retryCount + 1}/${MAX_RETRIES + 1})`);
      
      try {
        // METHODE 1: Prüfe localStorage direkt (schneller)
        const storedSession = localStorage.getItem(STORAGE_KEY);
        if (storedSession) {
          try {
            const parsed = JSON.parse(storedSession);
            if (parsed.access_token) {
              console.log('✅ ProtectedRoute: Session in localStorage gefunden');
              
              // Versuche Session über Supabase zu laden
              const { data, error } = await supabase.auth.getSession();
              
              if (data?.session) {
                console.log('✅ ProtectedRoute: Supabase Session bestätigt:', {
                  userId: data.session.user?.id,
                  email: data.session.user?.email
                });
                
                if (mounted) {
                  setSession(data.session);
                  setReady(true);
                }
                return true;
              }
              
              // Falls Supabase keine Session hat, aber localStorage schon
              // Versuche Session zu setzen
              if (parsed.access_token && parsed.refresh_token) {
                console.log('🔄 ProtectedRoute: Versuche Session aus localStorage wiederherzustellen...');
                const { data: restoredData } = await supabase.auth.setSession({
                  access_token: parsed.access_token,
                  refresh_token: parsed.refresh_token
                });
                
                if (restoredData?.session) {
                  console.log('✅ ProtectedRoute: Session wiederhergestellt!');
                  if (mounted) {
                    setSession(restoredData.session);
                    setReady(true);
                  }
                  return true;
                }
              }
            }
          } catch (parseError) {
            console.warn('⚠️ ProtectedRoute: localStorage parse error:', parseError);
          }
        }
        
        // METHODE 2: Direkt Supabase fragen
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('❌ ProtectedRoute: getSession error:', error);
          // Nicht abbrechen - vielleicht ist localStorage noch gültig
        }
        
        if (data?.session) {
          console.log('✅ ProtectedRoute: Session found via Supabase!', {
            userId: data.session.user?.id,
            email: data.session.user?.email
          });
          
          if (mounted) {
            setSession(data.session);
            setReady(true);
          }
          return true;
        }
        
        console.warn('⚠️ ProtectedRoute: No session found');
        return false;
        
      } catch (e) {
        console.error('❌ ProtectedRoute: Session check failed:', e);
        return false;
      }
    }
    
    async function checkWithRetry() {
      const hasSession = await checkSession();
      
      if (!hasSession && retryCount < MAX_RETRIES && mounted) {
        // Retry nach kurzer Wartezeit (für den Fall dass Session gerade gesetzt wird)
        retryCount++;
        console.log(`⏳ ProtectedRoute: Retrying in 300ms... (${retryCount}/${MAX_RETRIES})`);
        setTimeout(() => {
          if (mounted) checkWithRetry();
        }, 300);
      } else if (mounted) {
        // Fertig - entweder Session gefunden oder alle Retries aufgebraucht
        setReady(true);
      }
    }
    
    // Start check
    checkWithRetry();
    
    // Listen for auth state changes
    const { data: { subscription } = { subscription: null } } = supabase.auth.onAuthStateChange((event, s) => {
      console.log('🔔 ProtectedRoute: Auth state changed:', event);
      if (mounted) {
        setSession(s);
        if (s) {
          console.log('✅ ProtectedRoute: Session updated via auth state change');
          setReady(true);
        }
      }
    });
    
    return () => {
      mounted = false;
      subscription?.unsubscribe?.();
    };
  }, []);

  if (!ready) {
    return (
      <div className="flex h-screen bg-slate-950 text-white items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Authentifizierung wird geprüft...</p>
          <p className="text-white/40 text-sm mt-2">Bitte warten...</p>
        </div>
      </div>
    );
  }
  
  // Nicht eingeloggt? → Weiterleitung zur Auth-Seite
  if (!session) {
    console.log('🚫 ProtectedRoute: No session - redirecting to auth');
    
    // WICHTIG: Immer zur internen Auth-Seite weiterleiten (nicht zur Landing Page)
    // Das vermeidet Cross-Domain Session-Probleme
    return <Navigate to="/auth" replace />;
  }
  
  console.log('✅ ProtectedRoute: Access granted');
  return children;
}
