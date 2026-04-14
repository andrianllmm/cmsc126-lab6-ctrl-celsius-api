import type { PokemonListItem } from "@/types/pokemon";
import type { PokemonSortValue } from "@/constants/pokemon";
import { getIdFromUrl } from "@/utils/pokemon/getIdFromUrl";

export const sortStrategies: Record<
  PokemonSortValue,
  (a: PokemonListItem, b: PokemonListItem) => number
> = {
  "id-asc": (a, b) => getIdFromUrl(a.url) - getIdFromUrl(b.url),
  "id-desc": (a, b) => getIdFromUrl(b.url) - getIdFromUrl(a.url),
  "name-asc": (a, b) => a.name.localeCompare(b.name),
  "name-desc": (a, b) => b.name.localeCompare(a.name),
};
