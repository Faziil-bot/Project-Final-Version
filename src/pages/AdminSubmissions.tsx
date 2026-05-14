import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "@/components/layout/AppShell";
import BookCover from "@/components/books/BookCover";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Check, X, Plus } from "lucide-react";

type Submission = {
  id: string;
  submitted_by: string;
  title: string;
  author: string;
  genre: string | null;
  description: string;
  cover_url: string | null;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  profile?: { username: string; display_name: string | null } | null;
};

const AdminSubmissions = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"pending" | "approved" | "rejected">("pending");
  const [items, setItems] = useState<Submission[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<string | null>(null);

  const load = async () => {
    const { data, error } = await supabase
      .from("book_submissions")
      .select("id,submitted_by,title,author,genre,description,cover_url,status,created_at,profile:profiles!book_submissions_submitted_by_fkey(username,display_name)")
      .eq("status", tab)
      .order("created_at", { ascending: false });
    // Fall back without join (no FK declared) if it fails
    if (error) {
      const { data: d2 } = await supabase
        .from("book_submissions")
        .select("id,submitted_by,title,author,genre,description,cover_url,status,created_at")
        .eq("status", tab)
        .order("created_at", { ascending: false });
      setItems((d2 as any) ?? []);
    } else {
      setItems((data as any) ?? []);
    }
  };

  useEffect(() => { if (isAdmin) load(); /* eslint-disable-next-line */ }, [tab, isAdmin]);

  if (loading) return <AppShell><div className="container py-24 text-center text-muted-foreground italic">Loading…</div></AppShell>;
  if (!user || !isAdmin) {
    return (
      <AppShell>
        <div className="container max-w-xl py-24 text-center">
          <h1 className="font-display text-3xl">Restricted</h1>
          <p className="text-muted-foreground italic mt-2">Editors only.</p>
        </div>
      </AppShell>
    );
  }

  const approve = async (s: Submission) => {
    setBusy(s.id);
    try {
      const { data: book, error: bErr } = await supabase.from("books").insert({
        title: s.title, author: s.author, genre: s.genre,
        description: s.description, cover_url: s.cover_url, added_by: s.submitted_by,
      }).select("id").single();
      if (bErr) throw bErr;

      const { error } = await supabase.from("book_submissions").update({
        status: "approved", reviewed_by: user.id, reviewed_at: new Date().toISOString(),
        review_note: notes[s.id] || null, approved_book_id: book.id,
      }).eq("id", s.id);
      if (error) throw error;

      toast.success("Approved & published");
      load();
    } catch (e: any) {
      toast.error(e.message ?? "Failed to approve");
    } finally { setBusy(null); }
  };

  const reject = async (s: Submission) => {
    setBusy(s.id);
    try {
      const { error } = await supabase.from("book_submissions").update({
        status: "rejected", reviewed_by: user.id, reviewed_at: new Date().toISOString(),
        review_note: notes[s.id] || null,
      }).eq("id", s.id);
      if (error) throw error;
      toast.success("Submission rejected");
      load();
    } catch (e: any) {
      toast.error(e.message ?? "Failed to reject");
    } finally { setBusy(null); }
  };

  return (
    <AppShell>
      <div className="container max-w-4xl py-16">
        <div className="flex items-end justify-between border-b border-border pb-4 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-accent">Editor's desk</p>
            <h1 className="font-display text-5xl mt-1">Submissions</h1>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Button size="sm" variant="ribbon" onClick={() => navigate("/add-book")}>
              <Plus className="h-4 w-4" /> New post
            </Button>
            <div className="flex gap-1">
            {(["pending", "approved", "rejected"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-4 py-2 capitalize transition-colors ${tab === t ? "bg-ink text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                {t}
              </button>
            ))}
            </div>
          </div>
        </div>

        {items.length === 0 ? (
          <p className="text-center py-16 italic text-muted-foreground">No {tab} submissions.</p>
        ) : (
          <div className="space-y-8">
            {items.map((s) => (
              <article key={s.id} className="flex gap-5 p-5 bg-card border border-border">
                <BookCover src={s.cover_url} title={s.title} className="w-28 shrink-0" />
                <div className="flex-1">
                  <h2 className="font-display text-2xl leading-tight">{s.title}</h2>
                  <p className="text-sm italic text-muted-foreground">by {s.author}{s.genre ? ` · ${s.genre}` : ""}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Submitted {new Date(s.created_at).toLocaleDateString()}
                    {s.profile ? ` by @${s.profile.username}` : ""}
                  </p>
                  <p className="mt-3 text-sm text-foreground/85 line-clamp-4">{s.description}</p>
                  {tab === "pending" && (
                    <div className="mt-4 space-y-2">
                      <Textarea
                        value={notes[s.id] ?? ""}
                        onChange={(e) => setNotes((p) => ({ ...p, [s.id]: e.target.value }))}
                        rows={2} placeholder="Optional note to the submitter…" maxLength={500}
                        className="bg-background text-sm"
                      />
                      <div className="flex gap-2">
                        <Button size="sm" variant="ribbon" disabled={busy === s.id} onClick={() => approve(s)}>
                          <Check className="h-4 w-4" /> Approve
                        </Button>
                        <Button size="sm" variant="outline" disabled={busy === s.id} onClick={() => reject(s)}>
                          <X className="h-4 w-4" /> Reject
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
};

export default AdminSubmissions;
