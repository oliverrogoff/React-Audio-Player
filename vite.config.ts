// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  publicDir: false,
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'AudioPlayer',
      fileName: () => 'index.js', // <-- force output filename
      formats: ['es'] // ONLY ESM for browser-friendly Astro consumption
    },
    rolldownOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      cssCodeSplit: true, // extract CSS
    }
  },
});
