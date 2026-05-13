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

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setPermissionDenied(true);
      setLoading(false);
      return;
    }

    try {
      const result = await Promise.race([
        new Promise<Location.LocationObject>((resolve, reject) => {
          Location.getLastKnownPositionAsync({})
            .then((last) => {
              if (last) {
                resolve(last);
              } else {
                Location.getCurrentPositionAsync({
                  accuracy: Location.Accuracy.Low,
                })
                  .then(resolve)
                  .catch(reject);
              }
            })
            .catch(() => {
              Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Low,
              })
                .then(resolve)
                .catch(reject);
            });
        }),
        new Promise<never>((_, reject) =>
          setTimeout(
            () =>
              reject(
                new Error(
                  "Location request timed out. Make sure your device/emulator has location enabled.",
                ),
              ),
            15000,
          ),
        ),
      ]);

      const latitude = result.coords.latitude;
      const longitude = result.coords.longitude;
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
