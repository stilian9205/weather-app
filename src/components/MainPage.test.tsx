import React from 'react';
import { render, waitFor, fireEvent, act } from '@testing-library/react';
import axios from 'axios';
import MainPage from './MainPage';
import { WeatherDataProvider } from '../WeatherContext';
import { temperatureUnits } from '../constants/constants';
import { MemoryRouter } from 'react-router-dom';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockApiResponse = {
    data: {
        city: { name: 'Sample City' },
        list: [] 
    }
};

describe('MainPage', () => {
    beforeEach(() => {
        mockedAxios.get.mockResolvedValue(mockApiResponse);
    });

    it('renders without crashing', async () => {
        await act(async () => {
            render(
                <MemoryRouter>
                    <WeatherDataProvider>
                        <MainPage />
                    </WeatherDataProvider>
                </MemoryRouter>
            );
        })
    });

it('displays the city name after fetching weather data', async () => {
    let renderResult: ReturnType<typeof render>;

    await act(async () => {
        renderResult = render(
            <MemoryRouter>
                <WeatherDataProvider>
                    <MainPage />
                </WeatherDataProvider>
            </MemoryRouter>
        );
    });

    const { getByText } = renderResult!;
    expect(getByText('Sample City')).toBeInTheDocument();
});
    
    it('renders the TemperatureSwitcher component and can switch temperature units', async () => {
        let renderResult: ReturnType<typeof render>;

        await act(async () => {
            renderResult = render(
                <MemoryRouter>
                    <WeatherDataProvider>
                        <MainPage />
                    </WeatherDataProvider>
                </MemoryRouter>
            );
        });

        const { getByText } = renderResult!;

        const celsiusButton = getByText(temperatureUnits[0].name + ' ' + temperatureUnits[0].sign);
        fireEvent.click(celsiusButton);

        await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(2));
    });

});