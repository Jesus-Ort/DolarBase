const API_URL = 'https://ve.dolarapi.com/v1/dolares/oficial'
const CACHE_TIME = 1 * 60 * 60 * 1000

let cache = null

export default defineEventHandler(async () => {
  const now = Date.now()

  if (cache && now - cache.timestamp < CACHE_TIME) {
    return cache.value
  }

  try {
    const response = await $fetch(API_URL, { timeout: 8000 })
    cache = {
      timestamp: now,
      value: {
        promedio: Number(response?.promedio) || 0,
        fechaActualizacion: response?.fechaActualizacion || null,
      },
    }
    return cache.value
  } catch (error) {
    console.error('Error al obtener tasa en servidor:', error)
    if (cache) {
      return cache.value
    }
    return {
      promedio: 0,
      fechaActualizacion: null,
    }
  }
})