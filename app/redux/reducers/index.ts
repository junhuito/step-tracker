import { combineReducers } from 'redux';

// reducers
import { weatherReducer } from './weatherReducer';

export const rootReducer = combineReducers({
    weatherReducer,
});