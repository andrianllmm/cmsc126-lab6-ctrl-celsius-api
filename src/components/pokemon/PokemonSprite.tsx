import { cn } from "@/lib/utils";
import { useState } from "react";

type Props = {
  src: string | null;
  alt: string;
  className?: string;
  animateOnLoad?: boolean;
};

const PokemonSprite = ({
  src,
  alt,
  className,
  animateOnLoad = false,
}: Props) => {
  const [loaded, setLoaded] = useState(false);

  // Placeholder when no sprite is available
  if (!src) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center w-24 h-24 grayscale opacity-20",
          className,
        )}
      >
        <span className="text-[7px] font-bold uppercase tracking-widest text-center px-1">
          Unknown Face
        </span>
      </div>
    );
  }

  return (
    <div className="relative inline-block">
      {/* Skeleton */}
      {!loaded && (
        <div
          className={cn(
            "absolute inset-0 z-10 animate-pulse bg-primary/5 rounded-full",
            className,
          )}
        />
      )}

      {/* Image */}
      <img
        key={src}
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={cn(
          "pixelated w-24 h-24 object-contain transition-all duration-800",
          className,
          loaded
            ? "opacity-100 blur-0 scale-100"
            : "opacity-0 blur-sm scale-80",
          animateOnLoad && loaded && "animate-hero-land",
        )}
      />
    </div>
  );
};

export default PokemonSprite;
