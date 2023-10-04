import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WeatherByHours from './WeatherByHours';
import { useNavigate, useLocation } from 'react-router-dom';
import { useWeatherData } from '../customHooks/weatherDataHook';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
    useLocation: jest.fn(),
}));

jest.mock('../customHooks/weatherDataHook');

describe('WeatherByHours', () => {
    beforeEach(() => {
        // Mock hooks as needed
        (useNavigate as jest.Mock).mockReturnValue(jest.fn());
        (useLocation as jest.Mock).mockReturnValue({
            state: {
                dayId: 1,
                unitOfMeasure: 'C'
            }
        });
        (useWeatherData as jest.Mock).mockReturnValue({
            weatherData: [{
                id: 1,
                byHours: [
                    { hourOfTheWeather: '1AM', weatherType: 'Cloudy', highestTemp: 10, lowestTemp: 5, feelsLike: 7, windSpeed: 5, unitOfMeasure: 'C' }
                    // Add other hourly data as needed
                ]
            }]
        });
    });

    it('renders without crashing', () => {
        render(<WeatherByHours />);
        expect(screen.getByText('1AM')).toBeInTheDocument();
    });
    
    // Add more tests based on component behavior and interactions.
});
