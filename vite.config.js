import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: ['icons/apple-touch-icon.png', 'icons/favicon-48.png', 'privacy.html'],
      workbox: {
        navigateFallbackDenylist: [/^\/privacy\.html$/, /^\/\.well-known\//],
        runtimeCaching: [{
          urlPattern: /^https:\/\/res\.cloudinary\.com\/.*/i,
          handler: 'CacheFirst',
          options: { cacheName: 'game-images', cacheableResponse: { statuses: [0, 200] } },
        }],
      },
      manifest: {
        id: '/',
        name: 'Aurora Memory Match',
        short_name: 'Aurora',
        description: 'A relaxing yet challenging memory tile-matching game with an aurora theme.',
        lang: 'en',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
        theme_color: '#2e1065',
        background_color: '#2e1065',
        categories: ['games', 'entertainment'],
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
    }),
  ],
})
