/// <reference types="vitest" />

import { resolve } from 'path'
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { reactIslands } from 'vite-plugin-react-islands'

export default defineConfig({
  plugins: [react(), reactIslands()],
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
  resolve: {
    alias: { '@': resolve(__dirname, 'src') }
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
