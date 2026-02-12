export default async (req, res) => {
  try {
    const respuesta = await fetch('https://dolar-base.vercel.app/api/tasa')
    const data = await respuesta.json()

    res.status(200).json({ usd: Number(data.usd) })
  } catch (error) {
    res.status(500).json({ error: 'No se pudo obtener la tasa' })
  }
}
 