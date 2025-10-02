export type SubscriptionStatus = 'active' | 'canceled' | 'paused';

export interface Subscription {
  id: string;
  serviceName: string;
  cost: number;
  currency: string;
  frequency: 'monthly' | 'weekly' | 'annual' | 'custom';
  nextBillingDate?: string;
  manageUrl?: string;
  category?: string;
  status: SubscriptionStatus;
  createdAt: string;
  updatedAt: string;
  confidence?: number;
  source?: 'email' | 'manual';
}
