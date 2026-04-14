export const POKEMON_SORT_OPTIONS = [
  { label: "ID ↑", value: "id-asc" },
  { label: "ID ↓", value: "id-desc" },
  { label: "Name A-Z", value: "name-asc" },
  { label: "Name Z-A", value: "name-desc" },
] as const;

export type PokemonSortValue = (typeof POKEMON_SORT_OPTIONS)[number]["value"];
