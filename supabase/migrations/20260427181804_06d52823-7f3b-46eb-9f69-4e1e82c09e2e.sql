-- Set search_path on touch_updated_at
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin new.updated_at := now(); return new; end; $$;

-- Revoke EXECUTE on SECURITY DEFINER / trigger helpers from anon & authenticated
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.touch_updated_at() from public, anon, authenticated;