import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StatusBar } from "react-native";
import { Menu, Portal } from "react-native-paper";

export default function AppHeaderMenu() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Pressable
        onPressIn={() => setVisible(true)}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        style={{
          padding: 6,
          borderRadius: 22,
          backgroundColor: visible ? "rgba(79,195,247,0.18)" : "transparent",
          marginRight: 4,
        }}
      >
        <MaterialCommunityIcons
          name="dots-vertical"
          size={26}
          color="#E3F2FD"
        />
      </Pressable>

      <Portal>
        <Menu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={{ x: 9999, y: (StatusBar.currentHeight ?? 0) + 8 }}
          contentStyle={{ marginTop: 45 }}
        >
          <Menu.Item
            leadingIcon="tune-variant"
            title="Configuration"
            onPress={() => {
              setVisible(false);
              router.push("/configuration");
            }}
          />
          <Menu.Item
            leadingIcon="information-outline"
            title="About"
            onPress={() => {
              setVisible(false);
              router.push("/about");
            }}
          />
        </Menu>
      </Portal>
    </>
  );
}
