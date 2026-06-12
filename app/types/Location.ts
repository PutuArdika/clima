export type Country = {
  name: string;
  flag: string;
  iso2: string;
  iso3: string;
};

export type Coords = {
  latitude: number;
  longitude: number;
} | null;

export type GeoInfo = {
  city: string | null;
  country: string | null;
} | null;
