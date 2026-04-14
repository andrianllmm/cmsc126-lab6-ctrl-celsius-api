import { useSearchParams } from "react-router";
import PokemonList from "@/components/pokemon/PokemonList";
import SearchBox from "@/components/SearchBox";
import { Loading } from "@/components/ui/loading";
import { usePokemonList } from "@/hooks/usePokemonList";
import PokemonPagination from "@/components/pokemon/PokemonPagination";
import PokemonSort from "@/components/pokemon/PokemonSort";
import type { PokemonSortKey } from "@/types/pokemon";

const PokedexPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") ?? "";
  const page = Math.max(0, Number(searchParams.get("page") ?? "1") - 1);
  const sort = (searchParams.get("sort") as PokemonSortKey) ?? "id-asc";

  const setQuery = (value: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      if (value) next.set("q", value);
      else next.delete("q");

      next.delete("page");

      return next;
    });
  };

  const setPage = (value: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      if (query) next.set("q", query);
      else next.delete("q");

      if (value === 0) next.delete("page");
      else next.set("page", String(value + 1));

      return next;
    });
  };

  const setSort = (value: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      if (query) next.set("q", query);
      else next.delete("q");

      next.set("sort", value);
      next.delete("page");

      return next;
    });
  };

  const { data, listLoading, error, total } = usePokemonList({
    query,
    page,
    sort,
  });

  return (
    <div>
      <div className="flex mb-8 gap-4">
        <SearchBox value={query} onChange={setQuery} />
        <PokemonSort value={sort} onChange={setSort} />
      </div>

      {error && <div>Error: {error}</div>}

      {listLoading ? (
        <Loading />
      ) : (
        <>
          <PokemonList pokemons={data} />

          <PokemonPagination
            page={page}
            total={total}
            onPageChange={setPage}
            className="mt-8"
          />
        </>
      )}
    </div>
  );
};

export default PokedexPage;
