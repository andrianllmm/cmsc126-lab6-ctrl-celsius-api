import { getPokemon } from "@/services/pokemon";
import type { PokemonDetail } from "@/types/pokemon";
import { useEffect, useState } from "react";

export function usePokemon(name: string) {
  const [data, setData] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const json = await getPokemon(name);

        setData(json);
      } catch (err) {
        setError("Something went wrong: " + err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [name]);

  return { data, loading, error };
}
