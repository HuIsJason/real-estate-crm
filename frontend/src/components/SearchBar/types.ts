interface SearchBarProps {
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export default SearchBarProps;
