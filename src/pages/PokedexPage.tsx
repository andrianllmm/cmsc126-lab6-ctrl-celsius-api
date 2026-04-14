import PokemonList from "@/components/pokemon/PokemonList";
import SearchBox from "@/components/SearchBox";
import { Loading } from "@/components/ui/loading";
import { usePokemonList } from "@/hooks/usePokemonList";

const PokedexPage = () => {
  const { data, listLoading, error, query, setQuery, setPage } =
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

      {listLoading ? <Loading /> : <PokemonList pokemons={data} />}
    </div>
  );
};

export default PokedexPage;
