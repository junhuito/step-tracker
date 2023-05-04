import { persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// reducers
import { weatherReducer } from './weatherReducer';
import { stepReducer } from './stepReducer';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

export const rootReducer = persistCombineReducers(persistConfig, {
    weatherReducer,
    stepReducer
});