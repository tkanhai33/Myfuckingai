import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

interface Props {
  totalMonthly: number;
  upcomingCount: number;
}

const SpendSummary: React.FC<Props> = ({ totalMonthly, upcomingCount }) => (
  <View style={styles.container}>
    <View>
      <Text style={styles.label}>Monthly spend</Text>
      <Text style={styles.total}>${totalMonthly.toFixed(2)}</Text>
    </View>
    <View>
      <Text style={styles.label}>Upcoming</Text>
      <Text style={styles.total}>{upcomingCount}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryTeal,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24
  },
  label: {
    color: '#FFFFFFAA',
    fontFamily: 'System',
    fontSize: 14
  },
  total: {
    color: '#FFFFFF',
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 20,
    marginTop: 8
  }
});

export default SpendSummary;
