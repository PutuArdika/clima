import { Audio } from "expo-av";
import { useEffect, useRef } from "react";

const soundFiles: Record<string, any> = {
  thunder: require("@/assets/sounds/thunder.mp3"),
  rain: require("@/assets/sounds/rain.mp3"),
  snow: require("@/assets/sounds/snow.mp3"),
  wind: require("@/assets/sounds/wind.mp3"),
  sunny: require("@/assets/sounds/sunny.mp3"),
};

function getSoundKey(condition: string): string {
  const lower = condition.toLowerCase();
  if (/thunder|thundery/.test(lower)) return "thunder";
  if (/snow|blizzard|ice pellet/.test(lower)) return "snow";
  if (/drizzle|rain|sleet|freezing/.test(lower)) return "rain";
  if (/wind|gale/.test(lower)) return "wind";
  return "sunny";
}

export function useWeatherSound(condition: string | undefined) {
  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    if (!condition) return;

    const key = getSoundKey(condition);
    let isMounted = true;

    const loadAndPlay = async () => {
      try {
        // Unload previous sound
        if (soundRef.current) {
          await soundRef.current.stopAsync();
          await soundRef.current.unloadAsync();
          soundRef.current = null;
        }

        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          staysActiveInBackground: false,
        });

        const { sound } = await Audio.Sound.createAsync(soundFiles[key], {
          isLooping: true,
          volume: 0.35,
          shouldPlay: true,
        });

        if (!isMounted) {
          await sound.unloadAsync();
          return;
        }

        soundRef.current = sound;
      } catch (err) {
        console.warn("useWeatherSound error:", err);
      }
    };

    loadAndPlay();

    return () => {
      isMounted = false;
      if (soundRef.current) {
        soundRef.current.stopAsync().then(() => {
          soundRef.current?.unloadAsync();
          soundRef.current = null;
        });
      }
    };
  }, [condition]);
}
