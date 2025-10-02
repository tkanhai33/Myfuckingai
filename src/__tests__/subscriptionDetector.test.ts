import { detectSubscription } from '../services/detection/subscriptionDetector';

jest.mock('../services/ml/model', () => ({
  mlModel: {
    predict: jest.fn(async () => 0.9)
  }
}));

describe('detectSubscription', () => {
  it('returns subscription when patterns match', async () => {
    const result = await detectSubscription({
      subject: 'Your Spotify subscription receipt',
      text: 'Thank you for subscribing to Spotify. Total: $9.99 billed monthly. Next billing 01/15/2024. Manage at https://spotify.com/account.'
    });

    expect(result).toMatchObject({
      serviceName: 'Spotify',
      cost: 9.99,
      frequency: 'monthly',
      manageUrl: 'https://spotify.com/account.'
    });
  });

  it('returns null when ML confidence low', async () => {
    const { mlModel } = jest.requireMock('../services/ml/model');
    mlModel.predict.mockResolvedValueOnce(0.5);

    const result = await detectSubscription({ text: 'Random email' });
    expect(result).toBeNull();
  });
});
