import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',  // Permet d'accéder via une adresse IP locale
    port: 5173,       // Choisis un port (par défaut 5173)
    strictPort: true, // Empêche le port de changer si 5173 est occupé
  }
})
