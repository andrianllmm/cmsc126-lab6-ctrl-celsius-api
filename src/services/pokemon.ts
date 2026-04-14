import type { PokemonListResponse, PokemonDetail } from "@/types/pokemon";

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
