import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { componentTagger } from "lovable-tagger";
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
  plugins: [
    react(),
    svgr(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/ui": path.resolve(__dirname, "./src/components/ui"),
      "@/hooks": path.resolve(__dirname, "./src/hooks"),
      "@/utils": path.resolve(__dirname, "./src/utils"),
      "@/constants": path.resolve(__dirname, "./src/constants"),
      "@/config": path.resolve(__dirname, "./src/config"),
      "@/contexts": path.resolve(__dirname, "./src/contexts"),
      "@/services": path.resolve(__dirname, "./src/services"),
      "@/api": path.resolve(__dirname, "./src/api"),
      "@/pages": path.resolve(__dirname, "./src/pages"),
      "@/layouts": path.resolve(__dirname, "./src/layouts"),
      "@/routes": path.resolve(__dirname, "./src/routes"),
      "@/schemas": path.resolve(__dirname, "./src/schemas"),
      "@/assets": path.resolve(__dirname, "./src/assets"),
      "@/styles": path.resolve(__dirname, "./src/styles"),
      "@/firebase": path.resolve(__dirname, "./src/firebase"),
    },
  },
}));
