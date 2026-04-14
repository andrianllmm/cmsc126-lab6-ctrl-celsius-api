import { getPokemon, getPokemonList } from "@/services/pokemon";
import type { PokemonDetail, PokemonListItem } from "@/types/pokemon";
import { useEffect, useMemo, useState } from "react";

export function usePokemonList({
  query,
  page,
}: {
  query: string;
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
      const id = p.url.split("/").filter(Boolean).pop() ?? "";
      return p.name.toLowerCase().includes(q) || id === q;
    });
  }, [list, query]);

  const paginated = useMemo(() => {
    const start = page * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

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

    total: filtered.length,
  };
}
