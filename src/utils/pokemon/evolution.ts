export type EvolutionNode = {
  species: { name: string; url: string };
  evolves_to: EvolutionNode[];
};

export const getEvolutionChain = (
  chain: EvolutionNode
): { name: string; url: string }[] => {
  const result: { name: string; url: string }[] = [];

  let current: EvolutionNode | undefined = chain;

  while (current) {
    result.push({
      name: current.species.name,
      url: current.species.url,
    });
    current = current.evolves_to?.[0];
  }

  return result;
};
