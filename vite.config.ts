import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/react-habit-tracker/', // 👈 importante para que funcione en GitHub Pages
});
