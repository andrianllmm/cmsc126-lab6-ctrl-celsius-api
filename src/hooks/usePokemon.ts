import { getPokemon } from "@/services/pokemon";
import type { PokemonDetail, PokemonSpecies, EvolutionChain } from "@/types/pokemon";
import { useEffect, useState } from "react";

export function usePokemon(name: string) {
  const [data, setData] = useState<PokemonDetail | null>(null);
  const [species, setSpecies] = useState<PokemonSpecies | null>(null);
  const [evolution, setEvolution] = useState<EvolutionChain | null>(null);
  const [typeData, setTypeData] = useState<any[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1. Base Pokemon
        const pokemon = await getPokemon(name);
        setData(pokemon);

        // 2. Species (for description + evolution URL)
        const speciesRes = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}`
        );
        const speciesData = await speciesRes.json();
        setSpecies(speciesData);

        // 3. Evolution Chain
        const evoRes = await fetch(speciesData.evolution_chain.url);
        const evoData = await evoRes.json();
        setEvolution(evoData);

        // 4. Type Effectiveness
        const typeResponses = await Promise.all(
          pokemon.types.map((t) =>
            fetch(t.type.url).then((res) => res.json())
          )
        );
        setTypeData(typeResponses);

      } catch (err) {
        setError("Something went wrong: " + err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [name]);

  return { data, species, evolution, typeData, loading, error };
}