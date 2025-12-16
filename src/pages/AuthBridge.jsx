import { useEffect } from 'react';
import { supabase, SUPABASE_STORAGE_KEY } from '@/api/supabaseClient';
import PremiumLoader from '@/components/ui/PremiumLoader';

export default function AuthBridge() {
  
  useEffect(() => {
    const url = new URL(window.location.href);
    const access_token = url.searchParams.get('access_token');
    const refresh_token = url.searchParams.get('refresh_token');
    
    if (!access_token || !refresh_token) {
      setTimeout(() => {
        window.location.href = '/auth';
      }, 1000);
      return;
    }

    const STORAGE_KEY = SUPABASE_STORAGE_KEY;
    
    (async () => {
      try {
        // Step 1: Write to localStorage directly
        const sessionData = {
          access_token,
          refresh_token,
          token_type: 'bearer',
          expires_in: 3600,
          expires_at: Math.floor(Date.now() / 1000) + 3600
        };
        
        if (STORAGE_KEY) {
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData));
          } catch (storageError) {
            console.warn('localStorage write failed:', storageError);
          }
        }
        
        // Step 2: Set via Supabase API
        const { error } = await supabase.auth.setSession({
          access_token,
          refresh_token
        });
        
        if (error) {
          console.warn('setSession warning:', error.message);
        }
        
        // Step 3: Wait for persistence
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Step 4: Verify
        const { data: verifyData } = await supabase.auth.getSession();
        const hasSession = !!verifyData?.session;
        const hasLocalStorage = STORAGE_KEY ? !!localStorage.getItem(STORAGE_KEY) : false;
        
        if (!hasSession && !hasLocalStorage) {
          throw new Error('Session could not be established');
        }
        
        // Mark as just logged in
        localStorage.setItem('justLoggedIn', '1');
        
        // Redirect after animation completes
        setTimeout(() => {
          window.location.replace('/profilseite');
        }, 2500);
        
      } catch (e) {
        console.error('AuthBridge error:', e);
        
        setTimeout(() => {
          window.location.href = '/auth';
        }, 3000);
      }
    })();
  }, []);

  return <PremiumLoader showProgress={true} />;
}
