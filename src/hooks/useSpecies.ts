import { useEffect, useState } from "react";
import { getPokemonSpecies } from "@/services/pokemon";
import type { PokemonSpecies } from "@/types/pokemon";

export function usePokemonSpecies(pokemonName?: string) {
  const [species, setSpecies] = useState<PokemonSpecies | null>(null);

  useEffect(() => {
    if (!pokemonName) return;

    (async () => {
      const res = await getPokemonSpecies(pokemonName);
      setSpecies(res);
    })();
  }, [pokemonName]);

  return species;
}
