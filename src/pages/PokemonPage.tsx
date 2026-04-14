import { useParams } from "react-router";

const PokemonPage = () => {
  const { name } = useParams();
  return <div>{name}</div>;
};

export default PokemonPage;
