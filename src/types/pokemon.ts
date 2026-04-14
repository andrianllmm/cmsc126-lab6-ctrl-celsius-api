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

// --- ADDED FOR EVOLUTION AND INFO ---

export interface PokemonSpecies {
  flavor_text_entries: { flavor_text: string; language: { name: string } }[];
  genera: { genus: string; language: { name: string } }[];
  evolution_chain: { url: string };
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

export type PokemonType =
  | "normal" | "fire" | "water" | "electric" | "grass" | "ice"
  | "fighting" | "poison" | "ground" | "flying" | "psychic"
  | "bug" | "rock" | "ghost" | "dragon" | "dark" | "steel" | "fairy";