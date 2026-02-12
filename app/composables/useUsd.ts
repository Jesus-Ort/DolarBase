const CACHE_KEY = 'usd_cache'
const CACHE_TIME = 1 * 60 * 60 * 1000

export async function obtenerUsd() {
  try {
      const saved = localStorage.getItem(CACHE_KEY)

  if (saved) {
    const cache = JSON.parse(saved)
    const ahora = Date.now()

    if (ahora - cache.timestamp < CACHE_TIME) {
      return cache.value
    }
  }

  const data = await $fetch('/api/usd')

  const valor = data.usd

  localStorage.setItem(
    CACHE_KEY,
    JSON.stringify({
      value: valor,
      timestamp: Date.now()
    })
  )

  return valor
  } catch (error) {
    console.log("Error al obtener USD:", error)
    return 0
  }

}
