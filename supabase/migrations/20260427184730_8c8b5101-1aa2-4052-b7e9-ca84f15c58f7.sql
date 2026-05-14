
ALTER TABLE public.recommendations
ADD COLUMN kind text NOT NULL DEFAULT 'book';

ALTER TABLE public.recommendations
ADD CONSTRAINT recommendations_kind_check CHECK (kind IN ('book','journal'));

CREATE INDEX idx_recommendations_kind ON public.recommendations(kind);
