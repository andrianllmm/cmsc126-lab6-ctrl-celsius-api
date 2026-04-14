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

  types: {
    type: {
      name: PokemonType;
    };
  }[];

  abilities: {
    ability: {
      name: string;
    };
  }[];

  sprites: {
    front_default: string | null;
  };
}

export interface PokemonSpecies {
  color: {
    name: string;
    url: string;
  };
}

export interface PokemonWithColor {
  pokemon: PokemonDetail;
  color: string;
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
