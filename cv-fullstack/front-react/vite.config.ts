import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuração básica sem loadEnv
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    manifest: true
  },
  server: {
    host: "0.0.0.0",
    port: 3002,
    cors: true,
    hmr: false,
    allowedHosts: [
      'yargo.ar',
      'localhost',
    ],
    watch: {
      usePolling: true,
    }
  }
})
