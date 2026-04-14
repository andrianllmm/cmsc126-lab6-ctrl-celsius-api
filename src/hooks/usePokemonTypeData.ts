import { useEffect, useState } from 'react';
import type { PokemonDetail, PokemonTypeData } from '@/types/pokemon';

export function usePokemonTypeData(types?: PokemonDetail['types']) {
  const [typeData, setTypeData] = useState<PokemonTypeData[]>([]);

  useEffect(() => {
    if (!types?.length) return;

    let cancelled = false;

    (async () => {
      const results = await Promise.all(
        types.map((t) => fetch(t.type.url).then((res) => res.json()))
      );

      if (!cancelled) setTypeData(results);
    })();

    return () => {
      cancelled = true;
    };
  }, [types]);

  return typeData;
}
