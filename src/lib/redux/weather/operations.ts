import { createAsyncThunk } from "@reduxjs/toolkit";

import { WeatherService } from "../../services/weatherService";
import {
  ApiError,
  TodayForecastItem,
  WeatherData,
} from "../../types/WeatherTypes";

export const fetchWeatherByCity = createAsyncThunk<
  WeatherData,
  string,
  { rejectValue: { message: string } }
>("weather/fetchByCity", async (cityName, { rejectWithValue }) => {
  try {
    const weatherData = await WeatherService.getWeatherByCity(cityName);
    return weatherData;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue({ message: error.message });
    }
    return rejectWithValue({ message: "Error" });
  }
});

export const refreshCityWeather = createAsyncThunk<
  WeatherData,
  number,
  { rejectValue: ApiError }
>("weather/refreshCity", async (cityId, { rejectWithValue }) => {
  try {
    return await WeatherService.getWeatherById(cityId);
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue({ message: error.message });
    }
    return rejectWithValue({ message: "Error" });
  }
});

export const fetchHourlyForecast = createAsyncThunk<
  TodayForecastItem[],
  number,
  {
    rejectValue: ApiError;
  }
>("weather/fetchHourlyForecast", async (cityId, { rejectWithValue }) => {
  try {
    return await WeatherService.getHourlyForecast(cityId);
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue({ message: error.message });
    }
    return rejectWithValue({ message: "Error" });
  }
});
