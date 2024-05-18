import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faCloudRain, faCloudSun, faCloudMoon } from '@fortawesome/free-solid-svg-icons';

const SevenDayForecast = ({ forecast }) => {
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
  
    const formatDate = (timestamp) => {
      const date = new Date(timestamp * 1000);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    };
  
    const formatTime = (timestamp) => {
      const date = new Date(timestamp * 1000);
      const hour = date.getHours();
      if (hour >= 6 && hour < 12) {
        return 'Morning';
      } else if (hour >= 12 && hour < 18) {
        return 'Afternoon';
      } else if (hour >= 18 && hour < 24) {
        return 'Evening';
      } else {
        return 'Night';
      }
    };
  
    return (
      <div className="forecast">
        <h3>7-Day Forecast</h3>
        <div className="forecast-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Condition</th>
                <th>Temp (°C)</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {forecast.map((day, index) => (
                <tr key={index} className="forecast-card">
                  <td>{formatDate(day.dt)}</td>
                  <td>{formatTime(day.dt)}</td>
                  <td>{getWeatherIcon(day.weather[0].main)}</td>
                  <td>{day.temp.day}°C</td>
                  <td>{day.weather[0].description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  

export default SevenDayForecast;
