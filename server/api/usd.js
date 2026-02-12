export default defineEventHandler(async (event) => {
  try {
    const respuesta = await $fetch('https://bcv.justcarlux.dev/api/v1/rates')
    return { usd: respuesta.rates.usd || 0 }
  } catch (error) {
    console.error('Error obteniendo USD:', error)
    return { usd: 0, error: 'No se pudo obtener la tasa' }
  }
})
