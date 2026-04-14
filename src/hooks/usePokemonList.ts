import { getPokemonList } from "@/services/pokemon";
import type { PokemonListResponse } from "@/types/pokemon";
import { useEffect, useState } from "react";

export function usePokemonList() {
  const [data, setData] = useState<PokemonListResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const json = await getPokemonList();

        setData(json);
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
