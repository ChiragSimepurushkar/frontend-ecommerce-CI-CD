import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['react-inner-image-zoom']
  },
  plugins: [
    react()
  ,tailwindcss(),],
})
