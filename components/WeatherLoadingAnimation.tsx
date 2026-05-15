import CloudShape from "@/components/CloudShape";
import { getLocation } from "@/hooks/useAnimation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Animated, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

type Props = {
  message?: string;
  textColor: string;
};

export default function WeatherLoadingAnimation({
  message = "Fetching weather data...",
  textColor,
}: Props) {
  const { sun, cloud1, cloud2, cloud3 } = getLocation();

  return (
    <View style={styles.wrapper}>
      <View style={styles.skyBox}>
        <View style={styles.sunWrapper}>
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
        </View>
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
      </View>

      <Text style={[styles.message, { color: textColor }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 20,
  },
  skyBox: {
    width: "100%",
    height: 180,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: "rgba(13,43,78,0.55)",
    borderRadius: 20,
    overflow: "hidden",
  },
  sunWrapper: {
    position: "absolute",
    alignSelf: "center",
    top: 40,
    backgroundColor: "transparent",
    zIndex: 0,
  },
  cloud: {
    position: "absolute",
    backgroundColor: "transparent",
    zIndex: 1,
  },
  message: {
    fontSize: 14,
    textAlign: "center",
  },
});
