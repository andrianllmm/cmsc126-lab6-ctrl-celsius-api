import { Badge } from "../ui/8bit/badge";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { PokemonType } from "@/types/pokemon";

const pokemonTypeBadgeVariants = cva("capitalize text-[8px] font-semibold", {
  variants: {
    type: {
      normal: "bg-type-normal",
      fire: "bg-type-fire",
      water: "bg-type-water",
      electric: "bg-type-electric",
      grass: "bg-type-grass",
      ice: "bg-type-ice",
      fighting: "bg-type-fighting",
      poison: "bg-type-poison",
      ground: "bg-type-ground",
      flying: "bg-type-flying",
      psychic: "bg-type-psychic",
      bug: "bg-type-bug",
      rock: "bg-type-rock",
      ghost: "bg-type-ghost",
      dragon: "bg-type-dragon",
      dark: "bg-type-dark",
      steel: "bg-type-steel",
      fairy: "bg-type-fairy",
    },
  },
  defaultVariants: {
    type: "normal",
  },
});

type Props = {
  type: PokemonType;
  className?: string;
};

const PokemonTypeBadge = ({ type, className }: Props) => {
  return (
    <Badge className={cn(pokemonTypeBadgeVariants({ type }), className)}>
      {type}
    </Badge>
  );
};

export default PokemonTypeBadge;
