import AutoLocation from "@/app/components/AutoLocation";
import ManualLocation from "@/app/components/ManualLocation";
import { useThemeConfig } from "@/app/context/ThemeContext";
import { Stack, useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function LocationScreen() {
  const { type } = useLocalSearchParams<{ type: string }>();
  const { headerBg, bodyBg } = useThemeConfig();

  return (
    <View style={{ flex: 1, backgroundColor: bodyBg }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: headerBg },
          headerTintColor: "#E3F2FD",
          headerTitleStyle: { color: "#E3F2FD" },
        }}
      />
      {type === "manual" ? <ManualLocation /> : <AutoLocation />}
    </View>
  );
}
