import { Plus } from "lucide-react";
import { useState } from "react";

import { useAppDispatch, useAppSelector } from "../lib/redux/hooks";
import { fetchWeatherByCity } from "../lib/redux/weather/operations";

const CityAddForm = () => {
  const [input, setInput] = useState("");
  const dispatch = useAppDispatch();
  const cities = useAppSelector((state) =>
    state.weather.cities.map((c) => c.name),
  );

  const handleAddCity = (e: React.FormEvent) => {
    e.preventDefault();
    const cityName = input.trim();
    if (!cityName || cities.includes(cityName)) return;

    dispatch(fetchWeatherByCity(cityName));

    setInput("");
  };

  return (
    <div className="city-input-wrapper">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Додати нове місто"
        className="city-input"
      />
      <button onClick={handleAddCity} className="add-city-button">
        <Plus size={16} className="plus-icon" /> Додати
      </button>
    </div>
  );
};

export default CityAddForm;
