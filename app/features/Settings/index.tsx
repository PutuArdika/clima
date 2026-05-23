import { useSettings } from "@/app/context/SettingsContext";
import { useThemeConfig } from "@/app/context/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { ScrollView, Switch, Text, View } from "react-native";
import styles, { ACCENT, TEXT_COLOR } from "./styles";

const SUB_COLOR = "#90CAF9";

type SettingRowProps = {
  icon: string;
  label: string;
  leftLabel: string;
  rightLabel: string;
  /** true = right option active, false = left option active */
  value: boolean;
  onToggle: (v: boolean) => void;
};

function SettingRow({
  icon,
  label,
  leftLabel,
  rightLabel,
  value,
  onToggle,
}: SettingRowProps) {
  return (
    <View style={styles.row}>
      {/* Row 1: Icon + label */}
      <View style={styles.rowTop}>
        <MaterialCommunityIcons
          name={icon as any}
          size={20}
          color={SUB_COLOR}
        />
        <Text style={styles.rowLabel}>{label}</Text>
      </View>

      {/* Row 2: Left option — Switch — Right option */}
      <View style={styles.switchGroup}>
        <Text style={[styles.unitLabel, !value && styles.unitLabelActive]}>
          {leftLabel}
        </Text>
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ false: ACCENT, true: ACCENT }}
          thumbColor={TEXT_COLOR}
          ios_backgroundColor={ACCENT}
          style={{ marginHorizontal: 6, alignSelf: "center" }}
        />
        <Text style={[styles.unitLabel, value && styles.unitLabelActive]}>
          {rightLabel}
        </Text>
      </View>
    </View>
  );
}

export default function SettingsScreen() {
  const {
    tempUnit,
    windUnit,
    pressureUnit,
    setTempUnit,
    setWindUnit,
    setPressureUnit,
  } = useSettings();

  const { headerBg, bodyBg } = useThemeConfig();

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: bodyBg }]}
      contentContainerStyle={styles.content}
    >
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: headerBg },
          headerTintColor: "#E3F2FD",
          headerTitleStyle: { color: "#E3F2FD" },
        }}
      />

      <Text style={styles.sectionTitle}>Units</Text>

      <SettingRow
        icon="thermometer"
        label="Temperature"
        leftLabel="Celsius (°C)"
        rightLabel="Fahrenheit (°F)"
        value={tempUnit === "F"}
        onToggle={(v) => setTempUnit(v ? "F" : "C")}
      />
      <SettingRow
        icon="weather-windy"
        label="Wind Speed"
        leftLabel="Kilometers per hour (km/h)"
        rightLabel="Miles per hour (mph)"
        value={windUnit === "mph"}
        onToggle={(v) => setWindUnit(v ? "mph" : "kph")}
      />
      <SettingRow
        icon="gauge"
        label="Air Pressure"
        leftLabel="Millibars (mb)"
        rightLabel="Inches of Mercury (inHg)"
        value={pressureUnit === "in"}
        onToggle={(v) => setPressureUnit(v ? "in" : "mb")}
      />
    </ScrollView>
  );
}
