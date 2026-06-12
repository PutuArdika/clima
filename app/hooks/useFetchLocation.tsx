import { Country } from "@/app/types/Location";
import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

export function useFetchLocation() {
  // Country state
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [countrySearch, setCountrySearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [countriesError, setCountriesError] = useState(false);

  // City state
  const [cities, setCities] = useState<string[]>([]);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [citySearch, setCitySearch] = useState("");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [cityDropdownVisible, setCityDropdownVisible] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [citiesError, setCitiesError] = useState(false);

  const fetchCountries = () => {
    setLoadingCountries(true);
    setCountriesError(false);
    fetch("https://countriesnow.space/api/v0.1/countries/flag/images", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((response) => {
        if (response.error) {
          throw new Error(response.msg);
        }
        const data: Country[] = response.data.map(
          (item: { name: string; iso2: string; iso3: string }) => ({
            name: item.name,
            // Use flagcdn.com for PNG flags (React Native Image doesn't support SVG)
            flag: `https://flagcdn.com/w80/${item.iso2.toLowerCase()}.png`,
            iso2: item.iso2,
            iso3: item.iso3,
          }),
        );
        const sorted = data.sort((a, b) => a.name.localeCompare(b.name));
        setCountries(sorted);
        setFilteredCountries(sorted);
      })
      .catch((e: unknown) => {
        console.error("Failed to fetch countries:", e);
        setCountriesError(true);
      })
      .finally(() => setLoadingCountries(false));
  };

  const fetchCities = (countryName: string) => {
    setLoadingCities(true);
    setCitiesError(false);
    fetch("https://countriesnow.space/api/v0.1/countries/cities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ country: countryName }),
      redirect: "follow",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.error) throw new Error(data.msg);
        const sorted: string[] = (data.data as string[]).sort((a, b) =>
          a.localeCompare(b),
        );
        setCities(sorted);
        setFilteredCities(sorted);
      })
      .catch((e: unknown) => {
        console.error("Failed to fetch cities:", e);
        setCitiesError(true);
      })
      .finally(() => setLoadingCities(false));
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleCountrySearch = (text: string) => {
    setCountrySearch(text);
    setFilteredCountries(
      countries.filter((c) =>
        c.name.toLowerCase().includes(text.toLowerCase()),
      ),
    );
  };

  const handleSelectCountry = (country: Country) => {
    setSelectedCountry(country);
    setSelectedCity(null);
    setCities([]);
    setFilteredCities([]);
    setCountrySearch("");
    setDropdownVisible(false);
    Keyboard.dismiss();
    fetchCities(country.name);
  };

  const handleCitySearch = (text: string) => {
    setCitySearch(text);
    setFilteredCities(
      cities.filter((c) => c.toLowerCase().includes(text.toLowerCase())),
    );
  };

  const handleSelectCity = (cityName: string) => {
    setSelectedCity(cityName);
    setCitySearch("");
    setCityDropdownVisible(false);
    Keyboard.dismiss();
  };

  const retryCities = () => {
    if (selectedCountry) fetchCities(selectedCountry.name);
  };

  return {
    // Country
    countries,
    filteredCountries,
    countrySearch,
    selectedCountry,
    dropdownVisible,
    loadingCountries,
    countriesError,
    setDropdownVisible,
    handleCountrySearch,
    handleSelectCountry,
    retryCountries: fetchCountries,

    // City
    cities,
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
  };
}
