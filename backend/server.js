import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import leadsRouter from './routes/leads.js'
import weatherRouter from './routes/weather.js'
import chatRouter from './routes/chat.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }))
app.use(express.json({ limit: '10kb' }))

// Rate limiting (simple in-memory)
const requestCounts = new Map()
app.use((req, res, next) => {
  const ip = req.ip
  const now = Date.now()
  const windowMs = 60_000
  const maxReqs = 60

  const entry = requestCounts.get(ip) || { count: 0, start: now }
  if (now - entry.start > windowMs) {
    requestCounts.set(ip, { count: 1, start: now })
  } else {
    entry.count++
    if (entry.count > maxReqs) {
      return res.status(429).json({ error: 'Too many requests. Please slow down.' })
    }
    requestCounts.set(ip, entry)
  }
  next()
})

// API routes
app.use('/api/leads', leadsRouter)
app.use('/api/weather', weatherRouter)
app.use('/api/chat', chatRouter)

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date() }))

// Serve frontend build in production
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '..', 'frontend', 'dist')
  app.use(express.static(frontendPath))
  app.get('*', (req, res) => res.sendFile(path.join(frontendPath, 'index.html')))
}

app.listen(PORT, () => {
  console.log(`✅ NexaGrow server running on http://localhost:${PORT}`)
})
