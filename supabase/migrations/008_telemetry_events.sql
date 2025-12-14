create table if not exists public.telemetry_events (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid not null references auth.users(id) on delete cascade,
  event_name text not null,
  area text,
  severity text,
  meta jsonb,
  url text,
  user_agent text,
  session_id text,
  created_at timestamptz not null default now()
);

alter table public.telemetry_events enable row level security;

revoke all on table public.telemetry_events from anon, authenticated;

grant insert on table public.telemetry_events to authenticated;

drop policy if exists "telemetry_events_insert_own" on public.telemetry_events;
create policy "telemetry_events_insert_own"
on public.telemetry_events
for insert
to authenticated
with check (auth_user_id = auth.uid());

create index if not exists telemetry_events_auth_user_id_created_at_idx
  on public.telemetry_events (auth_user_id, created_at desc);

create index if not exists telemetry_events_event_name_created_at_idx
  on public.telemetry_events (event_name, created_at desc);
