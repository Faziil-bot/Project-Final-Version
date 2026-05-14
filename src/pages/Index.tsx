import { Link } from "react-router-dom";
import AppShell from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import BookCover from "@/components/books/BookCover";
import { ArrowRight, Quote } from "lucide-react";
import hero from "@/assets/hero-library.jpg";
import { FEATURED_BOOKS } from "@/data/featuredBooks";

const Index = () => {
  return (
    <AppShell>
      {/* Hero */}
      <section className="bg-paper border-b border-border/60">
        <div className="container grid lg:grid-cols-2 gap-12 items-center py-20 lg:py-28">
          <div className="animate-fade-up">
            <p className="font-serif italic text-accent tracking-wide mb-4">— A reader's journal —</p>
            <h1 className="font-display text-5xl lg:text-7xl leading-[1.05] text-balance">
              The books worth <em className="text-accent">remembering</em>, kept by the readers who loved them.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl text-pretty">
              Bookmarked is a quiet corner for thoughtful readers — discover, rate, and share the volumes that left a mark.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/discover"><Button variant="ribbon" size="lg">Begin browsing <ArrowRight className="h-4 w-4" /></Button></Link>
              <Link to="/auth"><Button variant="outline" size="lg">Start a shelf</Button></Link>
            </div>
            <p className="mt-8 text-sm text-muted-foreground ornament inline-block">since 2026</p>
          </div>
          <div className="relative">
            <img src={hero} alt="An open antique book with quill and burgundy bookmark ribbons" width={1536} height={1024} className="w-full h-auto" />
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="container py-20 text-center max-w-3xl">
        <Quote className="h-8 w-8 text-gold mx-auto mb-4" />
        <p className="font-display text-3xl md:text-4xl italic leading-snug text-balance">
          "There is no friend as loyal as a book."
        </p>
        <p className="mt-4 text-muted-foreground">— Ernest Hemingway</p>
      </section>

      {/* Featured Shelf */}
      <section className="bg-paper border-y border-border/60">
        <div className="container py-16">
          <div className="flex items-end justify-between mb-10 border-b border-border pb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-accent">The Curator's Shelf</p>
              <h2 className="font-display text-4xl mt-1">Featured volumes</h2>
            </div>
            <Link to="/discover" className="text-sm text-accent hover:underline">Browse the stacks →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {FEATURED_BOOKS.slice(0, 6).map((b) => (
              <Link key={b.googleId} to={`/book/google/${b.googleId}`} className="group">
                <BookCover src={b.cover} title={b.title} className="transition-transform group-hover:-translate-y-1" />
                <p className="text-[10px] uppercase tracking-[0.18em] text-accent mt-3">{b.tag}</p>
                <h3 className="font-display text-base mt-1 leading-tight group-hover:text-accent line-clamp-2">{b.title}</h3>
                <p className="text-xs italic text-muted-foreground mt-1 line-clamp-1">{b.author}</p>
                <p className="text-xs text-foreground/70 mt-2 line-clamp-3">{b.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </AppShell>
  );
};
export default Index;