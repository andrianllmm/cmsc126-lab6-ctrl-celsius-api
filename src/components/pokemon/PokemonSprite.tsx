import { cn } from "@/lib/utils";

type Props = {
  src: string | null;
  alt: string;
  className?: string;
};

const PokemonSprite = ({ src, alt, className }: Props) => {
  return (
    <img
      src={src ?? ""}
      alt={alt}
      className={cn(
        "pixelated w-24 h-24 text-wrap text-[8px] text-muted-foreground/50",
        className,
      )}
      loading="lazy"
    />
  );
};

export default PokemonSprite;
