
import { createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import userReducer from './userReducer';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'siteEventos',
    storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export {store, persistor};
