import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PrimaryCard from './PrimaryCard';
import { temperatureUnits } from '../constants/constants';

const sampleProps = {
    id: '1',
    onWeatherCardClick: jest.fn(),
    dateOfTheDay: '2023-10-04',
    weatherType: 'rain',
    lowestTempOfDay: 10,
    highestTempOfDay: 20,
    alerts: ['Flood warning', 'High winds'],
    unitOfMeasure: ''
};

describe('<PrimaryCard />', () => {
    it('renders without crashing', () => {
        render(<PrimaryCard {...sampleProps} />);
    });

    it('displays the correct date, weather data, and metric sign', () => {
        const { getByText } = render(<PrimaryCard {...sampleProps} />);

        expect(getByText('Today')).toBeInTheDocument();
        expect(getByText('2023-10-04')).toBeInTheDocument();
        expect(getByText('rain')).toBeInTheDocument();
        expect(getByText('Flood warning')).toBeInTheDocument();
        expect(getByText('High winds')).toBeInTheDocument();
    });

    it('calls onWeatherCardClick with the correct ID when clicked', () => {
        const { container } = render(<PrimaryCard {...sampleProps} />);
        const cardElement = container.querySelector('.primary-weather-component');

        fireEvent.click(cardElement!); 

        expect(sampleProps.onWeatherCardClick).toHaveBeenCalledWith(sampleProps.id);
    });

});