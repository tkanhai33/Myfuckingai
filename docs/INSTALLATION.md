# Installation Guide

This document outlines the steps required to bootstrap the Subskribe mobile app in a local environment.

## 1. Prerequisites

- Node.js 18+
- Yarn 1.22+
- React Native CLI requirements:
  - Xcode & CocoaPods (macOS) for iOS builds
  - Android Studio + Android SDK for Android builds
- Watchman (macOS/Linux) for improved file watching
- Ruby 3.x (for CocoaPods)

## 2. Clone & Install

```bash
git clone <repository-url>
cd subskribe
yarn install
```

## 3. iOS Setup

```bash
cd ios
pod install
cd ..
```

Set the SQLCipher CocoaPods source in `Podfile` if required by your distribution.

## 4. Android Setup

- Ensure an Android emulator or physical device is available.
- Add the SQLCipher native dependency to `android/app/build.gradle` using `implementation "net.zetetic:android-database-sqlcipher:4.5.4@aar"`.
- Update `android/gradle.properties` with `android.useAndroidX=true` and configure NDK if necessary.

## 5. Environment Variables

Create a `.env` file (to be consumed by your configuration layer) with:

```
SQLCIPHER_PASSPHRASE=replace-this
```

## 6. Running the App

```bash
yarn start
# In another terminal
yarn ios
# or
yarn android
```

## 7. Testing

```bash
yarn test
```

## 8. Troubleshooting

- Clear the Metro cache: `yarn start --reset-cache`
- Rebuild native apps when linking native modules.
- For SQLCipher linking errors on iOS, run `pod repo update` and re-install pods.
