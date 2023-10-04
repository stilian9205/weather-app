import React, { useState, useEffect, useRef, useCallback } from 'react';
import SecondaryCard from './SecondaryCard';
import PrimaryCard from './PrimaryCard';
import TemperatureSwitcher from './TemperatureSwitcher';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';
import { transformWeatherData } from '../utils/transformWeatherData';
import { defaultUrl, defaultLatLng, apiKey } from '../constants/constants';
import localforage from 'localforage';
import LoadingSpinner from './LoadingSpinner';
import { useWeatherData } from '.././customHooks/weatherDataHook';

const MainPage = () => {
    const navigate = useNavigate();
    const { weatherData, setWeatherData } = useWeatherData();
    const [cityName, setCityName] = useState(null);
    const [loading, setLoading] = useState(false); 
    const [unitOfMeasure, setUnitOfMeasure] = useState<string | null>(null);
    const [coords, setCoords] = useState(defaultLatLng);
    const source = useRef(axios.CancelToken.source());

    const fetchWeatherData = useCallback(async (coords: any, metric: any) => {
        setLoading(true);
        await axios.get(defaultUrl, {
            params: {
                lat: coords.latitude,
                lon: coords.longitude,
                units: metric,
                appid: apiKey
            },
            cancelToken: source.current?.token
        }).then((response) => {
                setCityName(response.data.city.name)
            setWeatherData?.(transformWeatherData(response.data.list));
            setLoading(false);
            }).catch((error) => {
                console.log(error);
                setLoading(false);
            })
    }, [setWeatherData])

    useEffect(() => {
        const currentSource = source.current;

        localforage.getItem('metric').then((value: any) => {
            setUnitOfMeasure(value)

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setCoords(position.coords)
                        fetchWeatherData(position.coords, value)
                    },
                    (error) => {
                        fetchWeatherData(defaultLatLng, value)
                        console.log(error)
                    }
                );
            } else {
                fetchWeatherData(defaultLatLng, value)
            }
        }).catch((error) => {
            console.log("Unable to retriev unit of measure from localforage (it's either not set or there is an error), check the error below: ")
            console.log(error)
            fetchWeatherData(defaultLatLng, '')
        })
        
       

        return () => {
            currentSource?.cancel('Component unmounted');
        };
    }, [fetchWeatherData])

    const onWeatherCardClick = (dayId: string) => {
        navigate('/weather-hours', { state: { dayId: dayId, cityName: cityName, unitOfMeasure: unitOfMeasure } });
    };

    const onChangeMetrics = (metric: string) => {
        fetchWeatherData(coords, metric)
        setUnitOfMeasure(metric)
        localforage.setItem('metric', metric).then(() => {
        }).catch(err => {
            console.log('Unable to set the metric value in localforage');
        })
    }

    if(loading) {
        return (
            <div className='container'>
                <LoadingSpinner />
            </div>
        )
    }

    return (
        <div className='container'>
            <TemperatureSwitcher 
                onChangeMetrics={onChangeMetrics}
                unitOfMeasure={unitOfMeasure}
            />
            <h1 style={{ color: 'white', textAlign: 'center' }}>{cityName}</h1>
            <div className='primary-card'>
                {weatherData?.[0] && 
                <PrimaryCard
                    onWeatherCardClick={onWeatherCardClick}
                    id={weatherData[0].id}
                    highestTempOfDay={weatherData[0].highestTempOfDay}
                    lowestTempOfDay={weatherData[0].lowestTempOfDay}
                    weatherType={weatherData[0].weatherType}
                    dateOfTheDay={weatherData[0].dateOfTheDay}
                    alerts={weatherData[0].alerts}
                    unitOfMeasure={unitOfMeasure}
                />}
            </div>
            <div className="secondary-cards">
                {_.map(weatherData, (weatherInfo, key) => {
                    if(key > 0) {
                        return <SecondaryCard
                            key={key}
                            onWeatherCardClick={onWeatherCardClick}
                            id={weatherInfo.id}
                            highestTempOfDay={weatherInfo.highestTempOfDay}
                            lowestTempOfDay={weatherInfo.lowestTempOfDay}
                            weatherType={weatherInfo.weatherType}
                            dateOfTheDay={weatherInfo.dateOfTheDay}
                            alerts={weatherInfo.alerts}
                            unitOfMeasure={unitOfMeasure}
                        />
                    }
                })}
            </div>
        </div>
    );
}

export default MainPage;
