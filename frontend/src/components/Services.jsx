import { Search, BarChart2, Share2, Bot, Mail, TrendingUp } from 'lucide-react'
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll'

const services = [
  { icon: Search,    title: 'SEO & Content', desc: 'Rank higher, attract the right audience, and build lasting organic growth with AI-assisted keyword strategies.' },
  { icon: BarChart2, title: 'Paid Media (PPC)', desc: 'Google Ads, Meta Ads, and LinkedIn campaigns optimised with machine learning to lower your CPA.' },
  { icon: Share2,    title: 'Social Media', desc: 'Brand storytelling, community management, and viral content that converts followers into customers.' },
  { icon: Bot,       title: 'AI Automation', desc: 'Automate lead nurturing, email sequences, and CRM workflows with n8n and custom AI agents.' },
  { icon: Mail,      title: 'Email Marketing', desc: 'Personalised drip campaigns and lifecycle emails that keep your brand top-of-mind.' },
  { icon: TrendingUp,title: 'Analytics & CRO', desc: 'GA4, heatmaps, A/B testing – we turn data into decisions that lift conversion rates.' },
]

export default function Services() {
  const { ref } = useAnimateOnScroll()

  return (
    <section id="services" className="section-padding bg-slate-50">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className="text-center mb-16 animate-on-scroll">
          <span className="text-brand-600 text-sm font-semibold uppercase tracking-widest">What We Do</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mt-3 mb-4">
            Services Built for Results
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Every service connects to revenue. We don't do vanity metrics.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className="animate-on-scroll bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-slate-100 group"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center mb-5 group-hover:bg-brand-600 transition-colors">
                <Icon size={22} className="text-brand-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900 mb-2">{title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
