import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { Stack } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "About" }} />

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0A1628",
    paddingHorizontal: 24,
    gap: 12,
  },
  version: {
    color: "#90CAF9",
    fontSize: 14,
    fontWeight: "500",
    marginTop: -6,
  },
  icon: {
    width: 110,
    height: 110,
    marginVertical: 8,
    borderRadius: 24,
  },
  author: {
    color: "#E3F2FD",
    fontSize: 16,
    fontWeight: "600",
  },
  email: {
    color: "#90CAF9",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  socialRow: {
    flexDirection: "row",
    gap: 20,
    marginTop: 4,
  },
  socialBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.07)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  socialLabel: {
    color: "#E3F2FD",
    fontSize: 13,
    fontWeight: "500",
  },
});
