import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SecondaryCard from './SecondaryCard';

describe('SecondaryCard', () => {   
    const mockOnClick = jest.fn();
    const sampleProps = {
        id: '12345',
        onWeatherCardClick: mockOnClick,
        dateOfTheDay: 'Monday',
        weatherType: 'Sunny',
        lowestTempOfDay: 15,
        highestTempOfDay: 25,
        alerts: ['Alert 1', 'Alert 2'],
        unitOfMeasure: 'metric'
    };

    it('renders without crashing', () => {
        const { getByText } = render(<SecondaryCard {...sampleProps} />);
        expect(getByText('Monday')).toBeInTheDocument();
        expect(getByText('Sunny')).toBeInTheDocument();
        expect(getByText('15 °C')).toBeInTheDocument();
        expect(getByText('Alert 1')).toBeInTheDocument();
        expect(getByText('Alert 2')).toBeInTheDocument();
    });

    it('triggers onWeatherCardClick when clicked', () => {
        const { getByText } = render(<SecondaryCard {...sampleProps} />);
        const card = getByText('Monday').closest('.secondary-card-weather');
        if (card) {
            fireEvent.click(card);
            expect(mockOnClick).toHaveBeenCalledWith('12345');
        }
    });
});