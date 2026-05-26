# Character Guesser

## Mobile Apps (iOS & Android)

This app uses [Capacitor](https://capacitorjs.com/) in remote mode — the native app is a shell that loads the deployed website.

### Setup

1. Deploy the Next.js app and update `capacitor.config.ts` → `server.url` with your domain
2. Run `npm run cap:sync` to sync config to native projects
3. Open iOS project: `npm run cap:ios` (requires Xcode on Mac)
4. Open Android project: `npm run cap:android` (requires Android Studio)

### App Store submission

- iOS: Open `ios/App/App.xcworkspace` in Xcode → Archive → Upload to App Store Connect
- Android: Open `android/` in Android Studio → Build → Generate Signed Bundle → Upload to Play Console

### Local dev testing

To test against local dev server, temporarily change `capacitor.config.ts`:
```ts
server: {
  url: 'http://YOUR_LOCAL_IP:3000',
  cleartext: true,
}
```
Then run `npm run cap:sync` and build from Xcode/Android Studio.
