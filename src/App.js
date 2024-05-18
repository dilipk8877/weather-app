import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import WeatherDisplay from './page/WeatherDisplay';
import SevenDayForecast from './page/7DayForecast';
const apiKey = '439d4b804bc8187953eb36d2a8c26a02';
const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [lon, setLon] = useState(null);
  const [lat, setLat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
  
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`https://openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
      setWeatherData(response.data);
    } catch (error) {
      setError('Error fetching weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchForecast = async (lat, lon) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
      setForecastData(response.data.daily);
    } catch (error) {
      console.error('Error fetching forecast data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (lat && lon) {
      fetchForecast(lat, lon);
    }
  }, [lat, lon]);

  useEffect(() => {
    if (weatherData) {
      setLat(weatherData.coord.lat);
      setLon(weatherData.coord.lon);
    }
  }, [weatherData]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Dashboard</h1>
        <div className="input-container">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
          />
          <button onClick={fetchWeather}>Get Weather</button>
        </div>
      </header>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {weatherData && <WeatherDisplay data={weatherData} lat={lat} lon={lon} />}
      {forecastData && <SevenDayForecast forecast={forecastData} />}
    </div>
  );
};

export default App;
