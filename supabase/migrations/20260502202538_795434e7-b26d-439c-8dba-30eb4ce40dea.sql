-- Create public bucket for book covers
insert into storage.buckets (id, name, public) values ('book-covers', 'book-covers', true)
on conflict (id) do nothing;

-- Public can view
create policy "Book covers are publicly accessible"
on storage.objects for select
using (bucket_id = 'book-covers');

-- Only admins can upload
create policy "Admins can upload book covers"
on storage.objects for insert
with check (bucket_id = 'book-covers' and public.has_role(auth.uid(), 'admin'));

-- Only admins can update
create policy "Admins can update book covers"
on storage.objects for update
using (bucket_id = 'book-covers' and public.has_role(auth.uid(), 'admin'));

-- Only admins can delete
create policy "Admins can delete book covers"
on storage.objects for delete
using (bucket_id = 'book-covers' and public.has_role(auth.uid(), 'admin'));