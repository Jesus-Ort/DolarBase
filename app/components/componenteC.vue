<template>
  <v-container class="d-flex justify-center align-center" fluid style="height: 80vh;">
    <v-card class="pa-6 rounded-xl" elevation="8" max-width="450" >
      <v-card-title class="text-h5 text-center font-weight-bold">
        Calculadora BCV
      </v-card-title>

      <v-card-text>
        <!-- Tasa oficial -->
        <div class="text-center mb-4">
          <p class="text-subtitle-2 text-grey-darken-1">Tasa oficial del BCV</p>
          <p class="text-h6 font-weight-bold">USD: {{ tasa.toFixed(2) }} Bs</p>
          <p class="text-caption text-grey mt-1">
            Actualizado: {{ fechaActualizacion }}
          </p>
        </div>

        <!-- Inputs de conversión -->
        <v-text-field
          v-model="bolivares"
          label="Bolívares (Bs)"
          variant="outlined"
          type="text"
          inputmode="decimal"
          pattern="[0-9+\-*/. ()]*"
          hide-details
          clearable
          class="ga-4"
          @input="convertirDesdeBs"
        />

        <v-text-field
          v-model="usd"
          label="Dólares (USD)"
          variant="outlined"
          type="text"
          inputmode="decimal"
          pattern="[0-9+\-*/. ()]*"
          hide-details
          clearable
          class="ga-4"
          @input="convertirDesdeUsd"
        />

        <!-- Fuente -->
        <p class="text-caption text-grey text-center mt-4">
          Fuente: {{ fuente }}
        </p>

        <!-- Aviso legal -->
        <p class="text-caption text-grey-darken-1 text-justify mt-2">
          Las tasas mostradas provienen de la tasa oficial publicada por el BCV.
          Esta calculadora es informativa y no constituye una oferta de compra o
          venta de divisas.
        </p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue"
import axios from "axios"

const tasa = ref(0)
const fechaActualizacion = ref("")
const bolivares = ref("")
const usd = ref("")
const fuente = ref("")

const CACHE_KEY = "bcv_tasa"
const CACHE_TIME = 5 * 60 * 60 * 1000 // 5 horas

async function obtenerTasas() {
  const ahora = Date.now()
  const cache = localStorage.getItem(CACHE_KEY)
  if (cache) {
    const { data, timestamp } = JSON.parse(cache)
    if (ahora - timestamp < CACHE_TIME) {
      console.log("Usando cache local 👌")
      tasa.value = data.tasa
      fechaActualizacion.value = data.fecha
      fuente.value = data.fuente
      return
    }
  }

  try {
    const { data } = await axios.get("https://bcvapi.tech/api/v1/dolar")
    tasa.value = data.tasa
    fechaActualizacion.value = data.fecha
    fuente.value = data.fuente
    localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: ahora }))
  } catch (error) {
    console.error("Error al obtener tasas:", error)
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
  const resultado = valor / tasa.value
  usd.value = resultado ? resultado.toFixed(2) : ""
}

function convertirDesdeUsd() {
  const valor = evaluarExpresion(usd.value)
  const resultado = valor * tasa.value
  bolivares.value = resultado ? resultado.toFixed(2) : ""
}

onMounted(() => {
  obtenerTasas()
})
</script>
