// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,            // 0.0.0.0 (LAN/VM)
    port: 8005,
    strictPort: true,
    hmr: { protocol: "ws", host: "localhost", port: 8005 },
  },
  preview: {
    port: 5080,
    strictPort: true,
  },
  define: {
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
  // Nur Vite-Variablen mit VITE_ werden an den Client geleakt:
  envPrefix: ["VITE_"],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
}); 