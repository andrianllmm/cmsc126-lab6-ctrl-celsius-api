import { usePokemonColors } from "@/hooks/usePokemonColors";
import PokemonCard from "./PokemonCard";
import type { PokemonDetail } from "@/types/pokemon";

type Props = {
  pokemons: PokemonDetail[];
};

const PokemonList = ({ pokemons: pokemon }: Props) => {
  const colors = usePokemonColors(pokemon);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      {pokemon.map((p) => (
        <PokemonCard
          key={p.id}
          pokemon={p}
          color={colors[p.name]}
          className="h-full"
        />
      ))}
    </div>
  );
};

export default PokemonList;
