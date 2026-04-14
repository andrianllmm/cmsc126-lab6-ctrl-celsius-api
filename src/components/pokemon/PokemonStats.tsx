import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/8bit/card";

import HealthBar from "@/components/ui/8bit/health-bar";
import ManaBar from "@/components/ui/8bit/mana-bar";
import { Progress } from "@/components/ui/8bit/progress";

import type { PokemonDetail } from "@/types/pokemon";
import { toPercent } from "@/utils/toPercent";

type Props = React.ComponentProps<"div"> & {
  pokemon: PokemonDetail;
};

const MAX_STAT = 255;

function getStat(stats: PokemonDetail["stats"], name: string) {
  return stats.find((s) => s.stat.name === name)?.base_stat ?? 0;
}

export function PokemonStats({ className, pokemon, ...props }: Props) {
  const hp = getStat(pokemon.stats, "hp");
  const attack = getStat(pokemon.stats, "attack");
  const defense = getStat(pokemon.stats, "defense");
  const spAttack = getStat(pokemon.stats, "special-attack");
  const spDefense = getStat(pokemon.stats, "special-defense");
  const speed = getStat(pokemon.stats, "speed");

  return (
    <Card className={cn(className)} {...props}>
      <CardHeader>
        <CardTitle>Stats</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* HP */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>HP</span>
            <span>{hp}</span>
          </div>
          <HealthBar value={toPercent(hp / MAX_STAT)} />
        </div>

        {/* Attack */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Attack</span>
            <span>{attack}</span>
          </div>
          <ManaBar value={toPercent(attack / MAX_STAT)} />
        </div>

        {/* Defense */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Defense</span>
            <span>{defense}</span>
          </div>
          <Progress value={toPercent(defense / MAX_STAT)} />
        </div>

        {/* Special Attack */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Sp. Atk</span>
            <span>{spAttack}</span>
          </div>
          <Progress value={toPercent(spAttack / MAX_STAT)} />
        </div>

        {/* Special Defense */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Sp. Def</span>
            <span>{spDefense}</span>
          </div>
          <Progress value={toPercent(spDefense / MAX_STAT)} />
        </div>

        {/* Speed */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Speed</span>
            <span>{speed}</span>
          </div>
          <Progress value={toPercent(speed / MAX_STAT)} />
        </div>
      </CardContent>
    </Card>
  );
}
