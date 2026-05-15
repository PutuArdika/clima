import Colors from "@/constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Theme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { MD3DarkTheme, PaperProvider } from "react-native-paper";
import "react-native-reanimated";

const NavDarkBlueTheme: Theme = {
  dark: true,
  colors: {
    primary: Colors.accent,
    background: Colors.navy,
    card: Colors.surface,
    text: Colors.textPrimary,
    border: Colors.surfaceLight,
    notification: Colors.accent,
  },
  fonts: {
    regular: { fontFamily: "System", fontWeight: "400" },
    medium: { fontFamily: "System", fontWeight: "500" },
    bold: { fontFamily: "System", fontWeight: "700" },
    heavy: { fontFamily: "System", fontWeight: "900" },
  },
};

const PaperDarkBlueTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: Colors.accent,
    onPrimary: Colors.navy,
    primaryContainer: Colors.surfaceLight,
    secondary: Colors.accentDark,
    background: Colors.navy,
    surface: Colors.surface,
    surfaceVariant: Colors.surfaceLight,
    onSurface: Colors.textPrimary,
    onSurfaceVariant: Colors.textSecondary,
    outline: Colors.surfaceLight,
  },
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (error) {
    return (
      <PaperProvider theme={PaperDarkBlueTheme}>
        <ThemeProvider value={NavDarkBlueTheme}>
          <Stack>
            <Stack.Screen name="index" options={{ title: "Error" }} />
          </Stack>
        </ThemeProvider>
      </PaperProvider>
    );
  }

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <PaperProvider theme={PaperDarkBlueTheme}>
      <ThemeProvider value={NavDarkBlueTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ title: "Home" }} />
          <Stack.Screen name="location" options={{ title: "Location" }} />
          <Stack.Screen
            name="weather"
            options={{
              title: "Weather",
              headerTransparent: true,
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: "transparent",
              },
            }}
          />
        </Stack>
      </ThemeProvider>
    </PaperProvider>
  );
}
