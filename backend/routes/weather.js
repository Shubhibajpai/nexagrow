import { Router } from 'express'

const router = Router()

// GET /api/weather?city=London
router.get('/', async (req, res) => {
  const { city } = req.query
  if (!city || !city.trim()) {
    return res.status(400).json({ error: 'City parameter is required' })
  }

  const apiKey = process.env.OPENWEATHER_API_KEY
  if (!apiKey || apiKey === 'your_openweather_api_key_here') {
    // Demo fallback data when no API key is set
    return res.json({
      name: city,
      sys: { country: 'US' },
      main: { temp: 22, feels_like: 21, humidity: 65 },
      weather: [{ description: 'partly cloudy (demo mode)' }],
      wind: { speed: 4.2 },
      visibility: 10000,
    })
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city.trim())}&units=metric&appid=${apiKey}`
    const response = await fetch(url)

    if (!response.ok) {
      const data = await response.json()
      if (response.status === 404) return res.status(404).json({ error: 'City not found. Please check the city name.' })
      if (response.status === 401) return res.status(401).json({ error: 'Invalid API key' })
      return res.status(response.status).json({ error: data.message || 'Weather API error' })
    }

    const data = await response.json()
    res.json(data)
  } catch (err) {
    console.error('Weather fetch error:', err)
    res.status(500).json({ error: 'Failed to fetch weather data' })
  }
})

export default router
