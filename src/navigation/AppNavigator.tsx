import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/DashboardScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import SubscriptionDetailScreen from '../screens/SubscriptionDetailScreen';
import ManualEntryScreen from '../screens/ManualEntryScreen';

export type RootStackParamList = {
  Onboarding: undefined;
  Dashboard: undefined;
  SubscriptionDetail: { subscriptionId: string };
  ManualEntry: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <Stack.Navigator
    initialRouteName="Onboarding"
    screenOptions={{
      headerStyle: { backgroundColor: '#0A7E8C' },
      headerTintColor: '#FFFFFF',
      headerTitleStyle: { fontFamily: 'Inter', fontWeight: '600' }
    }}
  >
    <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Subskribe' }} />
    <Stack.Screen name="SubscriptionDetail" component={SubscriptionDetailScreen} options={{ title: 'Details' }} />
    <Stack.Screen name="ManualEntry" component={ManualEntryScreen} options={{ title: 'Add Subscription' }} />
  </Stack.Navigator>
);

export default AppNavigator;
