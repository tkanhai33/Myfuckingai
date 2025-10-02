import React, { useMemo } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import SpendSummary from '../components/SpendSummary';
import SubscriptionCard from '../components/SubscriptionCard';
import { RootStackParamList } from '../navigation/AppNavigator';
import { RootState } from '../store';
import { colors } from '../theme/colors';
import { Subscription } from '../types/subscription';

const MONTHLY_MULTIPLIERS: Record<string, number> = {
  monthly: 1,
  weekly: 4,
  annual: 1 / 12
};

const getMonthlyEquivalent = (subscription: Subscription) =>
  subscription.cost * (MONTHLY_MULTIPLIERS[subscription.frequency] ?? 1);

type Props = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

const DashboardScreen: React.FC<Props> = ({ navigation }) => {
  const { items } = useSelector((state: RootState) => state.subscriptions);

  const { monthlyTotal, upcoming } = useMemo(() => {
    const now = new Date();
    const monthly = items.reduce((total, item) => total + getMonthlyEquivalent(item), 0);
    const upcomingItems = items.filter(item => {
      if (!item.nextBillingDate) {
        return false;
      }
      const nextDate = new Date(item.nextBillingDate);
      const difference = nextDate.getTime() - now.getTime();
      const days = difference / (1000 * 60 * 60 * 24);
      return days >= 0 && days <= 30;
    });

    return {
      monthlyTotal: parseFloat(monthly.toFixed(2)),
      upcoming: upcomingItems
    };
  }, [items]);

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <SubscriptionCard
            subscription={item}
            onPress={() =>
              navigation.navigate('SubscriptionDetail', { subscriptionId: item.id })
            }
          />
        )}
        ListHeaderComponent={
          <>
            <Text style={styles.heading}>Every subscription, organized.</Text>
            <SpendSummary totalMonthly={monthlyTotal} upcomingCount={upcoming.length} />
            <TouchableOpacity
              onPress={() => navigation.navigate('ManualEntry')}
              style={styles.manualButton}
            >
              <Text style={styles.manualButtonText}>Add subscription</Text>
            </TouchableOpacity>
            <Text style={styles.sectionTitle}>Active subscriptions</Text>
          </>
        }
        ListEmptyComponent={<Text style={styles.empty}>No subscriptions detected yet.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  listContent: {
    padding: 20
  },
  heading: {
    fontSize: 24,
    fontFamily: 'Inter',
    fontWeight: '600',
    color: colors.secondaryCharcoal,
    marginBottom: 16
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter',
    fontWeight: '500',
    color: colors.textPrimary,
    marginVertical: 16
  },
  empty: {
    textAlign: 'center',
    color: colors.textSecondary,
    marginTop: 24
  },
  manualButton: {
    backgroundColor: colors.accentBronze,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center'
  },
  manualButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Inter',
    fontWeight: '600'
  }
});

export default DashboardScreen;
