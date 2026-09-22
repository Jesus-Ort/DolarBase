<template>
  <v-app>
    <div class="app-bg" aria-hidden="true">
      <span class="orb orb--one" />
      <span class="orb orb--two" />
    </div>

    <v-main>
      <v-container class="d-flex justify-center align-center fill-height" fluid>
        <v-card class="rounded-xxl pa-5 pa-md-6 error-card" max-width="420" width="100%">
          <div class="d-flex align-center justify-center mb-4">
            <div class="logo-badge d-flex align-center justify-center">
              <v-icon color="white" size="24">mdi-currency-usd</v-icon>
            </div>
          </div>
          <h1 class="text-h5 font-weight-bold text-center mb-2">Página no encontrada</h1>
          <p class="text-caption text-medium-emphasis text-center mb-4">
            El enlace puede estar roto o la página fue movida.
          </p>
          <div class="d-flex justify-center mb-3">
            <v-btn color="primary" variant="flat" rounded="lg" to="/">
              <v-icon start>mdi-home</v-icon>
              Volver al conversor
            </v-btn>
          </div>
          <p class="text-caption text-disabled text-center mb-0">
            DolarBase — Conversor de Dólares a Bolívares
          </p>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { onMounted } from "vue"
import { useTheme } from "vuetify"

const theme = useTheme()

useHead({
  title: 'Página no encontrada | DolarBase',
  meta: [
    { name: 'robots', content: 'noindex, follow' },
  ],
})

onMounted(() => {
  const saved = localStorage.getItem('dolarbase-theme')
  if (saved === 'light' || saved === 'dark') {
    theme.global.name.value = saved
  }
})
</script>

<style scoped>
.app-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  background: linear-gradient(160deg, rgb(var(--v-theme-background)), rgb(var(--v-theme-background)));
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
}

.orb--one {
  width: 340px;
  height: 340px;
  top: -90px;
  left: -70px;
  background: rgb(var(--v-theme-primary));
  opacity: 0.16;
}

.orb--two {
  width: 380px;
  height: 380px;
  bottom: -110px;
  right: -80px;
  background: rgb(var(--v-theme-secondary));
  opacity: 0.14;
}

.v-main {
  position: relative;
  z-index: 1;
}

.v-container {
  min-height: 100vh;
}

.error-card {
  background: rgb(var(--v-theme-surface) / 0.9);
  border: 1px solid rgb(var(--v-theme-line));
}

.logo-badge {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)), rgb(var(--v-theme-secondary)));
  box-shadow: 0 8px 18px -6px rgb(var(--v-theme-primary) / 0.6);
}
</style>