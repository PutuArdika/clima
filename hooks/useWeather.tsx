import { useEffect, useState } from "react";

const API_KEY = "a5be581199134716abe104628261305"; // TODO: move to env

export type AirQuality = {
  co: number | null;
  no2: number | null;
  o3: number | null;
  so2: number | null;
  pm25: number | null;
  pm10: number | null;
  usEpaIndex: number | null;
  gbDefraIndex: number | null;
};

export type WeatherData = {
  tempC: number;
  feelsLikeC: number;
  condition: string;
  conditionIcon: string;
  humidity: number;
  windKph: number;
  windDir: string;
  isDay: boolean;
  city: string;
  country: string;
  region: string;
  localtime: string;
  lastUpdated: string;
  pm25: number | null;
  uv: number | null;
  visibilityKm: number | null;
  pressureMb: number | null;
  cloudCover: number | null;
  precipMm: number | null;
  gustKph: number | null;
  airQuality: AirQuality | null;
};

// query can be "lat,lon" or a city name like "Denpasar" or "Denpasar,Indonesia"
export function useWeather(query: string | null) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    if (!query) return;
    setLoading(true);
    setError(null);

    try {
      const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(query)}&aqi=yes`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      setWeather({
        tempC: data.current.temp_c,
        feelsLikeC: data.current.feelslike_c,
        condition: data.current.condition.text,
        conditionIcon: "https:" + data.current.condition.icon,
        humidity: data.current.humidity,
        windKph: data.current.wind_kph,
        windDir: data.current.wind_dir,
        isDay: data.current.is_day === 1,
        city: data.location.name,
        country: data.location.country,
        region: data.location.region ?? "",
        localtime: data.location.localtime ?? "",
        lastUpdated: data.current.last_updated,
        pm25: data.current.air_quality?.pm2_5 ?? null,
        uv: data.current.uv ?? null,
        visibilityKm: data.current.vis_km ?? null,
        pressureMb: data.current.pressure_mb ?? null,
        cloudCover: data.current.cloud ?? null,
        precipMm: data.current.precip_mm ?? null,
        gustKph: data.current.gust_kph ?? null,
        airQuality: data.current.air_quality
          ? {
              co: data.current.air_quality.co ?? null,
              no2: data.current.air_quality.no2 ?? null,
              o3: data.current.air_quality.o3 ?? null,
              so2: data.current.air_quality.so2 ?? null,
              pm25: data.current.air_quality.pm2_5 ?? null,
              pm10: data.current.air_quality.pm10 ?? null,
              usEpaIndex: data.current.air_quality["us-epa-index"] ?? null,
              gbDefraIndex: data.current.air_quality["gb-defra-index"] ?? null,
            }
          : null,
      });
    } catch (e: any) {
      setError(e.message || "Failed to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [query]);

  return { weather, loading, error, refetch: fetchWeather };
}
