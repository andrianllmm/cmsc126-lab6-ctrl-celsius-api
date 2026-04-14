export function getPokemonSprite(pokemon): string {
  return (
    pokemon.sprites?.versions?.["generation-v"]?.["black-white"]?.animated
      ?.front_default ??
    pokemon.sprites.front_default ??
    ""
  );
}
