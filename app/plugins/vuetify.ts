// plugins/vuetify.ts
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import {
  VApp,
  VBtn,
  VCard,
  VContainer,
  VIcon,
  VMain,
  VSheet,
  VSkeletonLoader,
  VTextField,
} from 'vuetify/components'
import { Ripple } from 'vuetify/directives'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components: {
      VApp,
      VBtn,
      VCard,
      VContainer,
      VIcon,
      VMain,
      VSheet,
      VSkeletonLoader,
      VTextField,
    },
    directives: {
      Ripple,
    },
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: { mdi },
    },
    defaults: {
      VBtn: { rounded: 'lg' },
      VTextField: {
        variant: 'outlined',
        density: 'comfortable',
      },
    },
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          dark: false,
          colors: {
            primary: '#00A971',
            secondary: '#0FB8B0',
            line: '#E3EAE6',
            background: '#F3F6F4',
            surface: '#FFFFFF',
            'on-surface': '#1C2622',
            'on-background': '#1C2622',
          },
        },
        dark: {
          dark: true,
          colors: {
            primary: '#2ECC71',
            secondary: '#21C6B5',
            line: '#24312B',
            background: '#0B1210',
            surface: '#131B17',
            'on-surface': '#E6F2EC',
            'on-background': '#E6F2EC',
          },
        },
      },
    },
  })

  nuxtApp.vueApp.use(vuetify)
})