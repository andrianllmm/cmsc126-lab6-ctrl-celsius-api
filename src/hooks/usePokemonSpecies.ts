import { useEffect, useState } from 'react';
import { getPokemonSpecies } from '@/services/pokemon';
import type { PokemonSpecies } from '@/types/pokemon';

/**
 * Custom hook to fetch Pokémon species data.
 */
export function usePokemonSpecies(pokemonName?: string) {
  const [species, setSpecies] = useState<PokemonSpecies | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pokemonName) {
      setSpecies(null);
      return;
    }

    const controller = new AbortController();

    async function fetchSpecies(name: string) {
      try {
        setLoading(true);
        setError(null);

        const res = await getPokemonSpecies(name, {
          signal: controller.signal,
        });

        setSpecies(res);
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return;

        setError(
          err instanceof Error ? err.message : 'Failed to fetch species'
        );
        setSpecies(null);
      } finally {
        setLoading(false);
      }
    }

    fetchSpecies(pokemonName);

    return () => controller.abort();
  }, [pokemonName]);

  return { species, loading, error };
}
