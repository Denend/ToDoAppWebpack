import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import initSubscriber from 'redux-subscriber';
import reducer from './reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: 'notes',
};

const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(persistedReducer, undefined, applyMiddleware(logger));
const persistor = persistStore(store);
const subscribe = initSubscriber(store);

export default store;
