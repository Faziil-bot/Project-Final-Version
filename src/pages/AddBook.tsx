import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "@/components/layout/AppShell";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import BookCover from "@/components/books/BookCover";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";
import { Upload } from "lucide-react";

const schema = z.object({
  title: z.string().trim().min(1, "Title required").max(200),
  author: z.string().trim().min(1, "Author required").max(200),
  genre: z.string().trim().max(80).optional(),
  description: z.string().trim().min(10, "Add a short description (10+ chars)").max(3000),
});

type Submission = {
  id: string;
  title: string;
  author: string;
  status: "pending" | "approved" | "rejected";
  review_note: string | null;
  created_at: string;
};

const AddBook = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [mine, setMine] = useState<Submission[]>([]);

  const loadMine = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("book_submissions")
      .select("id,title,author,status,review_note,created_at")
      .eq("submitted_by", user.id)
      .order("created_at", { ascending: false })
      .limit(10);
    setMine((data as any) ?? []);
  };

  useEffect(() => { loadMine(); /* eslint-disable-next-line */ }, [user?.id]);

  if (loading) return <AppShell><div className="container py-24 text-center text-muted-foreground italic">Loading…</div></AppShell>;
  if (!user) {
    return (
      <AppShell>
        <div className="container max-w-xl py-24 text-center">
          <h1 className="font-display text-3xl">Sign in required</h1>
          <p className="text-muted-foreground italic mt-2">Sign in to submit a book for review.</p>
          <Button variant="ribbon" className="mt-6" onClick={() => navigate("/auth")}>Sign in</Button>
        </div>
      </AppShell>
    );
  }

  const onFile = (f: File | null) => {
    setFile(f);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(f ? URL.createObjectURL(f) : null);
  };

  const submit = async () => {
    const parsed = schema.safeParse({ title, author, genre, description });
    if (!parsed.success) { toast.error(parsed.error.errors[0].message); return; }
    if (!file) { toast.error("Upload a cover image"); return; }
    if (file.size > 5 * 1024 * 1024) { toast.error("Cover must be under 5MB"); return; }

    setSubmitting(true);
    try {
      const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const path = `${user.id}/${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage.from("book-covers").upload(path, file, {
        cacheControl: "3600", upsert: false, contentType: file.type,
      });
      if (upErr) throw upErr;
      const { data: pub } = supabase.storage.from("book-covers").getPublicUrl(path);

      const { error } = await supabase.from("book_submissions").insert({
        submitted_by: user.id,
        title: parsed.data.title,
        author: parsed.data.author,
        genre: parsed.data.genre || null,
        description: parsed.data.description,
        cover_url: pub.publicUrl,
      });
      if (error) throw error;

      toast.success("Submitted for review");
      setTitle(""); setAuthor(""); setGenre(""); setDescription(""); onFile(null);
      loadMine();
    } catch (e: any) {
      toast.error(e.message ?? "Could not submit");
    } finally {
      setSubmitting(false);
    }
  };

  const statusStyles = {
    pending: "text-muted-foreground border-border",
    approved: "text-accent border-accent/40",
    rejected: "text-destructive border-destructive/40",
  };

  return (
    <AppShell>
      <div className="container max-w-3xl py-16">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Submit</p>
        <h1 className="font-display text-5xl mt-1">Suggest a book</h1>
        <p className="text-muted-foreground italic mt-2">
          Submissions are reviewed by an editor before joining the library.
        </p>

        <div className="mt-10 grid md:grid-cols-[180px_1fr] gap-8">
          <div>
            <Label className="text-sm text-muted-foreground">Cover</Label>
            <div className="mt-2">
              {preview ? (
                <BookCover src={preview} title={title || "Cover"} className="w-40" />
              ) : (
                <div className="w-40 aspect-[2/3] border-2 border-dashed border-border bg-card flex items-center justify-center text-muted-foreground">
                  <Upload className="h-6 w-6" />
                </div>
              )}
              <Input type="file" accept="image/*" onChange={(e) => onFile(e.target.files?.[0] ?? null)} className="mt-3 text-xs" />
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <Label>Title</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-2 bg-card" maxLength={200} />
            </div>
            <div>
              <Label>Author</Label>
              <Input value={author} onChange={(e) => setAuthor(e.target.value)} className="mt-2 bg-card" maxLength={200} />
            </div>
            <div>
              <Label>Genre <span className="text-muted-foreground italic text-xs">(optional)</span></Label>
              <Input value={genre} onChange={(e) => setGenre(e.target.value)} className="mt-2 bg-card" maxLength={80} />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={6}
                className="mt-2 bg-card font-serif text-base" maxLength={3000}
                placeholder="A short summary of the book…" />
              <p className="text-xs text-muted-foreground mt-1 text-right">{description.length}/3000</p>
            </div>
            <Button variant="ribbon" size="lg" onClick={submit} disabled={submitting}>
              {submitting ? "Submitting…" : "Send for review"}
            </Button>
          </div>
        </div>

        {mine.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl border-b border-border pb-3 mb-4">Your submissions</h2>
            <ul className="space-y-3">
              {mine.map((s) => (
                <li key={s.id} className="flex items-start justify-between gap-4 p-4 bg-card border border-border">
                  <div>
                    <p className="font-display text-lg leading-tight">{s.title}</p>
                    <p className="text-xs italic text-muted-foreground">{s.author} · {new Date(s.created_at).toLocaleDateString()}</p>
                    {s.review_note && <p className="text-xs mt-2 text-muted-foreground">Editor's note: {s.review_note}</p>}
                  </div>
                  <span className={`text-[10px] uppercase tracking-[0.18em] px-2 py-1 border ${statusStyles[s.status]}`}>
                    {s.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </AppShell>
  );
};

export default AddBook;
