import { getPokemon, getPokemonList } from "@/services/pokemon";
import type {
  PokemonDetail,
  PokemonListItem,
  PokemonSortKey,
} from "@/types/pokemon";
import { getIdFromUrl } from "@/utils/pokemon/getIdFromUrl";
import { sortStrategies } from "@/utils/pokemon/sort";
import { useEffect, useMemo, useState } from "react";

export function usePokemonList({
  query,
  sort,
  page,
}: {
  query: string;
  sort: PokemonSortKey;
  page: number;
}) {
  const [list, setList] = useState<PokemonListItem[]>([]);
  const [data, setData] = useState<PokemonDetail[]>([]);

  const [listLoading, setListLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pageSize = 20;

  useEffect(() => {
    const fetchList = async () => {
      try {
        setListLoading(true);
        setError(null);

        const res = await getPokemonList(10000, 0);
        setList(res.results);
      } catch {
        setError("Failed to load Pokemon list");
      } finally {
        setListLoading(false);
      }
    };

    fetchList();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return list;

    return list.filter((p) => {
      const id = getIdFromUrl(p.url).toString();
      return p.name.toLowerCase().includes(q) || id === q;
    });
  }, [list, query]);

  const sorted = useMemo(() => {
    const strategy = sortStrategies[sort];
    return [...filtered].sort(strategy);
  }, [filtered, sort]);

  const paginated = useMemo(() => {
    const start = page * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setDetailsLoading(true);
        setError(null);

        const details = await Promise.all(
          paginated.map((p) => getPokemon(p.name)),
        );

        setData(details);
      } catch {
        setError("Failed to load Pokemon details");
      } finally {
        setDetailsLoading(false);
      }
    };

    if (paginated.length) {
      fetchDetails();
    } else {
      setData([]);
    }
  }, [paginated]);

  return {
    data,
    error,

    loading: listLoading || detailsLoading,
    listLoading,
    detailsLoading,

    total: sorted.length,
  };
}
