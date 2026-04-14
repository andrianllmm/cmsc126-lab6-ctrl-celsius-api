import { useRef, useState, useEffect } from "react";

export function usePokemonCry(cryUrl?: string) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Sync playback with cryUrl changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !cryUrl) return;

    // Define event handlers to sync state with reality
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handlePause);

    // Trigger the side effect
    audio.currentTime = 0;
    audio.play().catch((err) => {
      // Browsers often block autoplay until a user interaction occurs
      console.warn("Autoplay blocked or interrupted:", err);
    });

    // Cleanup subscriptions
    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handlePause);
    };
  }, [cryUrl]);

  // Manual play function
  const playCry = () => {
    audioRef.current?.play();
  };

  return {
    audioRef,
    isPlaying,
    playCry,
  };
}
