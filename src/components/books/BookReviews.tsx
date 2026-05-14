import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import StarRating from "@/components/books/StarRating";
import { toast } from "sonner";
import { Ban, Trash2, ShieldAlert } from "lucide-react";

type Review = {
  id: string;
  user_id: string;
  body: string;
  rating: number | null;
  is_banned: boolean;
  banned_reason: string | null;
  created_at: string;
  profile?: { username: string; display_name: string | null } | null;
};

export default function BookReviews({ bookId }: { bookId: string | undefined }) {
  const { user, isAdmin } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [body, setBody] = useState("");
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    if (!bookId) { setReviews([]); return; }
    const { data, error } = await supabase
      .from("reviews")
      .select("id, user_id, body, rating, is_banned, banned_reason, created_at, profile:profiles(username, display_name)")
      .eq("book_id", bookId)
      .order("created_at", { ascending: false });
    if (error) { console.error(error); return; }
    setReviews((data ?? []) as any);
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [bookId, user?.id]);

  const submit = async () => {
    if (!user || !bookId) return;
    const trimmed = body.trim();
    if (trimmed.length < 3) { toast.error("Review is too short"); return; }
    if (trimmed.length > 2000) { toast.error("Review is too long (max 2000 chars)"); return; }
    setSubmitting(true);
    const { error } = await supabase.from("reviews").insert({
      book_id: bookId, user_id: user.id, body: trimmed, rating: rating || null,
    });
    setSubmitting(false);
    if (error) { toast.error(error.message); return; }
    setBody(""); setRating(0);
    toast.success("Review posted");
    load();
  };

  const ban = async (id: string) => {
    const reason = window.prompt("Reason for banning this review?") ?? "";
    if (!user) return;
    const { error } = await supabase.from("reviews")
      .update({ is_banned: true, banned_by: user.id, banned_reason: reason || "Violates guidelines" })
      .eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Review banned");
    load();
  };

  const unban = async (id: string) => {
    const { error } = await supabase.from("reviews")
      .update({ is_banned: false, banned_by: null, banned_reason: null })
      .eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Review restored");
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this review?")) return;
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Review deleted");
    load();
  };

  return (
    <section className="mt-20">
      <h2 className="font-display text-3xl border-b border-border pb-3 mb-8">Reader reviews</h2>

      {bookId && user && (
        <div className="mb-10 p-5 bg-secondary/50 border-l-2 border-accent">
          <p className="text-sm text-muted-foreground mb-2">Leave a review</p>
          <StarRating value={rating} onChange={setRating} size={22} />
          <Textarea
            className="mt-3 bg-background"
            rows={4}
            placeholder="Share your thoughts on this book…"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            maxLength={2000}
          />
          <div className="mt-3 flex justify-between items-center">
            <span className="text-xs text-muted-foreground">{body.length}/2000</span>
            <Button onClick={submit} disabled={submitting || !body.trim()}>Post review</Button>
          </div>
        </div>
      )}

      {bookId && !user && (
        <p className="text-sm text-muted-foreground italic mb-8">
          <Link to="/auth" className="text-accent hover:underline">Sign in</Link> to leave a review.
        </p>
      )}

      {!bookId && (
        <p className="text-sm text-muted-foreground italic">Rate this book first to enable reviews.</p>
      )}

      {reviews.length === 0 ? (
        <p className="text-sm text-muted-foreground italic">No reviews yet — be the first.</p>
      ) : (
        <div className="space-y-6">
          {reviews.map((r) => {
            const mine = user?.id === r.user_id;
            return (
              <div key={r.id} className={`border-l-2 pl-5 ${r.is_banned ? "border-destructive/60 opacity-80" : "border-gold"}`}>
                <div className="flex items-center gap-3 text-sm flex-wrap">
                  <span className="font-display text-lg">{r.profile?.display_name ?? r.profile?.username ?? "Reader"}</span>
                  {r.rating ? <StarRating value={r.rating} readOnly size={14} /> : null}
                  <span className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</span>
                  {r.is_banned && (
                    <span className="inline-flex items-center gap-1 text-xs uppercase tracking-wider text-destructive">
                      <ShieldAlert className="h-3 w-3" /> Banned
                    </span>
                  )}
                </div>
                {r.is_banned && !isAdmin && !mine ? (
                  <p className="mt-2 text-sm text-muted-foreground italic">
                    This review was removed by a moderator{r.banned_reason ? ` — ${r.banned_reason}` : ""}.
                  </p>
                ) : (
                  <p className="mt-2 text-foreground/85 italic">"{r.body}"</p>
                )}
                {r.is_banned && r.banned_reason && (isAdmin || mine) && (
                  <p className="mt-1 text-xs text-destructive">Reason: {r.banned_reason}</p>
                )}
                <div className="mt-2 flex gap-2">
                  {isAdmin && !r.is_banned && (
                    <Button size="sm" variant="outline" onClick={() => ban(r.id)}>
                      <Ban className="h-3 w-3" /> Ban
                    </Button>
                  )}
                  {isAdmin && r.is_banned && (
                    <Button size="sm" variant="outline" onClick={() => unban(r.id)}>Restore</Button>
                  )}
                  {(isAdmin || mine) && (
                    <Button size="sm" variant="ghost" onClick={() => remove(r.id)}>
                      <Trash2 className="h-3 w-3" /> Delete
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}