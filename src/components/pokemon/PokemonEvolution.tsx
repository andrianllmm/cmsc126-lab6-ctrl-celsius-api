import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/8bit/card";
import { getIdFromUrl } from "@/utils/pokemon/getIdFromUrl";

type Props = {
  evolutionList: { name: string; url: string }[];
};

export function PokemonEvolution({ evolutionList }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Evolutions</CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <div className="flex flex-wrap justify-center gap-6 py-4">
          {evolutionList.map((p, i) => {
            const id = getIdFromUrl(p.url);

            return (
              <div key={p.name} className="flex items-center gap-4">
                <Link to={`/pokemon/${p.name}`} className="text-center group">
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                    className="pixelated w-50 h-50 transition-all ease-in-out duration-200 group-hover:-translate-y-3 group-hover:scale-110 group-hover:brightness-110 group-hover:rotate-3"
                  />
                  <p className="capitalize">{p.name}</p>
                </Link>

                {i < evolutionList.length - 1 && (
                  <span className="text-center select-none">&gt;</span>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
