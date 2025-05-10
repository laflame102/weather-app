export interface WeatherData {
  id: number;
  name: string;
  country: string;
  weather: WeatherCondition[];
  main: MainData;
  wind: Wind;
  clouds: Clouds;
  sys: Sys;
  dt: number;
  timezone: number;
  lastUpdated: number;
  visibility: number;
}

export interface City {
  id: number;
  name: string;
  weatherData: WeatherData | null;
}

export interface ApiError {
  message: string;
  code?: number;
}

export interface WeatherState {
  cities: City[];
  loading: boolean;
  error: ApiError | null;
  hourlyForecast: TodayForecastItem[] | null;
}

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface MainData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level?: number;
  grnd_level?: number;
  humidity: number;
  temp_kf?: number;
}

export interface Wind {
  speed: number;
  deg: number;
  gust?: number;
}

export interface Clouds {
  all: number;
}

export interface Sys {
  pod?: string;
  type?: number;
  id?: number;
  country?: string;
  sunrise?: number;
  sunset?: number;
}

export interface ForecastItem {
  dt: number;
  main: MainData;
  weather: WeatherCondition[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  sys: Sys;
  dt_txt: string;
}

export interface HourlyForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export interface TodayForecastItem {
  dt: number;
  time: string;
  temp: number;
  feels_like: number;
  weather: WeatherCondition[];
  pop: number;
}
