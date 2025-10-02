import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch } from '../store/hooks';
import { addSubscription } from '../store/subscriptionsSlice';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors } from '../theme/colors';

const ManualEntryScreen: React.FC<NativeStackScreenProps<RootStackParamList, 'ManualEntry'>> = ({
  navigation
}) => {
  const dispatch = useAppDispatch();
  const [serviceName, setServiceName] = useState('');
  const [cost, setCost] = useState('');
  const [frequency, setFrequency] = useState('monthly');
  const [nextBillingDate, setNextBillingDate] = useState('');
  const [manageUrl, setManageUrl] = useState('');

  const canSave = serviceName && cost;

  const handleSave = () => {
    const now = new Date().toISOString();
    dispatch(
      addSubscription({
        id: uuidv4(),
        serviceName,
        cost: Number(cost),
        currency: 'CAD',
        frequency: frequency as any,
        nextBillingDate: nextBillingDate || undefined,
        manageUrl: manageUrl || undefined,
        category: 'Manual',
        status: 'active',
        createdAt: now,
        updatedAt: now,
        source: 'manual'
      })
    );

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Service name</Text>
      <TextInput style={styles.input} value={serviceName} onChangeText={setServiceName} />

      <Text style={styles.label}>Cost</Text>
      <TextInput
        style={styles.input}
        value={cost}
        onChangeText={setCost}
        keyboardType="decimal-pad"
      />

      <Text style={styles.label}>Frequency</Text>
      <TextInput style={styles.input} value={frequency} onChangeText={setFrequency} />

      <Text style={styles.label}>Next billing date (YYYY-MM-DD)</Text>
      <TextInput style={styles.input} value={nextBillingDate} onChangeText={setNextBillingDate} />

      <Text style={styles.label}>Manage URL</Text>
      <TextInput style={styles.input} value={manageUrl} onChangeText={setManageUrl} />

      <TouchableOpacity
        disabled={!canSave}
        style={[styles.button, !canSave && styles.buttonDisabled]}
        onPress={handleSave}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.background
  },
  label: {
    color: colors.textSecondary,
    marginBottom: 8
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16
  },
  button: {
    backgroundColor: colors.accentBronze,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center'
  },
  buttonDisabled: {
    opacity: 0.5
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600'
  }
});

export default ManualEntryScreen;
