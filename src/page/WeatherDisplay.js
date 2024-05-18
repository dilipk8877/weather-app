import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faCloudRain } from '@fortawesome/free-solid-svg-icons';


const WeatherDisplay = ({ data }) => {
    const getWeatherIcon = (weather) => {
      switch (weather) {
        case 'Clear':
          return <FontAwesomeIcon icon={faSun} />;
        case 'Clouds':
          return <FontAwesomeIcon icon={faCloud} />;
        case 'Rain':
          return <FontAwesomeIcon icon={faCloudRain} />;
        default:
          return <FontAwesomeIcon icon={faCloud} />;
      }
    };
  
    return (
      <div className="weather-display card">
        <h2>Weather in {data.name}</h2>
        <div className="weather-info">
          <div className="weather-icon">
            {getWeatherIcon(data.weather[0].main)}
          </div>
          <div className="weather-details">
            <p>Temperature: {data.main.temp}°C</p>
            <p>Weather: {data.weather[0].description}</p>
            <p>Humidity: {data.main.humidity}%</p>
            <p>Wind Speed: {data.wind.speed} m/s</p>
          </div>
        </div>
      </div>
    );
  };
  


export default WeatherDisplay;
