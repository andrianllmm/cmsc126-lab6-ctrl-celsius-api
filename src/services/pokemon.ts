import type {
  PokemonListResponse,
  PokemonDetail,
  PokemonSpecies,
} from "@/types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2";

/**
 * Fetches a list of Pokemon names and URLs.
 */
export async function getPokemonList(
  limit = 20,
  offset = 0,
  options?: RequestInit,
): Promise<PokemonListResponse> {
  const res = await fetch(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
    options,
  );

  if (!res.ok) throw new Error("Failed to fetch Pokemon list");

  return res.json();
}

/**
 * Fetches specific Pokemon data by ID or Name.
 */
export async function getPokemon(
  id: string,
  options?: RequestInit,
): Promise<PokemonDetail> {
  const res = await fetch(`${BASE_URL}/pokemon/${id}`, options);

  if (!res.ok) throw new Error("Failed to fetch Pokemon");

  return res.json();
}

/**
 * Fetches species data (like color, growth rate, etc.)
 */
export async function getPokemonSpecies(
  id: string,
  options?: RequestInit, // Added
): Promise<PokemonSpecies> {
  const res = await fetch(`${BASE_URL}/pokemon-species/${id}`, options);

  if (!res.ok) throw new Error("Failed to fetch Pokemon species");

  return res.json();
}

/**
 * Extracts color from the species request.
 */
export async function getPokemonColor(
  name: string,
  options?: RequestInit,
): Promise<string> {
  const species = await getPokemonSpecies(name, options);
  return species.color.name;
}
