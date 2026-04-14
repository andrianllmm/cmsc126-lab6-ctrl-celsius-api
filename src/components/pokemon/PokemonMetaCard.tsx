import PokemonTypeBadge from "@/components/pokemon/PokemonTypeBadge";
import type { PokemonDetail, PokemonType } from "@/types/pokemon";
import { Card, CardContent } from "@/components/ui/8bit/card";

type Props = {
  pokemon: PokemonDetail;
  weaknesses: string[];
  strengths: string[];
};

export function PokemonMetaCard({ pokemon, weaknesses, strengths }: Props) {
  return (
    <Card>
      <CardContent>
        <div className="grid gap-8 md:grid-cols-2">
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            {/* Abilities */}
            <div className="space-y-2">
              <p className="text-[10px] font-bold uppercase text-muted-foreground">
                Abilities
              </p>

              <div className="flex flex-wrap gap-2">
                {pokemon.abilities.map((a) => (
                  <span
                    key={a.ability.name}
                    className="px-3 py-1 border-2 text-xs capitalize bg-muted/10"
                  >
                    {a.ability.name.replace("-", " ")}
                    {a.is_hidden && (
                      <span className="ml-1 opacity-60 text-[9px]">
                        (hidden)
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* Height / Weight */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 ">
                <p className="text-[10px] uppercase text-muted-foreground font-bold">
                  Height
                </p>
                <p className="text-lg font-bold">{pokemon.height / 10}m</p>
              </div>

              <div className="p-3">
                <p className="text-[10px] uppercase text-muted-foreground font-bold">
                  Weight
                </p>
                <p className="text-lg font-bold">{pokemon.weight / 10}kg</p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            {/* Weaknesses */}
            <div>
              <p className="text-[10px] font-bold uppercase text-muted-foreground mb-2">
                Weaknesses
              </p>

              <div className="flex flex-wrap gap-4">
                {weaknesses.length ? (
                  weaknesses.map((w) => (
                    <PokemonTypeBadge key={w} type={w as PokemonType} />
                  ))
                ) : (
                  <p className="text-xs text-muted-foreground">None</p>
                )}
              </div>
            </div>

            {/* Strengths */}
            <div>
              <p className="text-[10px] font-bold uppercase text-muted-foreground mb-2">
                Super Effective Against
              </p>

              <div className="flex flex-wrap gap-4">
                {strengths.length ? (
                  strengths.map((s) => (
                    <PokemonTypeBadge key={s} type={s as PokemonType} />
                  ))
                ) : (
                  <p className="text-xs text-muted-foreground">None</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
