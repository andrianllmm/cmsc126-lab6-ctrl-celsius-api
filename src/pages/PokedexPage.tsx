import { useSearchParams } from "react-router";
import PokemonList from "@/components/pokemon/PokemonList";
import SearchBox from "@/components/SearchBox";
import { Loading } from "@/components/ui/loading";
import { usePokemonList } from "@/hooks/usePokemonList";
import PokemonPagination from "@/components/pokemon/PokemonPagination";

const PokedexPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") ?? "";
  const page = Math.max(0, Number(searchParams.get("page") ?? "1") - 1);

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

      if (value === 0) {
        next.delete("page");
      } else {
        next.set("page", String(value + 1));
      }

      return next;
    });
  };

  const { data, listLoading, error, total } = usePokemonList({
    query,
    page,
  });

  return (
    <div>
      <div className="flex mb-8">
        <SearchBox value={query} onChange={setQuery} />
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
