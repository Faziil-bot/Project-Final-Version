-- PROFILES
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  display_name text,
  bio text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;

create policy "Profiles are viewable by everyone"
  on public.profiles for select using (true);
create policy "Users can insert own profile"
  on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- BOOKS (canonical book records, deduped by google_books_id)
create table public.books (
  id uuid primary key default gen_random_uuid(),
  google_books_id text unique,
  title text not null,
  author text not null,
  description text,
  cover_url text,
  genre text,
  added_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);
alter table public.books enable row level security;

create policy "Books are viewable by everyone"
  on public.books for select using (true);
create policy "Authenticated users can add books"
  on public.books for insert with check (auth.uid() is not null);
create policy "Adders can update their books"
  on public.books for update using (auth.uid() = added_by);

-- RECOMMENDATIONS (user-authored notes about a book)
create table public.recommendations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  book_id uuid not null references public.books(id) on delete cascade,
  note text not null,
  rating int check (rating between 1 and 5),
  created_at timestamptz not null default now()
);
alter table public.recommendations enable row level security;

create policy "Recommendations are viewable by everyone"
  on public.recommendations for select using (true);
create policy "Users can create own recommendations"
  on public.recommendations for insert with check (auth.uid() = user_id);
create policy "Users can update own recommendations"
  on public.recommendations for update using (auth.uid() = user_id);
create policy "Users can delete own recommendations"
  on public.recommendations for delete using (auth.uid() = user_id);

-- RATINGS (one per user per book — powers average rating)
create table public.ratings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  book_id uuid not null references public.books(id) on delete cascade,
  rating int not null check (rating between 1 and 5),
  created_at timestamptz not null default now(),
  unique (user_id, book_id)
);
alter table public.ratings enable row level security;

create policy "Ratings are viewable by everyone"
  on public.ratings for select using (true);
create policy "Users can create own ratings"
  on public.ratings for insert with check (auth.uid() = user_id);
create policy "Users can update own ratings"
  on public.ratings for update using (auth.uid() = user_id);
create policy "Users can delete own ratings"
  on public.ratings for delete using (auth.uid() = user_id);

-- LIKES (on recommendations)
create table public.likes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  recommendation_id uuid not null references public.recommendations(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, recommendation_id)
);
alter table public.likes enable row level security;

create policy "Likes are viewable by everyone"
  on public.likes for select using (true);
create policy "Users can like"
  on public.likes for insert with check (auth.uid() = user_id);
create policy "Users can unlike own"
  on public.likes for delete using (auth.uid() = user_id);

-- COMMENTS (on recommendations)
create table public.comments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  recommendation_id uuid not null references public.recommendations(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);
alter table public.comments enable row level security;

create policy "Comments are viewable by everyone"
  on public.comments for select using (true);
create policy "Users can comment"
  on public.comments for insert with check (auth.uid() = user_id);
create policy "Users can update own comments"
  on public.comments for update using (auth.uid() = user_id);
create policy "Users can delete own comments"
  on public.comments for delete using (auth.uid() = user_id);

-- FOLLOWS
create table public.follows (
  id uuid primary key default gen_random_uuid(),
  follower_id uuid not null references auth.users(id) on delete cascade,
  following_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (follower_id, following_id),
  check (follower_id <> following_id)
);
alter table public.follows enable row level security;

create policy "Follows are viewable by everyone"
  on public.follows for select using (true);
create policy "Users can follow"
  on public.follows for insert with check (auth.uid() = follower_id);
create policy "Users can unfollow"
  on public.follows for delete using (auth.uid() = follower_id);

-- Auto-create profile on signup
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
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- updated_at trigger for profiles
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at := now(); return new; end; $$;

create trigger profiles_touch_updated_at
  before update on public.profiles
  for each row execute function public.touch_updated_at();

-- Helpful indexes
create index recommendations_user_id_idx on public.recommendations(user_id);
create index recommendations_book_id_idx on public.recommendations(book_id);
create index ratings_book_id_idx on public.ratings(book_id);
create index follows_follower_idx on public.follows(follower_id);
create index follows_following_idx on public.follows(following_id);