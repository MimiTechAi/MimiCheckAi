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

    if (sessionError || !session) {
      console.error(`No valid session for ${functionName}:`, sessionError);
      throw new Error('Bitte melden Sie sich erneut an');
    }

    if (!session?.access_token) {
      console.error('Session found but no access_token available');
      throw new Error('Sitzung ungültig. Bitte neu anmelden.');
    }




    // Let supabase-js handle the Authorization header automatically
    const { data, error } = await supabase.functions.invoke(functionName, {
      body,
      headers: {
        'Content-Type': 'application/json'
      }
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

