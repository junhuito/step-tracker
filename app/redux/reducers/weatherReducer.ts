import { SET_WEATHER_DATA, SET_WEATHER_ERROR } from '../actions';
import { IWeatherAction, IWeatherData, IWeatherReducer, IWeatherError } from '../../interfaces/weather';

const initialState: IWeatherReducer = {
    data: {} as IWeatherData,
    status: 'idle',
    isLoading: false,
    error: {
      message: ""
    } as IWeatherError,
};

export const weatherReducer = (state = initialState, action: IWeatherAction) => {
    switch(action.type) {
        case SET_WEATHER_DATA:
            return {
                ...state,
                data: action.payload
            }
        case SET_WEATHER_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default: return state;
    }
};