import { View } from "@/components/Themed";
import { useFetchLocation } from "@/hooks/useFetchLocation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  FlatList,
  Image,
  Modal,
  View as RNView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { Button, Divider, Text, TextInput } from "react-native-paper";

export default function ManualLocation() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const bgColor = isDark ? "#1e1e1e" : "#ffffff";
  const textColor = isDark ? "#ffffff" : "#000000";
  const borderColor = isDark ? "#555" : "#888";
  const placeholderColor = isDark ? "#aaa" : "#888";
  const dividerColor = isDark ? "#333" : "#e0e0e0";

  const {
    filteredCountries,
    countrySearch,
    selectedCountry,
    dropdownVisible,
    loadingCountries,
    countriesError,
    setDropdownVisible,
    handleCountrySearch,
    handleSelectCountry,
    retryCountries,
    filteredCities,
    citySearch,
    selectedCity,
    cityDropdownVisible,
    loadingCities,
    citiesError,
    setCityDropdownVisible,
    handleCitySearch,
    handleSelectCity,
    retryCities,
  } = useFetchLocation();

  const handleSearch = () => {
    if (!selectedCity || !selectedCountry) return;
    router.push({
      pathname: "/weather" as any,
      params: {
        city: selectedCity,
        country: selectedCountry.name.common,
      },
    });
  };

  console.log("Render ManualLocation - selectedCountry:", selectedCountry);
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="map-search"
        size={64}
        color="#4FC3F7"
        style={styles.icon}
      />
      <Text variant="headlineSmall" style={styles.title}>
        Enter Your Location
      </Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        Select a country and enter your city
      </Text>

      {/* Country selector */}
      <TouchableOpacity
        style={[
          styles.countrySelector,
          { borderColor, backgroundColor: bgColor },
        ]}
        onPress={() => setDropdownVisible(true)}
        activeOpacity={0.7}
      >
        {selectedCountry ? (
          <RNView style={styles.selectedRow}>
            <Image
              source={{ uri: selectedCountry.flags.png }}
              style={styles.flag}
            />
            <Text
              variant="bodyLarge"
              style={[styles.countryName, { color: textColor }]}
            >
              {selectedCountry.name.common}
            </Text>
          </RNView>
        ) : (
          <RNView style={styles.selectedRow}>
            <MaterialCommunityIcons
              name="flag-outline"
              size={24}
              color={placeholderColor}
            />
            <Text
              variant="bodyLarge"
              style={[
                styles.placeholderText,
                { color: countriesError ? "#e53935" : placeholderColor },
              ]}
            >
              {loadingCountries
                ? "Loading countries..."
                : countriesError
                  ? "Failed to load. Tap to retry."
                  : "Select a country"}
            </Text>
          </RNView>
        )}
        <MaterialCommunityIcons
          name="chevron-down"
          size={22}
          color={placeholderColor}
        />
      </TouchableOpacity>

      {/* City selector */}
      <TouchableOpacity
        style={[
          styles.countrySelector,
          {
            borderColor: citiesError ? "#e53935" : borderColor,
            backgroundColor: bgColor,
            opacity: !selectedCountry ? 0.5 : 1,
          },
        ]}
        onPress={() => {
          if (!selectedCountry) return;
          if (citiesError && selectedCountry) {
            retryCities();
          } else {
            setCityDropdownVisible(true);
          }
        }}
        activeOpacity={0.7}
        disabled={!selectedCountry && !citiesError}
      >
        <RNView style={styles.selectedRow}>
          <MaterialCommunityIcons
            name="city-variant-outline"
            size={24}
            color={selectedCity ? textColor : placeholderColor}
          />
          <Text
            variant="bodyLarge"
            style={[
              styles.placeholderText,
              {
                color: selectedCity
                  ? textColor
                  : citiesError
                    ? "#e53935"
                    : placeholderColor,
              },
            ]}
          >
            {loadingCities
              ? "Loading cities..."
              : citiesError
                ? "Failed to load cities. Tap to retry."
                : selectedCity
                  ? selectedCity
                  : !selectedCountry
                    ? "Select a country first"
                    : "Select a city"}
          </Text>
        </RNView>
        <MaterialCommunityIcons
          name="chevron-down"
          size={22}
          color={placeholderColor}
        />
      </TouchableOpacity>

      <Button
        mode="contained"
        style={styles.button}
        icon="magnify"
        onPress={handleSearch}
        disabled={!selectedCity}
      >
        Search
      </Button>

      {/* Country dropdown modal */}
      <Modal
        visible={dropdownVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setDropdownVisible(false)}
      >
        <RNView style={styles.modalOverlay}>
          <RNView style={[styles.modalContent, { backgroundColor: bgColor }]}>
            <RNView style={styles.modalHeader}>
              <Text
                variant="titleMedium"
                style={{ fontWeight: "bold", color: textColor }}
              >
                Select Country
              </Text>
              <TouchableOpacity onPress={() => setDropdownVisible(false)}>
                <MaterialCommunityIcons
                  name="close"
                  size={24}
                  color={textColor}
                />
              </TouchableOpacity>
            </RNView>
            <TextInput
              placeholder="Search country..."
              value={countrySearch}
              onChangeText={handleCountrySearch}
              mode="outlined"
              style={styles.searchInput}
              left={<TextInput.Icon icon="magnify" />}
              autoFocus
            />
            <Divider style={{ backgroundColor: dividerColor }} />
            <FlatList
              data={filteredCountries}
              keyExtractor={(item) => item.name.common}
              style={{ flex: 1 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.countryItem, { backgroundColor: bgColor }]}
                  onPress={() => handleSelectCountry(item)}
                >
                  <Image source={{ uri: item.flags.png }} style={styles.flag} />
                  <Text
                    variant="bodyLarge"
                    style={[styles.countryItemText, { color: textColor }]}
                  >
                    {item.name.common}
                  </Text>
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => (
                <Divider style={{ backgroundColor: dividerColor }} />
              )}
              keyboardShouldPersistTaps="handled"
            />
          </RNView>
        </RNView>
      </Modal>

      {/* City dropdown modal */}
      <Modal
        visible={cityDropdownVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setCityDropdownVisible(false)}
      >
        <RNView style={styles.modalOverlay}>
          <RNView style={[styles.modalContent, { backgroundColor: bgColor }]}>
            <RNView style={styles.modalHeader}>
              <Text
                variant="titleMedium"
                style={{ fontWeight: "bold", color: textColor }}
              >
                Select City
              </Text>
              <TouchableOpacity onPress={() => setCityDropdownVisible(false)}>
                <MaterialCommunityIcons
                  name="close"
                  size={24}
                  color={textColor}
                />
              </TouchableOpacity>
            </RNView>
            <TextInput
              placeholder="Search city..."
              value={citySearch}
              onChangeText={handleCitySearch}
              mode="outlined"
              style={styles.searchInput}
              left={<TextInput.Icon icon="magnify" />}
              autoFocus
            />
            <Divider style={{ backgroundColor: dividerColor }} />
            <FlatList
              data={filteredCities}
              keyExtractor={(item) => item}
              style={{ flex: 1 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.countryItem, { backgroundColor: bgColor }]}
                  onPress={() => handleSelectCity(item)}
                >
                  <MaterialCommunityIcons
                    name="city-variant-outline"
                    size={20}
                    color={textColor}
                  />
                  <Text
                    variant="bodyLarge"
                    style={[styles.countryItemText, { color: textColor }]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => (
                <Divider style={{ backgroundColor: dividerColor }} />
              )}
              keyboardShouldPersistTaps="handled"
            />
          </RNView>
        </RNView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: 24,
  },
  countrySelector: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  selectedRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  flag: {
    width: 32,
    height: 22,
    borderRadius: 3,
  },
  countryName: {
    fontWeight: "600",
  },
  placeholderText: {
    color: "#888",
  },
  input: {
    width: "100%",
    marginBottom: 16,
  },
  button: {
    width: "100%",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 16,
    height: "50%",
    display: "flex",
    flexDirection: "column",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  searchInput: {
    marginHorizontal: 12,
    marginVertical: 8,
  },
  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  countryItemText: {
    flex: 1,
  },
});
