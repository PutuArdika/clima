export type Country = {
  name: { common: string };
  flags: { png: string };
};

export type Coords = {
  latitude: number;
  longitude: number;
} | null;

export type GeoInfo = {
  city: string | null;
  country: string | null;
} | null;
