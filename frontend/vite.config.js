import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8000,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000",
        // target: "https://zaldo-backend.vercel.app",
        changeOrigin: true,
      },
    },
  },
});
