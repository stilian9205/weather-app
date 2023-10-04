import _ from 'lodash';
import { TransformedWeatherData } from '.././interfaces/interfaces';

export const transformWeatherData = (data: any[]): TransformedWeatherData[] => {
    // Grouping data by day
    const groupedByDay = _.groupBy(data, (item) => new Date(item.dt * 1000).toISOString().split('T')[0]);

    // Iterating over the grouped data and transforming it
    const transformedData = _.map(groupedByDay, (items, dateOfTheDay, key) => {
        // Initializing dayData object
        const dayData: TransformedWeatherData = {
            id: _.uniqueId('day_'),
            dateOfTheDay: dateOfTheDay,
            weatherType: '',
            lowestTempOfDay: Number.MAX_SAFE_INTEGER,
            highestTempOfDay: Number.MIN_SAFE_INTEGER,
            alerts: [],
            byHours: [],
        };

        // Creating the byHours array
        dayData.byHours = items.map(item => {
            const date = new Date(item.dt * 1000);
            const hour = date.toISOString().split('T')[1].split(':')[0];

            return {
                hourOfTheWeather: `${hour}:00`,
                weatherType: item.weather[0].main,
                lowestTemp: Math.round(item.main.temp_min),
                highestTemp: Math.round(item.main.temp_max),
                windSpeed: item.wind.speed,
                feelsLike: Math.round(item.main.feels_like),
            };
        });

        // Calculating the lowest and highest temperature of the day
        dayData.byHours.forEach(hourData => {
            dayData.lowestTempOfDay = Math.min(dayData.lowestTempOfDay, hourData.lowestTemp);
            dayData.highestTempOfDay = Math.max(dayData.highestTempOfDay, hourData.highestTemp);
        });

        // Determining the most frequent weatherType in byHours
        const mostFrequentWeatherType = _(dayData.byHours)
            .countBy('weatherType')
            .toPairs()
            .maxBy(_.last);

        dayData.weatherType = mostFrequentWeatherType ? mostFrequentWeatherType[0] : '';

        return dayData;
    });
    // Taking only the first 5 days (today + next 4 days)
    return _.take(transformedData, 5);
};