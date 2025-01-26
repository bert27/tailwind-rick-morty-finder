import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      hooks: path.resolve(__dirname, './src/hooks'),
      services: path.resolve(__dirname, './src/services'),
      context: path.resolve(__dirname, './src/context'),
      components: path.resolve(__dirname, './src/components'),
      models: path.resolve(__dirname, './src/models'),
    },
  },
});
