import type { PokemonDetail } from "@/types/pokemon";
import PokemonTypeBadge from "./PokemonTypeBadge";
import PokemonSprite from "./PokemonSprite";
import { getPokemonSprite } from "@/utils/getPokemonSprite";
import { Card, CardContent } from "@/components/ui/8bit/card";
import { Link } from "react-router";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const pokemonThemeColors = cva("", {
  variants: {
    color: {
      black: "bg-pokemon-black",
      blue: "bg-pokemon-blue",
      brown: "bg-pokemon-brown",
      gray: "bg-pokemon-gray",
      green: "bg-pokemon-green",
      pink: "bg-pokemon-pink",
      purple: "bg-pokemon-purple",
      red: "bg-pokemon-red",
      white: "bg-pokemon-white",
      yellow: "bg-pokemon-yellow",
    },
  },
  defaultVariants: {
    color: "gray",
  },
});

type PokemonThemeColor = VariantProps<typeof pokemonThemeColors>["color"];

type Props = {
  pokemon: PokemonDetail;
  color?: PokemonThemeColor;
  className?: string;
};

const PokemonCard = ({ pokemon, color, className }: Props) => {
  return (
    <Link to={`/pokemon/${pokemon.name}`} className="block group">
      <Card
        className={cn(
          "transition-all duration-200",
          "hover:-translate-y-1.5",
          "cursor-pointer",
          pokemonThemeColors({ color }),
          className,
        )}
      >
        <CardContent className="flex flex-col gap-4 justify-center items-center">
          <PokemonSprite
            src={getPokemonSprite(pokemon)}
            alt={pokemon.name}
            className="transition-all duration-200 group-hover:scale-110 group-hover:rotate-3 group-hover:brightness-110"
          />
          <h3 className="text-center font-semibold capitalize">
            {pokemon.name}
          </h3>
          <div className="flex gap-4 justify-center flex-wrap">
            {pokemon.types.map((t) => (
              <PokemonTypeBadge key={t.type.name} type={t.type.name} />
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PokemonCard;
