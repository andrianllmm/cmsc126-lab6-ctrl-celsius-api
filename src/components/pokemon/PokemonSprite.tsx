type Props = {
  src: string | null;
  alt: string;
};

const PokemonSprite = ({ src, alt }: Props) => {
  return (
    <img
      src={src ?? ""}
      alt={alt}
      className="w-24 h-24 mx-auto"
      loading="lazy"
    />
  );
};

export default PokemonSprite;
