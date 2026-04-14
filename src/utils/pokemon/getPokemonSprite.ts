export function getPokemonSprite(pokemon, shiny: boolean = false): string {
  const spriteType = shiny ? 'front_shiny' : 'front_default';

  return (
    pokemon.sprites?.versions?.['generation-v']?.['black-white']?.animated?.[
      spriteType
    ] ??
    pokemon.sprites[spriteType] ??
    ''
  );
}
