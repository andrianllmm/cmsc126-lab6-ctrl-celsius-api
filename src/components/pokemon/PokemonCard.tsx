import type { PokemonDetail } from "@/types/pokemon";
import PokemonTypeBadge from "./PokemonTypeBadge";
import PokemonSprite from "./PokemonSprite";
import { getPokemonSprite } from "@/utils/getPokemonSprite";

type Props = {
  pokemon: PokemonDetail;
};

const PokemonCard = ({ pokemon }: Props) => {
  return (
    <div className="border rounded p-3">
      <PokemonSprite src={getPokemonSprite(pokemon)} alt={pokemon.name} />

      <h3 className="text-center font-semibold capitalize">{pokemon.name}</h3>

      <div className="flex gap-1 justify-center mt-2 flex-wrap">
        {pokemon.types.map((t) => (
          <PokemonTypeBadge key={t.type.name} type={t.type.name} />
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
