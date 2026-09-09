import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Base relativa ajuda no carregamento de assets em deploys como GitHub Pages.
  base: "./",
  // Plugin que habilita o Vite a compilar componentes React.
  plugins: [react()],
})
