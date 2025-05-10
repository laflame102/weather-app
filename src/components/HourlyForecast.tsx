import { TodayForecastItem } from "../lib/types/WeatherTypes";
import { getDailyWeatherIcon } from "../lib/utils/getWeatherIcon";

interface HourlyForecastProps {
  forecastData: TodayForecastItem[] | null;
}

const HourlyForecast = ({ forecastData }: HourlyForecastProps) => {
  if (!forecastData || forecastData.length === 0) {
    return (
      <div className="hourly-forecast">
        <h3 className="hourly-forecast__title">Прогноз на 24 години</h3>
        <p className="hourly-forecast__empty">
          Немає даних про прогноз на сьогодні
        </p>
      </div>
    );
  }
  console.log(forecastData);
  return (
    <div className="hourly-forecast">
      <h3 className="hourly-forecast__title">Прогноз на 24 години</h3>
      <div className="hourly-forecast__list">
        {forecastData.map((item) => (
          <div key={item.dt} className="hourly-forecast__item">
            <p className="hourly-forecast__time">{item.time}</p>
            <div className="hourly-forecast__icon">
              {getDailyWeatherIcon(item)}
            </div>
            <p className="hourly-forecast__temp">
              {Math.round(item.temp) || 0}°
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
