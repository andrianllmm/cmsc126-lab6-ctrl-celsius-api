import { getPokemon } from "@/services/pokemon";
import type { PokemonDetail } from "@/types/pokemon";
import { useEffect, useState } from "react";

export function usePokemon(name: string) {
  const [data, setData] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!name) return;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const pokemon = await getPokemon(name);

        setData(pokemon);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Error");
      } finally {
        setLoading(false);
      }
    })();
  }, [name]);

  return { data, loading, error };
}
