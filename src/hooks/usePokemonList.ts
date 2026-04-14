import { getPokemon, getPokemonList } from "@/services/pokemon";
import type { PokemonDetail } from "@/types/pokemon";
import { useEffect, useState } from "react";

export function usePokemonList() {
  const [data, setData] = useState<PokemonDetail[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const list = await getPokemonList();

        const details = await Promise.all(
          list.results.map((p) => getPokemon(p.name)),
        );

        setData(details);
      } catch (err) {
        setError("Something went wrong: " + err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}
