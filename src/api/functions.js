// src/api/functions.js - Supabase Edge Functions
import { supabase } from './supabaseClient';

/**
 * Helper to call Supabase Edge Functions with auth
 * CRITICAL: When verify_jwt is enabled in Edge Functions, we MUST pass the Authorization header
 */
async function invokeFunction(functionName, body = {}) {
  try {
    // Get current session to ensure we have a valid auth token
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    const { data: { session: initialSession }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !initialSession) {
      console.error(`No valid session for ${functionName}:`, sessionError);
      throw new Error('Bitte melden Sie sich erneut an');
    }

    // 1. Hole explizit die Session
    let { data: { session } } = await supabase.auth.getSession();

    // Fallback: Wenn keine Session, versuche Refresh
    if (!session?.access_token) {
      console.log('⚠️ No active session found, attempting refresh...');
      const refreshResult = await supabase.auth.refreshSession();
      session = refreshResult.data.session;
    }

    const token = session?.access_token;

    console.log(`Invoking ${functionName} with token:`, token ? '✅ User Token Present' : '❌ No User Token (Using Anon Key)');

    // STRICT MODE: Für Stripe MÜSSEN wir einen User haben. Abbrechen wenn nicht.
    if (functionName === 'create-stripe-checkout' && !token) {
      return { error: 'Sie sind nicht eingeloggt. Bitte laden Sie die Seite neu oder melden Sie sich erneut an.' };
    }

    const headers = {
      'Content-Type': 'application/json'
    };

    // 2. Erzwinge den Authorization Header
    // Supabase macht das meist automatisch, aber wir gehen auf Nummer sicher.
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const { data, error } = await supabase.functions.invoke(functionName, {
      body,
      headers: headers // Hier übergeben wir unsere expliziten Header
    });

    if (error) {
      console.error('❌ Function Invocation Error:', error);

      // Versuche, den Body der Antwort zu lesen, falls vorhanden
      if (error instanceof Error && 'context' in error) {
        // @ts-ignore
        const body = await error.context.json().catch(() => 'No Body');
        console.error('❌ Error Body from Server:', body);

        // Wenn der Server einen spezifischen Fehlertext gesendet hat, nutzen wir den
        if (body && body.error) {
          return { error: `Server Error: ${body.error} (Details: ${body.details || ''})` };
        }
      }

      console.error('Full Error Object:', JSON.stringify(error, null, 2));
      return { error: error.message || 'Unknown function error' };
    }

    return { data, error: null };
  } catch (err) {
    console.error(`Exception calling ${functionName}:`, err);
    return { data: null, error: err.message };
  }
}

/**
 * Stripe Checkout Session
 */
export const createStripeCheckoutSession = async ({ planId, successUrl, cancelUrl }) => {
  return invokeFunction('create-stripe-checkout', {
    planId,
    successUrl,
    cancelUrl
  });
};

/**
 * Stripe Customer Portal Session
 */
export const createCustomerPortalSession = async ({ returnUrl }) => {
  return invokeFunction('create-portal-session', {
    returnUrl
  });
};

/**
 * Validate Stripe Setup
 */
export const validateStripeSetup = async () => {
  return invokeFunction('validate-stripe-setup', {});
};

