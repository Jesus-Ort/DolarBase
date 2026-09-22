// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint',],
  css: ['vuetify/styles', '@mdi/font/css/materialdesignicons.css'],
  build: {
    transpile: ['vuetify'],
  },
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://dolarbase.jesusortega.xyz',
    },
  },
  app: {
      head: {
        title: 'DolarBase',
        meta: [
      { name: 'description', content: 'Convierte dólares (USD) a bolívares (Bs) y viceversa con la tasa oficial del BCV. Calculadora de cambio gratuita, actualizada al instante y sin registros.' },
      { name: 'theme-color', content: '#00A971' },
      { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1' },
        ],
        htmlAttrs: {
          lang: 'es-VE',
          },
          link: [
          { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
          { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/icon-192.png' },
          { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/icon-512.png' },
          { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
          { rel: 'manifest', href: '/site.webmanifest' },
        ]
        }
      }
})