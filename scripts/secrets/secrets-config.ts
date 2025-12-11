/**
 * Secret management configuration using sops and age encryption
 * Handles encrypted environment manifests for Supabase and Vercel
 */

import { z } from 'zod';

/**
 * Schema for Supabase secrets
 */
export const SupabaseSecretsSchema = z.object({
  SUPABASE_URL: z.string().url('Invalid Supabase URL'),
  SUPABASE_ANON_KEY: z.string().min(1, 'Supabase anon key required'),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, 'Supabase service role key required'),
  SUPABASE_JWT_SECRET: z.string().min(1, 'JWT secret required'),
  SUPABASE_STRIPE_WEBHOOK_SECRET: z.string().min(1, 'Stripe webhook secret required'),
});

/**
 * Schema for Vercel secrets
 */
export const VercelSecretsSchema = z.object({
  VITE_SUPABASE_URL: z.string().url('Invalid Supabase URL'),
  VITE_SUPABASE_ANON_KEY: z.string().min(1, 'Supabase anon key required'),
  VITE_STRIPE_PUBLIC_KEY: z.string().min(1, 'Stripe public key required'),
  VITE_ANTHROPIC_API_KEY: z.string().min(1, 'Anthropic API key required'),
});

/**
 * Schema for edge function secrets
 */
export const EdgeFunctionSecretsSchema = z.object({
  SUPABASE_URL: z.string().url('Invalid Supabase URL'),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, 'Service role key required'),
  ANTHROPIC_API_KEY: z.string().min(1, 'Anthropic API key required'),
  STRIPE_SECRET_KEY: z.string().min(1, 'Stripe secret key required'),
  OPENAI_API_KEY: z.string().optional(),
});

/**
 * Validate secrets against schema
 */
export function validateSecrets<T>(
  secrets: Record<string, unknown>,
  schema: z.ZodSchema<T>
): { valid: boolean; errors?: Record<string, string> } {
  try {
    schema.parse(secrets);
    return { valid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach(err => {
        const key = err.path.join('.');
        errors[key] = err.message;
      });
      return { valid: false, errors };
    }
    return { 
      valid: false, 
      errors: { error: 'Unknown validation error' } 
    };
  }
}

/**
 * Get the encryption key from environment
 * For CI: Use GitHub OIDC token
 * For local: Use AGE_KEY environment variable
 */
export function getEncryptionKey(): string {
  const ageKey = process.env.AGE_KEY;
  
  if (!ageKey) {
    throw new Error(
      'AGE_KEY environment variable not set. ' +
      'For local development, set AGE_KEY to your age private key. ' +
      'For CI/CD, use GitHub OIDC with age encryption.'
    );
  }
  
  return ageKey;
}

/**
 * Configuration for different secret targets
 */
export const SECRET_TARGETS = {
  SUPABASE: {
    name: 'Supabase Functions',
    schema: SupabaseSecretsSchema,
    path: 'supabase/.encrypted-secrets.json.age',
  },
  VERCEL: {
    name: 'Vercel Environment',
    schema: VercelSecretsSchema,
    path: '.env.encrypted.age',
  },
  EDGE_FUNCTIONS: {
    name: 'Edge Functions',
    schema: EdgeFunctionSecretsSchema,
    path: 'supabase/functions/.env.encrypted.age',
  },
} as const;

export type SecretTarget = keyof typeof SECRET_TARGETS;
