<template>
  <ComponenteC />
</template>

<script setup>
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl

const title = 'DolarBase — Conversor de Dólares a Bolívares | Tasa BCV'
const description = 'Convierte dólares (USD) a bolívares (Bs) y viceversa con la tasa oficial del BCV. Calculadora de cambio gratuita, actualizada al instante y sin registros.'

useHead({
  title,
  meta: [
    { name: 'description', content: description },
    { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'DolarBase' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: `${siteUrl}/` },
    { property: 'og:image', content: `${siteUrl}/og-image.png` },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: 'DolarBase — Conversor de Dólares a Bolívares' },
    { property: 'og:locale', content: 'es_VE' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: `${siteUrl}/og-image.png` },
    { name: 'twitter:image:alt', content: 'DolarBase — Conversor de Dólares a Bolívares' },
  ],
  link: [
    { rel: 'canonical', href: `${siteUrl}/` },
  ],
  script: [
    {
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'DolarBase',
        url: `${siteUrl}/`,
        description: 'Conversor de dólares (USD) a bolívares (Bs) y viceversa con la tasa oficial del BCV.',
        inLanguage: 'es-VE',
        publisher: {
          '@type': 'Person',
          name: 'Jesús Ortega',
          url: 'https://jesusortega.xyz',
          jobTitle: 'Desarrollador Web',
          sameAs: ['https://github.com/Jesus-Ort'],
        },
      }),
      type: 'application/ld+json',
    },
    {
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'DolarBase',
        url: `${siteUrl}/`,
        description: 'Calculadora de conversión de dólares (USD) a bolívares (Bs) con la tasa oficial del Banco Central de Venezuela (BCV).',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any',
        inLanguage: 'es-VE',
        author: {
          '@type': 'Person',
          name: 'Jesús Ortega',
          url: 'https://jesusortega.xyz',
          jobTitle: 'Desarrollador Web',
        },
      }),
      type: 'application/ld+json',
    },
  ],
})
</script>