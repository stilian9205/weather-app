import { useContext } from 'react';
import { WeatherContext } from '../WeatherContext';

export const useWeatherData = () => {
    const context = useContext(WeatherContext);

    if (!context) {
        throw new Error("useWeatherData must be used within a WeatherProvider");
    }

    const { weatherData = [], setWeatherData = () => { } } = context;

    return { weatherData, setWeatherData };
};