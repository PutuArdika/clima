import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

type GeoInfo = {
  city: string | null;
  country: string | null;
} | null;

type Props = {
  geoInfo: GeoInfo;
  geocoding: boolean;
};

export default function LocationInfo({ geoInfo, geocoding }: Props) {
  return (
    <View style={styles.coordsBox}>
      {geocoding ? (
        <ActivityIndicator animating size="small" />
      ) : geoInfo ? (
        <>
          {geoInfo.city && (
            <Text variant="bodyLarge" style={styles.coordText}>
              🏙️ City: {geoInfo.city}
            </Text>
          )}
          {geoInfo.country && (
            <Text variant="bodyLarge" style={styles.coordText}>
              🌍 Country: {geoInfo.country}
            </Text>
          )}
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  coordsBox: {
    marginTop: 16,
    padding: 20,
    backgroundColor: "#E3F2FD",
    borderRadius: 16,
    width: "100%",
    alignItems: "center",
    gap: 8,
  },
  coordText: {
    fontWeight: "600",
    color: "#1565C0",
  },
});
