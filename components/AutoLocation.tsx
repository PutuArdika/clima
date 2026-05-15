import CloudShape from "@/components/CloudShape";
import LocationInfo from "@/components/info";
import LocationMap from "@/components/maps";
import { View } from "@/components/Themed";
import styles from "@/features/Location/styles";
import { getLocation } from "@/hooks/useAnimation";
import { useAutoLocation } from "@/hooks/useAutoLocation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Animated, View as RNView } from "react-native";
import { ActivityIndicator, Button, Text } from "react-native-paper";

export default function AutoLocation() {
  const router = useRouter();
  const { sun, cloud1, cloud2, cloud3 } = getLocation();
  const {
    coords,
    geoInfo,
    geocoding,
    permissionDenied,
    loading,
    error,
    fetchLocation,
  } = useAutoLocation();

  const showAnimation = loading || (!coords && !permissionDenied && !error);

  return (
    <View style={styles.container}>
      {showAnimation && (
        <RNView style={styles.skyBox}>
          <RNView style={styles.sunWrapper}>
            <Animated.View
              style={{
                transform: [{ scale: sun.scale }, { rotate: sun.rotation }],
              }}
            >
              <MaterialCommunityIcons
                name="weather-sunny"
                size={90}
                color="#FFD700"
              />
            </Animated.View>
          </RNView>
          <Animated.View
            style={[
              styles.cloud,
              {
                top: 10,
                transform: [
                  { translateX: cloud1.translateX },
                  { translateY: cloud1.translateY },
                ],
              },
            ]}
          >
            <CloudShape size={70} />
          </Animated.View>
          <Animated.View
            style={[
              styles.cloud,
              {
                top: 30,
                transform: [
                  { translateX: cloud2.translateX },
                  { translateY: cloud2.translateY },
                ],
              },
            ]}
          >
            <CloudShape size={50} />
          </Animated.View>
          <Animated.View
            style={[
              styles.cloud,
              {
                top: 55,
                transform: [
                  { translateX: cloud3.translateX },
                  { translateY: cloud3.translateY },
                ],
              },
            ]}
          >
            <CloudShape size={60} />
          </Animated.View>
        </RNView>
      )}

      {loading && (
        <>
          <ActivityIndicator animating size="large" style={styles.spinner} />
          <Text variant="bodyMedium" style={styles.subtitle}>
            Detecting your location...
          </Text>
        </>
      )}

      {!loading && permissionDenied && (
        <>
          <MaterialCommunityIcons
            name="map-marker-off"
            size={60}
            color="#EF5350"
            style={styles.icon}
          />
          <Text variant="headlineSmall" style={styles.title}>
            Permission Denied
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Location permission is required to use this feature.
          </Text>
          <Button
            mode="contained"
            onPress={fetchLocation}
            style={styles.button}
          >
            Grant Permission
          </Button>
        </>
      )}

      {!loading && error && (
        <>
          <MaterialCommunityIcons
            name="alert-circle-outline"
            size={60}
            color="#EF5350"
            style={styles.icon}
          />
          <Text variant="headlineSmall" style={styles.title}>
            Something went wrong
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            {error}
          </Text>
          <Button
            mode="contained"
            onPress={fetchLocation}
            style={styles.button}
          >
            Retry
          </Button>
        </>
      )}

      {!loading && coords && (
        <>
          <MaterialCommunityIcons
            name="map-marker-check"
            size={60}
            color="#43A047"
            style={styles.icon}
          />
          <Text variant="headlineMedium" style={styles.title}>
            Location Found
          </Text>
          <LocationMap
            latitude={coords.latitude}
            longitude={coords.longitude}
          />
          <LocationInfo geoInfo={geoInfo} geocoding={geocoding} />
          <Button
            mode="contained"
            style={styles.button}
            icon="weather-partly-cloudy"
            onPress={() =>
              router.push({
                pathname: "/weather" as any,
                params: {
                  latitude: coords.latitude,
                  longitude: coords.longitude,
                },
              })
            }
          >
            Get Weather Information
          </Button>
        </>
      )}
    </View>
  );
}
