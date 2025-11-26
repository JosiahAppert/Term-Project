import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  icons: [{src: './public/baseball.svg',
           sizes: '32x32',
           type: 'image/svg+xml'
  }]
})
