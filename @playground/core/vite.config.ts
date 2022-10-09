/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react({
    babel: {
      parserOpts: {
        plugins: ['decorators-legacy']
      }
    }
  })],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'PlaygroundCore',
      fileName: 'playground-core',
      formats: ['es', 'umd', 'cjs']
    },
    outDir: 'dist',
    sourcemap: true,
  },
  esbuild: {
    keepNames: true
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts']
  }
})
