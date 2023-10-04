import React, { FC } from 'react';
import { HourlyWeather } from '../interfaces/interfaces';
import { getIcon } from '../utils/getWeatherTypes';
import { temperatureUnits } from '../constants/constants';
import _ from 'lodash';

const HourLine: FC<HourlyWeather> = ({ hourOfTheWeather, weatherType, highestTemp, lowestTemp, feelsLike, windSpeed, unitOfMeasure }) => {
    const metricSign = _.find(temperatureUnits, ['requestParam', unitOfMeasure])?.sign;

    return (
        <div className='hour-line'>
            <div className="hour-line-element">
                {hourOfTheWeather}
            </div>

            {getIcon(weatherType, 40)}

            <div className="hour-line-element">
                {lowestTemp} {metricSign}
                <div>Low</div>
            </div>

            <div className="hour-line-element">
                {highestTemp} {metricSign}
                <div>High</div>
            </div>

            <div className="hour-line-element">
                {feelsLike} {metricSign}
                <div>feelsLike</div>
            </div>

            <div className="hour-line-element">
                {windSpeed}/mph
                <div>Wind</div>
            </div>
        </div>
    );
}

export default HourLine;
