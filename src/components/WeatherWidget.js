import React, { useState, useEffect } from 'react';
import './WeatherWidget.css';

const WeatherWidget = () => {
  const [weather, setWeather] = useState({
    temperature: 75,
    condition: 'Partly Cloudy',
    humidity: 65,
    wind: 8,
    icon: '⛅'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate weather API call
    const fetchWeather = async () => {
      setLoading(true);
      // In production, this would be a real API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setWeather({
        temperature: 86,
        condition: 'Partly Cloudy',
        humidity: 70,
        wind: 6,
        icon: '⛅'
      });
      setLoading(false);
    };

    fetchWeather();
  }, []);

  const getWeatherIcon = (condition) => {
    const icons = {
      'Sunny': '☀️',
      'Partly Cloudy': '⛅',
      'Cloudy': '☁️',
      'Rainy': '🌧️',
      'Stormy': '⛈️',
      'Clear': '🌙'
    };
    return icons[condition] || '⛅';
  };

  if (loading) {
    return (
      <div className="weather-widget loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="weather-widget">
      <div className="weather-header">
        <h3>Wedding Day Weather</h3>
        <span className="wedding-date">Feb 25, 2026</span>
      </div>
      
      <div className="weather-main">
        <div className="weather-icon">
          <span className="weather-emoji">{getWeatherIcon(weather.condition)}</span>
        </div>
        <div className="weather-info">
          <div className="temperature">
            <span className="temp-value">{weather.temperature}</span>
            <span className="temp-unit">°F</span>
          </div>
          <div className="condition">{weather.condition}</div>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-icon">💧</span>
          <div className="detail-info">
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{weather.humidity}%</span>
          </div>
        </div>
        <div className="detail-item">
          <span className="detail-icon">💨</span>
          <div className="detail-info">
            <span className="detail-label">Wind</span>
            <span className="detail-value">{weather.wind} mph</span>
          </div>
        </div>
      </div>

      <div className="weather-advice">
        <h4>Perfect Weather!</h4>
        <p>
          Ideal conditions for an outdoor ceremony. Consider bringing a light jacket 
          for the evening as temperatures may drop.
        </p>
      </div>
    </div>
  );
};

export default WeatherWidget;
