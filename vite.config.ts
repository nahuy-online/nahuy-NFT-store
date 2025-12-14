import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // ВАЖНО: base должен совпадать с названием вашего репозитория на GitHub
  base: '/nahuy-NFT-store/',
  build: {
    outDir: 'dist',
  }
});