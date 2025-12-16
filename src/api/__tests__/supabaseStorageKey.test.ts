import { describe, expect, it } from 'vitest';

import { deriveSupabaseStorageKey } from '../supabaseStorageKey';

describe('deriveSupabaseStorageKey', () => {
  it('derives the standard Supabase storage key from a supabase.co URL', () => {
    expect(deriveSupabaseStorageKey('https://yjjauvmjyhlxcoumwqlj.supabase.co')).toBe(
      'sb-yjjauvmjyhlxcoumwqlj-auth-token',
    );
  });

  it('derives the standard Supabase storage key from a full project URL', () => {
    expect(deriveSupabaseStorageKey('https://abc123.supabase.co/auth/v1')).toBe('sb-abc123-auth-token');
  });

  it('returns null for invalid URLs', () => {
    expect(deriveSupabaseStorageKey('not a url')).toBeNull();
  });

  it('returns null for empty input', () => {
    expect(deriveSupabaseStorageKey(undefined)).toBeNull();
    expect(deriveSupabaseStorageKey('')).toBeNull();
  });
});
