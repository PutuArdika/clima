import { useThemeConfig } from "@/app/context/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles";

const COLOR_OPTIONS: { label: string; value: string }[] = [
  // Blues & Navys
  { label: "Navy (Default)", value: "#0A1628" },
  { label: "Deep Blue", value: "#0D1B2A" },
  { label: "Ocean", value: "#0D2137" },
  { label: "Steel Blue", value: "#1E3A5F" },
  { label: "Deep Ocean", value: "#0B2545" },
  { label: "Cobalt", value: "#1A3A6B" },
  { label: "Royal Blue", value: "#1A2F6E" },
  { label: "Denim", value: "#1B3A7A" },
  { label: "Sapphire", value: "#0F2D6B" },
  { label: "Ice Blue", value: "#1C3553" },
  // Teals & Greens
  { label: "Dark Teal", value: "#0D2626" },
  { label: "Forest", value: "#0D2616" },
  { label: "Pine", value: "#0F2918" },
  { label: "Jungle", value: "#112C1A" },
  { label: "Emerald Dark", value: "#0C2B20" },
  { label: "Moss", value: "#1A2E1A" },
  { label: "Olive Dark", value: "#1E2A0E" },
  // Purples & Violets
  { label: "Dark Purple", value: "#1A0D2E" },
  { label: "Plum", value: "#2D1B33" },
  { label: "Indigo", value: "#1A1A3E" },
  { label: "Violet Dark", value: "#200D3A" },
  { label: "Aubergine", value: "#2A1040" },
  { label: "Deep Mauve", value: "#2E1A2E" },
  // Reds & Maroons
  { label: "Dark Crimson", value: "#2A0C0C" },
  { label: "Maroon", value: "#2E0F0F" },
  { label: "Burgundy", value: "#2B0D1A" },
  { label: "Deep Rose", value: "#2E1020" },
  // Browns & Oranges
  { label: "Espresso", value: "#1E1208" },
  { label: "Dark Mocha", value: "#221509" },
  { label: "Burnt Umber", value: "#2A1500" },
  { label: "Cocoa", value: "#1F1208" },
  // Grays & Neutrals
  { label: "Midnight", value: "#121212" },
  { label: "Dark Slate", value: "#1C2333" },
  { label: "Charcoal", value: "#1E1E1E" },
  { label: "Slate", value: "#2F3542" },
  { label: "Gunmetal", value: "#2C3E50" },
  { label: "Ash", value: "#252525" },
  { label: "Onyx", value: "#181818" },
  { label: "Iron", value: "#2A2A2A" },
  { label: "Obsidian", value: "#0F0F0F" },
  // Warm Darks
  { label: "Dark Sand", value: "#2A2210" },
  { label: "Coffee", value: "#241510" },
  { label: "Dark Amber", value: "#231A08" },
  { label: "Sepia Dark", value: "#1E1408" },
  // Unique
  { label: "Abyss", value: "#050D1A" },
  { label: "Eclipse", value: "#0D0D1A" },
  { label: "Void", value: "#08080F" },
];

const HEADER_COLOR_OPTIONS: { label: string; value: string }[] = [
  // Blues & Navys
  { label: "Surface Blue (Default)", value: "#152A4A" },
  { label: "Dark Navy", value: "#0A1628" },
  { label: "Steel Blue", value: "#1E3A5F" },
  { label: "Deep Ocean", value: "#0B2545" },
  { label: "Cobalt", value: "#1A3A6B" },
  { label: "Royal Blue", value: "#1A2F6E" },
  { label: "Denim", value: "#1B3A7A" },
  { label: "Sapphire", value: "#0F2D6B" },
  { label: "Ice Blue", value: "#1C3553" },
  { label: "Midnight Blue", value: "#1A2744" },
  // Teals & Greens
  { label: "Dark Teal", value: "#0D3333" },
  { label: "Forest", value: "#1B3D1B" },
  { label: "Pine", value: "#143520" },
  { label: "Jungle", value: "#163825" },
  { label: "Emerald Dark", value: "#10382A" },
  { label: "Moss", value: "#243E24" },
  { label: "Olive Dark", value: "#2A3A10" },
  // Purples & Violets
  { label: "Dark Indigo", value: "#1A1A3E" },
  { label: "Plum", value: "#2D1B33" },
  { label: "Violet Dark", value: "#241040" },
  { label: "Aubergine", value: "#30144A" },
  { label: "Deep Mauve", value: "#38223A" },
  { label: "Midnight Purple", value: "#1E0F30" },
  // Reds & Maroons
  { label: "Dark Crimson", value: "#38100F" },
  { label: "Maroon", value: "#3A1212" },
  { label: "Burgundy", value: "#3A1220" },
  { label: "Deep Rose", value: "#3A1528" },
  // Browns & Oranges
  { label: "Espresso", value: "#2E1C0A" },
  { label: "Burnt Umber", value: "#3A2000" },
  { label: "Dark Mocha", value: "#302010" },
  // Grays & Neutrals
  { label: "Charcoal", value: "#1E1E1E" },
  { label: "Slate", value: "#2F3542" },
  { label: "Gunmetal", value: "#2C3E50" },
  { label: "Dark Slate", value: "#1C2333" },
  { label: "Ash", value: "#2E2E2E" },
  { label: "Iron", value: "#333333" },
  { label: "Storm", value: "#2E3A4A" },
  { label: "Thunder", value: "#263040" },
  // Warm Darks
  { label: "Coffee", value: "#301E14" },
  { label: "Dark Amber", value: "#2E220A" },
  { label: "Sepia Dark", value: "#281C0A" },
  // Unique
  { label: "Abyss", value: "#0A1020" },
  { label: "Eclipse", value: "#151520" },
  { label: "Deep Space", value: "#0D0F1F" },
  { label: "Black Pearl", value: "#101820" },
];

type ColorDropdownProps = {
  label: string;
  icon: string;
  selected: string;
  options: { label: string; value: string }[];
  onSelect: (value: string) => void;
};

function ColorDropdown({
  label,
  icon,
  selected,
  options,
  onSelect,
}: ColorDropdownProps) {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find((o) => o.value === selected);

  return (
    <View style={styles.row}>
      {/* Row top: icon + label */}
      <View style={styles.rowTop}>
        <MaterialCommunityIcons name={icon as any} size={20} color="#90CAF9" />
        <Text style={styles.rowLabel}>{label}</Text>
      </View>

      {/* Dropdown trigger */}
      <TouchableOpacity
        style={styles.dropdownTrigger}
        onPress={() => setOpen(true)}
      >
        <View style={[styles.colorSwatch, { backgroundColor: selected }]} />
        <Text style={styles.dropdownText}>
          {selectedOption?.label ?? selected}
        </Text>
        <MaterialCommunityIcons name="chevron-down" size={18} color="#90CAF9" />
      </TouchableOpacity>

      {/* Modal dropdown */}
      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <View style={styles.dropdownList}>
            <Text style={styles.dropdownTitle}>{label}</Text>
            <ScrollView>
              {options.map((opt) => {
                const active = opt.value === selected;
                return (
                  <TouchableOpacity
                    key={opt.value}
                    style={[
                      styles.dropdownItem,
                      active && styles.dropdownItemActive,
                    ]}
                    onPress={() => {
                      onSelect(opt.value);
                      setOpen(false);
                    }}
                  >
                    <View
                      style={[
                        styles.colorSwatch,
                        { backgroundColor: opt.value },
                      ]}
                    />
                    <Text
                      style={[
                        styles.dropdownItemText,
                        active && styles.dropdownItemTextActive,
                      ]}
                    >
                      {opt.label}
                    </Text>
                    {active && (
                      <MaterialCommunityIcons
                        name="check"
                        size={18}
                        color="#4FC3F7"
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

export default function ConfigurationScreen() {
  const { headerBg, bodyBg, setHeaderBg, setBodyBg } = useThemeConfig();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: "Configuration" }} />

      <Text style={styles.sectionTitle}>Appearance</Text>

      <ColorDropdown
        label="Header Background"
        icon="page-layout-header"
        selected={headerBg}
        options={HEADER_COLOR_OPTIONS}
        onSelect={setHeaderBg}
      />

      <ColorDropdown
        label="Body Background"
        icon="layers-outline"
        selected={bodyBg}
        options={COLOR_OPTIONS}
        onSelect={setBodyBg}
      />

      {/* Live preview */}
      <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Preview</Text>
      <View style={[styles.previewContainer, { backgroundColor: bodyBg }]}>
        <View style={[styles.previewHeader, { backgroundColor: headerBg }]}>
          <Text style={styles.previewHeaderText}>Header</Text>
        </View>
        <View style={styles.previewBody}>
          <Text style={styles.previewBodyText}>Body Content</Text>
        </View>
      </View>
    </ScrollView>
  );
}
