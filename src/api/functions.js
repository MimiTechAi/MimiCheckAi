// src/api/functions.js - Supabase Edge Functions
import { supabase } from './supabaseClient';

/**
 * Helper to call Supabase Edge Functions with auth
 * CRITICAL: When verify_jwt is enabled in Edge Functions, we MUST pass the Authorization header
 */
async function invokeFunction(functionName, body = {}) {
  try {
    // Get current session to ensure we have a valid auth token
    let { data: { session }, error: sessionError } = await supabase.auth.getSession();

    // Fallback: Wenn keine Session, versuche Refresh
    if (!session?.access_token) {
      console.log('⚠️ No active session found, attempting refresh...');
      const refreshResult = await supabase.auth.refreshSession();
      if (refreshResult.data.session) {
        session = refreshResult.data.session;
      } else if (sessionError && refreshResult.error) {
        console.error(`No valid session for ${functionName}:`, sessionError);
        throw new Error('Bitte melden Sie sich erneut an');
      }
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

    // 2. RAW FETCH IMPLEMENTATION (Bypass Supabase Client Magic)
    // Wir bauen den Request manuell, um sicherzustellen, dass NUR unser User-Token gesendet wird.

    // Project ID aus der URL raten oder hardcoden (Fallback für Production)
    const PROJECT_REF = 'yjjauvmjyhlxcoumwqlj';
    const FUNCTION_URL = `https://${PROJECT_REF}.supabase.co/functions/v1/${functionName}`;

    console.log(`Executing RAW FETCH to ${FUNCTION_URL}`);

    try {
      const response = await fetch(FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Exakter Token
        },
        body: JSON.stringify(body)
      });

      // Parse Response
      const responseData = await response.json().catch(() => null);

      if (!response.ok) {
        console.error('❌ Server Error Response:', responseData);
        return {
          error: responseData?.error || `Server Error ${response.status}: ${response.statusText}`,
          details: responseData?.details
        };
      }

      return { data: responseData, error: null };

    } catch (fetchError) {
      console.error('❌ Network/Fetch Error:', fetchError);
      return { error: fetchError.message || 'Network request failed' };
    }
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

