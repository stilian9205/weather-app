import React, { FC } from 'react';
import { getIcon } from '../utils/getWeatherTypes';
import _ from 'lodash';
import { WeatherCard } from '../interfaces/interfaces';
import { temperatureUnits } from '../constants/constants';

const PrimaryCard: FC<WeatherCard> = ({ id, onWeatherCardClick, dateOfTheDay, weatherType, lowestTempOfDay, highestTempOfDay, alerts, unitOfMeasure }) => {

    return (
        <div className="primary-weather-component" onClick={() => onWeatherCardClick(id)}>
            <h1>Today</h1>
            <div className="date">{dateOfTheDay}</div>
            {getIcon(weatherType, 60)}
            <div className="details">
                <p>{weatherType}</p>
                <p>
                    Lowest: <b>{lowestTempOfDay} {_.find(temperatureUnits, ['requestParam', unitOfMeasure])?.sign}</b> 
                    | 
                    Highest: <b>{highestTempOfDay} {_.find(temperatureUnits, ['requestParam', unitOfMeasure])?.sign}</b></p>
            </div>

            {_.map(alerts, (alert, key) => {
                return <div key={key} className='alert'>{alert}</div>;
            })}
        </div>
    );
};

export default PrimaryCard;