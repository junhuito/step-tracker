import { call, put, takeEvery } from 'redux-saga/effects'
import { FETCH_WEATHER, setWeatherDataAction, setWeatherErrorAction } from '../actions';
import { ApiService } from '../../service/apiservice';
import { AxiosResponse } from 'axios';
import { IWeatherData, IWeatherResponseData } from '../../interfaces/weatherInterface';
import { getWeatherCondition } from '../../../utils/weatherCodeUtil';
import { Location, ILocation } from '../../../utils/geolocationUtil'; 


function* fetchWeather() {
  try {
    const { latitude, longitude }:ILocation  = yield call(Location.getCurrentLocation);

    const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

    const { data  }: AxiosResponse<IWeatherResponseData> = yield call(ApiService.get, weatherURL);

    const { weathercode } = data?.current_weather;

    const weatherData:IWeatherData = {
      ...data?.current_weather,
      weather: getWeatherCondition(weathercode),
    }

    yield put(setWeatherDataAction(weatherData));

  } catch (e) {
    yield put(setWeatherErrorAction({ message: "Unable to fetch weather data" }));
  }
}

function* weatherSaga() {
  yield takeEvery(FETCH_WEATHER, fetchWeather);
}

export {
  weatherSaga
} ;