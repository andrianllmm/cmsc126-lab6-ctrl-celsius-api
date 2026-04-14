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

  return (
    <img
      key={src}
      src={src ?? ""}
      alt={alt}
      loading="lazy"
      onLoad={() => setLoaded(true)}
      className={cn(
        "pixelated w-24 h-24 text-wrap text-[6px] text-muted-foreground/50",
        className,
        animateOnLoad && loaded && "animate-hero-land",
      )}
    />
  );
};

export default PokemonSprite;
