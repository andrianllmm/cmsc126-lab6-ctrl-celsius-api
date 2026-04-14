import type { PokemonColor, PokemonDetail } from "@/types/pokemon";
import PokemonTypeBadge from "./PokemonTypeBadge";
import PokemonSprite from "./PokemonSprite";
import { getPokemonSprite } from "@/utils/pokemon/getPokemonSprite";
import { Card, CardContent } from "@/components/ui/8bit/card";
import { Link } from "react-router";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const pokemonThemeColors = cva("", {
  variants: {
    color: {
      black: "bg-pokemon-black text-background",
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
    color: "white",
  },
});

type Props = {
  pokemon: PokemonDetail;
  color?: PokemonColor;
  className?: string;
};

const PokemonCard = ({ pokemon, color, className }: Props) => {
  return (
    <Link to={`/pokemon/${pokemon.name}`} className="block group">
      <Card
        className={cn(
          "cursor-pointer",
          "transition-all duration-200 ease-in-out",
          "group-hover:-translate-y-1.5",
          "group-hover:scale-101",
          "group-hover:brightness-105 group-hover:saturate-101",
          pokemonThemeColors({ color }),
          className,
        )}
      >
        <CardContent className="flex flex-col gap-4 justify-center items-center">
          <PokemonSprite
            src={getPokemonSprite(pokemon)}
            alt={pokemon.name}
            className="transition-all duration-300 ease-in-out group-hover:scale-112 group-hover:rotate-3 group-hover:brightness-110"
          />
          <div className="flex flex-col gap-1 justify-center items-center">
            <p className="text-[10px] opacity-80">#{pokemon.id}</p>
            <h3 className="text-center font-semibold capitalize">
              {pokemon.name}
            </h3>
          </div>
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
