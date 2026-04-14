import { Badge } from "../ui/8bit/badge";

type Props = {
  type: string;
};

const PokemonTypeBadge = ({ type }: Props) => {
  return <Badge>{type}</Badge>;
};

export default PokemonTypeBadge;
