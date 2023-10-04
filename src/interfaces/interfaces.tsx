export interface HourlyWeather {
    hourOfTheWeather: string;
    weatherType: string;
    lowestTemp: number;
    highestTemp: number;
    windSpeed: number;
    feelsLike: number;
    unitOfMeasure?: null | string;
}

export interface TransformedWeatherData {
    id: string;
    dateOfTheDay: string;
    weatherType: string;
    alerts: string[];
    lowestTempOfDay: number;
    highestTempOfDay: number;
    byHours: HourlyWeather[];
}

export interface WeatherCard {
    id: string;
    onWeatherCardClick: (dayId: string) => void;
    dateOfTheDay: string;
    weatherType: string;
    lowestTempOfDay: number;
    highestTempOfDay: number;
    alerts: string[];
    unitOfMeasure: null | string;
}

export interface TemperatureSwitcherInterface {
    onChangeMetrics: (metric: string) => void;
    unitOfMeasure: null | string;
}

export type WeatherDataContextType = {
    weatherData: TransformedWeatherData[];
    setWeatherData: React.Dispatch<React.SetStateAction<TransformedWeatherData[]>>;
};

export type WeatherDataProviderProps = {
    children: React.ReactNode;
};
