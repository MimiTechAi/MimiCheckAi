# Stripe 401 Fehler - Diagnose & Fix

## Problem
User bekommt 401 Unauthorized Fehler beim Versuch zu upgraden auf der Pricing Page.

## Ursache
Der Authorization Header wird nicht korrekt an die Edge Function weitergegeben.

## Mögliche Gründe

### 1. Session ist abgelaufen
```javascript
// Check in Browser Console:
const { data: { session } } = await supabase.auth.getSession();
console.log('Session:', session);
```

**Wenn `session` null ist:**
- User muss sich neu einloggen
- Session Cookie ist abgelaufen
- LocalStorage wurde gelöscht

### 2. Authorization Header fehlt
```javascript
// In src/api/functions.js wird der Header gesetzt:
headers: {
  Authorization: `Bearer ${session.access_token}`,
  'Content-Type': 'application/json'
}
```

**Prüfen:**
- Ist `session.access_token` vorhanden?
- Wird der Header korrekt weitergegeben?

### 3. Edge Function prüft Auth zu streng
```typescript
// In supabase/functions/create-stripe-checkout/index.ts:
const { data: { user }, error: userError } = await supabaseClient.auth.getUser()

if (userError || !user) {
    return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401 }
    )
}
```

---

## Fix-Schritte

### Schritt 1: Session prüfen
```javascript
// In Browser Console auf https://mimicheck.vercel.app
const { data: { session } } = await supabase.auth.getSession();
console.log('Session:', session);
console.log('Access Token:', session?.access_token);
console.log('User:', session?.user);
```

**Erwartetes Ergebnis:**
```javascript
{
  access_token: "eyJhbGc...",
  refresh_token: "...",
  user: {
    id: "...",
    email: "user@example.com",
    ...
  }
}
```

### Schritt 2: Function Call testen
```javascript
// In Browser Console
const response = await supabase.functions.invoke('create-stripe-checkout', {
  body: {
    planId: 'premium',
    successUrl: window.location.origin + '/pricing?payment=success',
    cancelUrl: window.location.origin + '/pricing?payment=cancelled'
  },
  headers: {
    Authorization: `Bearer ${session.access_token}`,
    'Content-Type': 'application/json'
  }
});

console.log('Response:', response);
```

**Erwartetes Ergebnis:**
```javascript
{
  data: {
    checkoutUrl: "https://checkout.stripe.com/...",
    sessionId: "cs_..."
  },
  error: null
}
```

### Schritt 3: Edge Function Logs prüfen
```bash
# In Terminal
supabase functions logs create-stripe-checkout --project-ref yjjauvmjyhlxcoumwqlj
```

**Suche nach:**
- `Unauthorized` - Auth Fehler
- `No valid session` - Session Problem
- `STRIPE_SECRET_KEY not set` - Config Problem

---

## Temporärer Workaround

Wenn das Problem weiterhin besteht, können wir die Edge Function ohne JWT Verification deployen:

```bash
supabase functions deploy create-stripe-checkout --project-ref yjjauvmjyhlxcoumwqlj --no-verify-jwt
```

**ABER:** Das ist NICHT sicher für Production! Die Function würde dann KEINE Auth prüfen.

---

## Langfristige Lösung

### Option 1: Session Refresh implementieren
```javascript
// In src/api/functions.js
async function invokeFunction(functionName, body = {}) {
  try {
    // Refresh session if needed
    const { data: { session }, error: sessionError } = await supabase.auth.refreshSession();
    
    if (sessionError || !session) {
      // Try to get existing session
      const { data: { session: existingSession } } = await supabase.auth.getSession();
      
      if (!existingSession) {
        throw new Error('Bitte melden Sie sich erneut an');
      }
      
      session = existingSession;
    }

    // Rest of the code...
  }
}
```

### Option 2: Supabase Client mit Auto-Refresh
```javascript
// In src/api/supabaseClient.js
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});
```

---

## Debug-Modus aktivieren

### In src/api/functions.js:
```javascript
async function invokeFunction(functionName, body = {}) {
  console.log(`[DEBUG] Calling ${functionName}`);
  
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  console.log('[DEBUG] Session:', session ? 'EXISTS' : 'NULL');
  console.log('[DEBUG] Session Error:', sessionError);
  console.log('[DEBUG] Access Token:', session?.access_token ? 'EXISTS' : 'NULL');
  
  // Rest of the code...
}
```

### In Browser Console:
```javascript
// Enable verbose logging
localStorage.setItem('supabase.auth.debug', 'true');
```

---

## Test-Anleitung

### 1. Als eingeloggter User:
1. Öffne https://mimicheck.vercel.app
2. Öffne Browser Console (F12)
3. Gehe zu Pricing Page
4. Klicke auf "Premium" Button
5. Prüfe Console Logs:
   ```
   Calling create-stripe-checkout with session: user@example.com
   ```

### 2. Wenn 401 Fehler:
1. Prüfe Session:
   ```javascript
   const { data: { session } } = await supabase.auth.getSession();
   console.log(session);
   ```
2. Wenn `null`: Logout und neu einloggen
3. Wenn vorhanden: Prüfe Edge Function Logs

### 3. Edge Function Logs:
```bash
supabase functions logs create-stripe-checkout --project-ref yjjauvmjyhlxcoumwqlj | grep "401\|Unauthorized"
```

---

## Häufige Fehler

### "No valid session for create-stripe-checkout"
**Lösung:** User muss sich neu einloggen

### "Error calling create-stripe-checkout: FunctionsHttpError"
**Lösung:** Edge Function ist nicht erreichbar oder hat einen Fehler

### "Bitte melden Sie sich erneut an"
**Lösung:** Session ist abgelaufen, User muss sich neu einloggen

---

## Nächste Schritte

1. ✅ Frontend deployed mit verbessertem Logging
2. ⏳ User soll testen und Console Logs teilen
3. ⏳ Basierend auf Logs: Weitere Fixes implementieren
4. ⏳ Session Refresh implementieren (falls nötig)

---

**Status:** 🔍 DEBUGGING
**Deployed:** 2025-12-05 14:32 UTC
**Next:** User soll Upgrade testen und Console Logs teilen
