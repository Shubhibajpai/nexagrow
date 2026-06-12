import { useState, useEffect } from 'react'
import axios from 'axios'
import { Cloud, Wind, Droplets, Thermometer, Search, Loader2 } from 'lucide-react'
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll'

export default function WeatherWidget() {
  const [city, setCity] = useState('San Francisco')
  const [input, setInput] = useState('San Francisco')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { ref } = useAnimateOnScroll()

  async function fetchWeather(cityName) {
    setLoading(true)
    setError('')

    try {
      const res = await axios.get(
        `/api/weather?city=${encodeURIComponent(cityName)}`
      )

      const data = res.data

      if (
        !data ||
        !data.main ||
        !data.weather ||
        !Array.isArray(data.weather) ||
        !data.sys
      ) {
        throw new Error('Invalid weather data received')
      }

      setWeather(data)
    } catch (err) {
      console.error('Weather API Error:', err)

      setWeather(null)

      setError(
        err.response?.data?.error ||
        err.message ||
        'Could not fetch weather. Try another city.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWeather(city)
  }, [city])

  function handleSearch(e) {
    e.preventDefault()

    if (input.trim()) {
      setCity(input.trim())
    }
  }

  return (
    <section
      className="section-padding bg-gradient-to-br from-slate-900 to-brand-900"
      ref={ref}
    >
      <div className="max-w-4xl mx-auto animate-on-scroll">
        <div className="text-center mb-10">
          <span className="text-accent text-sm font-semibold uppercase tracking-widest">
            Live API Integration
          </span>

          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-3 mb-2">
            Real-Time Weather
          </h2>

          <p className="text-white/50 text-sm">
            Powered by OpenWeatherMap API
          </p>
        </div>

        <form
          onSubmit={handleSearch}
          className="flex gap-3 max-w-md mx-auto mb-8"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter city name..."
            className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/40 text-sm outline-none focus:border-brand-400 transition-colors"
          />

          <button
            type="submit"
            className="bg-brand-600 text-white px-5 py-3 rounded-xl hover:bg-brand-700 transition-colors"
          >
            <Search size={18} />
          </button>
        </form>

        {loading && (
          <div className="text-center py-10">
            <Loader2
              size={32}
              className="animate-spin text-brand-400 mx-auto"
            />
          </div>
        )}

        {error && (
          <div className="text-center py-6 text-red-400 text-sm">
            {error}
          </div>
        )}

        {weather?.main &&
          weather?.weather &&
          weather?.sys &&
          !loading && (
            <div className="glass rounded-2xl p-8 text-white">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="text-center md:text-left">
                  <div className="text-6xl font-display font-extrabold">
                    {Math.round(weather.main.temp)}°C
                  </div>

                  <div className="text-white/60 capitalize mt-1">
                    {weather.weather[0]?.description}
                  </div>

                  <div className="font-semibold text-xl mt-2">
                    {weather.name}, {weather.sys.country}
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-2 gap-4 w-full">
                  {[
                    {
                      icon: Thermometer,
                      label: 'Feels Like',
                      value: `${Math.round(weather.main.feels_like)}°C`,
                    },
                    {
                      icon: Droplets,
                      label: 'Humidity',
                      value: `${weather.main.humidity}%`,
                    },
                    {
                      icon: Wind,
                      label: 'Wind Speed',
                      value: `${weather.wind?.speed ?? 0} m/s`,
                    },
                    {
                      icon: Cloud,
                      label: 'Visibility',
                      value: `${(
                        (weather.visibility ?? 0) / 1000
                      ).toFixed(1)} km`,
                    },
                  ].map(({ icon: Icon, label, value }) => (
                    <div
                      key={label}
                      className="bg-white/10 rounded-xl p-4 flex items-center gap-3"
                    >
                      <Icon
                        size={18}
                        className="text-brand-300 flex-shrink-0"
                      />

                      <div>
                        <div className="text-white/50 text-xs">
                          {label}
                        </div>

                        <div className="font-semibold text-sm">
                          {value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
      </div>
    </section>
  )
}