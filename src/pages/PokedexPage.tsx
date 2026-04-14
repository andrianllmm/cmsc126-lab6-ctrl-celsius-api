import PokemonList from "@/components/pokemon/PokemonList";
import { usePokemonList } from "@/hooks/usePokemonList";

const PokedexPage = () => {
  const { data, loading, error } = usePokemonList();

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <PokemonList pokemon={data} />
    </>
  );
};

export default PokedexPage;
