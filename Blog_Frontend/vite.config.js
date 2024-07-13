import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://blogsphere-github-io.onrender.com', // Your backend URL
        changeOrigin: true,
        secure: false
      }
    }
  }
});
