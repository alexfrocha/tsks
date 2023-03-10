import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import homeReducer from './features/homeSlice'
import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {PersistGate} from 'redux-persist/integration/react'

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);



const persistConfig = {key: 'root', storage, version: 1}

const persistedReducer = persistReducer(persistConfig, homeReducer)


const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <ColorModeScript />
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);