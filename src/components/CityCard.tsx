import { useNavigate } from "react-router-dom";

import { RefreshCw, Trash2 } from "lucide-react";

import { useAppDispatch } from "../lib/redux/hooks";
import { refreshCityWeather } from "../lib/redux/weather/operations";
import { removeCity } from "../lib/redux/weather/weatherSlice";
import { City } from "../lib/types/WeatherTypes";
import { getWeatherIcon } from "../lib/utils/getWeatherIcon";

interface CityProps {
  city: City;
  loading: boolean;
}

const CityCard = ({ city, loading }: CityProps) => {
  if (!city.weatherData) return null;

  const { sys, main, weather } = city.weatherData;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRefresh = () => {
    dispatch(refreshCityWeather(city.id));
  };

  const handleDelete = () => {
    dispatch(removeCity(city.id));
  };

  const handleDetails = () => {
    navigate(`/city/${city.name}`);
  };

  return (
    <div className="city-card">
      <div className="city-info" onClick={handleDetails}>
        <div className="city-main">
          <div>
            <h2 className="city-name">{city.name}</h2>
            <p className="city-country">{sys.country}</p>
          </div>
          <div className="city-temp">
            <div className="city-icon">{getWeatherIcon(weather?.[0].main)}</div>
            <div className="temperature">{Math.round(main.temp)}°C</div>
          </div>
        </div>
        <p className="city-weather">{weather?.[0].main}</p>
      </div>

      <div className="city-actions">
        <button onClick={handleRefresh} className="refresh-button">
          <RefreshCw
            size={18}
            className={`icon ${loading ? "spinning" : ""}`}
          />{" "}
          Оновити
        </button>
        <button onClick={handleDelete} className="delete-button">
          <Trash2 size={18} className="icon" /> Видалити
        </button>
      </div>
    </div>
  );
};

export default CityCard;
