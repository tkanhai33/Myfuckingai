import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
import { Subscription } from '../types/subscription';
import { currencyFormat, formatDate, formatFrequency } from '../utils/format';

type Props = {
  subscription: Subscription;
  onPress?: () => void;
};

const SubscriptionCard: React.FC<Props> = ({ subscription, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.card} activeOpacity={0.8}>
    <View style={styles.header}>
      <Text style={styles.serviceName}>{subscription.serviceName}</Text>
      <Text style={styles.cost}>{currencyFormat(subscription.cost, subscription.currency)}</Text>
    </View>
    <View style={styles.metaRow}>
      <Text style={styles.metaLabel}>Frequency</Text>
      <Text style={styles.metaValue}>{formatFrequency(subscription.frequency)}</Text>
    </View>
    <View style={styles.metaRow}>
      <Text style={styles.metaLabel}>Next billing</Text>
      <Text style={styles.metaValue}>{formatDate(subscription.nextBillingDate)}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 12,
    elevation: 4
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  serviceName: {
    fontSize: 18,
    fontFamily: 'Inter',
    color: colors.textPrimary
  },
  cost: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primaryTeal
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  metaLabel: {
    color: colors.textSecondary,
    fontFamily: 'System'
  },
  metaValue: {
    color: colors.secondaryCharcoal,
    fontWeight: '500'
  }
});

export default SubscriptionCard;
