import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react'
import axios from 'axios'

const RULES = {
  greeting: {
    patterns: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'howdy'],
    response: "Hi there! 👋 I'm Nexa, NexaGrow's AI assistant. I can help you learn about our services, pricing, or book a strategy call. What can I do for you today?"
  },
  services: {
    patterns: ['service', 'what do you do', 'offer', 'help with', 'seo', 'ppc', 'social media', 'email marketing'],
    response: "We offer 6 core services:\n\n• 🔍 SEO & Content Marketing\n• 📈 Paid Media (Google/Meta Ads)\n• 📱 Social Media Marketing\n• 🤖 AI & Marketing Automation\n• 📧 Email Marketing\n• 📊 Analytics & CRO\n\nWant details on any specific service?"
  },
  pricing: {
    patterns: ['price', 'cost', 'how much', 'pricing', 'rate', 'budget', 'package'],
    response: "Our packages start from $1,500/month for focused single-channel campaigns. Full-service retainers typically range from $3,000–$8,000/month depending on scope.\n\nEvery client gets a custom proposal after a free strategy call — we don't do one-size-fits-all pricing."
  },
  contact: {
    patterns: ['contact', 'call', 'talk', 'reach', 'email', 'phone', 'speak'],
    response: "You can reach us at:\n\n📧 hello@nexagrow.com\n📞 +1 (555) 123-4567\n\nOr fill out the contact form on this page and we'll respond within 24 hours with a free growth audit!"
  },
  results: {
    patterns: ['result', 'case study', 'success', 'roi', 'return', 'client', 'example', 'work'],
    response: "Here are a few recent wins:\n\n🛒 Bloom Ecommerce: ROAS from 1.8× to 5.2× in 4 months\n💻 TechEdge SaaS: Demo bookings grew 7× in 6 months\n🏡 Horizon Real Estate: 34 leads in Month 1\n\nScroll to the Testimonials section for more!"
  },
  time: {
    patterns: ['how long', 'timeline', 'when', 'start', 'onboarding'],
    response: "Typical onboarding takes 5–7 business days after signing. You'll usually see initial data within the first 2 weeks and meaningful results by month 2–3 depending on the channel."
  },
  default: "I'm not sure I understood that. I can help with our services, pricing, timeline, results, or getting in contact. What would you like to know? 😊"
}

function getRuleResponse(text) {
  const lower = text.toLowerCase()
  for (const [, rule] of Object.entries(RULES)) {
    if (rule.patterns && rule.patterns.some(p => lower.includes(p))) {
      return rule.response
    }
  }
  return null
}

const INIT_MSG = { role: 'bot', text: "Hi! 👋 I'm Nexa, NexaGrow's AI assistant. Ask me about our services, pricing, or how we can help grow your business!", time: new Date() }

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([INIT_MSG])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [unread, setUnread] = useState(0)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) {
      setUnread(0)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendMessage(e) {
    e.preventDefault()
    const text = input.trim()
    if (!text) return
    setInput('')
    const userMsg = { role: 'user', text, time: new Date() }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)

    // Try rule-based first
    const ruleResp = getRuleResponse(text)
    if (ruleResp) {
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'bot', text: ruleResp, time: new Date() }])
        if (!open) setUnread(n => n + 1)
        setLoading(false)
      }, 500)
      return
    }

    // Fallback to AI API
    try {
      const history = [...messages, userMsg].map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.text
      }))
      const res = await axios.post('/api/chat', { messages: history })
      const botText = res.data.reply
      setMessages(prev => [...prev, { role: 'bot', text: botText, time: new Date() }])
      if (!open) setUnread(n => n + 1)
    } catch {
      setMessages(prev => [...prev, { role: 'bot', text: "Sorry, I'm having a moment! Please try again or contact us at hello@nexagrow.com 😅", time: new Date() }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-brand-600 text-white shadow-lg shadow-brand-600/40 flex items-center justify-center hover:bg-brand-700 transition-all hover:scale-105"
        aria-label="Open chat"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
        {!open && unread > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-xs rounded-full flex items-center justify-center font-bold">
            {unread}
          </span>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden"
          style={{ maxHeight: '520px' }}>
          {/* Header */}
          <div className="bg-brand-600 text-white px-5 py-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <Bot size={18} />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-sm">Nexa</div>
              <div className="text-white/70 text-xs flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Online · Usually replies instantly
              </div>
            </div>
            <button onClick={() => setOpen(false)}><X size={18} /></button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 chat-messages" style={{ minHeight: 0 }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs
                  ${msg.role === 'user' ? 'bg-brand-100 text-brand-600' : 'bg-brand-600 text-white'}`}>
                  {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                </div>
                <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line
                  ${msg.role === 'user'
                    ? 'bg-brand-600 text-white rounded-tr-sm'
                    : 'bg-slate-100 text-slate-800 rounded-tl-sm'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-brand-600 flex items-center justify-center flex-shrink-0">
                  <Bot size={14} className="text-white" />
                </div>
                <div className="bg-slate-100 px-4 py-3 rounded-2xl rounded-tl-sm">
                  <Loader2 size={16} className="animate-spin text-slate-400" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} className="border-t border-slate-100 p-3 flex gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type a message…"
              disabled={loading}
              className="flex-1 bg-slate-50 rounded-xl px-4 py-2.5 text-sm outline-none border border-slate-200 focus:border-brand-400 transition-colors"
            />
            <button type="submit" disabled={loading || !input.trim()}
              className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white disabled:opacity-40 hover:bg-brand-700 transition-colors">
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </>
  )
}
