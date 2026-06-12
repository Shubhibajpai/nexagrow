import { Star } from 'lucide-react'
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll'

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'CEO, Bloom Ecommerce',
    avatar: 'SM',
    text: 'NexaGrow took our ROAS from 1.8x to 5.2x in just 4 months. Their AI-powered campaign management is something I have not seen elsewhere.',
    rating: 5,
  },
  {
    name: 'Rajiv Sharma',
    role: 'Founder, TechEdge SaaS',
    avatar: 'RS',
    text: 'We went from 200 to 1,400 qualified demo bookings per month. The automation workflows they built save us 20 hours a week.',
    rating: 5,
  },
  {
    name: 'Laura Chen',
    role: 'Marketing Head, FitLife App',
    avatar: 'LC',
    text: 'The transparency is incredible. Real dashboards, weekly calls, and real results. Our install cost dropped 60% in 90 days.',
    rating: 5,
  },
  {
    name: 'Daniel Okafor',
    role: 'Director, Horizon Real Estate',
    avatar: 'DO',
    text: 'Finally an agency that speaks revenue, not impressions. They drove 34 qualified property leads in the first month alone.',
    rating: 5,
  },
]

export default function Testimonials() {
  const { ref } = useAnimateOnScroll()

  return (
    <section id="testimonials" className="section-padding bg-slate-50" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-on-scroll">
          <span className="text-brand-600 text-sm font-semibold uppercase tracking-widest">Client Voices</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mt-3 mb-4">
            Real Clients, Real Results
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map(({ name, role, avatar, text, rating }, i) => (
            <div
              key={name}
              className="animate-on-scroll bg-white rounded-2xl p-8 shadow-sm border border-slate-100"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array(rating).fill(0).map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400" fill="currentColor" />
                ))}
              </div>
              <p className="text-slate-700 leading-relaxed mb-6">"{text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {avatar}
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">{name}</div>
                  <div className="text-slate-400 text-xs">{role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
