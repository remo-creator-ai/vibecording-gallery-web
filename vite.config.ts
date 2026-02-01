
import { defineConfig } from 'vite';

export default defineConfig({
  // Setting base to './' ensures the app works on GitHub Pages sub-paths
  base: './',
  build: {
    outDir: 'dist',
  },
});
