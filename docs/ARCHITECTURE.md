# Architecture Overview

Subskribe is organized as a modular React Native application designed to operate completely on-device. This overview highlights the core modules and their interactions.

## Layers

1. **Presentation (UI/UX)**
   - `src/screens` define top-level views (Onboarding, Dashboard, Manual Entry, Detail).
   - `src/components` host reusable UI primitives styled with the brand palette.
   - Navigation is handled by `@react-navigation/native` with a native stack.

2. **State Management**
   - Redux Toolkit slices (`settingsSlice`, `subscriptionsSlice`) store global state.
   - Async thunks (to be added) will orchestrate email parsing, persistence, and synchronization.

3. **Services**
   - **Email**: `services/email/imapClient.ts` wraps `imapflow` for encrypted IMAP retrieval.
   - **Detection**: `services/detection/subscriptionDetector.ts` combines regex extraction with an ML confidence score.
   - **ML**: `services/ml/model.ts` exposes a TensorFlow Lite-ready API with a heuristic placeholder.
   - **Database**: `services/database` manages SQLCipher initialization and CRUD helpers.
   - **Logging**: `services/logging/logger.ts` implements privacy-friendly local logging.
   - **Sync**: `services/sync/googleSheets.ts` outlines the optional export flow.

4. **Utilities**
   - `src/utils/format.ts` centralizes formatting for currency, dates, and frequency labels.
   - `src/theme/colors.ts` exposes the brand palette for consistent styling.

## Data Flow

1. **Onboarding**
   - User enters IMAP credentials, persisted via Redux. Credentials should ultimately be encrypted with a secure storage solution.

2. **Email Fetching**
   - A background job (to be implemented) fetches recent messages using IMAP IDLE or periodic polling.
   - Raw messages are passed to the detection pipeline.

3. **Detection Pipeline**
   - `detectSubscription` applies regex heuristics, then queries the ML model for confidence.
   - Valid results are normalized into the subscription domain model.

4. **Persistence**
   - Subscriptions are written to SQLCipher using the helper methods. A passphrase is required before database access.
   - Redux state is refreshed from the database for UI rendering.

5. **Sync (Optional)**
   - When enabled, the current subscription list can be exported to Google Sheets with explicit OAuth consent.

## Security Considerations

- All sensitive data (emails, logs, database) remain on-device.
- SQLCipher enforces encryption; passphrases should be stored in secure storage.
- Consider enabling biometrics for passphrase unlock.
- Logs intentionally avoid sensitive content and are capped to 200 entries.

## Machine Learning Roadmap

- Replace the heuristic `predict` method with a trained TensorFlow Lite model exported as `.tflite`.
- Capture feature vectors (keyword frequency, structured data) for improved detection accuracy.
- Evaluate models on-device to maintain privacy.

## Testing Strategy

- Unit tests target services and utilities (example: subscription detection).
- Integration tests should simulate IMAP fetch + detection + database persistence.
- UI tests via Detox or React Native Testing Library will ensure flows remain accessible.
