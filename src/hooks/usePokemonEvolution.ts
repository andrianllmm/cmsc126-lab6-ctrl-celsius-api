import { useEffect, useState } from "react";
import { getEvolutionChain } from "@/utils/pokemon/evolution";

export function usePokemonEvolution(evolutionUrl?: string) {
  const [evolution, setEvolution] = useState<{ name: string; url: string }[]>(
    [],
  );

  useEffect(() => {
    if (!evolutionUrl) return;

    (async () => {
      const res = await fetch(evolutionUrl).then((r) => r.json());
      const chain = getEvolutionChain(res.chain);

      setEvolution(chain);
    })();
  }, [evolutionUrl]);

  return evolution;
}
