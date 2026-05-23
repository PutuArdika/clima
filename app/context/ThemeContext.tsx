import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "@clima_theme";

export type ThemeConfig = {
  headerBg: string;
  bodyBg: string;
};

const DEFAULT: ThemeConfig = {
  headerBg: "#152A4A",
  bodyBg: "#0A1628",
};

type ThemeContextType = ThemeConfig & {
  setHeaderBg: (color: string) => void;
  setBodyBg: (color: string) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  ...DEFAULT,
  setHeaderBg: () => {},
  setBodyBg: () => {},
});

export function ThemeConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [headerBg, setHeaderBgState] = useState(DEFAULT.headerBg);
  const [bodyBg, setBodyBgState] = useState(DEFAULT.bodyBg);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (!raw) return;
      try {
        const saved: Partial<ThemeConfig> = JSON.parse(raw);
        if (saved.headerBg) setHeaderBgState(saved.headerBg);
        if (saved.bodyBg) setBodyBgState(saved.bodyBg);
      } catch {}
    });
  }, []);

  const persist = (patch: Partial<ThemeConfig>) => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      const current = raw ? JSON.parse(raw) : {};
      AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ...current, ...patch }),
      );
    });
  };

  const setHeaderBg = (color: string) => {
    setHeaderBgState(color);
    persist({ headerBg: color });
  };

  const setBodyBg = (color: string) => {
    setBodyBgState(color);
    persist({ bodyBg: color });
  };

  return (
    <ThemeContext.Provider value={{ headerBg, bodyBg, setHeaderBg, setBodyBg }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeConfig() {
  return useContext(ThemeContext);
}
