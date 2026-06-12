import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Send, Loader2 } from 'lucide-react'
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll'

const services = [
  'SEO & Content Marketing',
  'Paid Media (PPC)',
  'Social Media Marketing',
  'AI & Marketing Automation',
  'Email Marketing',
  'Analytics & CRO',
  'Full-Service Package',
]

const initialState = { fullName: '', email: '', phone: '', service: '', message: '' }

export default function ContactForm() {
  const [form, setForm] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { ref } = useAnimateOnScroll()

  function validate() {
    const e = {}
    if (!form.fullName.trim() || form.fullName.trim().length < 2)
      e.fullName = 'Please enter your full name (min 2 characters)'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      e.email = 'Please enter a valid email address'
    if (!form.phone.match(/^\+?[\d\s\-()]{7,15}$/))
      e.phone = 'Please enter a valid phone number'
    if (!form.service)
      e.service = 'Please select a service'
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = 'Message must be at least 10 characters'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    try {
      await axios.post('/api/leads', form)
      setSubmitted(true)
      toast.success('Message sent! We will be in touch within 24 hours.')
      setForm(initialState)
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const field = (name, label, type = 'text', placeholder = '') => (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <input
        type={type}
        value={form[name]}
        onChange={e => setForm({ ...form, [name]: e.target.value })}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all
          ${errors[name] ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-100'}`}
      />
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
    </div>
  )

  return (
    <section id="contact" className="section-padding bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left copy */}
        <div className="animate-on-scroll">
          <span className="text-brand-600 text-sm font-semibold uppercase tracking-widest">Get In Touch</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mt-3 mb-6">
            Ready to 10× Your Growth?
          </h2>
          <p className="text-slate-500 leading-relaxed mb-8">
            Tell us about your business and goals. We will prepare a tailored strategy document and send it to your inbox before our call — no fluff, just data.
          </p>
          <div className="space-y-4">
            {[
              ['📞', 'Response within 24 hours'],
              ['📊', 'Free growth audit included'],
              ['🤝', 'No obligation, no hard sell'],
            ].map(([emoji, text]) => (
              <div key={text} className="flex items-center gap-3 text-slate-600 text-sm">
                <span className="text-xl">{emoji}</span> {text}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="animate-on-scroll" style={{ transitionDelay: '200ms' }}>
          {submitted ? (
            <div className="bg-brand-50 border border-brand-100 rounded-2xl p-10 text-center">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="font-display font-bold text-xl text-brand-700 mb-2">You're on the list!</h3>
              <p className="text-slate-600 text-sm">
                We've received your request and will reach out within 24 hours with your free growth audit.
              </p>
              <button onClick={() => setSubmitted(false)} className="mt-6 text-brand-600 text-sm underline">
                Submit another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="bg-slate-50 rounded-2xl p-8 space-y-5 border border-slate-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {field('fullName', 'Full Name', 'text', 'Jane Smith')}
                {field('email', 'Email Address', 'email', 'jane@company.com')}
              </div>
              {field('phone', 'Phone Number', 'tel', '+1 555 000 0000')}

              {/* Service select */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Service Interested In</label>
                <select
                  value={form.service}
                  onChange={e => setForm({ ...form, service: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all
                    ${errors.service ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-100'}`}
                >
                  <option value="">Select a service…</option>
                  {services.map(s => <option key={s}>{s}</option>)}
                </select>
                {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about your business, current challenges, and what you're looking to achieve…"
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all resize-none
                    ${errors.message ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-100'}`}
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-brand-600 text-white font-semibold py-4 rounded-xl hover:bg-brand-700 transition-colors disabled:opacity-60"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                {loading ? 'Sending…' : 'Send My Free Audit Request'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
