import React, { useState } from 'react';
import { WeatherDataContextType, TransformedWeatherData, WeatherDataProviderProps } from './interfaces/interfaces';

export const WeatherContext = React.createContext<WeatherDataContextType | undefined>(undefined);

export const WeatherDataProvider: React.FC<WeatherDataProviderProps> = ({ children }) => {
    const [weatherData, setWeatherData] = useState<TransformedWeatherData[]>([]);

    return (
        <WeatherContext.Provider value={{ weatherData, setWeatherData }}>
            {children}
        </WeatherContext.Provider>
    );
};