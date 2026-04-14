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
    <div>
      {data.results.map((pokemon) => (
        <div key={pokemon.name}>
          <p>{pokemon.name}</p>
        </div>
      ))}
    </div>
  );
};

export default PokedexPage;
