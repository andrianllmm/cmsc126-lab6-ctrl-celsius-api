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
  height: number; // Added: pokeapi returns height in decimetres
  weight: number; // Added: pokeapi returns weight in hectograms
  
  types: {
    slot: number;
    type: {
      name: PokemonType;
      url: string;
    };
  }[];

  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean; // Added: helps identify hidden abilities
    slot: number;
  }[];

  stats: { // Added: required for the Stats tab
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];

  sprites: {
    front_default: string | null;
    front_shiny: string | null; // Added: required for shiny toggle
    versions?: { // Added: required for your getPokemonSprite utility
      "generation-v"?: {
        "black-white"?: {
          animated?: {
            front_default?: string;
            front_shiny?: string;
          };
        };
      };
    };
  };

  cries?: { // Added: New PokeAPI feature for audio
    latest: string;
    legacy: string;
  };
}

export type PokemonType =
  | "normal"
  | "fire"
  | "water"
  | "electric"
  | "grass"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "dragon"
  | "dark"
  | "steel"
  | "fairy";