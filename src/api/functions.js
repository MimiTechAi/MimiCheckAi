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
      console.error(`Error calling ${functionName}:`, error);
      throw error;
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

