import { useSearchParams } from 'react-router';
import type { PokemonSortKey } from '@/types/pokemon';

const DEFAULT_SORT: PokemonSortKey = 'id-asc';

export function usePokedexParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('q') ?? '';
  const page = Math.max(0, Number(searchParams.get('page') ?? '1') - 1);
  const sort = (searchParams.get('sort') as PokemonSortKey) ?? DEFAULT_SORT;

  const updateParams = (updates: {
    q?: string | null;
    page?: number | null;
    sort?: string | null;
  }) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      // Handle query
      if (updates.q !== undefined) {
        if (updates.q) {
          next.set('q', updates.q);
        } else {
          next.delete('q');
        }
      }

      // Handle page (convert 0-indexed to 1-indexed)
      if (updates.page !== undefined) {
        if (updates.page === null || updates.page === 0) {
          next.delete('page');
        } else {
          next.set('page', String(updates.page + 1));
        }
      }

      // Handle sort
      if (updates.sort !== undefined) {
        if (updates.sort) {
          next.set('sort', updates.sort);
        } else {
          next.delete('sort');
        }
      }

      return next;
    });
  };

  return {
    query,
    page,
    sort,
    setQuery: (value: string) => updateParams({ q: value, page: null }),
    setPage: (value: number) => updateParams({ page: value }),
    setSort: (value: string) => updateParams({ sort: value, page: null }),
  };
}
