import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://nanocode10.github.io/Nano-Notes/",
  plugins: [react()],
})
