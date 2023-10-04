import React from 'react';
import { render, waitFor, fireEvent, act } from '@testing-library/react';
import axios from 'axios';
import MainPage from './MainPage';
import { WeatherDataProvider } from '../WeatherContext';
import { temperatureUnits } from '../constants/constants';
import { MemoryRouter } from 'react-router-dom';

// Mocking the axios module
jest.mock('axios');

// Cast the mocked axios module to its mocked version
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mocked API response
const mockApiResponse = {
    data: {
        city: { name: 'Sample City' },
        list: [] // You can populate this with a sample list from your real API
    }
};

describe('MainPage', () => {
    beforeEach(() => {
        // Reset the mocks before each test
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

        // You can also assert other behavior resulting from this interaction
        await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(2)); // Since axios gets called again to fetch new data
    });

    // TODO: Add more tests based on behavior of the component (e.g., loading state, error states, interactions, etc.)
});