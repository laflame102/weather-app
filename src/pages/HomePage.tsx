import { Cloud } from "lucide-react";
import { useEffect } from "react";

import CityAddForm from "../components/CityAddForm";
import CityCard from "../components/CityCard";
import { useAppDispatch, useAppSelector } from "../lib/redux/hooks";
import { fetchWeatherByCity } from "../lib/redux/weather/operations";
import { loadCitiesFromLocalStorage } from "../lib/utils/localStorage";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const cities = useAppSelector((state) => state.weather.cities);
  const loading = useAppSelector((state) => state.weather.loading);

  useEffect(() => {
    const stored = loadCitiesFromLocalStorage();
    if (stored) {
      stored.forEach((city) => {
        dispatch(fetchWeatherByCity(city.name));
      });
    }
  }, [dispatch]);

  return (
    <div className="weather-page">
      <div className="weather-container">
        <h1 className="weather-title">Погода в містах</h1>
        <CityAddForm />

        {cities.length === 0 ? (
          <div className="empty-message">
            <Cloud className="empty-icon" size={48} />
            <p>Додайте місто, щоб бачити погоду</p>
          </div>
        ) : (
          <div className="city-list">
            {cities.map((city) => (
              <CityCard key={city.id} city={city} loading={loading} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
