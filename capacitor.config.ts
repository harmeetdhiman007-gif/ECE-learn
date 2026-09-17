import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ohmie.app',
  appName: 'Ohmie',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
};

export default config;
