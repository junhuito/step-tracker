import { fork, all } from 'redux-saga/effects';

// saga
import { weatherSaga } from './weatherSaga';

export function* rootSaga() {
    yield all([
        fork(weatherSaga),
    ]);
}