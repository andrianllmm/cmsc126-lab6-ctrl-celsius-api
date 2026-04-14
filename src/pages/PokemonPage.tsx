import { usePokemon } from "@/hooks/usePokemon";
import { useParams } from "react-router";

const PokemonPage = () => {
  const { name } = useParams();

  const { data, loading, error } = usePokemon(name || "");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <div>{JSON.stringify(data)}</div>;
};

export default PokemonPage;
