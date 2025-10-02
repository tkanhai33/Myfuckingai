# Subskribe Privacy Policy (Template)

_Last updated: {{DATE}}_

Subskribe processes all data on your device. This template can be customized to reflect the final implementation before publishing the application.

## Data We Collect

- **Email Metadata & Content:** Used solely to detect subscription-related messages. Raw emails remain on the device and are never transmitted.
- **Subscription Records:** Details extracted from emails or entered manually, stored in an encrypted SQLCipher database.
- **Diagnostics (Optional):** Anonymous crash logs may be collected if the user opts in.

## How Data Is Used

- Analyze email content on-device to identify subscriptions.
- Present spending analytics and reminders within the app.
- Export data only when the user explicitly performs an export action (e.g., Google Sheets sync).

## Data Sharing

- Subskribe does **not** share data with third parties by default.
- Optional exports require explicit consent and are limited to the chosen destination.

## Security

- Database content is encrypted using SQLCipher with a 256-bit key derived from a user-provided passphrase.
- Credentials should be stored using secure storage mechanisms provided by the OS.

## User Controls

- Users may delete subscriptions, logs, or reset the database at any time.
- Disconnecting an email account stops future email processing.
- Opt-in/opt-out toggles are provided for diagnostics and sync features.

## Contact

Provide contact information or a support email for privacy inquiries once the app is ready for distribution.
