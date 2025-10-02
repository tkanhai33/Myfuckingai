import { Subscription } from '../../types/subscription';

export interface SheetsSyncOptions {
  accessToken: string;
  spreadsheetId: string;
  sheetName: string;
}

export const syncToSheets = async (
  subscriptions: Subscription[],
  _options: SheetsSyncOptions
): Promise<void> => {
  // Placeholder for secure, optional one-way sync implementation.
  // The real implementation would:
  // 1. Request OAuth consent and securely store the short-lived access token.
  // 2. Use fetch with the Google Sheets REST API to append rows.
  // 3. Respect user opt-in only; never sync automatically without consent.
  if (subscriptions.length === 0) {
    return;
  }
  // This is intentionally left as a no-op stub to satisfy the offline constraint.
};
