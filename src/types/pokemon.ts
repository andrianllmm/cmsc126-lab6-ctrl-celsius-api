export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: {
    slot: number;
    type: { name: PokemonType; url: string };
  }[];
  abilities: {
    ability: { name: string; url: string };
    is_hidden: boolean;
    slot: number;
  }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: { name: string; url: string };
  }[];
  sprites: {
    front_default: string | null;
    front_shiny: string | null;
    versions?: {
      "generation-v"?: {
        "black-white"?: {
          animated?: { front_default?: string; front_shiny?: string };
          front_default?: string;
          front_shiny?: string;
        };
      };
    };
  };
  cries?: { latest: string; legacy: string };
}

export interface PokemonSpecies {
  flavor_text_entries: { flavor_text: string; language: { name: string } }[];
  genera: { genus: string; language: { name: string } }[];
  evolution_chain: { url: string };
  color: {
    name: string;
    url: string;
  };
}

export interface EvolutionChain {
  chain: ChainLink;
}

export interface ChainLink {
  species: { name: string; url: string };
  evolves_to: ChainLink[];
  evolution_details: {
    min_level?: number;
    item?: { name: string };
    trigger?: { name: string };
  }[];
}

export interface PokemonWithColor {
  pokemon: PokemonDetail;
  color: string;
}

export type DamageRelationEntry = {
  name: string;
  url: string;
};

export type PokemonTypeData = {
  damage_relations: {
    double_damage_from: DamageRelationEntry[];
    double_damage_to: DamageRelationEntry[];
    half_damage_from: DamageRelationEntry[];
    half_damage_to: DamageRelationEntry[];
    no_damage_from: DamageRelationEntry[];
    no_damage_to: DamageRelationEntry[];
  };
};

export const POKEMON_TYPES = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
] as const;

export type PokemonType = (typeof POKEMON_TYPES)[number];

export type PokemonColor =
  | "black"
  | "blue"
  | "brown"
  | "gray"
  | "green"
  | "pink"
  | "purple"
  | "red"
  | "white"
  | "yellow";

export type PokemonSortKey = "id-asc" | "id-desc" | "name-asc" | "name-desc";
