"use client";

import { useState, useRef } from "react";
import { Link, useParams } from "react-router"; 
import { ChevronLeft, ChevronRight, Volume2, Sparkles } from "lucide-react";

import PokemonSprite from "@/components/pokemon/PokemonSprite";
import PokemonTypeBadge from "@/components/pokemon/PokemonTypeBadge";
import { Button } from "@/components/ui/8bit/button";
import { Card, CardContent } from "@/components/ui/8bit/card";
import { Loading } from "@/components/ui/loading";
import NotFoundPage from "@/pages/NotFoundPage";

import { usePokemon } from "@/hooks/usePokemon";
import { getPokemonSprite } from "@/utils/getPokemonSprite";
import type { PokemonType } from "@/types/pokemon";

const STAT_MAX = 255;

const PokemonPage = () => {
  const { name } = useParams();
  const pokemonName = name ?? "";
  
  const [isShiny, setIsShiny] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<"info" | "stats">("info");
  const audioRef = useRef<HTMLAudioElement>(null);

  const { data: pokemon, loading, error } = usePokemon(pokemonName);

  if (loading) return <Loading />;
  if (error || !pokemon) return <NotFoundPage />;

  const cryUrl = pokemon.cries?.latest || pokemon.cries?.legacy;

  const playCry = () => {
    if (audioRef.current && cryUrl) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-8">
      {cryUrl && <audio ref={audioRef} src={cryUrl} onEnded={() => setIsPlaying(false)} />}
      
      <div className="flex justify-between items-center">
        <Button asChild variant="outline" size="sm">
          <Link to="/">Back to Pokedex</Link>
        </Button>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="icon" disabled={pokemon.id <= 1}>
            <Link to={`/pokemon/${pokemon.id - 1}`}><ChevronLeft className="h-4 w-4" /></Link>
          </Button>
          <Button asChild variant="outline" size="icon">
            <Link to={`/pokemon/${pokemon.id + 1}`}><ChevronRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="p-6 border-b bg-muted/5">
          <div className="grid gap-8 md:grid-cols-[220px_1fr] md:items-center">
            <div className="relative flex justify-center rounded-xl bg-white/50 p-6 border-2 border-dashed">
              <PokemonSprite
                src={getPokemonSprite(pokemon, isShiny)}
                alt={pokemon.name}
                className="h-40 w-40 drop-shadow-md"
              />
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-mono text-muted-foreground">#{pokemon.id.toString().padStart(4, "0")}</p>
                <h1 className="text-4xl font-bold capitalize">{pokemon.name}</h1>
              </div>

              <div className="flex flex-wrap gap-2">
                {pokemon.types.map((entry) => (
                  <PokemonTypeBadge key={entry.type.name} type={entry.type.name as PokemonType} />
                ))}
              </div>

              <div className="flex gap-3">
                <Button variant="outline" size="sm" onClick={() => setIsShiny(!isShiny)}>
                  <Sparkles className={`mr-2 h-4 w-4 ${isShiny ? "text-yellow-500" : ""}`} /> Shiny
                </Button>
                {cryUrl && (
                  <Button variant="outline" size="sm" onClick={playCry} disabled={isPlaying}>
                    <Volume2 className={`mr-2 h-4 w-4 ${isPlaying ? "animate-pulse" : ""}`} /> Cry
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <CardContent className="p-0">
          <div className="flex border-b">
            {(["info", "stats"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-sm font-bold uppercase transition-all ${
                  activeTab === tab ? "bg-muted border-b-2 border-primary" : "text-muted-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === "info" && (
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Abilities</p>
                  <div className="flex flex-wrap gap-2">
                    {pokemon.abilities.map((a) => (
                      <span key={a.ability.name} className="px-2 py-1 border rounded text-xs capitalize bg-muted/20">
                        {a.ability.name.replace("-", " ")}
                        {a.is_hidden && <span className="ml-1 opacity-50 text-[8px]">(HIDDEN)</span>}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 border rounded-lg bg-muted/5">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold">Height</p>
                    <p className="font-bold text-lg">{pokemon.height / 10}m</p>
                  </div>
                  <div className="p-3 border rounded-lg bg-muted/5">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold">Weight</p>
                    <p className="font-bold text-lg">{pokemon.weight / 10}kg</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "stats" && (
              <div className="space-y-4">
                {pokemon.stats.map((s) => (
                  <div key={s.stat.name} className="flex items-center gap-4">
                    <span className="w-28 text-right text-[10px] font-bold uppercase text-muted-foreground">
                      {s.stat.name.replace("-", " ")}
                    </span>
                    <span className="w-8 font-mono text-sm font-bold">{s.base_stat}</span>
                    <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden border">
                      <div 
                        className="h-full bg-primary transition-all duration-700 ease-out" 
                        style={{ width: `${(s.base_stat / STAT_MAX) * 100}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PokemonPage;