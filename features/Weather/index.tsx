import { useWeather } from "@/hooks/useWeather";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  View,
} from "react-native";
import { Menu, Portal, Text } from "react-native-paper";
import WeatherCard from "../../components/WeatherCard";
import WeatherLoadingAnimation from "../../components/WeatherLoadingAnimation";
import styles from "./styles";

// Day theme
const DAY_BG = "#87CEEB";
const DAY_CARD = "rgba(255,255,255,0.35)";
const DAY_TEXT = "#0D1B2A";
const DAY_SUB = "#1E3A5F";

// Night theme
const NIGHT_BG = "#0A1628";
const NIGHT_CARD = "rgba(21,42,74,0.85)";
const NIGHT_TEXT = "#E3F2FD";
const NIGHT_SUB = "#90CAF9";

export default function WeatherScreen() {
  const { latitude, longitude, city, country } = useLocalSearchParams<{
    latitude?: string;
    longitude?: string;
    city?: string;
    country?: string;
  }>();

  // Build query: prefer lat,lon (auto); fall back to "city,country" (manual)
  const query =
    latitude && longitude
      ? `${latitude},${longitude}`
      : city && country
        ? `${city},${country}`
        : (city ?? null);

  const [menuVisible, setMenuVisible] = useState(false);
  const [aqiExpanded, setAqiExpanded] = useState(false);
  const aqiAnim = useRef(new Animated.Value(0)).current;

  const toggleAqi = () => {
    const toValue = aqiExpanded ? 0 : 1;
    setAqiExpanded(!aqiExpanded);
    Animated.spring(aqiAnim, {
      toValue,
      useNativeDriver: false,
      bounciness: 4,
    }).start();
  };

  const { weather, loading, error, refetch } = useWeather(query);

  const isDay = weather?.isDay ?? true;
  const bg = isDay ? DAY_BG : NIGHT_BG;
  const cardBg = isDay ? DAY_CARD : NIGHT_CARD;
  const textColor = isDay ? DAY_TEXT : NIGHT_TEXT;
  const subColor = isDay ? DAY_SUB : NIGHT_SUB;
  const headerTint = isDay ? "#0D1B2A" : "#E3F2FD";

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <Stack.Screen
        options={{
          headerTintColor: headerTint,
          headerTitle: weather?.city ?? "",
          headerTitleAlign: "center",
          headerTitleStyle: { color: headerTint, fontWeight: "700" },
          headerRight: () => (
            <Pressable
              onPressIn={() => setMenuVisible(true)}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              android_ripple={{
                color: "rgba(79,195,247,0.25)",
                radius: 22,
                borderless: true,
              }}
              style={{
                padding: 6,
                borderRadius: 22,
                backgroundColor: menuVisible
                  ? "rgba(79,195,247,0.18)"
                  : "transparent",
                zIndex: 999,
              }}
            >
              <MaterialCommunityIcons
                name="dots-vertical"
                size={26}
                color={headerTint}
              />
            </Pressable>
          ),
        }}
      />

      <Portal>
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={{ x: 9999, y: (StatusBar.currentHeight ?? 0) + 8 }}
          contentStyle={{ marginTop: 45 }}
        >
          <Menu.Item
            leadingIcon="cog-outline"
            onPress={() => {
              setMenuVisible(false);
            }}
            title="Settings"
          />
          <Menu.Item
            leadingIcon="information-outline"
            onPress={() => {
              setMenuVisible(false);
            }}
            title="About"
          />
        </Menu>
      </Portal>

      {/* Loading */}
      {loading && <WeatherLoadingAnimation textColor={textColor} />}

      {/* Error */}
      {!loading && error && (
        <View style={styles.centered}>
          <MaterialCommunityIcons
            name="alert-circle-outline"
            size={60}
            color="#EF5350"
          />
          <Text style={[styles.errorText, { color: textColor }]}>{error}</Text>
          <Pressable
            onPress={refetch}
            style={[styles.retryBtn, { borderColor: subColor }]}
          >
            <Text style={{ color: subColor, fontWeight: "600" }}>Retry</Text>
          </Pressable>
        </View>
      )}

      {/* Weather data */}
      {!loading && weather && (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Location */}
          <Text style={[styles.country, { color: subColor }]}>
            {weather.country}
          </Text>

          {/* Main temp */}
          <View style={styles.tempRow}>
            <Image
              source={{ uri: weather.conditionIcon }}
              style={styles.conditionIcon}
            />
            <Text style={[styles.temp, { color: textColor }]}>
              {Math.round(weather.tempC)}°C
            </Text>
          </View>
          <Text style={[styles.condition, { color: subColor }]}>
            {weather.condition}
          </Text>
          <Text style={[styles.feelsLike, { color: subColor }]}>
            Feels like {Math.round(weather.feelsLikeC)}°C
          </Text>

          {/* AQI badge — tap to expand */}
          {weather.airQuality != null && weather.pm25 != null && (
            <View style={styles.aqiWrapper}>
              <Pressable
                onPress={toggleAqi}
                style={[
                  styles.aqiBadge,
                  {
                    backgroundColor: isDay
                      ? "rgba(255,255,255,0.35)"
                      : "rgba(21,42,74,0.7)",
                    borderColor: isDay
                      ? "rgba(255,255,255,0.6)"
                      : "rgba(79,195,247,0.3)",
                  },
                ]}
              >
                <MaterialCommunityIcons
                  name="air-filter"
                  size={16}
                  color={subColor}
                />
                <Text style={[styles.aqiText, { color: textColor }]}>
                  AQI{" "}
                  <Text style={{ fontWeight: "700", color: textColor }}>
                    {Math.round(weather.pm25)}
                  </Text>
                </Text>
                <MaterialCommunityIcons
                  name={aqiExpanded ? "chevron-up" : "chevron-down"}
                  size={16}
                  color={subColor}
                />
              </Pressable>

              {/* Slide-down AQI detail table */}
              <Animated.View
                style={[
                  styles.aqiTable,
                  {
                    backgroundColor: isDay
                      ? "rgba(255,255,255,0.35)"
                      : "rgba(21,42,74,0.7)",
                    borderColor: isDay
                      ? "rgba(255,255,255,0.6)"
                      : "rgba(79,195,247,0.3)",
                    maxHeight: aqiAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 320],
                    }),
                    opacity: aqiAnim,
                    overflow: "hidden",
                  },
                ]}
              >
                {[
                  {
                    label: "PM2.5",
                    value: weather.airQuality.pm25,
                    unit: "µg/m³",
                  },
                  {
                    label: "PM10",
                    value: weather.airQuality.pm10,
                    unit: "µg/m³",
                  },
                  { label: "CO", value: weather.airQuality.co, unit: "µg/m³" },
                  {
                    label: "NO₂",
                    value: weather.airQuality.no2,
                    unit: "µg/m³",
                  },
                  { label: "O₃", value: weather.airQuality.o3, unit: "µg/m³" },
                  {
                    label: "SO₂",
                    value: weather.airQuality.so2,
                    unit: "µg/m³",
                  },
                  {
                    label: "US EPA Index",
                    value: weather.airQuality.usEpaIndex,
                    unit: "",
                  },
                  {
                    label: "GB DEFRA Index",
                    value: weather.airQuality.gbDefraIndex,
                    unit: "",
                  },
                ]
                  .filter((row) => row.value != null)
                  .map((row, i, arr) => (
                    <View
                      key={row.label}
                      style={[
                        styles.aqiRow,
                        i < arr.length - 1 && {
                          borderBottomWidth: 1,
                          borderBottomColor: isDay
                            ? "rgba(0,0,0,0.08)"
                            : "rgba(255,255,255,0.08)",
                        },
                      ]}
                    >
                      <Text style={[styles.aqiRowLabel, { color: subColor }]}>
                        {row.label}
                      </Text>
                      <Text style={[styles.aqiRowValue, { color: textColor }]}>
                        {typeof row.value === "number"
                          ? row.value % 1 === 0
                            ? row.value
                            : row.value.toFixed(2)
                          : row.value}
                        {row.unit ? ` ${row.unit}` : ""}
                      </Text>
                    </View>
                  ))}
              </Animated.View>
            </View>
          )}

          {/* Detail cards row 1 */}
          <View style={styles.cardRow}>
            <WeatherCard
              icon="water-percent"
              value={`${weather.humidity}%`}
              label="Humidity"
              cardBg={cardBg}
              textColor={textColor}
              subColor={subColor}
            />
            <WeatherCard
              icon="weather-windy"
              value={`${weather.windKph} km/h`}
              label={`Wind ${weather.windDir}`}
              cardBg={cardBg}
              textColor={textColor}
              subColor={subColor}
            />
            <WeatherCard
              icon={weather.isDay ? "weather-sunny" : "weather-night"}
              value={weather.isDay ? "Day" : "Night"}
              label="Period"
              cardBg={cardBg}
              textColor={textColor}
              subColor={subColor}
            />
          </View>

          {/* Detail cards row 2 */}
          <View style={[styles.cardRow, { marginTop: 12 }]}>
            {weather.uv != null && weather.uv !== 0 && (
              <WeatherCard
                icon="white-balance-sunny"
                value={`${weather.uv}`}
                label="UV Index"
                cardBg={cardBg}
                textColor={textColor}
                subColor={subColor}
              />
            )}
            {weather.visibilityKm != null && weather.visibilityKm !== 0 && (
              <WeatherCard
                icon="eye-outline"
                value={`${weather.visibilityKm} km`}
                label="Visibility"
                cardBg={cardBg}
                textColor={textColor}
                subColor={subColor}
              />
            )}
            {weather.pressureMb != null && weather.pressureMb !== 0 && (
              <WeatherCard
                icon="gauge"
                value={`${weather.pressureMb}`}
                label="mb"
                cardBg={cardBg}
                textColor={textColor}
                subColor={subColor}
              />
            )}
          </View>

          {/* Detail cards row 3 */}
          <View style={[styles.cardRow, { marginTop: 12 }]}>
            {weather.cloudCover != null && weather.cloudCover !== 0 && (
              <WeatherCard
                icon="cloud-outline"
                value={`${weather.cloudCover}%`}
                label="Cloud"
                cardBg={cardBg}
                textColor={textColor}
                subColor={subColor}
              />
            )}
            {weather.precipMm != null && weather.precipMm !== 0 && (
              <WeatherCard
                icon="weather-rainy"
                value={`${weather.precipMm} mm`}
                label="Precip"
                cardBg={cardBg}
                textColor={textColor}
                subColor={subColor}
              />
            )}
            {weather.gustKph != null && weather.gustKph !== 0 && (
              <WeatherCard
                icon="weather-tornado"
                value={`${weather.gustKph} km/h`}
                label="Gust"
                cardBg={cardBg}
                textColor={textColor}
                subColor={subColor}
              />
            )}
          </View>

          {/* Region & local time */}
          {(weather.region !== "" || weather.localtime !== "") && (
            <View
              style={[
                styles.infoRow,
                {
                  backgroundColor: cardBg,
                  borderColor: isDay
                    ? "rgba(255,255,255,0.4)"
                    : "rgba(79,195,247,0.2)",
                },
              ]}
            >
              {weather.region !== "" && (
                <View style={styles.infoItem}>
                  <MaterialCommunityIcons
                    name="map-marker-outline"
                    size={16}
                    color={subColor}
                  />
                  <Text style={[styles.infoText, { color: subColor }]}>
                    {weather.region}
                  </Text>
                </View>
              )}
              {weather.localtime !== "" && (
                <View style={styles.infoItem}>
                  <MaterialCommunityIcons
                    name="clock-outline"
                    size={16}
                    color={subColor}
                  />
                  <Text style={[styles.infoText, { color: subColor }]}>
                    Local {weather.localtime.split(" ")[1]}
                  </Text>
                </View>
              )}
            </View>
          )}

          <Text style={[styles.updated, { color: subColor }]}>
            Updated:{" "}
            {new Date(weather.lastUpdated.replace(" ", "T")).toLocaleString(
              undefined,
              {
                dateStyle: "medium",
                timeStyle: "short",
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
              },
            )}
          </Text>

          {/* Powered by WeatherAPI */}
          <View style={styles.poweredRow}>
            <Text style={[styles.poweredText, { color: subColor }]}>
              Powered by
            </Text>
            <Image
              source={require("@/assets/images/weatherapi_logo.webp")}
              style={styles.poweredLogo}
              resizeMode="contain"
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
}
