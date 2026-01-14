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
      assets: path.resolve(__dirname, 'src/shared/assets'),
      constants: path.resolve(__dirname, 'src/shared/constants'),
      context: path.resolve(__dirname, 'src/shared/context'),
      fonts: path.resolve(__dirname, 'src/shared/fonts'),
      hooks: path.resolve(__dirname, 'src/shared/hooks'),
      styles: path.resolve(__dirname, 'src/shared/styles'),
      type: path.resolve(__dirname, 'src/shared/type'),
      ui: path.resolve(__dirname, 'src/shared/ui'),
      utils: path.resolve(__dirname, 'src/shared/utils')
    }
  }
})
