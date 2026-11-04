import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Mantém os assets na raiz, inclusive ao abrir uma rota aninhada na Vercel.
  base: "/",
  // Plugin que habilita o Vite a compilar componentes React.
  plugins: [react()],
})
