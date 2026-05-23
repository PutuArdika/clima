import { useThemeConfig } from "@/app/context/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { Stack } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import styles from "./styles";

export default function AboutScreen() {
  const { headerBg, bodyBg } = useThemeConfig();

  return (
    <View style={[styles.container, { backgroundColor: bodyBg }]}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: headerBg },
          headerTintColor: "#E3F2FD",
          headerTitleStyle: { color: "#E3F2FD" },
        }}
      />

      {/* Version */}
      <Text style={styles.version}>Version 1.0.0</Text>

      {/* App icon */}
      <Image
        source={require("@/assets/images/clima-icon.png")}
        style={styles.icon}
        resizeMode="contain"
      />

      {/* Author */}
      <Text style={styles.author}>By Putu Ardika Ardana</Text>

      {/* Email */}
      <Pressable onPress={() => Linking.openURL("mailto:putuaa@gmail.com")}>
        <Text style={styles.email}>putuaa@gmail.com</Text>
      </Pressable>

      {/* Social links */}
      <View style={styles.socialRow}>
        <Pressable
          style={styles.socialBtn}
          onPress={() => Linking.openURL("https://www.instagram.com/putaw007")}
        >
          <MaterialCommunityIcons name="instagram" size={24} color="#E1306C" />
          <Text style={styles.socialLabel}>@putaw007</Text>
        </Pressable>

        <Pressable
          style={styles.socialBtn}
          onPress={() =>
            Linking.openURL("https://www.linkedin.com/in/putu-ardika-7750524b/")
          }
        >
          <MaterialCommunityIcons name="linkedin" size={24} color="#0A66C2" />
          <Text style={styles.socialLabel}>LinkedIn</Text>
        </Pressable>
      </View>
    </View>
  );
}
