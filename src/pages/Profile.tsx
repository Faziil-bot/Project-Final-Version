import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppShell from "@/components/layout/AppShell";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import BookCover from "@/components/books/BookCover";
import StarRating from "@/components/books/StarRating";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [recs, setRecs] = useState<any[]>([]);
  const [counts, setCounts] = useState({ followers: 0, following: 0 });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data: p } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
      setProfile(p);
      const { data: r } = await supabase.from("recommendations")
        .select("id, note, rating, created_at, book:books(id,title,author,cover_url)")
        .eq("user_id", user.id).order("created_at", { ascending: false });
      setRecs(r ?? []);
      const [{ count: followers }, { count: following }] = await Promise.all([
        supabase.from("follows").select("*", { count: "exact", head: true }).eq("following_id", user.id),
        supabase.from("follows").select("*", { count: "exact", head: true }).eq("follower_id", user.id),
      ]);
      setCounts({ followers: followers ?? 0, following: following ?? 0 });
    })();
  }, [user]);

  const save = async () => {
    if (!user || !profile) return;
    const { error } = await supabase.from("profiles")
      .update({ display_name: profile.display_name, bio: profile.bio })
      .eq("id", user.id);
    if (error) { toast.error(error.message); return; }
    toast.success("Profile saved");
    setEditing(false);
  };

  if (!profile) return <AppShell><div className="container py-24 text-center text-muted-foreground italic">Opening your shelf…</div></AppShell>;

  return (
    <AppShell>
      <div className="container max-w-4xl py-16">
        <header className="border-b border-border pb-8 mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">Reader</p>
          {editing ? (
            <div className="mt-3 space-y-3 max-w-md">
              <Input value={profile.display_name ?? ""} onChange={(e) => setProfile({ ...profile, display_name: e.target.value })} placeholder="Display name" />
              <Textarea value={profile.bio ?? ""} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} placeholder="A line or two about your reading…" maxLength={300} rows={3} />
              <div className="flex gap-2">
                <Button variant="ribbon" size="sm" onClick={save}>Save</Button>
                <Button variant="ghost" size="sm" onClick={() => setEditing(false)}>Cancel</Button>
              </div>
            </div>
          ) : (
            <>
              <h1 className="font-display text-5xl mt-1">{profile.display_name ?? profile.username}</h1>
              <p className="italic text-muted-foreground">@{profile.username}</p>
              {profile.bio && <p className="mt-3 max-w-2xl text-foreground/85">{profile.bio}</p>}
              <div className="mt-4 flex gap-6 text-sm text-muted-foreground">
                <span><strong className="text-foreground">{recs.length}</strong> entries</span>
                <span><strong className="text-foreground">{counts.followers}</strong> followers</span>
                <span><strong className="text-foreground">{counts.following}</strong> following</span>
              </div>
              <Button variant="outline" size="sm" className="mt-4" onClick={() => setEditing(true)}>Edit profile</Button>
            </>
          )}
        </header>

        <h2 className="font-display text-2xl mb-6">Your shelf</h2>
        {recs.length === 0 ? (
          <p className="italic text-muted-foreground">No entries yet. <Link to="/recommend" className="text-accent hover:underline">Inscribe your first.</Link></p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-6">
            {recs.map((r) => (
              <Link key={r.id} to={r.book ? `/book/${r.book.id}` : "#"} className="flex gap-4 p-4 border border-border bg-card hover:border-accent transition-colors">
                <BookCover src={r.book?.cover_url} title={r.book?.title ?? ""} className="w-16 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-display text-base leading-tight line-clamp-2">{r.book?.title}</p>
                  <p className="text-xs italic text-muted-foreground">{r.book?.author}</p>
                  {r.rating && <StarRating value={r.rating} readOnly size={12} className="mt-1" />}
                  <p className="mt-2 text-xs text-foreground/70 line-clamp-2">"{r.note}"</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
};
export default Profile;