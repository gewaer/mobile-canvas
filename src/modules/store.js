import { applyMiddleware, createStore, compose } from 'redux';
import { createOffline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import thunk from 'redux-thunk'
import logger from 'redux-logger';
import axios from '@config/axios';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import rootReducer from './RootReducer';

const persistConfig = {
  key: 'root',
  storage
};

const {
  middleware: offlineMiddleware,
  enhanceReducer: offlineEnhanceReducer,
  enhanceStore: offlineEnhanceStore
} = createOffline({
  ...offlineConfig,
  persist: false
});

const persistedReducer = persistReducer(
  persistConfig,
  offlineEnhanceReducer(rootReducer)
);


export default function configureStore() {
  const store = createStore(
    persistedReducer,
    composeWithDevTools(
      offlineEnhanceStore,
      applyMiddleware(thunk.withExtraArgument(axios), offlineMiddleware, logger)
    )
  );
  const persistor = persistStore(store);

  return { persistor, store };
}