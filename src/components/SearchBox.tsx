import { cn } from "@/lib/utils";
import { Input } from "./ui/8bit/input";

interface SearchBoxProps {
  className?: string;
  value: string;
  onChange: (value: string) => void;
}

const SearchBox = ({ className, value, onChange }: SearchBoxProps) => {
  return (
    <div className={cn("flex gap-4 items-center", className)}>
      <Input
        value={value}
        placeholder="Who's that pokemon?"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBox;
