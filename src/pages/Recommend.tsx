import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AppShell from "@/components/layout/AppShell";
import { searchBooks, getBookById, GBook } from "@/lib/googleBooks";
import { upsertBookFromGoogle } from "@/lib/books";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import StarRating from "@/components/books/StarRating";
import BookCover from "@/components/books/BookCover";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { z } from "zod";
import { Search, X } from "lucide-react";

const noteSchema = z.string().trim().min(10, "Tell us a little more (10+ chars)").max(2000, "Keep it under 2000 chars");

const Recommend = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [q, setQ] = useState("");
  const [results, setResults] = useState<GBook[]>([]);
  const [picked, setPicked] = useState<GBook | null>(null);
  const [note, setNote] = useState("");
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  // Pre-load if redirected from BookDetail
  useEffect(() => {
    const g = params.get("google");
    const bookId = params.get("book");
    (async () => {
      if (g) {
        const b = await getBookById(g);
        if (b) setPicked(b);
      } else if (bookId) {
        const { data } = await supabase.from("books").select("google_books_id,title,author,cover_url,description,genre").eq("id", bookId).maybeSingle();
        if (data) setPicked({
          id: data.google_books_id ?? bookId, title: data.title, authors: [data.author],
          cover: data.cover_url ?? undefined, description: data.description ?? undefined,
          categories: data.genre ? [data.genre] : undefined,
        });
      }
    })();
  }, [params]);

  const search = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;
    try { setResults(await searchBooks(q, 8)); }
    catch { toast.error("Search failed"); }
  };

  const submit = async () => {
    if (!user) { navigate("/auth"); return; }
    const parsed = noteSchema.safeParse(note);
    if (!parsed.success) { toast.error(parsed.error.errors[0].message); return; }
    if (!picked) { toast.error("Pick a book first"); return; }
    setSubmitting(true);
    try {
      const bookId = await upsertBookFromGoogle(picked);
      const { error } = await supabase.from("recommendations").insert({
        user_id: user.id, book_id: bookId, note: parsed.data, rating: rating || null, kind: "book",
      });
      if (error) throw error;
      if (rating > 0) {
        await supabase.from("ratings").upsert(
          { user_id: user.id, book_id: bookId, rating },
          { onConflict: "user_id,book_id" }
        );
      }
      toast.success("Entry recorded");
      navigate(`/book/${bookId}`);
    } catch (e: any) {
      toast.error(e.message ?? "Could not save");
    } finally { setSubmitting(false); }
  };

  return (
    <AppShell>
      <div className="container max-w-3xl py-16">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Compose</p>
        <h1 className="font-display text-5xl mt-1">A new entry</h1>
        <p className="text-muted-foreground italic mt-2">
          Recommend a book worth remembering.
        </p>

        {!picked ? (
          <div className="mt-10">
            <form onSubmit={search} className="flex gap-2">
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by title or author…" className="bg-card h-11" />
              <Button type="submit" variant="ink"><Search className="h-4 w-4" /></Button>
            </form>
            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              {results.map((b) => (
                <button key={b.id} onClick={() => setPicked(b)} className="text-left flex gap-3 p-3 border border-border bg-card hover:border-accent transition-colors">
                  <BookCover src={b.cover} title={b.title} className="w-14 shrink-0" />
                  <div>
                    <p className="font-display text-base leading-tight line-clamp-2">{b.title}</p>
                    <p className="text-xs italic text-muted-foreground line-clamp-1">{b.authors.join(", ")}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-10 space-y-6">
            <div className="flex gap-4 p-4 bg-secondary/40 border-l-2 border-accent">
              <BookCover src={picked.cover} title={picked.title} className="w-20 shrink-0" />
              <div className="flex-1">
                <p className="font-display text-xl">{picked.title}</p>
                <p className="text-sm italic text-muted-foreground">{picked.authors.join(", ")}</p>
              </div>
              <button onClick={() => setPicked(null)} className="text-muted-foreground hover:text-foreground" aria-label="Change book"><X className="h-4 w-4" /></button>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Your rating</label>
              <StarRating value={rating} onChange={setRating} size={28} className="mt-2" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Your note</label>
              <Textarea value={note} onChange={(e) => setNote(e.target.value)} rows={6}
                placeholder="Why does this book deserve a place on someone's shelf?" className="mt-2 bg-card font-serif text-base" maxLength={2000} />
              <p className="text-xs text-muted-foreground mt-1 text-right">{note.length}/2000</p>
            </div>
            <Button variant="ribbon" size="lg" onClick={submit} disabled={submitting}>
              {submitting ? "Inscribing…" : "Inscribe entry"}
            </Button>
          </div>
        )}
      </div>
    </AppShell>
  );
};
export default Recommend;