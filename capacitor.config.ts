import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.silo.app',
  appName: 'SiLo',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
};

export default config;
