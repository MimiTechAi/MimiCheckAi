export function deriveSupabaseStorageKey(url: string | undefined): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    const host = parsed.hostname;
    const match = host.match(/^([a-z0-9-]+)\.supabase\.co$/i);
    if (!match) return null;
    const projectRef = match[1];
    return `sb-${projectRef}-auth-token`;
  } catch {
    return null;
  }
}
