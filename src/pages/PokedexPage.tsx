import { usePokemonList } from "@/hooks/usePokemonList";

const PokedexPage = () => {
  const { data, loading, error } = usePokemonList();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <div>{JSON.stringify(data)}</div>;
};

export default PokedexPage;
