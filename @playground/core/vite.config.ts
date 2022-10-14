/// <reference types="vitest" />

import { resolve } from 'path'
import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { preactIslands } from 'vite-plugin-preact-islands'

export default defineConfig({
  plugins: [preactIslands(), preact()],
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
    keepNames: true,
    jsxImportSource: "preact"
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts']
  }
})
