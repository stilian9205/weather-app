import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import HourLine from './HourLine';
import { getIcon } from '../utils/getWeatherTypes';jest.mock('../utils/getWeatherTypes'); 
jest.mock('../utils/getWeatherTypes'); 

const sampleProps = {
    hourOfTheWeather: '10:00 AM',
    weatherType: 'rain', 
    highestTemp: 20,
    lowestTemp: 10,
    feelsLike: 15,
    windSpeed: 5,
    unitOfMeasure: 'metric' 
};

describe('<HourLine />', () => {
    it('renders without crashing', () => {
        render(<HourLine {...sampleProps} />);
    });

    it('displays the correct hour, weather data, and metric sign', () => {
        const { getByText } = render(<HourLine {...sampleProps} />);

        expect(getByText('10:00 AM')).toBeInTheDocument();
        expect(getByText('10 °C')).toBeInTheDocument();  
        expect(getByText('Low')).toBeInTheDocument();
        expect(getByText('20 °C')).toBeInTheDocument();
        expect(getByText('High')).toBeInTheDocument();
        expect(getByText('15 °C')).toBeInTheDocument();
        expect(getByText('feelsLike')).toBeInTheDocument();
        expect(getByText('5/mph')).toBeInTheDocument();
        expect(getByText('Wind')).toBeInTheDocument();
    });

    it('displays the correct icon for the weather type', () => {
        const mockProps = {
            hourOfTheWeather: "10 AM",
            weatherType: "cloudy",
            highestTemp: 25,
            lowestTemp: 15,
            feelsLike: 20,
            windSpeed: 10,
            unitOfMeasure: "Celsius"
        };

        (getIcon as jest.Mock).mockReturnValue(<span>cloudy-icon</span>);
        
        const { getByText } = render(<HourLine {...mockProps} />);

        expect(getByText("cloudy-icon")).toBeInTheDocument();
    });
});