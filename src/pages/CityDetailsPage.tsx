import { useNavigate, useParams } from "react-router-dom";

import { ChevronRight, RefreshCw } from "lucide-react";
import { useEffect } from "react";

import HourlyForecast from "../components/HourlyForecast";
import { useAppDispatch, useAppSelector } from "../lib/redux/hooks";
import {
  fetchHourlyForecast,
  fetchWeatherByCity,
  refreshCityWeather,
} from "../lib/redux/weather/operations";
import { getWeatherIcon } from "../lib/utils/getWeatherIcon";

const CityDetailsPage = () => {
  const { name } = useParams<{ name: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const city = useAppSelector((state) =>
    state.weather.cities.find((c) => c.name === name),
  );
  const hourly = useAppSelector((state) => state.weather.hourlyForecast);

  useEffect(() => {
    if (city?.name) {
      dispatch(fetchWeatherByCity(city.name));
      dispatch(fetchHourlyForecast(city.id));
    }
  }, [dispatch, city?.name]);

  const handleBackToList = () => {
    navigate("/");
  };

  const handleRefreshCity = () => {
    if (city?.id) {
      dispatch(refreshCityWeather(city.id));
    }
  };

  if (!city || !city.weatherData) return <p>Завантаження...</p>;
  const { weather, main, sys } = city.weatherData;

  return (
    <div className="city-details-page">
      <div className="container">
        <button onClick={handleBackToList} className="back-button">
          <ChevronRight className="rotate" size={16} />
          Назад до списку
        </button>

        <div className="card">
          <div className="card-header">
            <div>
              <h2 className="city-name">{city.name || "Невідомо"}</h2>
              <p className="country">
                {city.weatherData.country || sys.country}
              </p>
            </div>
            <div className="icon">{getWeatherIcon(weather?.[0].main)}</div>
          </div>

          <div className="temperature-block">
            <div className="temperature">{Math.round(main.temp) || 0}°C</div>
            <p className="weather-description">
              {weather[0].main || "Невідомо"}
            </p>
          </div>

          <div className="details">
            <h3>Детальна інформація</h3>
            <div className="details-grid">
              <div className="detail">
                <p className="label">Вологість</p>
                <p className="value">{main.humidity || 0}%</p>
              </div>
              <div className="detail">
                <p className="label">Вітер</p>
                <p className="value">{city.weatherData.wind.speed || 0} м/с</p>
              </div>
              <div className="detail">
                <p className="label">Тиск</p>
                <p className="value">{main.pressure || 0} гПа</p>
              </div>
              <div className="detail">
                <p className="label">Видимість</p>
                <p className="value">{city.weatherData.visibility || 0} м</p>
              </div>
            </div>
          </div>

          <HourlyForecast forecastData={hourly} />

          <button onClick={handleRefreshCity} className="refresh-button">
            <RefreshCw size={16} className="icon" />

            <p>Оновити дані</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CityDetailsPage;
