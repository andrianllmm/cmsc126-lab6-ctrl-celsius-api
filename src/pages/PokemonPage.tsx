import { usePokemon } from "@/hooks/usePokemon";
import { useParams } from "react-router";

const PokemonPage = () => {
  const { name } = useParams();

  const { data, loading, error } = usePokemon(name || "");

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>{data.name}</p>
    </div>
  );
};

export default PokemonPage;
