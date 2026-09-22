// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint',],
  css: ['vuetify/styles', '@mdi/font/css/materialdesignicons.css'],
  build: {
    transpile: ['vuetify'],
  },
  app: {
      head: {
        title: 'DolarBase — Calculadora BCV',
        meta: [
      { name: 'description', content: 'Convierte dólares (USD) a bolívares (Bs) con la tasa oficial del BCV. Calculadora de cambio actualizada al instante.' }
      ],
        htmlAttrs: {
          lang: 'es',
          },
          link: [
          { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        ]
        }
      }
})