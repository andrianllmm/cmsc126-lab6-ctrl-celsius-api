const BASE_URL = "https://pokeapi.co/api/v2";

export async function getPokemonList(limit = 20, offset = 0) {
  const res = await fetch(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
  );
  return res.json();
}

export async function getPokemon(id: string) {
  const res = await fetch(`${BASE_URL}/pokemon/${id}`);
  return res.json();
}
