import { POKEMON_TYPES, type PokemonTypeData } from "@/types/pokemon";

export const computeRelations = (typeData?: PokemonTypeData[]) => {
  const effectiveness: Record<string, number> = {};

  POKEMON_TYPES.forEach((t) => {
    effectiveness[t] = 1;
  });

  typeData?.forEach((type) => {
    type.damage_relations.double_damage_from.forEach(
      (t) => (effectiveness[t.name] *= 2),
    );

    type.damage_relations.half_damage_from.forEach(
      (t) => (effectiveness[t.name] *= 0.5),
    );

    type.damage_relations.no_damage_from.forEach(
      (t) => (effectiveness[t.name] = 0),
    );
  });

  const weaknesses = Object.entries(effectiveness)
    .filter(([, value]) => value > 1)
    .map(([name]) => name);

  const strengths = new Set<string>();

  typeData?.forEach((type) => {
    type.damage_relations.double_damage_to.forEach((t) =>
      strengths.add(t.name),
    );
  });

  return {
    weaknesses,
    strengths: Array.from(strengths),
    effectiveness, // optional but VERY useful for future UI
  };
};
