import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore } from 'redux-persist';
import { rootReducer } from '../reducers';
import { rootSaga } from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(
        {
            serializableCheck: {
              ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }
    ).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export const storePersist = persistStore(store);

export default store;