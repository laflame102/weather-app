import { City } from "../types/WeatherTypes";

const STORAGE_KEY = "cities";

export const saveCitiesToLocalStorage = (cities: City[]) => {
  try {
    const serializedCities = JSON.stringify(cities);
    localStorage.setItem(STORAGE_KEY, serializedCities);
  } catch (error) {
    console.error("Error when saving", error);
  }
};

export const loadCitiesFromLocalStorage = (): City[] => {
  try {
    const serializedCities = localStorage.getItem(STORAGE_KEY);
    if (serializedCities === null) {
      return [];
    }
    return JSON.parse(serializedCities);
  } catch (error) {
    console.error("Error when loading", error);
    return [];
  }
};
