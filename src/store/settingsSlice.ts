import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type EmailProviderConfig = {
  id: string;
  label: string;
  username: string;
  host: string;
  port: number;
  useSsl: boolean;
};

type SettingsState = {
  hasCompletedOnboarding: boolean;
  providers: EmailProviderConfig[];
  analyticsEnabled: boolean;
};

const initialState: SettingsState = {
  hasCompletedOnboarding: false,
  providers: [],
  analyticsEnabled: false
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    completeOnboarding(state) {
      state.hasCompletedOnboarding = true;
    },
    addProvider(state, action: PayloadAction<EmailProviderConfig>) {
      state.providers.push(action.payload);
    },
    removeProvider(state, action: PayloadAction<string>) {
      state.providers = state.providers.filter(provider => provider.id !== action.payload);
    },
    toggleAnalytics(state, action: PayloadAction<boolean | undefined>) {
      state.analyticsEnabled = action.payload ?? !state.analyticsEnabled;
    }
  }
});

export const { completeOnboarding, addProvider, removeProvider, toggleAnalytics } =
  settingsSlice.actions;

export default settingsSlice.reducer;
