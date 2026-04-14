type Props = {
  type: string;
};

const PokemonTypeBadge = ({ type }: Props) => {
  return (
    <span className="text-xs px-2 py-1 rounded bg-gray-200 capitalize">
      {type}
    </span>
  );
};

export default PokemonTypeBadge;
