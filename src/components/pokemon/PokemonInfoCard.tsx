import PokemonSprite from "@/components/pokemon/PokemonSprite";
import PokemonTypeBadge from "@/components/pokemon/PokemonTypeBadge";
import { Button } from "@/components/ui/8bit/button";
import { Volume2 } from "lucide-react";

import type { PokemonDetail, PokemonType } from "@/types/pokemon";
import { getPokemonSprite } from "@/utils/pokemon/getPokemonSprite";

type Props = {
  pokemon: PokemonDetail;
  isShiny: boolean;
  setIsShiny: (v: boolean) => void;
  cryUrl?: string;
  isPlaying: boolean;
  onPlayCry: () => void;
};

export function PokemonInfoCard({
  pokemon,
  isShiny,
  setIsShiny,
  cryUrl,
  isPlaying,
  onPlayCry,
}: Props) {
  return (
    <div className="retro py-8 px-6 bg-muted/5">
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        {/* Sprite */}
        <PokemonSprite
          src={getPokemonSprite(pokemon, isShiny)}
          alt={pokemon.name}
          className="h-full w-full p-8 transition-all duration-200 ease-in-out hover:-transform-y-1.5 hover:scale-110 hover:rotate-3"
          animateOnLoad
        />

        {/* Info */}
        <div className="space-y-4">
          {/* ID */}
          <p className="text-xs text-muted-foreground">
            #{pokemon.id.toString().padStart(4, "0")}
          </p>

          {/* Name */}
          <h1 className="text-3xl md:text-4xl capitalize">{pokemon.name}</h1>

          {/* Types */}
          <div className="flex flex-wrap gap-4">
            {pokemon.types.map((t) => (
              <PokemonTypeBadge
                key={t.type.name}
                type={t.type.name as PokemonType}
              />
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-8">
            <Button
              variant="outline"
              size="sm"
              className={isShiny ? "bg-yellow-400 text-yellow-800" : ""}
              onClick={() => setIsShiny(!isShiny)}
            >
              Shiny
            </Button>

            {cryUrl && (
              <Button
                variant="outline"
                size="sm"
                onClick={onPlayCry}
                disabled={isPlaying}
              >
                <Volume2 className={isPlaying ? "animate-pulse" : ""} />
                Cry
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
