import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'PlaygroundCore',
      fileName: 'playground-core',
      formats: ['es', 'umd', 'cjs']
    },
    outDir: 'dist',
    sourcemap: true,
  }
})
