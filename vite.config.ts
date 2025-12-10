import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'sologrind.png'], // Add your assets here
      manifest: {
        name: 'Solo Grind Fitness',
        short_name: 'Solo Grind',
        description: 'Gamify your fitness journey. Level up in real life.',
        theme_color: '#00f3ff',
        background_color: '#000000',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: 'sologrind.png', // We'll use your existing logo for now
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'sologrind.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'sologrind.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
})
