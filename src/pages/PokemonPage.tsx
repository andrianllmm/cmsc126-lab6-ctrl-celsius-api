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

interface DamageRelationEntry { name: string; url: string; }
interface TypeData {
  damage_relations: {
    double_damage_from: DamageRelationEntry[];
    double_damage_to: DamageRelationEntry[];
  };
}
type EvolutionNode = {
  species: { name: string; url: string; };
  evolves_to: EvolutionNode[];
};

const PokemonPage = () => {
  const { name } = useParams();
  const pokemonName = name ?? "";
  
  const [isShiny, setIsShiny] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<"stats" | "evolution">("stats");
  const audioRef = useRef<HTMLAudioElement>(null);

  const { data: pokemon, species, evolution, typeData, loading, error } = usePokemon(pokemonName);

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

  const description = species?.flavor_text_entries
    ?.find((entry) => entry.language.name === "en")
    ?.flavor_text.replace(/\f/g, " ");

  const weaknesses = new Set<string>();
  const strengths = new Set<string>();

  (typeData as TypeData[] | undefined)?.forEach((type) => {
    type.damage_relations.double_damage_from.forEach((t) => weaknesses.add(t.name));
    type.damage_relations.double_damage_to.forEach((t) => strengths.add(t.name));
  });

  const getIdFromUrl = (url: string): string => url.split("/").filter(Boolean).pop() || "";

  const getEvolutionChain = (chain: EvolutionNode): { name: string; url: string }[] => {
    const result: { name: string; url: string }[] = [];
    let current: EvolutionNode | undefined = chain;
    while (current) {
      result.push({ name: current.species.name, url: current.species.url });
      current = current.evolves_to?.[0]; 
    }
    return result;
  };

  const evolutionList = evolution ? getEvolutionChain(evolution.chain) : [];

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-8">
      {cryUrl && <audio ref={audioRef} src={cryUrl} onEnded={() => setIsPlaying(false)} />}
      
      {/* 1. TOP NAV */}
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

      {/* 2. MAIN CARD */}
      <Card className="overflow-hidden">
        <div className="p-6 bg-muted/5">
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
      </Card>

      {/* 3. FLAVOR TEXT (Moved Above Info) */}
      {description && (
        <Card className="p-4 bg-muted/5 text-sm leading-relaxed text-center italic border-dashed border-2">
          "{description}"
        </Card>
      )}

      {/* 4. INFO SECTION (Abilities, Height, Weight, Weaknesses) */}
      <Card className="p-6">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Abilities</p>
              <div className="flex flex-wrap gap-2">
                {pokemon.abilities.map((a) => (
                  <span key={a.ability.name} className="px-3 py-1 border rounded text-xs capitalize bg-muted/20">
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

          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-bold uppercase text-muted-foreground mb-2">Weaknesses</p>
              <div className="flex flex-wrap gap-2">
                {[...weaknesses].map((w) => (
                  <PokemonTypeBadge key={w} type={w as PokemonType} />
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase text-muted-foreground mb-2">Strong Against</p>
              <div className="flex flex-wrap gap-2">
                {[...strengths].map((s) => (
                  <PokemonTypeBadge key={s} type={s as PokemonType} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* 5. TABBED CONTAINER (Stats and Evolution) */}
      <Card>
        <CardContent className="p-0">
          <div className="flex border-b">
            {(["stats", "evolution"] as const).map((tab) => (
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

            {activeTab === "evolution" && (
              <div className="flex items-center justify-center gap-6 flex-wrap py-4">
                {evolutionList.map((p, index) => {
                  const id = getIdFromUrl(p.url);
                  return (
                    <div key={p.name} className="flex items-center gap-4">
                      <Link to={`/pokemon/${p.name}`} className="text-center group">
                        <div className="rounded-full bg-muted/20 p-2 group-hover:bg-muted/40 transition-colors">
                          <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                            alt={p.name}
                            className="w-20 h-20 mx-auto"
                          />
                        </div>
                        <p className="text-sm font-bold capitalize mt-2">{p.name}</p>
                      </Link>
                      {index < evolutionList.length - 1 && (
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PokemonPage;