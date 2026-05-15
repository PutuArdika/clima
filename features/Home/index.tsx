import { View } from "@/components/Themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, Dialog, IconButton, Portal, Text } from "react-native-paper";
import styles from "./styles";

export default function HomeScreen() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const handleAutoDetect = () => {
    hideDialog();
    router.push("/location?type=auto");
  };

  const handleManualEntry = () => {
    hideDialog();
    router.push("/location?type=manual");
  };

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="weather-cloudy"
        size={100}
        color="#4FC3F7"
      />
      <Text variant="headlineMedium" style={styles.title}>
        Clima Weather App
      </Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        Get real-time weather information based on your location
      </Text>
      <Button
        mode="contained"
        onPress={showDialog}
        style={styles.button}
        icon="weather-partly-cloudy"
      >
        Get Weather Info
      </Button>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Location</Dialog.Title>
          <IconButton
            icon="close"
            size={20}
            onPress={hideDialog}
            style={{ position: "absolute", top: 8, right: 8 }}
          />
          <Dialog.Content>
            <Text>
              Would you like to auto-detect your location or enter it manually?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleAutoDetect}>Auto Detect</Button>
            <Button onPress={handleManualEntry}>Enter Manually</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
