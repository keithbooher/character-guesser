import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.characterguesser',
  appName: 'Character Guesser',
  webDir: 'public',
  server: {
    // Update this to your deployed URL before building for stores
    // For local dev testing: comment out this url line and run `npx cap sync` then open in Xcode/Android Studio
    url: 'https://characterguesser.app',
    cleartext: false,
  },
  ios: {
    contentInset: 'automatic',
  },
  android: {
    allowMixedContent: false,
  },
};

export default config;
