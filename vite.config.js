import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  css: {
    postcss: {}
  },
  server: {
    host: true,       // Enables access from local network
    port: 5173,       // Or any other port you prefer
  },
})
