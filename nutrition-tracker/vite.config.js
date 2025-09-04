import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // optional, default is 5173
    proxy: {
      "/api": {
        target: "https://fitnesstrackerbackend-zzuz.onrender.com", // backend
        changeOrigin: true,
      },
    },
  },
});
