import React, { FC } from 'react';
import { getIcon } from '../utils/getWeatherTypes';
import { WeatherCard } from '../interfaces/interfaces';
import _ from 'lodash'
import { temperatureUnits } from '../constants/constants';

const SecondaryCard: FC<WeatherCard> = ({ id, onWeatherCardClick, dateOfTheDay, weatherType, lowestTempOfDay, highestTempOfDay, alerts, unitOfMeasure }) => {
    return (
        <div className="secondary-card-weather" onClick={() => onWeatherCardClick(id)}>
            <div className="secondary-card-date">{dateOfTheDay}</div>
            {getIcon(weatherType, 40)}
            <div className="weather-type">{weatherType}</div>
            
            <div className="secondary-card-weather-info">
                <span className="weather">{lowestTempOfDay} {_.find(temperatureUnits, ['requestParam', unitOfMeasure])?.sign}</span>
            </div>
            {_.map(alerts, (alert, key) => {
                return <div key={key} className='secondary-card-alert'>{alert}</div>;
            })}
        </div>
    );
};

export default SecondaryCard;