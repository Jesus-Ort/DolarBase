<template>
  <v-app>
    <div class="app-bg" aria-hidden="true">
      <span class="orb orb--one" />
      <span class="orb orb--two" />
    </div>

    <v-main>
      <v-container class="d-flex justify-center align-center fill-height" fluid>
        <v-card class="dolar-card rounded-xxl pa-5 pa-md-6" max-width="420" width="100%">
          <!-- Cabecera -->
          <div class="d-flex align-center justify-space-between mb-6">
            <div class="d-flex align-center ga-3">
              <div class="logo-badge d-flex align-center justify-center">
                <v-icon color="white" size="22">mdi-currency-usd</v-icon>
              </div>
              <div>
                <p class="text-h6 font-weight-bold mb-0 title-text">DolarBase</p>
                <p class="text-caption text-medium-emphasis mb-0">Conversor BCV</p>
              </div>
            </div>

            <v-btn
              variant="tonal"
              icon
              size="default"
              :aria-label="isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'"
              @click="toggleTheme"
            >
              <v-icon>
                {{ isDark ? 'mdi-white-balance-sunny' : 'mdi-weather-night' }}
              </v-icon>
            </v-btn>
          </div>

          <!-- Tasa oficial -->
          <v-sheet class="rate-sheet rounded-lg pa-5 mb-6">
            <v-skeleton-loader v-if="cargando" dark type="text,text" class="mx-auto" max-width="180" />
            <template v-else>
              <p class="text-caption mb-3 text-center font-weight-medium rate-label">Tasa oficial del BCV</p>
              <div class="d-flex align-center justify-center ga-3">
                <span class="currency-code">USD</span>
                <span class="rate-value">{{ tasa.toFixed(2) }} Bs</span>
              </div>
              <p class="text-caption mt-3 mb-0 rate-date text-center">
                <v-icon size="14" class="me-1">mdi-clock-outline</v-icon>
                Actualizado: {{ fechaActualizacion }}
              </p>
            </template>
          </v-sheet>

          <!-- Conversor -->
          <v-text-field
            v-model="bolivares"
            label="Bolívares (Bs)"
            prepend-inner-icon="mdi-cash-multiple"
            class="mb-1"
            clearable
            hide-details
            @input="convertirDesdeBs"
          />

          <div class="d-flex justify-center my-2">
            <v-btn
              class="swap-btn"
              variant="flat"
              icon
              size="small"
              aria-label="Intercambiar moneda"
              @click="swap"
            >
              <v-icon :class="{ 'swap-spin': swapping }">mdi-swap-vertical</v-icon>
            </v-btn>
          </div>

          <v-text-field
            v-model="usd"
            label="Dólares (USD)"
            prepend-inner-icon="mdi-currency-usd"
            class="mb-4"
            clearable
            hide-details
            @input="convertirDesdeUsd"
          />

          <!-- Footer -->
          <div class="text-center mt-2">
            <p class="text-caption text-medium-emphasis mb-1">
              Fuente: tasa oficial del BCV · vía dolarapi.com
            </p>
            <p class="text-caption text-disabled ma-0 lh-sm">
              Las tasas mostradas son informativas y no constituyen una oferta de compra o venta de divisas.
            </p>
          </div>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import axios from "axios"
import { useTheme } from "vuetify"

const theme = useTheme()
const cargando = ref(true)
const tasa = ref(0)
const fechaActualizacion = ref("")
const bolivares = ref("")
const usd = ref("")
const swapping = ref(false)

const CACHE_KEY = 'usd_cache'
const CACHE_TIME = 1 * 60 * 60 * 1000

const isDark = computed(() => theme.global.current.value.dark)

function toggleTheme() {
  const next = isDark.value ? 'light' : 'dark'
  theme.global.name.value = next
  localStorage.setItem('dolarbase-theme', next)
}

function formatearFecha(fecha) {
  if (!fecha) return ""
  try {
    const date = new Date(fecha)
    if (Number.isNaN(date.getTime())) return fecha
    return date.toLocaleDateString("es-VE", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  } catch {
    return fecha
  }
}

async function obtenerUsd() {
  const saved = localStorage.getItem(CACHE_KEY)
  if (saved) {
    try {
      const cache = JSON.parse(saved)
      if (Date.now() - cache.timestamp < CACHE_TIME) {
        tasa.value = Number(cache.value)
        fechaActualizacion.value = formatearFecha(cache.fechaActualizacion)
        cargando.value = false
        return Number(cache.value)
      }
    } catch {
      console.error('Caché corrupta, se descargará la tasa actualizada')
    }
  }

  try {
    const response = await axios.get('https://ve.dolarapi.com/v1/dolares/oficial')
    const data = response.data

    const valor = data?.promedio || 0

    tasa.value = valor
    fechaActualizacion.value = formatearFecha(data.fechaActualizacion)
    cargando.value = false

    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        value: valor,
        fechaActualizacion: data.fechaActualizacion,
        timestamp: Date.now()
      })
    )

    return valor
  } catch (error) {
    console.error('Error al obtener USD:', error)
    cargando.value = false
  }
}

function evaluarExpresion(expresion) {
  try {
    if (!/^[0-9+\-*/. ()]+$/.test(expresion)) return 0
    return Function(`"use strict"; return (${expresion})`)()
  } catch {
    return 0
  }
}

function convertirDesdeBs() {
  const valor = evaluarExpresion(bolivares.value)
  const resultado = Number(valor) / tasa.value
  usd.value = resultado ? resultado.toFixed(2) : ""
}

function convertirDesdeUsd() {
  const valor = evaluarExpresion(usd.value)
  const resultado = Number(valor) * tasa.value
  bolivares.value = resultado ? resultado.toFixed(2) : ""
}

function swap() {
  swapping.value = true
  const tmp = bolivares.value
  bolivares.value = usd.value
  usd.value = tmp
  if (bolivares.value) convertirDesdeBs()
  else if (usd.value) convertirDesdeUsd()
  setTimeout(() => {
    swapping.value = false
  }, 350)
}

onMounted(() => {
  const saved = localStorage.getItem('dolarbase-theme')
  if (saved === 'light' || saved === 'dark') {
    theme.global.name.value = saved
  }
  obtenerUsd()
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

.dolar-card {
  background: rgb(var(--v-theme-surface) / 0.72);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgb(var(--v-theme-line));
  box-shadow: 0 24px 60px -18px rgba(0, 0, 0, 0.18) !important;
  animation: card-in 0.6s ease both;
}

@keyframes card-in {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.logo-badge {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)), rgb(var(--v-theme-secondary)));
  box-shadow: 0 8px 18px -6px rgb(var(--v-theme-primary) / 0.6);
}

.rate-sheet {
  background: rgb(var(--v-theme-line)) !important;
  border: 1px solid rgb(var(--v-theme-outline) / 0.15);
}

.rate-label {
  color: rgb(var(--v-theme-on-surface));
  letter-spacing: 0.4px;
}

.rate-value {
  color: rgb(var(--v-theme-primary));
  font-size: 1.75rem;
  font-weight: 800;
  line-height: 1;
}

.currency-code {
  color: rgb(var(--v-theme-primary));
  font-weight: 700;
  font-size: 0.9rem;
  background: rgb(var(--v-theme-surface));
  border: 1px solid rgb(var(--v-theme-outline) / 0.15);
  padding: 3px 10px;
  border-radius: 8px;
}

.rate-date {
  color: rgb(var(--v-theme-on-surface));
  opacity: 0.7;
}

.swap-btn {
  background: rgb(var(--v-theme-line)) !important;
}

.swap-btn .v-icon {
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.swap-spin {
  transform: rotate(180deg);
}
</style>