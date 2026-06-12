import { Router } from 'express'
import { getDb } from '../db/database.js'

const router = Router()

// POST /api/leads — create a new lead
router.post('/', (req, res) => {
  const { fullName, email, phone, service, message } = req.body

  // Server-side validation
  if (!fullName || fullName.trim().length < 2)
    return res.status(400).json({ error: 'Full name is required (min 2 chars)' })
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return res.status(400).json({ error: 'Valid email is required' })
  if (!phone || !/^\+?[\d\s\-()]{7,15}$/.test(phone))
    return res.status(400).json({ error: 'Valid phone number is required' })
  if (!service)
    return res.status(400).json({ error: 'Service selection is required' })
  if (!message || message.trim().length < 10)
    return res.status(400).json({ error: 'Message must be at least 10 characters' })

  try {
    const db = getDb()
    const stmt = db.prepare(`
      INSERT INTO leads (full_name, email, phone, service, message)
      VALUES (?, ?, ?, ?, ?)
    `)
    const result = stmt.run(fullName.trim(), email.trim(), phone.trim(), service, message.trim())

    // Optionally trigger n8n webhook
    if (process.env.N8N_WEBHOOK_URL) {
      fetch(process.env.N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: result.lastInsertRowid, fullName, email, phone, service, message }),
      }).catch(() => { /* non-blocking */ })
    }

    res.status(201).json({ success: true, id: result.lastInsertRowid })
  } catch (err) {
    console.error('DB error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// GET /api/leads — fetch all leads (admin)
router.get('/', (req, res) => {
  try {
    const db = getDb()
    const leads = db.prepare('SELECT * FROM leads ORDER BY created_at DESC').all()
    res.json(leads)
  } catch (err) {
    console.error('DB error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// DELETE /api/leads/:id
router.delete('/:id', (req, res) => {
  try {
    const db = getDb()
    db.prepare('DELETE FROM leads WHERE id = ?').run(req.params.id)
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
