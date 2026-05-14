const Footer = () => (
  <footer className="border-t border-border/60 mt-24 py-10">
    <div className="container flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
      <p className="font-display text-base">Bookmarked</p>
      <p className="italic">"A reader lives a thousand lives before he dies."</p>
      <p>© {new Date().getFullYear()} — A literary journal</p>
    </div>
  </footer>
);
export default Footer;