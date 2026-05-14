-- Submission status enum
do $$ begin
  create type public.submission_status as enum ('pending', 'approved', 'rejected');
exception when duplicate_object then null; end $$;

create table public.book_submissions (
  id uuid primary key default gen_random_uuid(),
  submitted_by uuid not null,
  title text not null,
  author text not null,
  genre text,
  description text not null,
  cover_url text,
  status public.submission_status not null default 'pending',
  reviewed_by uuid,
  review_note text,
  reviewed_at timestamptz,
  approved_book_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.book_submissions enable row level security;

-- Submitters can see their own; admins see all
create policy "Users see own submissions"
on public.book_submissions for select
using (auth.uid() = submitted_by or public.has_role(auth.uid(), 'admin'));

create policy "Authenticated users can submit"
on public.book_submissions for insert
with check (auth.uid() = submitted_by);

-- Submitter can edit only while pending; admins can always update (for review)
create policy "Submitter can edit pending"
on public.book_submissions for update
using (auth.uid() = submitted_by and status = 'pending');

create policy "Admins can review submissions"
on public.book_submissions for update
using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can delete submissions"
on public.book_submissions for delete
using (public.has_role(auth.uid(), 'admin'));

create trigger book_submissions_touch
before update on public.book_submissions
for each row execute function public.touch_updated_at();

create index idx_book_submissions_status on public.book_submissions(status, created_at desc);
create index idx_book_submissions_user on public.book_submissions(submitted_by, created_at desc);

-- Allow any authenticated user to upload covers (so they can submit)
drop policy if exists "Admins can upload book covers" on storage.objects;
create policy "Authenticated users can upload book covers"
on storage.objects for insert
with check (bucket_id = 'book-covers' and auth.uid() is not null);