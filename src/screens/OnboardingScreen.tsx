import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Switch,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { addProvider, completeOnboarding } from '../store/settingsSlice';
import { useAppDispatch } from '../store/hooks';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors } from '../theme/colors';
import { v4 as uuidv4 } from 'uuid';

const DEFAULT_IMAP_PORT = 993;

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const [providerLabel, setProviderLabel] = useState('Primary inbox');
  const [email, setEmail] = useState('');
  const [host, setHost] = useState('');
  const [port, setPort] = useState(String(DEFAULT_IMAP_PORT));
  const [useSsl, setUseSsl] = useState(true);

  const canContinue = email && host;

  const handleContinue = () => {
    dispatch(
      addProvider({
        id: uuidv4(),
        label: providerLabel,
        username: email,
        host,
        port: Number(port) || DEFAULT_IMAP_PORT,
        useSsl
      })
    );

    dispatch(completeOnboarding());
    navigation.replace('Dashboard');
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Subskribe</Text>
        <Text style={styles.subtitle}>
          Connect your inbox to automatically detect and organize your subscriptions.
        </Text>

        <Text style={styles.label}>Email label</Text>
        <TextInput
          style={styles.input}
          placeholder="Work, personal, etc."
          value={providerLabel}
          onChangeText={setProviderLabel}
        />

        <Text style={styles.label}>Email address</Text>
        <TextInput
          style={styles.input}
          placeholder="you@example.com"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>IMAP host</Text>
        <TextInput
          style={styles.input}
          placeholder="imap.mailprovider.com"
          autoCapitalize="none"
          value={host}
          onChangeText={setHost}
        />

        <Text style={styles.label}>Port</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={port}
          onChangeText={setPort}
        />

        <View style={styles.switchRow}>
          <Text style={styles.label}>Use SSL</Text>
          <Switch value={useSsl} onValueChange={setUseSsl} />
        </View>

        <TouchableOpacity
          disabled={!canContinue}
          onPress={handleContinue}
          style={[styles.button, !canContinue && styles.buttonDisabled]}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: colors.background
  },
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 80
  },
  title: {
    fontFamily: 'Inter',
    fontSize: 28,
    fontWeight: '700',
    color: colors.secondaryCharcoal,
    marginBottom: 12
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 32
  },
  label: {
    fontSize: 14,
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
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32
  },
  button: {
    backgroundColor: colors.primaryTeal,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center'
  },
  buttonDisabled: {
    opacity: 0.5
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600'
  }
});

export default OnboardingScreen;
