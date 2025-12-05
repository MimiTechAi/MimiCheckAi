# Supabase Auth Best Practices 2025

## Problem-Analyse
Das aktuelle Problem: `setSession()` hängt und gibt keine Antwort zurück.

## Root Cause
Nach Recherche der Supabase-Dokumentation 2025:

1. **PKCE Flow ist Standard**: Supabase verwendet seit 2024 standardmäßig PKCE (Proof Key for Code Exchange) für OAuth-Flows
2. **Cross-Domain Sessions**: Sessions zwischen verschiedenen Domains (`mimicheck.ai` → `app.mimicheck.ai`) erfordern spezielle Konfiguration
3. **Storage-Key Mismatch**: Der localStorage-Key muss exakt mit der Supabase-Client-Konfiguration übereinstimmen

## Offizielle Supabase Best Practices

### 1. Server-Side Auth (Empfohlen für Production)
- Verwende Server-Side Rendering (SSR) für Auth
- Nutze Supabase Auth Helpers für Next.js/SvelteKit
- Vermeide Client-Side Token-Handling

### 2. PKCE Flow (OAuth Standard)
```javascript
// Empfohlener Flow für Cross-Domain Auth
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'email',
  options: {
    redirectTo: 'https://app.mimicheck.ai/auth/callback',
    skipBrowserRedirect: false
  }
})
```

### 3. Auth Callbacks
- Verwende dedizierte `/auth/callback` Route
- Lasse Supabase den Code-Exchange automatisch handhaben
- Keine manuellen Token-Manipulationen

### 4. Session Management
```javascript
// Korrekte Session-Prüfung
const { data: { session } } = await supabase.auth.getSession()

// Session-Listener für Auto-Refresh
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN') {
    // Handle sign in
  }
})
```

## Lösung für MiMiCheck

### Option A: Vereinfachter Flow (Empfohlen)
1. **Entferne Cross-Domain Auth komplett**
2. **Login direkt auf `app.mimicheck.ai/auth`**
3. **Verwende Standard Supabase signInWithPassword**
4. **Keine Token-Übergabe zwischen Domains**

### Option B: Korrekte Cross-Domain Implementation
1. **Verwende Supabase OAuth Flow mit PKCE**
2. **Konfiguriere Redirect URLs in Supabase Dashboard**
3. **Implementiere `/auth/callback` Route**
4. **Lasse Supabase den Token-Exchange handhaben**

## Implementation Plan

### Schritt 1: Supabase Dashboard Konfiguration
- Gehe zu: https://supabase.com/dashboard/project/yjjauvmjyhlxcoumwqlj/auth/url-configuration
- Füge hinzu:
  - Site URL: `https://app.mimicheck.ai`
  - Redirect URLs: 
    - `https://app.mimicheck.ai/auth/callback`
    - `https://mimicheck.ai/auth/callback`

### Schritt 2: Implementiere Auth Callback Route
```javascript
// src/pages/AuthCallback.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/api/supabaseClient';

export default function AuthCallback() {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Supabase handhabt automatisch den Code-Exchange
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/profilseite');
      } else {
        navigate('/auth');
      }
    });
  }, [navigate]);
  
  return <div>Loading...</div>;
}
```

### Schritt 3: Verwende Standard Auth Flow
```javascript
// Kein manuelles Token-Handling!
const { error } = await supabase.auth.signInWithPassword({
  email,
  password
});

if (!error) {
  // Supabase handhabt Session automatisch
  navigate('/profilseite');
}
```

## Warum der aktuelle Ansatz nicht funktioniert

1. **Manuelles Token-Handling**: Wir versuchen, Tokens manuell zwischen Domains zu übergeben
2. **setSession() hängt**: Wahrscheinlich CORS oder Netzwerk-Timeout
3. **localStorage-Manipulation**: Nicht empfohlen, kann zu inkonsistenten States führen
4. **Kein PKCE**: Moderne OAuth-Flows erfordern PKCE für Sicherheit

## Nächste Schritte

1. ✅ Implementiere Auth direkt auf `app.mimicheck.ai`
2. ✅ Entferne Cross-Domain Token-Übergabe
3. ✅ Verwende Standard Supabase Auth Flow
4. ✅ Teste mit echten Credentials
5. ✅ Konfiguriere Supabase Dashboard URLs
