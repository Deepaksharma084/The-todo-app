import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/The-todo-app/', // Ensures paths resolve correctly on GitHub Pages
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: { enabled: true }, // Service worker enabled in dev
      manifest: {
        name: 'Todo App',
        short_name: 'Todo',
        description: 'A simple todo app that works offline.',
        icons: [
          {
            src: 'tasks1o.png', 
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'tasks1o.png', 
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        start_url: '/The-todo-app/', // Align with GitHub Pages path
        display: 'standalone',
        theme_color: '#ffffff',
        background_color: '#ffffff',
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) =>
              ['document', 'script', 'style'].includes(request.destination),
            handler: 'NetworkFirst',
            options: { cacheName: 'html-js-css-cache' },
          },
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },
        ],
      },
    }),
  ],
});
