import { Input } from './ui/8bit/input';

interface SearchBoxProps {
  className?: string;
  value: string;
  onChange: (value: string) => void;
}

const SearchBox = ({ className, value, onChange }: SearchBoxProps) => {
  return (
    <Input
      value={value}
      placeholder="Who's that pokemon?"
      onChange={(e) => onChange(e.target.value)}
      className={className}
    />
  );
};

export default SearchBox;
