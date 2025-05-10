import {
  Cloud,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Sun,
  Wind,
} from "lucide-react";

import { TodayForecastItem } from "../types/WeatherTypes";

export const getWeatherIcon = (weather: string) => {
  switch (weather.toLowerCase()) {
    case "clear":
      return <Sun />;
    case "rain":
      return <CloudRain />;
    case "windy":
      return <Wind />;
    default:
      return <Cloud />;
  }
};

export const getDailyWeatherIcon = (item: TodayForecastItem) => {
  if (!item.weather || !item.weather.length) {
    return <Sun size={24} />;
  }

  const weatherIconCode = item.weather[0].icon;
  const weatherMain = item.weather[0].main.toLowerCase();

  if (weatherIconCode.includes("01") || weatherMain === "clear") {
    return <Sun size={24} />;
  } else if (
    weatherIconCode.includes("02") ||
    weatherIconCode.includes("03") ||
    weatherIconCode.includes("04") ||
    weatherMain === "clouds"
  ) {
    return <Cloud size={24} />;
  } else if (
    weatherIconCode.includes("09") ||
    weatherIconCode.includes("10") ||
    weatherMain === "rain" ||
    weatherMain === "drizzle"
  ) {
    return <CloudRain size={24} />;
  } else if (weatherIconCode.includes("13") || weatherMain === "snow") {
    return <CloudSnow size={24} />;
  } else if (
    weatherIconCode.includes("50") ||
    ["mist", "fog", "haze", "dust", "sand", "smoke"].includes(weatherMain)
  ) {
    return <CloudFog size={24} />;
  } else if (weatherIconCode.includes("11") || weatherMain === "thunderstorm") {
    return <CloudLightning size={24} />;
  }

  return <Cloud size={24} />;
};
