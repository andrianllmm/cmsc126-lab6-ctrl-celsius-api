import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/8bit/select";
import {
  POKEMON_SORT_OPTIONS,
  type PokemonSortValue,
} from "@/config/pokemonSort";

interface PokemonSortProps {
  value: PokemonSortValue;
  onChange: (value: PokemonSortValue) => void;
}

const PokemonSort = ({ value, onChange }: PokemonSortProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Sort" />
      </SelectTrigger>

      <SelectContent>
        {POKEMON_SORT_OPTIONS.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default PokemonSort;
