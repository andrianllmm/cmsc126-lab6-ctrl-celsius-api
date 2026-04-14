import type { PokemonDetail } from "@/types/pokemon";
import PokemonTypeBadge from "./PokemonTypeBadge";
import PokemonSprite from "./PokemonSprite";
import { getPokemonSprite } from "@/utils/getPokemonSprite";
import { Card, CardContent } from "@/components/ui/8bit/card";

type Props = {
  pokemon: PokemonDetail;
};

const PokemonCard = ({ pokemon }: Props) => {
  return (
    <Card>
      <CardContent>
        <PokemonSprite src={getPokemonSprite(pokemon)} alt={pokemon.name} />
        <h3 className="text-center font-semibold capitalize">{pokemon.name}</h3>
        <div className="flex gap-1 justify-center mt-2 flex-wrap">
          {pokemon.types.map((t) => (
            <PokemonTypeBadge key={t.type.name} type={t.type.name} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PokemonCard;
