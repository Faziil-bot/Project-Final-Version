import { cn } from "@/lib/utils";

type Props = {
  src?: string | null;
  title: string;
  className?: string;
};

const BookCover = ({ src, title, className }: Props) => {
  if (!src) {
    return (
      <div
        className={cn(
          "relative bg-ink text-primary-foreground flex items-center justify-center p-3 text-center shadow-book",
          className
        )}
        style={{ aspectRatio: "2/3" }}
      >
        <span className="absolute left-0 top-2 bottom-2 w-1 bg-accent" />
        <span className="font-display text-sm leading-tight">{title}</span>
      </div>
    );
  }
  return (
    <div className={cn("relative shadow-book overflow-hidden", className)} style={{ aspectRatio: "2/3" }}>
      <span className="absolute left-0 top-0 bottom-0 w-1 bg-accent z-10" />
      <img src={src} alt={`Cover of ${title}`} loading="lazy" className="w-full h-full object-cover" />
    </div>
  );
};
export default BookCover;