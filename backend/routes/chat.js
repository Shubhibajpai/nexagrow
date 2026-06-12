import { Router } from 'express'
import Anthropic from '@anthropic-ai/sdk'

const router = Router()

const SYSTEM_PROMPT = `You are Nexa, a helpful AI assistant for NexaGrow — an AI-powered digital marketing agency.

About NexaGrow:
- Services: SEO & Content Marketing, Paid Media (PPC), Social Media Marketing, AI & Marketing Automation, Email Marketing, Analytics & CRO
- Pricing: Starts from $1,500/month; full-service retainers $3,000–$8,000/month; custom proposals after free strategy call
- Contact: hello@nexagrow.com | +1 (555) 123-4567
- Notable results: 340% avg ROI boost, 500+ brands scaled, 8+ years experience
- Differentiators: AI-augmented execution, transparent reporting, no long-term contracts, dedicated account managers

Your role:
- Answer questions about NexaGrow's services, pricing, process, and results
- Guide users toward booking a free strategy call or filling out the contact form
- Keep responses concise, warm, and business-focused
- If asked about something unrelated to digital marketing or the agency, politely redirect
- Never make up specific statistics or guarantees not listed above

Keep responses under 150 words. Use bullet points sparingly.`

// POST /api/chat
router.post('/', async (req, res) => {
  const { messages } = req.body

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Messages array is required' })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey || apiKey === 'your_anthropic_api_key_here') {
    // Fallback when no API key set
    return res.json({
      reply: "I'd be happy to help! For detailed questions about our services and pricing, please fill out the contact form below and our team will get back to you within 24 hours. You can also reach us at hello@nexagrow.com 😊"
    })
  }

  try {
    const client = new Anthropic({ apiKey })
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: messages.slice(-10), // Keep last 10 messages for context
    })

    const reply = response.content[0]?.text || "I'm not sure how to answer that. Try asking about our services or pricing!"
    res.json({ reply })
  } catch (err) {
    console.error('Anthropic API error:', err)
    res.status(500).json({ error: 'Chat service temporarily unavailable' })
  }
})

export default router
