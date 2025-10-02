# Subskribe

"Every subscription, organized." Subskribe is a React Native application blueprint for on-device subscription tracking. The app connects to IMAP inboxes, processes messages locally with an embedded ML model, and stores insights in an encrypted SQLCipher database.

## Features

- 📬 **Local email processing** with configurable IMAP accounts and no server-side relay.
- 🔐 **Encrypted persistence** using SQLCipher via `react-native-sqlcipher-storage`.
- 🤖 **On-device detection** powered by a TensorFlow Lite placeholder wrapper ready for model integration.
- 📊 **Dashboard experience** highlighting monthly spend, upcoming charges, and detailed subscription views.
- ✍️ **Manual entry** for subscriptions that cannot be detected automatically.
- 📈 **Analytics-ready architecture** for trend analysis, sheet exports, and predictive insights.

## Project Structure

```
├── app.json
├── index.js
├── package.json
├── src
│   ├── App.tsx
│   ├── components
│   │   ├── SpendSummary.tsx
│   │   └── SubscriptionCard.tsx
│   ├── navigation
│   │   └── AppNavigator.tsx
│   ├── screens
│   │   ├── DashboardScreen.tsx
│   │   ├── ManualEntryScreen.tsx
│   │   ├── OnboardingScreen.tsx
│   │   └── SubscriptionDetailScreen.tsx
│   ├── services
│   │   ├── database
│   │   │   ├── database.ts
│   │   │   └── schema.ts
│   │   ├── detection
│   │   │   └── subscriptionDetector.ts
│   │   ├── email
│   │   │   └── imapClient.ts
│   │   ├── logging
│   │   │   └── logger.ts
│   │   ├── ml
│   │   │   └── model.ts
│   │   └── sync
│   │       └── googleSheets.ts
│   ├── store
│   │   ├── index.ts
│   │   ├── settingsSlice.ts
│   │   └── subscriptionsSlice.ts
│   ├── theme
│   │   └── colors.ts
│   ├── types
│   │   └── subscription.ts
│   └── utils
│       └── format.ts
└── tsconfig.json
```

## Getting Started

> ℹ️ The repository ships as a blueprint. Additional native configuration may be required before running on device.

1. **Install dependencies**
   ```bash
   yarn install
   ```

2. **iOS setup** (macOS only)
   ```bash
   npx pod-install
   ```

3. **Run the Metro bundler**
   ```bash
   yarn start
   ```

4. **Launch on device or simulator**
   ```bash
   yarn ios
   # or
   yarn android
   ```

## Testing

```bash
yarn test
```

> **Note:** Running the Jest suite requires installing npm dependencies first (`yarn install`).
> In restricted environments without registry access, the install step may fail, so tests
> cannot be executed until connectivity is restored.

## Security & Privacy

- All data stays on-device; email parsing, ML inference, and storage do not rely on external services.
- SQLCipher encryption is enforced by providing a user-defined passphrase when opening the database.
- Logs are retained locally with rotation and can be cleared by the user.
- Optional Google Sheets export is opt-in only and remains a stub until OAuth consent is implemented.

## Documentation

Additional documents live in `docs/`:

- `INSTALLATION.md` – environment setup and native requirements.
- `ARCHITECTURE.md` – module overview, data flow, and ML integration notes.
- `PRIVACY_POLICY_TEMPLATE.md` – starting point for the in-app privacy policy.

## Roadmap

- Replace the heuristic ML stub with a trained TensorFlow Lite model bundled via the assets pipeline.
- Extend the IMAP module with provider presets and encrypted credential storage.
- Implement background fetching and predictive spend analytics.
- Add import/export workflows and optional Google Sheets synchronization.
