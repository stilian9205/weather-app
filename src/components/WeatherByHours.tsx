import React, { useEffect} from 'react';
import HourLine from './HourLine';
import { useLocation, useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { BiArrowBack } from "react-icons/bi";
import { useWeatherData } from '../customHooks/weatherDataHook';

function WeatherByHours() {
    const location = useLocation();
    const dayId = location.state?.dayId;
    const unitOfMeasure = location.state?.unitOfMeasure;
    const navigate = useNavigate();
    const { weatherData } = useWeatherData();
    const weatherByHours = _.find(weatherData, (weather) => weather.id === dayId);


    useEffect(() => {
        if (!weatherByHours) {
            navigate('/'); 
        }
    }, [navigate, weatherByHours]);

    return (
        <div className='container'>
            <div className="go-back-arrow" onClick={() => navigate(-1)}>
                <BiArrowBack size={40} color={'#fff'} />
            </div>

            {weatherByHours && _.map(weatherByHours.byHours, (hourLine, key) => {
                return <HourLine key={key} unitOfMeasure={unitOfMeasure} {...hourLine}
                />
            })}
        </div>
    );
}

export default WeatherByHours;
