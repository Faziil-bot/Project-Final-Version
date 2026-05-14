import { useState } from "react";
import { Link } from "react-router-dom";
import AppShell from "@/components/layout/AppShell";
import { searchBooks, GBook } from "@/lib/googleBooks";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BookCover from "@/components/books/BookCover";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { FEATURED_BOOKS } from "@/data/featuredBooks";

const Discover = () => {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "title" | "author" | "subject">("all");
  const [results, setResults] = useState<GBook[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const prefix = filter === "all" ? "" : filter === "subject" ? "subject:" : `${filter === "title" ? "intitle:" : "inauthor:"}`;
      const data = await searchBooks(`${prefix}${q}`);
      setResults(data);
    } catch {
      toast.error("Search failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <section className="bg-paper border-b border-border/60">
        <div className="container py-16 max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-accent mb-3">The Stacks</p>
          <h1 className="font-display text-5xl">Discover a book</h1>
          <p className="mt-3 text-muted-foreground italic">Search the library by title, author, or subject.</p>
          <form onSubmit={submit} className="mt-8 flex gap-2 max-w-xl mx-auto">
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g. Borges, Beloved, magical realism…" className="bg-card h-12 text-base" />
            <Button type="submit" variant="ribbon" size="lg" disabled={loading}><Search className="h-4 w-4" /> Search</Button>
          </form>
          <div className="mt-4 flex flex-wrap gap-2 justify-center text-xs">
            {(["all", "title", "author", "subject"] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-sm border transition-colors ${filter === f ? "bg-ink text-primary-foreground border-transparent" : "border-border text-muted-foreground hover:text-foreground"}`}>
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="container py-12">
        {loading && <p className="text-center text-muted-foreground italic">Browsing the shelves…</p>}
        {!loading && searched && results.length === 0 && <p className="text-center text-muted-foreground italic">No volumes found.</p>}
        {!searched && !loading && (
          <div className="mb-12">
            <div className="flex items-end justify-between mb-8 border-b border-border pb-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-accent">The Curator's Shelf</p>
                <h2 className="font-display text-3xl mt-1">Featured volumes</h2>
              </div>
              <p className="text-xs italic text-muted-foreground">Hand-picked starts</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
              {FEATURED_BOOKS.map((b) => (
                <Link key={b.googleId} to={`/book/google/${b.googleId}`} className="group">
                  <BookCover src={b.cover} title={b.title} className="transition-transform group-hover:-translate-y-1" />
                  <p className="text-[10px] uppercase tracking-[0.18em] text-accent mt-3">{b.tag}</p>
                  <h3 className="font-display text-base mt-1 leading-tight group-hover:text-accent line-clamp-2">{b.title}</h3>
                  <p className="text-xs italic text-muted-foreground mt-1 line-clamp-1">{b.author}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {results.map((b) => (
            <Link key={b.id} to={`/book/google/${b.id}`} className="group">
              <BookCover src={b.cover} title={b.title} className="transition-transform group-hover:-translate-y-1" />
              <h3 className="font-display text-base mt-3 leading-tight group-hover:text-accent line-clamp-2">{b.title}</h3>
              <p className="text-xs italic text-muted-foreground mt-1 line-clamp-1">{b.authors.join(", ")}</p>
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
};
export default Discover;