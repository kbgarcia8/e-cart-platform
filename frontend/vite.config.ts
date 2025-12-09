import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      assets: path.resolve(__dirname, 'src/assets'),
      components: path.resolve(__dirname, 'src/components'),
      context: path.resolve(__dirname, 'src/context'),
      fonts: path.resolve(__dirname, 'src/fonts'),
      styles: path.resolve(__dirname, 'src/styles'),
      type: path.resolve(__dirname, 'src/type'),
      utils: path.resolve(__dirname, 'src/utils')
    }
  }
})
