import type {
  PokemonListResponse,
  PokemonDetail,
  PokemonSpecies,
} from "@/types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2";

export async function getPokemonList(
  limit = 20,
  offset = 0,
): Promise<PokemonListResponse> {
  const res = await fetch(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
  );

  if (!res.ok) throw new Error("Failed to fetch Pokemon list");

  return res.json();
}

export async function getPokemon(id: string): Promise<PokemonDetail> {
  const res = await fetch(`${BASE_URL}/pokemon/${id}`);

  if (!res.ok) throw new Error("Failed to fetch Pokemon");

  return res.json();
}

export async function getPokemonSpecies(id: string): Promise<PokemonSpecies> {
  const res = await fetch(`${BASE_URL}/pokemon-species/${id}`);

  if (!res.ok) throw new Error("Failed to fetch Pokemon species");

  return res.json();
}

export async function getPokemonColor(name: string): Promise<string> {
  const species = await getPokemonSpecies(name);
  const color = species.color.name;

  return color;
}
