import { Coords, GeoInfo } from "@/types/Location";
import * as Location from "expo-location";
import { useEffect, useState } from "react";

export function useAutoLocation() {
  const [coords, setCoords] = useState<Coords>(null);
  const [geoInfo, setGeoInfo] = useState<GeoInfo>(null);
  const [geocoding, setGeocoding] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLocation = async () => {
    setLoading(true);
    setError(null);
    setPermissionDenied(false);
    setCoords(null);
    setGeoInfo(null);

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setPermissionDenied(true);
      setLoading(false);
      return;
    }

    try {
      let result: Location.LocationObject | null = null;

      // 1. Try last known position first (instant, no GPS needed)
      try {
        result = await Location.getLastKnownPositionAsync({});
      } catch {
        result = null;
      }

      // 2. If no cached position, try getCurrentPosition with increasing accuracy
      if (!result) {
        try {
          result = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
            timeInterval: 10000,
          });
        } catch {
          // 3. Last resort: Low accuracy with longer timeout
          result = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Low,
            timeInterval: 15000,
          });
        }
      }

      const latitude = result!.coords.latitude;
      const longitude = result!.coords.longitude;
      setCoords({ latitude, longitude });

      setGeocoding(true);
      try {
        const [place] = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });
        setGeoInfo({
          city: place.city ?? place.subregion ?? place.district ?? null,
          country: place.country ?? null,
        });
      } catch {
        setGeoInfo({ city: null, country: null });
      } finally {
        setGeocoding(false);
      }
    } catch (e: any) {
      setError(e.message || "Failed to get location.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  return {
    coords,
    geoInfo,
    geocoding,
    permissionDenied,
    loading,
    error,
    fetchLocation,
  };
}
