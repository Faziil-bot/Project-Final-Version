import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppShell from "@/components/layout/AppShell";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import BookCover from "@/components/books/BookCover";
import StarRating from "@/components/books/StarRating";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageCircle, UserPlus, UserCheck } from "lucide-react";
import { toast } from "sonner";
import { FEATURED_BOOKS } from "@/data/featuredBooks";

type Rec = {
  id: string;
  user_id: string;
  note: string;
  rating: number | null;
  created_at: string;
  kind: "book" | "journal";
  book: { id: string; title: string; author: string; cover_url: string | null } | null;
  profile: { username: string; display_name: string | null; avatar_url: string | null } | null;
};

const Feed = () => {
  const { user } = useAuth();
  const [tab, setTab] = useState<"all" | "following">("all");
  const [recs, setRecs] = useState<Rec[]>([]);
  const [likes, setLikes] = useState<Record<string, { count: number; mine: boolean }>>({});
  const [comments, setComments] = useState<Record<string, any[]>>({});
  const [openComments, setOpenComments] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [following, setFollowing] = useState<Set<string>>(new Set());

  const load = async () => {
    let ids: string[] | null = null;
    if (tab === "following" && user) {
      const { data } = await supabase.from("follows").select("following_id").eq("follower_id", user.id);
      ids = (data ?? []).map((f) => f.following_id);
      if (ids.length === 0) { setRecs([]); return; }
    }
    let q = supabase.from("recommendations")
      .select("id, user_id, note, rating, created_at, kind, book:books(id,title,author,cover_url), profile:profiles(username,display_name,avatar_url)")
      .eq("kind", "book")
      .order("created_at", { ascending: false }).limit(50);
    if (ids) q = q.in("user_id", ids);
    const { data } = await q;
    setRecs((data as any) ?? []);

    const recIds = (data ?? []).map((r: any) => r.id);
    if (recIds.length) {
      const { data: ls } = await supabase.from("likes").select("recommendation_id, user_id").in("recommendation_id", recIds);
      const map: Record<string, { count: number; mine: boolean }> = {};
      recIds.forEach((id) => map[id] = { count: 0, mine: false });
      (ls ?? []).forEach((l: any) => { map[l.recommendation_id].count++; if (user && l.user_id === user.id) map[l.recommendation_id].mine = true; });
      setLikes(map);
    }

    if (user) {
      const { data: f } = await supabase.from("follows").select("following_id").eq("follower_id", user.id);
      setFollowing(new Set((f ?? []).map((x) => x.following_id)));
    }
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [tab, user?.id]);

  const toggleLike = async (id: string) => {
    if (!user) { toast.error("Sign in to like"); return; }
    const cur = likes[id];
    if (cur?.mine) {
      await supabase.from("likes").delete().eq("user_id", user.id).eq("recommendation_id", id);
      setLikes((p) => ({ ...p, [id]: { count: cur.count - 1, mine: false } }));
    } else {
      await supabase.from("likes").insert({ user_id: user.id, recommendation_id: id });
      setLikes((p) => ({ ...p, [id]: { count: (cur?.count ?? 0) + 1, mine: true } }));
    }
  };

  const toggleFollow = async (uid: string) => {
    if (!user || uid === user.id) return;
    if (following.has(uid)) {
      await supabase.from("follows").delete().eq("follower_id", user.id).eq("following_id", uid);
      setFollowing((p) => { const n = new Set(p); n.delete(uid); return n; });
    } else {
      await supabase.from("follows").insert({ follower_id: user.id, following_id: uid });
      setFollowing((p) => new Set(p).add(uid));
    }
  };

  const openComment = async (id: string) => {
    setOpenComments(openComments === id ? null : id);
    if (!comments[id]) {
      const { data } = await supabase.from("comments")
        .select("id, body, created_at, profile:profiles(username,display_name)")
        .eq("recommendation_id", id).order("created_at", { ascending: true });
      setComments((p) => ({ ...p, [id]: data ?? [] }));
    }
  };

  const postComment = async (id: string) => {
    if (!user || !draft.trim()) return;
    const body = draft.trim().slice(0, 500);
    const { data, error } = await supabase.from("comments")
      .insert({ user_id: user.id, recommendation_id: id, body })
      .select("id, body, created_at, profile:profiles(username,display_name)").single();
    if (error) { toast.error(error.message); return; }
    setComments((p) => ({ ...p, [id]: [...(p[id] ?? []), data] }));
    setDraft("");
  };

  return (
    <AppShell>
      <div className="container max-w-3xl py-16">
        <div className="flex items-end justify-between border-b border-border pb-4 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-accent">Daily Edition</p>
            <h1 className="font-display text-5xl mt-1">The feed</h1>
          </div>
          <div className="flex gap-1 text-sm">
            {(["all", "following"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-4 py-2 transition-colors ${tab === t ? "bg-ink text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                {t === "all" ? "All readers" : "Following"}
              </button>
            ))}
          </div>
        </div>

        <section className="mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-accent mb-3">The Curator's Shelf</p>
            <div className="flex gap-5 overflow-x-auto pb-3 -mx-1 px-1">
              {FEATURED_BOOKS.map((b) => (
                <Link key={b.googleId} to={`/book/google/${b.googleId}`} className="group shrink-0 w-28">
                  <BookCover src={b.cover} title={b.title} className="transition-transform group-hover:-translate-y-1" />
                  <h3 className="font-display text-sm mt-2 leading-tight group-hover:text-accent line-clamp-2">{b.title}</h3>
                  <p className="text-xs italic text-muted-foreground line-clamp-1">{b.author}</p>
                </Link>
              ))}
            </div>
        </section>

        {recs.length === 0 ? (
          <p className="text-center py-16 italic text-muted-foreground">
            {tab === "following" ? "Follow some readers to see their entries here." : "No entries yet."}
          </p>
        ) : (
          <div className="space-y-12">
            {recs.map((r) => (
              <article key={r.id} className="animate-fade-up">
                <header className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-display text-lg">{r.profile?.display_name ?? r.profile?.username}</p>
                    </div>
                    <p className="text-xs italic text-muted-foreground">@{r.profile?.username} · {new Date(r.created_at).toLocaleDateString(undefined, { month: "long", day: "numeric" })}</p>
                  </div>
                  {user && user.id !== r.user_id && (
                    <Button variant="ghost" size="sm" onClick={() => toggleFollow(r.user_id)}>
                      {following.has(r.user_id) ? <><UserCheck className="h-3.5 w-3.5" /> Following</> : <><UserPlus className="h-3.5 w-3.5" /> Follow</>}
                    </Button>
                  )}
                </header>
                <div className="flex gap-5">
                    <Link to={r.book ? `/book/${r.book.id}` : "#"}>
                      <BookCover src={r.book?.cover_url} title={r.book?.title ?? ""} className="w-24 shrink-0" />
                    </Link>
                    <div className="flex-1">
                      <Link to={r.book ? `/book/${r.book.id}` : "#"}>
                        <h2 className="font-display text-2xl leading-tight hover:text-accent transition-colors">{r.book?.title}</h2>
                      </Link>
                      <p className="text-sm italic text-muted-foreground">by {r.book?.author}</p>
                      {r.rating && <StarRating value={r.rating} readOnly size={14} className="mt-2" />}
                      <p className="mt-3 text-foreground/85 drop-cap">{r.note}</p>
                      <FeedActions r={r} likes={likes} comments={comments} openComments={openComments} draft={draft} setDraft={setDraft} user={user} toggleLike={toggleLike} openComment={openComment} postComment={postComment} />
                    </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
};

function FeedActions({ r, likes, comments, openComments, draft, setDraft, user, toggleLike, openComment, postComment }: any) {
  return (
    <>
      <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
        <button onClick={() => toggleLike(r.id)} className={`inline-flex items-center gap-1.5 transition-colors ${likes[r.id]?.mine ? "text-accent" : "hover:text-foreground"}`}>
          <Heart className={`h-4 w-4 ${likes[r.id]?.mine ? "fill-accent" : ""}`} /> {likes[r.id]?.count ?? 0}
        </button>
        <button onClick={() => openComment(r.id)} className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
          <MessageCircle className="h-4 w-4" /> {comments[r.id]?.length ?? "Comment"}
        </button>
      </div>

      {openComments === r.id && (
        <div className="mt-4 border-t border-border pt-4 space-y-3">
          {(comments[r.id] ?? []).map((c: any) => (
            <div key={c.id} className="text-sm">
              <span className="font-medium">{c.profile?.display_name ?? c.profile?.username}: </span>
              <span className="text-foreground/85">{c.body}</span>
            </div>
          ))}
          {user ? (
            <div className="flex gap-2">
              <Textarea value={draft} onChange={(e: any) => setDraft(e.target.value)} rows={2} placeholder="A thoughtful reply…" className="bg-card text-sm" maxLength={500} />
              <Button size="sm" variant="ink" onClick={() => postComment(r.id)}>Post</Button>
            </div>
          ) : (
            <p className="text-xs italic text-muted-foreground"><Link to="/auth" className="text-accent hover:underline">Sign in</Link> to reply.</p>
          )}
        </div>
      )}
    </>
  );
}
export default Feed;