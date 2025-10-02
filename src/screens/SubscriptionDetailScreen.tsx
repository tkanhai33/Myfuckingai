import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { RootStackParamList } from '../navigation/AppNavigator';
import { RootState } from '../store';
import { colors } from '../theme/colors';
import { currencyFormat, formatDate, formatFrequency } from '../utils/format';

interface DetailRowProps {
  label: string;
  value?: string | number;
  emphasize?: boolean;
}

const DetailRow: React.FC<DetailRowProps> = ({ label, value = '—', emphasize }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={[styles.detailValue, emphasize && styles.detailValueEm]}>{value}</Text>
  </View>
);

type Props = NativeStackScreenProps<RootStackParamList, 'SubscriptionDetail'>;

const SubscriptionDetailScreen: React.FC<Props> = ({ route }) => {
  const { subscriptionId } = route.params;
  const subscription = useSelector((state: RootState) =>
    state.subscriptions.items.find(item => item.id === subscriptionId)
  );

  const monthlyEquivalent = useMemo(
    () => (subscription ? currencyFormat(subscription.cost) : '$0.00'),
    [subscription]
  );

  if (!subscription) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Subscription not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{subscription.serviceName}</Text>
        <Text style={styles.cost}>{currencyFormat(subscription.cost, subscription.currency)}</Text>
        <Text style={styles.frequency}>{formatFrequency(subscription.frequency)}</Text>
      </View>

      <DetailRow label="Next billing" value={formatDate(subscription.nextBillingDate)} />
      <DetailRow label="Status" value={subscription.status} />
      <DetailRow label="Category" value={subscription.category ?? 'Uncategorized'} />
      <DetailRow label="Monthly equivalent" value={monthlyEquivalent} emphasize />
      {subscription.confidence !== undefined && (
        <DetailRow label="Detection confidence" value={`${Math.round(subscription.confidence * 100)}%`} />
      )}

      {subscription.manageUrl && (
        <TouchableOpacity
          style={styles.manageButton}
          onPress={() => Linking.openURL(subscription.manageUrl!)}
        >
          <Text style={styles.manageButtonText}>Manage subscription</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24
  },
  header: {
    backgroundColor: colors.cardBackground,
    padding: 24,
    borderRadius: 16,
    marginBottom: 24,
    shadowOpacity: 0.05,
    shadowRadius: 12
  },
  title: {
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: '600',
    color: colors.secondaryCharcoal,
    marginBottom: 12
  },
  cost: {
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: '600',
    color: colors.primaryTeal
  },
  frequency: {
    marginTop: 8,
    color: colors.textSecondary
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EA'
  },
  detailLabel: {
    color: colors.textSecondary
  },
  detailValue: {
    color: colors.textPrimary,
    fontWeight: '500'
  },
  detailValueEm: {
    color: colors.accentBronze
  },
  manageButton: {
    marginTop: 32,
    backgroundColor: colors.primaryTeal,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center'
  },
  manageButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Inter',
    fontWeight: '600'
  },
  error: {
    color: colors.textSecondary
  }
});

export default SubscriptionDetailScreen;
