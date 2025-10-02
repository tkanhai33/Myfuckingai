export const currencyFormat = (amount: number, currency = 'CAD') =>
  new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency
  }).format(amount);

export const formatFrequency = (frequency: string) => {
  switch (frequency) {
    case 'monthly':
      return 'Monthly';
    case 'weekly':
      return 'Weekly';
    case 'annual':
      return 'Annual';
    default:
      return frequency;
  }
};

export const formatDate = (date?: string) =>
  date ? new Date(date).toLocaleDateString('en-CA') : '—';
