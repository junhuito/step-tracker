import { fork, all } from 'redux-saga/effects';

// saga
import { weatherSaga } from './weatherSaga';
import { stepSaga } from './stepSaga';

export function* rootSaga() {
    yield all([
        fork(weatherSaga),
        fork(stepSaga),
    ]);
}