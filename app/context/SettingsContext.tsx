import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

export type TempUnit = "C" | "F";
export type WindUnit = "kph" | "mph";
export type PressureUnit = "mb" | "in";

export type AppSettings = {
  tempUnit: TempUnit;
  windUnit: WindUnit;
  pressureUnit: PressureUnit;
  setTempUnit: (v: TempUnit) => void;
  setWindUnit: (v: WindUnit) => void;
  setPressureUnit: (v: PressureUnit) => void;
};

const STORAGE_KEY = "@clima_settings";

const SettingsContext = createContext<AppSettings>({
  tempUnit: "C",
  windUnit: "kph",
  pressureUnit: "mb",
  setTempUnit: () => {},
  setWindUnit: () => {},
  setPressureUnit: () => {},
});

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [tempUnit, setTempUnitState] = useState<TempUnit>("C");
  const [windUnit, setWindUnitState] = useState<WindUnit>("kph");
  const [pressureUnit, setPressureUnitState] = useState<PressureUnit>("mb");

  // Load persisted settings on mount
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (!raw) return;
      try {
        const saved = JSON.parse(raw);
        if (saved.tempUnit) setTempUnitState(saved.tempUnit);
        if (saved.windUnit) setWindUnitState(saved.windUnit);
        if (saved.pressureUnit) setPressureUnitState(saved.pressureUnit);
      } catch {}
    });
  }, []);

  const persist = (patch: Partial<Record<string, string>>) => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      const current = raw ? JSON.parse(raw) : {};
      AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ...current, ...patch }),
      );
    });
  };

  const setTempUnit = (v: TempUnit) => {
    setTempUnitState(v);
    persist({ tempUnit: v });
  };
  const setWindUnit = (v: WindUnit) => {
    setWindUnitState(v);
    persist({ windUnit: v });
  };
  const setPressureUnit = (v: PressureUnit) => {
    setPressureUnitState(v);
    persist({ pressureUnit: v });
  };

  return (
    <SettingsContext.Provider
      value={{
        tempUnit,
        windUnit,
        pressureUnit,
        setTempUnit,
        setWindUnit,
        setPressureUnit,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
