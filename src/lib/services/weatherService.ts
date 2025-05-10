import { HourlyForecastResponse } from "../types/WeatherTypes";

export class WeatherService {
  static async getWeatherByCity(cityName: string) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/weather?q=${cityName}&units=metric&appid=${import.meta.env.VITE_API_KEY}`,
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Error when fetching weather data",
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`${error.message}`);
      }
      throw new Error("Error");
    }
  }

  static async getWeatherById(cityId: number) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/weather?id=${cityId}&units=metric&appid=${import.meta.env.VITE_API_KEY}`,
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Error when fetching weather data",
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`${error.message}`);
      }
      throw new Error("Error");
    }
  }

  static async getHourlyForecast(cityId: number) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/forecast?id=${cityId}&units=metric&appid=${import.meta.env.VITE_API_KEY}`,
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch forecast data");
      }

      const data: HourlyForecastResponse = await response.json();

      const now = new Date();
      const todayStart = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
      );
      const tomorrowStart = new Date(todayStart);
      tomorrowStart.setDate(tomorrowStart.getDate() + 1);

      const todayForecasts = data.list
        .filter((item) => {
          const itemDate = new Date(item.dt * 1000);
          return itemDate >= now && itemDate < tomorrowStart;
        })
        .map((item) => {
          const itemDate = new Date(item.dt * 1000);
          const hours = itemDate.getHours().toString().padStart(2, "0");
          const minutes = itemDate.getMinutes().toString().padStart(2, "0");

          return {
            dt: item.dt,
            time: `${hours}:${minutes}`,
            temp: item.main.temp,
            feels_like: item.main.feels_like,
            weather: item.weather,
            pop: item.pop,
          };
        });

      return todayForecasts;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`${error.message}`);
      }
      throw new Error("Error");
    }
  }
}
