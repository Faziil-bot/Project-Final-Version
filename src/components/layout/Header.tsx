import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { BookOpen, ClipboardCheck, Inbox, LogOut, Plus, Search, Sparkles, User as UserIcon } from "lucide-react";

const Header = () => {
  const { user, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm tracking-wide transition-colors ${isActive ? "text-accent" : "text-foreground/70 hover:text-foreground"}`;

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2 group">
          <BookOpen className="h-5 w-5 text-accent transition-transform group-hover:-rotate-6" />
          <span className="font-display text-2xl tracking-tight">Bookmarked</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {isAdmin && (
            <>
              <NavLink to="/" end className={linkClass}>Journal</NavLink>
              <NavLink to="/discover" className={linkClass}>Discover</NavLink>
              <NavLink to="/feed" className={linkClass}>Feed</NavLink>
            </>
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate("/discover")} aria-label="Search">
            <Search className="h-4 w-4" />
          </Button>
          {user ? (
            <>
              <Button variant="ink" size="sm" onClick={() => navigate("/add-book")}>
                <Plus className="h-4 w-4" /> Add book
              </Button>
              {isAdmin ? (
                <Button variant="ribbon" size="sm" onClick={() => navigate("/admin/submissions")}>
                  <ClipboardCheck className="h-4 w-4" /> Review
                </Button>
              ) : (
                <Button variant="ribbon" size="sm" onClick={() => navigate("/recommend")}>
                  <Sparkles className="h-4 w-4" /> Recommend
                </Button>
              )}
              <Button variant="ghost" size="icon" onClick={() => navigate("/profile")} aria-label="Profile">
                <UserIcon className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={async () => { await signOut(); navigate("/"); }} aria-label="Sign out">
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <Button variant="ribbon" size="sm" onClick={() => navigate("/auth")}>Sign in</Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;