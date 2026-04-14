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
} from "@/constants/pokemon";
import { cn } from "@/lib/utils";

interface PokemonSortProps {
  value: PokemonSortValue;
  onChange: (value: PokemonSortValue) => void;
  className?: string;
}

const PokemonSort = ({ value, onChange, className }: PokemonSortProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={cn("w-40", className)}>
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
