import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import bookingReducer from './bookingSlice';
import wishlistReducer from './wishlistSlice';
import movieReducer from './movieSlice';
import ticketsReducer from './ticketsSlice';
import { createLogger } from 'redux-logger';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['wishlist','booking'], 
};


const logger = createLogger({
  collapsed: true,
  diff: true,
  predicate: () => process.env.NODE_ENV === 'development' 
});


const rootReducer = {
  wishlist: persistReducer(persistConfig, wishlistReducer),
  movies: movieReducer,
  tickets: ticketsReducer,
  booking: bookingReducer
};

// Configure the Redux store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/PURGE',
          'persist/REGISTER'
        ],
      },
    });

    // Only add logger in development
    if (process.env.NODE_ENV === 'development') {
      return middleware.concat(logger);
    }
    return middleware;
  },
  devTools: process.env.NODE_ENV !== 'production' // Enable DevTools in development only
});

export const persistor = persistStore(store);