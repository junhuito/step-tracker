import { IWeatherData, IWeatherError } from '../../interfaces/weatherInterface';

export const FETCH_WEATHER = "FETCH_WEATHER";
export const SET_WEATHER_DATA = "SET_WEATHER_DATA";
export const SET_WEATHER_ERROR = "SET_WEATHER_ERROR";

export const fetchWeatherAction = () => ({
    type: FETCH_WEATHER,
});

export const setWeatherDataAction = (payload:IWeatherData) => ({
    type: SET_WEATHER_DATA,
    payload
});

export const setWeatherErrorAction = (payload:IWeatherError) => ({
    type: SET_WEATHER_ERROR,
    payload
});
