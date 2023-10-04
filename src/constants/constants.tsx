const defaultUrl = 'https://api.openweathermap.org/data/2.5/forecast';
const defaultLatLng = { latitude: 42.700841, longitude: 23.319603 };
const apiKey = '137945dad6aab7e296e85e48abe86970';

const temperatureUnits = [
    {
        name: "Celsius",
        sign: "°C",
        requestParam: "metric"
    },
    {
        name: "Fahrenheit",
        sign: "°F",
        requestParam: "imperial"
    },
    {
        name: "Kelvin",
        sign: "K",
        requestParam: ""
    }
]

export {
    defaultUrl,
    defaultLatLng,
    apiKey,
    temperatureUnits,
}