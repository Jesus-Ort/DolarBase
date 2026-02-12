export default defineEventHandler(async () => {
  const response = await $fetch('https://bcv.justcarlux.dev/api/v1/rates')
  return response
})
