import { configureStore } from '@reduxjs/toolkit';
import subscriptionsReducer from './subscriptionsSlice';
import settingsReducer from './settingsSlice';

export const store = configureStore({
  reducer: {
    subscriptions: subscriptionsReducer,
    settings: settingsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
