import PokemonList from "@/components/pokemon/PokemonList";
import PokemonPagination from "@/components/pokemon/PokemonPagination";
import PokemonSort from "@/components/pokemon/PokemonSort";
import SearchBox from "@/components/SearchBox";
import { Loading } from "@/components/ui/loading";
import { usePokedexParams } from "@/hooks/usePokedexParams";
import { usePokemonList } from "@/hooks/usePokemonList";

const PokedexPage = () => {
  const { query, page, sort, setQuery, setPage, setSort } = usePokedexParams();
  const { data, listLoading, error, total } = usePokemonList({
    query,
    page,
    sort,
  });

  return (
    <div>
      <div className="w-full flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
        <SearchBox
          value={query}
          onChange={setQuery}
          className="w-full md:max-w-80"
        />
        <PokemonSort
          value={sort}
          onChange={setSort}
          className="w-full md:max-w-40"
        />
      </div>

      {error && (
        <div className="retro text-center m-4 text-destructive">
          An error occurred
        </div>
      )}

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
