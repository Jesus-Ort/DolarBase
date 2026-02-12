export default defineEventHandler(async (event) => {
  try {
    const respuesta = await $fetch('https://dolar-base.vercel.app/api/tasa')
    return { usd: respuesta.rates.usd || 0 }
  } catch (error) {
    console.error('Error obteniendo USD:', error)
    return { usd: 0, error: 'No se pudo obtener la tasa' }
  }
})
