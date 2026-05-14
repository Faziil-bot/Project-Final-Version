import { supabase } from "@/integrations/supabase/client";
import { GBook } from "./googleBooks";

/** Find or create a book row from a Google Books volume. */
export async function upsertBookFromGoogle(g: GBook): Promise<string> {
  const { data: existing } = await supabase
    .from("books").select("id").eq("google_books_id", g.id).maybeSingle();
  if (existing?.id) return existing.id;

  const { data: { user } } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("books")
    .insert({
      google_books_id: g.id,
      title: g.title,
      author: g.authors.join(", "),
      description: g.description ?? null,
      cover_url: g.cover ?? null,
      genre: g.categories?.[0] ?? null,
      added_by: user?.id ?? null,
    })
    .select("id").single();
  if (error) throw error;
  return data.id;
}