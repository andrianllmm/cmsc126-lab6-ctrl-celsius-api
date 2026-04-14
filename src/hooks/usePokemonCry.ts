import { useRef, useState } from "react";

export function usePokemonCry(cryUrl?: string) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playCry = () => {
    if (!audioRef.current || !cryUrl) return;

    audioRef.current.currentTime = 0;
    audioRef.current.play();
    setIsPlaying(true);
  };

  const onEnded = () => setIsPlaying(false);

  return {
    audioRef,
    isPlaying,
    playCry,
    onEnded,
  };
}
