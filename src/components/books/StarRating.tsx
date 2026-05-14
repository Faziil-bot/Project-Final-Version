import { Star } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  value: number;
  onChange?: (v: number) => void;
  size?: number;
  readOnly?: boolean;
  className?: string;
};

const StarRating = ({ value, onChange, size = 18, readOnly, className }: Props) => {
  const [hover, setHover] = useState<number | null>(null);
  const display = hover ?? value;
  return (
    <div className={cn("inline-flex items-center gap-0.5", className)} onMouseLeave={() => setHover(null)}>
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= Math.round(display);
        return (
          <button
            key={n}
            type="button"
            disabled={readOnly}
            onMouseEnter={() => !readOnly && setHover(n)}
            onClick={() => !readOnly && onChange?.(n)}
            className={cn(
              "transition-transform",
              !readOnly && "hover:scale-110 cursor-pointer",
              readOnly && "cursor-default"
            )}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
          >
            <Star
              style={{ width: size, height: size }}
              className={filled ? "fill-gold text-gold" : "text-muted-foreground/40"}
            />
          </button>
        );
      })}
    </div>
  );
};
export default StarRating;