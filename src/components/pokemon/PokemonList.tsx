import PokemonCard from "./PokemonCard";
import type { PokemonDetail } from "@/types/pokemon";

type Props = {
  pokemon: PokemonDetail[];
};

const PokemonList = ({ pokemon }: Props) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {pokemon.map((p) => (
        <PokemonCard key={p.id} pokemon={p} />
      ))}
    </div>
  );
};

export default PokemonList;
