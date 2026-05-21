// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig(({ mode }) =>({
  publicDir: mode === 'development' ? 'public' : false,  // Public in dev, disabled in build
  plugins: [react()],
  build: {
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'AudioPlayer',
      fileName: (): string => 'index.js', // <-- force output filename
      formats: ['es'] // ONLY ESM for browser-friendly Astro consumption
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    }
  },
}));
