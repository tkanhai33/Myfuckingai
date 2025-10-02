export const colors = {
  primaryTeal: '#0A7E8C',
  secondaryCharcoal: '#2D3436',
  accentBronze: '#B87333',
  background: '#F2F7F8',
  textPrimary: '#1C1C1E',
  textSecondary: '#636E72',
  cardBackground: '#FFFFFF'
} as const;

export type ColorName = keyof typeof colors;
