import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vite.dev/config/
export default defineConfig({
  build: {
    // Raise warning limit to reduce noise; real savings come from chunk splitting
    chunkSizeWarningLimit: 1000,
    // Enable CSS code splitting per route
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Core React runtime — loaded on every page
            if (
              id.includes('/react/') ||
              id.includes('/react-dom/') ||
              id.includes('react-router-dom') ||
              id.includes('react-helmet-async') ||
              id.includes('react-hot-toast')
            ) return 'vendor';

            // Animation library — loaded on most pages
            if (id.includes('framer-motion')) return 'animations';

            // Icons — tree-shaken but still its own chunk
            if (id.includes('lucide-react') || id.includes('react-icons')) return 'icons';

            // Heavy PDF tools — only loaded when user opens PDF tools
            if (id.includes('jspdf') || id.includes('pdf-lib')) return 'pdf-tools';
            if (id.includes('html2canvas')) return 'html2canvas';

            // Supabase — only loaded in admin/portal routes
            if (id.includes('@supabase') || id.includes('supabase')) return 'supabase';

            // Three.js — only if still used anywhere (Vanta was removed)
            if (id.includes('three')) return 'three';

            // Markdown processing
            if (id.includes('marked') || id.includes('dompurify')) return 'markdown';
          }
        }
      }
    }
  },
  plugins: [
    react(),
    ViteImageOptimizer({
      png:  { quality: 80 },
      jpeg: { quality: 80 },
      jpg:  { quality: 80 },
      webp: { quality: 82 },
    }),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'ToolBite - Premium Tools',
        short_name: 'ToolBite',
        description: 'High-performance custom tools and premium templates.',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        // Don't cache huge chunks in SW precache — let browser cache handle them
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024, // 3MB limit
        runtimeCaching: [
          {
            // Tool pages — cache first for instant repeat visits
            urlPattern: ({ url }) => url.pathname.startsWith('/tools'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'tools-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 Days
              },
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          {
            // Static assets (JS/CSS chunks) — stale while revalidate
            urlPattern: ({ request }) => request.destination === 'script' || request.destination === 'style',
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-assets',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 7 Days
              }
            }
          },
          {
            // Images — cache for a month
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 Days
              },
              cacheableResponse: { statuses: [0, 200] }
            }
          }
        ]
      }
    })
  ],
})
