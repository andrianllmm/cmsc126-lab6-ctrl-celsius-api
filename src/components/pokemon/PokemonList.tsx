import { usePokemonColors } from "@/hooks/usePokemonColors";
import PokemonCard from "./PokemonCard";
import type { PokemonDetail } from "@/types/pokemon";

type Props = {
  pokemons: PokemonDetail[];
};

const PokemonList = ({ pokemons }: Props) => {
  const { colors, loading } = usePokemonColors(pokemons);

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 transition-opacity duration-300`}
    >
      {pokemons.map((p) => (
        <PokemonCard
          key={p.id}
          pokemon={p}
          color={colors[p.name]}
          className={`h-full ${loading && "opacity-90"}`}
        />
      ))}
    </div>
  );
};

export default PokemonList;
