export default defineEventHandler(async (event) => {
  try {
    const respuesta = await $fetch('https://bcv.justcarlux.dev/api/v1/rates', {
      method: 'GET',
    })

    const usd = respuesta?.rates?.usd
    if (!usd) {
      throw new Error('No se encontró el valor de USD en la respuesta')
    }

    return { usd }
  } catch (error) {
    console.error('Error obteniendo USD:', error)
    return { usd: 0, error: error.message || 'No se pudo obtener la tasa' }
  }
})
