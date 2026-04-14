import { useEffect, useState, useRef } from 'react';
import type { PokemonColor, PokemonDetail } from '@/types/pokemon';
import { getPokemonColor } from '@/services/pokemon';

export function usePokemonColors(pokemons: PokemonDetail[]) {
  const [colors, setColors] = useState<Record<string, PokemonColor>>({});
  const [loading, setLoading] = useState(false);
  const fetchingRef = useRef(new Set<string>());

  useEffect(() => {
    if (!pokemons.length) return;

    const controller = new AbortController();
    let isMounted = true;

    // Only fetch what we don't have and aren't already getting
    const namesToFetch = pokemons
      .map((p) => p.name)
      .filter((name) => !colors[name] && !fetchingRef.current.has(name));

    if (namesToFetch.length === 0) return;

    async function processBatch() {
      namesToFetch.forEach((n) => fetchingRef.current.add(n));
      setLoading(true);

      try {
        const results = await Promise.all(
          namesToFetch.map(async (name) => {
            const color = await getPokemonColor(name, {
              signal: controller.signal,
            }).catch(() => 'white' as PokemonColor);
            return [name, color] as const;
          })
        );

        if (isMounted) {
          const newBatch = Object.fromEntries(results) as Record<
            string,
            PokemonColor
          >;
          setColors((prev) => ({ ...prev, ...newBatch }));
        }
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          console.error('Color fetch error:', err);
        }
      } finally {
        namesToFetch.forEach((n) => fetchingRef.current.delete(n));
        if (isMounted) setLoading(false);
      }
    }

    processBatch();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [pokemons, colors]);

  return { colors, loading };
}
