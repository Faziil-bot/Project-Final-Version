import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import AppShell from "@/components/layout/AppShell";
import { supabase } from "@/integrations/supabase/client";
import { getBookById } from "@/lib/googleBooks";
import { upsertBookFromGoogle } from "@/lib/books";
import BookCover from "@/components/books/BookCover";
import StarRating from "@/components/books/StarRating";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { PenLine } from "lucide-react";
import BookReviews from "@/components/books/BookReviews";
import { FEATURED_BOOKS } from "@/data/featuredBooks";

type BookRow = {
  id: string; title: string; author: string; description: string | null;
  cover_url: string | null; genre: string | null; google_books_id: string | null;
};

const BookDetail = () => {
  const { id, source } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [book, setBook] = useState<BookRow | null>(null);
  const [avg, setAvg] = useState<number | null>(null);
  const [count, setCount] = useState(0);
  const [myRating, setMyRating] = useState(0);
  const [recs, setRecs] = useState<any[]>([]);

  const isGoogle = source === "google";

  const loadStats = async (bookId: string) => {
    const { data: rs } = await supabase.from("ratings").select("rating").eq("book_id", bookId);
    if (rs && rs.length) {
      setCount(rs.length);
      setAvg(rs.reduce((a, b) => a + b.rating, 0) / rs.length);
    } else { setCount(0); setAvg(null); }
    const { data: rec } = await supabase
      .from("recommendations")
      .select("id, note, rating, created_at, profile:profiles(username,display_name)")
      .eq("book_id", bookId)
      .order("created_at", { ascending: false });
    setRecs(rec ?? []);
    if (user) {
      const { data: mine } = await supabase.from("ratings").select("rating").eq("book_id", bookId).eq("user_id", user.id).maybeSingle();
      setMyRating(mine?.rating ?? 0);
    }
  };

  useEffect(() => {
    (async () => {
      if (!id) return;
      if (isGoogle) {
        const featured = FEATURED_BOOKS.find((f) => f.googleId === id);
        // If this is a curated/featured book, render immediately from local data —
        // no need to wait on the Google Books API (which is often rate-limited).
        let g = featured
          ? {
              id,
              title: featured.title,
              authors: [featured.author],
              description: featured.description,
              cover: featured.cover,
              categories: [featured.tag],
            }
          : await getBookById(id).catch(() => null);
        if (!g) {
          // Fallback so the page never gets stuck on "Fetching the volume…"
          setBook({
            id: "", title: "Book unavailable", author: "Unknown",
            description: "We couldn't load this volume right now. Please try again later.",
            cover_url: null, genre: null, google_books_id: id ?? null,
          });
          return;
        }
        // Try to find existing
        const { data: existing } = await supabase.from("books").select("*").eq("google_books_id", g.id).maybeSingle();
        if (existing) {
          setBook({
            ...(existing as any),
            description: featured ? featured.description : (existing as any).description,
            cover_url: featured?.cover ?? (existing as any).cover_url,
          });
          loadStats(existing.id);
        } else {
          setBook({
            id: "", title: g.title, author: g.authors.join(", "),
            description: g.description ?? null, cover_url: g.cover ?? null,
            genre: g.categories?.[0] ?? null, google_books_id: g.id,
          });
          if (user) {
            const newId = await upsertBookFromGoogle(g).catch(() => null);
            if (newId) {
              const { data: row } = await supabase.from("books").select("*").eq("id", newId).maybeSingle();
              if (row) { setBook(row as any); loadStats(row.id); }
            }
          }
        }
      } else {
        const { data } = await supabase.from("books").select("*").eq("id", id).maybeSingle();
        if (data) { setBook(data as any); loadStats(data.id); }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, source, user?.id]);

  const rate = async (n: number) => {
    if (!user) { navigate("/auth"); return; }
    let bookId = book?.id;
    if (!bookId && book?.google_books_id) {
      bookId = await upsertBookFromGoogle({
        id: book.google_books_id, title: book.title, authors: [book.author],
        description: book.description ?? undefined, cover: book.cover_url ?? undefined,
        categories: book.genre ? [book.genre] : undefined,
      });
      setBook({ ...book!, id: bookId });
    }
    if (!bookId) return;
    const { error } = await supabase.from("ratings").upsert(
      { user_id: user.id, book_id: bookId, rating: n },
      { onConflict: "user_id,book_id" }
    );
    if (error) { toast.error(error.message); return; }
    setMyRating(n);
    toast.success("Rating saved");
    loadStats(bookId);
  };

  if (!book) return <AppShell><div className="container py-24 text-center text-muted-foreground italic">Fetching the volume…</div></AppShell>;

  return (
    <AppShell>
      <article className="container py-16 max-w-5xl">
        <div className="grid md:grid-cols-[260px_1fr] gap-12">
          <div>
            <BookCover src={book.cover_url} title={book.title} />
            <div className="mt-6 p-5 bg-card border border-border shadow-page text-center">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Average rating</p>
              <p className="font-display text-4xl mt-1">{avg ? avg.toFixed(1) : "—"}</p>
              <StarRating value={avg ?? 0} readOnly className="justify-center mt-1" />
              <p className="text-xs text-muted-foreground mt-1">{count} reader{count === 1 ? "" : "s"}</p>
            </div>
          </div>
          <div>
            {book.genre && <p className="text-xs uppercase tracking-[0.2em] text-accent mb-2">{book.genre}</p>}
            <h1 className="font-display text-5xl leading-tight text-balance">{book.title}</h1>
            <p className="mt-3 text-xl italic text-muted-foreground">by {book.author}</p>

            <div className="mt-8 p-5 bg-secondary/50 border-l-2 border-accent">
              <p className="text-sm text-muted-foreground mb-2">Your rating</p>
              <StarRating value={myRating} onChange={rate} size={28} />
              {!user && <p className="text-xs text-muted-foreground mt-2 italic"><Link to="/auth" className="text-accent hover:underline">Sign in</Link> to rate this book.</p>}
            </div>

            {book.description && (
              <div className="mt-8 prose prose-sm max-w-none text-foreground/85"
                dangerouslySetInnerHTML={{ __html: sanitize(book.description) }} />
            )}

            <div className="mt-10 flex gap-3">
              <Button variant="ribbon" onClick={() => {
                const path = book.id ? `/recommend?book=${book.id}` : `/recommend?google=${book.google_books_id}`;
                navigate(path);
              }}><PenLine className="h-4 w-4" /> Write a recommendation</Button>
            </div>
          </div>
        </div>

        {recs.length > 0 && (
          <section className="mt-20">
            <h2 className="font-display text-3xl border-b border-border pb-3 mb-8">Reader entries</h2>
            <div className="space-y-8">
              {recs.map((r) => (
                <div key={r.id} className="border-l-2 border-gold pl-5">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="font-display text-lg">{r.profile?.display_name ?? r.profile?.username}</span>
                    {r.rating && <StarRating value={r.rating} readOnly size={14} />}
                  </div>
                  <p className="mt-2 text-foreground/85 italic">"{r.note}"</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <BookReviews bookId={book.id || undefined} />
      </article>
    </AppShell>
  );
};

// Minimal HTML sanitization — strip script/style and on* attributes.
function sanitize(html: string): string {
  return html
    .replace(/<\/?(script|style|iframe|object|embed)[^>]*>/gi, "")
    .replace(/ on\w+="[^"]*"/gi, "")
    .replace(/ on\w+='[^']*'/gi, "")
    .replace(/javascript:/gi, "");
}

export default BookDetail;