import { useState } from "react";
import { useParams } from "react-router";

import { Loading } from "@/components/ui/loading";
import NotFoundPage from "@/pages/NotFoundPage";

import { usePokemon } from "@/hooks/usePokemon";
import { PokemonStats } from "@/components/pokemon/PokemonStats";

import { PokemonHeader } from "@/components/pokemon/PokemonHeader";
import { PokemonInfoCard } from "@/components/pokemon/PokemonInfoCard";
import { PokemonMetaCard } from "@/components/pokemon/PokemonMetaCard";
import { PokemonEvolution } from "@/components/pokemon/PokemonEvolution";

import { computeRelations } from "@/utils/pokemon/relations";
import { Card } from "@/components/ui/8bit/card";
import { usePokemonCry } from "@/hooks/usePokemonCry";
import { usePokemonSpecies } from "@/hooks/usePokemonSpecies";
import { usePokemonTypeData } from "@/hooks/usePokemonTypeData";
import { usePokemonEvolution } from "@/hooks/usePokemonEvolution";

const PokemonPage = () => {
  const { name } = useParams();
  const pokemonName = name ?? "";
  const [isShiny, setIsShiny] = useState(false);

  const { data: pokemon, loading, error } = usePokemon(pokemonName);

  const { species } = usePokemonSpecies(pokemon?.name);

  const evolution = usePokemonEvolution(species?.evolution_chain?.url);

  const typeData = usePokemonTypeData(pokemon?.types);

  const cryUrl = pokemon?.cries?.latest || pokemon?.cries?.legacy;
  const { audioRef, isPlaying, playCry } = usePokemonCry(cryUrl);

  if (loading) return <Loading />;

  if (error || !pokemon) return <NotFoundPage />;

  const description = species?.flavor_text_entries
    ?.find((e) => e.language.name === "en")
    ?.flavor_text.replace(/\f/g, " ");

  const { weaknesses, strengths } = computeRelations(typeData);

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-8">
      {cryUrl && <audio ref={audioRef} src={cryUrl} />}

      <PokemonHeader id={pokemon.id} />

      <PokemonInfoCard
        pokemon={pokemon}
        isShiny={isShiny}
        setIsShiny={setIsShiny}
        cryUrl={cryUrl}
        isPlaying={isPlaying}
        onPlayCry={playCry}
      />

      <Card className="p-4 bg-muted/5 text-muted-foreground text-xs italic text-center">
        "{description}"
      </Card>

      <PokemonMetaCard
        pokemon={pokemon}
        weaknesses={weaknesses}
        strengths={strengths}
      />

      <PokemonStats pokemon={pokemon} />

      <PokemonEvolution evolutionList={evolution} />
    </div>
  );
};

export default PokemonPage;
