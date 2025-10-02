import AsyncStorage from '@react-native-async-storage/async-storage';

const LOG_KEY = '@subskribe:logs';

export interface LogEntry {
  id: string;
  message: string;
  level: 'info' | 'warning' | 'error';
  timestamp: string;
  context?: Record<string, unknown>;
}

export const logEvent = async (entry: Omit<LogEntry, 'id' | 'timestamp'>) => {
  const now = new Date().toISOString();
  const payload: LogEntry = {
    id: `${Date.now()}`,
    timestamp: now,
    ...entry
  };

  const existing = await AsyncStorage.getItem(LOG_KEY);
  const logs: LogEntry[] = existing ? JSON.parse(existing) : [];
  logs.unshift(payload);
  await AsyncStorage.setItem(LOG_KEY, JSON.stringify(logs.slice(0, 200)));
};

export const getLogs = async () => {
  const existing = await AsyncStorage.getItem(LOG_KEY);
  return existing ? (JSON.parse(existing) as LogEntry[]) : [];
};
