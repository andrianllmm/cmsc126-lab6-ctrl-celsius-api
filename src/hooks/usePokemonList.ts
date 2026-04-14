import { useEffect, useMemo, useState } from 'react';
import { getPokemon, getPokemonList } from '@/services/pokemon';
import type {
  PokemonDetail,
  PokemonListItem,
  PokemonSortKey,
} from '@/types/pokemon';
import { getIdFromUrl } from '@/utils/pokemon/getIdFromUrl';
import { sortStrategies } from '@/utils/pokemon/sort';

const TOTAL_POKEMON_LIMIT = 10000;
const PAGE_SIZE = 20;

interface UsePokemonListProps {
  query: string;
  sort: PokemonSortKey;
  page: number;
}

/**
 * Custom hook to fetch a list of Pokemon.
 */
export function usePokemonList({ query, sort, page }: UsePokemonListProps) {
  const [masterList, setMasterList] = useState<PokemonListItem[]>([]);
  const [details, setDetails] = useState<PokemonDetail[]>([]);
  const [listLoading, setListLoading] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch master list (on mount)
  useEffect(() => {
    const controller = new AbortController();

    async function fetchMasterList() {
      try {
        setListLoading(true);
        setError(null);
        const res = await getPokemonList(TOTAL_POKEMON_LIMIT, 0, {
          signal: controller.signal,
        });
        setMasterList(res.results);
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return;
        setError('Failed to load Pokemon list');
      } finally {
        setListLoading(false);
      }
    }

    fetchMasterList();
    return () => controller.abort();
  }, []);

  // Filter & sort
  const processedList = useMemo(() => {
    const q = query.trim().toLowerCase();

    const filtered = !q
      ? masterList
      : masterList.filter((p) => {
          const id = getIdFromUrl(p.url).toString();
          return p.name.toLowerCase().includes(q) || id === q;
        });

    return [...filtered].sort(sortStrategies[sort]);
  }, [masterList, query, sort]);

  // Pagination
  const paginatedResults = useMemo(() => {
    const start = page * PAGE_SIZE;
    return processedList.slice(start, start + PAGE_SIZE);
  }, [processedList, page]);

  // Fetch details for the current page
  useEffect(() => {
    if (paginatedResults.length === 0) {
      setDetails([]);
      return;
    }

    const controller = new AbortController();

    async function fetchDetails() {
      try {
        setDetailsLoading(true);
        const results = await Promise.all(
          paginatedResults.map((p) =>
            getPokemon(p.name, { signal: controller.signal })
          )
        );

        setDetails(results);
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return;
        setError('Failed to load Pokemon details');
      } finally {
        setDetailsLoading(false);
      }
    }

    fetchDetails();
    return () => controller.abort();
  }, [paginatedResults]);

  return {
    data: details,
    error,
    loading: listLoading || detailsLoading,
    listLoading,
    detailsLoading,
    total: processedList.length,
  };
}
