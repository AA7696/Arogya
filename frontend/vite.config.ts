import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),       // React + Fast Refresh
    tailwindcss(), // Tailwind integration
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // use @ for src imports
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000", // backend server
        changeOrigin: true,              // makes request appear as if from target
        // rewrite: (path) => path.replace(/^\/api/, ""), 
        // uncomment if your backend does NOT use /api prefix
      },
    },
  },
})
