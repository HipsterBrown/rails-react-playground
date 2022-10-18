/// <reference types="vitest" />

import { resolve } from 'path'
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import { solidIslands } from 'vite-plugin-solid-islands'

export default defineConfig({
  plugins: [solid(), solidIslands()],
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
