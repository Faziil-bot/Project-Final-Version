ALTER TABLE public.recommendations ALTER COLUMN book_id DROP NOT NULL;

ALTER TABLE public.recommendations
ADD CONSTRAINT recommendations_book_required_for_book_kind
CHECK (kind = 'journal' OR book_id IS NOT NULL);