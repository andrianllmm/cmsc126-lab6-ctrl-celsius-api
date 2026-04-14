import { useEffect, useState } from "react";
import type { PokemonColor, PokemonDetail } from "@/types/pokemon";
import { getPokemonColor } from "@/services/pokemon";

export function usePokemonColors(pokemons: PokemonDetail[]) {
  const [colors, setColors] = useState<
    Record<PokemonDetail["name"], PokemonColor>
  >({});

  useEffect(() => {
    if (!pokemons.length) return;

    const fetchColors = async () => {
      const entries = await Promise.all(
        pokemons.map(async (p) => {
          const color = await getPokemonColor(p.name);
          return [p.name, color] as const;
        }),
      );

      setColors(Object.fromEntries(entries) as Record<string, PokemonColor>);
    };

    fetchColors();
  }, [pokemons]);

  return colors;
}
