import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { WeatherState } from "../../types/WeatherTypes";
import {
  loadCitiesFromLocalStorage,
  saveCitiesToLocalStorage,
} from "../../utils/localStorage";
import {
  fetchHourlyForecast,
  fetchWeatherByCity,
  refreshCityWeather,
} from "./operations";

const initialState: WeatherState = {
  cities: loadCitiesFromLocalStorage(),
  loading: false,
  error: null,
  hourlyForecast: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    removeCity: (state, action: PayloadAction<number>) => {
      state.cities = state.cities.filter((city) => city.id !== action.payload);
      saveCitiesToLocalStorage(state.cities);
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchWeatherByCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherByCity.fulfilled, (state, action) => {
        const weatherData = action.payload;
        state.loading = false;

        const isCityIndex = state.cities.findIndex(
          (city) => city.id === weatherData.id,
        );

        if (isCityIndex !== -1) {
          state.cities[isCityIndex].weatherData = weatherData;
        } else {
          state.cities.push({
            id: weatherData.id,
            name: weatherData.name,

            weatherData,
          });
        }

        saveCitiesToLocalStorage(state.cities);
      })
      .addCase(fetchWeatherByCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || {
          message: "Error",
        };
      })

      .addCase(refreshCityWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshCityWeather.fulfilled, (state, action) => {
        const weatherData = action.payload;
        const cityIndex = state.cities.findIndex(
          (city) => city.id === weatherData.id,
        );

        if (cityIndex >= 0) {
          state.cities[cityIndex].weatherData = weatherData;
        }

        state.loading = false;
        saveCitiesToLocalStorage(state.cities);
      })
      .addCase(refreshCityWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || {
          message: "Error",
        };
      })
      .addCase(fetchHourlyForecast.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHourlyForecast.fulfilled, (state, action) => {
        state.hourlyForecast = action.payload;
        state.loading = false;
      })
      .addCase(fetchHourlyForecast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || {
          message: "Failed to fetch forecast",
        };
        state.hourlyForecast = null;
      }),
});

export const { removeCity } = weatherSlice.actions;
export default weatherSlice.reducer;
