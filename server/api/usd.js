export default defineEventHandler(async (event) => {
  try {
    const respuesta = await $fetch('https://bcv.justcarlux.dev/api/v1/rates')
    const usd = respuesta?.rates?.usd || 0

    return { usd }
  } catch (error) {
    console.error('Error obteniendo USD:', error)
    return { usd: 0, error: 'No se pudo obtener la tasa' }
  }
})
