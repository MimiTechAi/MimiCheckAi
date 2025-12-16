alter table if exists public.users
add column if not exists ai_autofill_free_used_at timestamptz;
