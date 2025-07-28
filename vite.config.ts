import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import history from 'connect-history-api-fallback';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    fs: { allow: ['.'] },
    // For SPA fallback, use historyApiFallback if needed
    // historyApiFallback: true
  },
  resolve: {
    alias: [{ find: '@', replacement: '/src' }]
  }
});
