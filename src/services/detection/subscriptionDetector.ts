import { mlModel } from '../ml/model';
import { Subscription } from '../../types/subscription';

const serviceNamePatterns = [
  /subscription with ([A-Z][A-Za-z0-9 &]+)/i,
  /thank you for subscribing to ([A-Z][A-Za-z0-9 &]+)/i,
  /your ([A-Z][A-Za-z0-9 &]+) membership/i
];

const costPattern = /\$\s?\d+(?:\.\d{2})?|\d+(?:\.\d{2})\s*(USD|CAD)/i;
const frequencyPattern = /(monthly|annual|yearly|weekly|per month|\/mo)/i;
const nextBillingPattern = /next[^\d]*(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/i;
const manageUrlPattern = /href="([^"']*(?:manage|account|billing)[^"']*)"/i;

export interface RawEmail {
  subject?: string;
  text?: string;
  html?: string;
}

export const detectSubscription = async (email: RawEmail): Promise<Subscription | null> => {
  const content = `${email.subject ?? ''}\n${email.text ?? ''}`;
  if (!content) {
    return null;
  }

  const confidence = await mlModel.predict(content);
  if (confidence < 0.75) {
    return null;
  }

  const serviceNameMatch = serviceNamePatterns
    .map(pattern => content.match(pattern)?.[1])
    .find(Boolean);

  const costMatch = content.match(costPattern)?.[0];
  const frequencyMatch = content.match(frequencyPattern)?.[0];
  const nextBillingMatch = content.match(nextBillingPattern)?.[1];
  const manageUrlMatch = content.match(manageUrlPattern)?.[1];

  if (!serviceNameMatch || !costMatch || !frequencyMatch) {
    return null;
  }

  const amount = parseFloat(costMatch.replace(/[^0-9.]/g, ''));

  const now = new Date().toISOString();
  return {
    id: `${Date.now()}`,
    serviceName: serviceNameMatch.trim(),
    cost: amount,
    currency: costMatch.includes('USD') ? 'USD' : 'CAD',
    frequency: inferFrequency(frequencyMatch),
    nextBillingDate: normalizeDate(nextBillingMatch),
    manageUrl: manageUrlMatch,
    category: undefined,
    status: 'active',
    createdAt: now,
    updatedAt: now,
    confidence,
    source: 'email'
  };
};

const inferFrequency = (match: string): Subscription['frequency'] => {
  const normalized = match.toLowerCase();
  if (normalized.includes('week')) return 'weekly';
  if (normalized.includes('year') || normalized.includes('annual')) return 'annual';
  if (normalized.includes('month')) return 'monthly';
  return 'custom';
};

const normalizeDate = (input?: string) => {
  if (!input) return undefined;
  const segments = input.replace(/-/g, '/').split('/');
  if (segments.length !== 3) return undefined;
  const [first, second, third] = segments;
  const year = third.length === 2 ? `20${third}` : third;
  const formatted = `${year}-${first.padStart(2, '0')}-${second.padStart(2, '0')}`;
  if (Number.isNaN(Date.parse(formatted))) {
    return undefined;
  }
  return formatted;
};
