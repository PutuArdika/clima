import { Country } from "@/types/Location";
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
    fetch("https://restcountries.com/v3.1/all?fields=name,flags")
      .then((res) => res.json())
      .then((data: Country[]) => {
        const sorted = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common),
        );
        setCountries(sorted);
        setFilteredCountries(sorted);
      })
      .catch((e) => {
        console.log("Failed to fetch countries:", e);
        setCountriesError(true);
      })
      .finally(() => setLoadingCountries(false));
  };

  const fetchCities = (countryName: string) => {
    setLoadingCities(true);
    setCitiesError(false);
    fetch("https://countriesnow.space/api/v0.1/countries/cities", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ country: countryName }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw new Error(data.msg);
        const sorted: string[] = (data.data as string[]).sort((a, b) =>
          a.localeCompare(b),
        );
        setCities(sorted);
        setFilteredCities(sorted);
      })
      .catch((e) => {
        console.log("Failed to fetch cities:", e);
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
        c.name.common.toLowerCase().includes(text.toLowerCase()),
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
    fetchCities(country.name.common);
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
    if (selectedCountry) fetchCities(selectedCountry.name.common);
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
