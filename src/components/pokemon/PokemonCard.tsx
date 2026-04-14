import type { PokemonDetail } from "@/types/pokemon";
import PokemonTypeBadge from "./PokemonTypeBadge";
import PokemonSprite from "./PokemonSprite";
import { getPokemonSprite } from "@/utils/getPokemonSprite";
import { Card, CardContent } from "@/components/ui/8bit/card";
import { Link } from "react-router";

type Props = {
  pokemon: PokemonDetail;
};

const PokemonCard = ({ pokemon }: Props) => {
  return (
    <Link to={`/pokemon/${pokemon.name}`} className="block group">
      <Card
        className="
          transition-all duration-200
          hover:-translate-y-1.5
          cursor-pointer
        "
      >
        <CardContent>
          <PokemonSprite
            src={getPokemonSprite(pokemon)}
            alt={pokemon.name}
            className="mx-auto transition-all duration-200 group-hover:scale-110 group-hover:rotate-3 group-hover:brightness-110"
          />
          <h3 className="text-center font-semibold capitalize">
            {pokemon.name}
          </h3>
          <div className="flex gap-4 justify-center mt-2 flex-wrap">
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
