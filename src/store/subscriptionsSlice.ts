import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Subscription } from '../types/subscription';

export type SubscriptionsState = {
  items: Subscription[];
  isLoading: boolean;
  lastSyncedAt?: string;
};

const initialState: SubscriptionsState = {
  items: [],
  isLoading: false
};

const subscriptionsSlice = createSlice({
  name: 'subscriptions',
  initialState,
  reducers: {
    setSubscriptions(state, action: PayloadAction<Subscription[]>) {
      state.items = action.payload;
    },
    addSubscription(state, action: PayloadAction<Subscription>) {
      state.items.push(action.payload);
    },
    updateSubscription(state, action: PayloadAction<Subscription>) {
      state.items = state.items.map(item =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item
      );
    },
    removeSubscription(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setLastSyncedAt(state, action: PayloadAction<string | undefined>) {
      state.lastSyncedAt = action.payload;
    }
  }
});

export const {
  setSubscriptions,
  addSubscription,
  updateSubscription,
  removeSubscription,
  setLoading,
  setLastSyncedAt
} = subscriptionsSlice.actions;

export default subscriptionsSlice.reducer;
