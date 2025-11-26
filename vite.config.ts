import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Sets the base path to relative './' so assets load correctly on GitHub Pages sub-directories
  base: './',
  server: {
    port: 3000,
    open: true
  }
});