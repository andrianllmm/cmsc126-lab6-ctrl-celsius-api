import { getPokemon } from '@/services/pokemon';
import type { PokemonDetail } from '@/types/pokemon';
import { useEffect, useState } from 'react';

/**
 * Custom hook to fetch a single Pokemon's details.
 */
export function usePokemon(name: string) {
  const [data, setData] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!name) {
      setData(null);
      return;
    }

    const controller = new AbortController();

    async function fetchPokemonData() {
      try {
        setLoading(true);
        setError(null);

        const pokemon = await getPokemon(name, { signal: controller.signal });

        setData(pokemon);
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred'
        );
      } finally {
        setLoading(false);
      }
    }

    fetchPokemonData();

    return () => {
      controller.abort();
    };
  }, [name]);

  return {
    data,
    loading,
    error,
  };
}
