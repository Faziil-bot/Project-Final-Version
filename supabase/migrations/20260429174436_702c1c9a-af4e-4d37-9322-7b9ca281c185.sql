-- Roles enum
create type public.app_role as enum ('admin', 'user');

-- user_roles table
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

-- has_role security definer function
create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

-- user_roles policies
create policy "Roles viewable by everyone"
on public.user_roles for select
using (true);

create policy "Admins can insert roles"
on public.user_roles for insert
with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins can delete roles"
on public.user_roles for delete
using (public.has_role(auth.uid(), 'admin'));

-- Auto-assign 'user' role on signup (extend existing handle_new_user)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  base_username text;
  final_username text;
  suffix int := 0;
begin
  base_username := coalesce(
    new.raw_user_meta_data->>'username',
    split_part(new.email, '@', 1),
    'reader'
  );
  base_username := lower(regexp_replace(base_username, '[^a-zA-Z0-9_]', '', 'g'));
  if base_username = '' then base_username := 'reader'; end if;
  final_username := base_username;
  while exists (select 1 from public.profiles where username = final_username) loop
    suffix := suffix + 1;
    final_username := base_username || suffix::text;
  end loop;

  insert into public.profiles (id, username, display_name)
  values (
    new.id,
    final_username,
    coalesce(new.raw_user_meta_data->>'display_name', new.raw_user_meta_data->>'full_name', final_username)
  );

  insert into public.user_roles (user_id, role)
  values (new.id, 'user')
  on conflict do nothing;

  return new;
end;
$$;

-- Ensure trigger exists on auth.users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- Reviews table
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  book_id uuid not null,
  user_id uuid not null,
  body text not null,
  rating int,
  is_banned boolean not null default false,
  banned_by uuid,
  banned_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index reviews_book_id_idx on public.reviews(book_id);
create index reviews_user_id_idx on public.reviews(user_id);

alter table public.reviews enable row level security;

create policy "Public can view non-banned reviews"
on public.reviews for select
using (
  is_banned = false
  or auth.uid() = user_id
  or public.has_role(auth.uid(), 'admin')
);

create policy "Users can create own reviews"
on public.reviews for insert
with check (auth.uid() = user_id);

create policy "Users can update own reviews"
on public.reviews for update
using (auth.uid() = user_id);

create policy "Admins can update any review"
on public.reviews for update
using (public.has_role(auth.uid(), 'admin'));

create policy "Users can delete own reviews"
on public.reviews for delete
using (auth.uid() = user_id);

create policy "Admins can delete any review"
on public.reviews for delete
using (public.has_role(auth.uid(), 'admin'));

create trigger reviews_touch_updated_at
before update on public.reviews
for each row execute function public.touch_updated_at();

-- Backfill: give 'user' role to existing profiles
insert into public.user_roles (user_id, role)
select id, 'user' from public.profiles
on conflict do nothing;