import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root,
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 4176,
  },
  resolve: {
    alias: {
      '@dusq-design-system/react': resolve(root, '../../packages/react/src/index.ts'),
      '@dusq-design-system/tokens': resolve(root, '../../dist'),
      '@ba-design-system/react': resolve(root, '../../packages/react/src/index.ts'),
      '@ba-design-system/tokens': resolve(root, '../../dist'),
      '@dusq-preview': resolve(root, '../dusq-preview/src'),
    },
  },
  build: {
    outDir: resolve(root, 'dist'),
    emptyOutDir: true,
  },
  base: './',
});
