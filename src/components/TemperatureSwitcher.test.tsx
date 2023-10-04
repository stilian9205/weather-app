import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TemperatureSwitcher from './TemperatureSwitcher';
import { temperatureUnits } from '../constants/constants';

describe('TemperatureSwitcher', () => {
    const mockOnChangeMetrics = jest.fn();

    const defaultProps = {
        onChangeMetrics: mockOnChangeMetrics,
        unitOfMeasure: 'metric'
    };

    it('renders without crashing', () => {
        const { getByText } = render(<TemperatureSwitcher {...defaultProps} />);

        temperatureUnits.forEach(unit => {
            expect(getByText(`${unit.name} ${unit.sign}`)).toBeInTheDocument();
        });
    });

    it('sets the correct unit as inactive based on prop', () => {
        const { getByText } = render(<TemperatureSwitcher {...defaultProps} />);
        const metricUnit = getByText(`${temperatureUnits[0].name} ${temperatureUnits[0].sign}`);
        expect(metricUnit.className).toContain("inactive-temperature-units");
    });

    it('triggers onChangeMetrics when a unit is clicked', () => {
        const { getByText } = render(<TemperatureSwitcher {...defaultProps} />);
        const metricUnit = getByText(`${temperatureUnits[0].name} ${temperatureUnits[0].sign}`);
        fireEvent.click(metricUnit);
        expect(mockOnChangeMetrics).toHaveBeenCalledWith(temperatureUnits[0].requestParam);
    });

    it('renders dividers between temperature units', () => {
        const { getAllByText } = render(<TemperatureSwitcher {...defaultProps} />);
        const dividers = getAllByText('|');
        expect(dividers).toHaveLength(temperatureUnits.length - 1);
    });
});