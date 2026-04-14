import PokemonList from "@/components/pokemon/PokemonList";
import SearchBox from "@/components/SearchBox";
import { Loading } from "@/components/ui/loading";
import { usePokemonList } from "@/hooks/usePokemonList";
import PokemonPagination from "@/components/pokemon/PokemonPagination";

const PokedexPage = () => {
  const { data, listLoading, error, query, setQuery, setPage, page, total } =
    usePokemonList();

  return (
    <div>
      <div className="flex mb-8">
        <SearchBox
          value={query}
          onChange={(value) => {
            setQuery(value);
            setPage(0);
          }}
        />
      </div>

      {error && <div>Error: {error}</div>}

      {listLoading ? (
        <Loading />
      ) : (
        <>
          <PokemonList pokemons={data} />

          <PokemonPagination page={page} total={total} onPageChange={setPage} />
        </>
      )}
    </div>
  );
};

export default PokedexPage;
