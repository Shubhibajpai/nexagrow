import { CheckCircle } from 'lucide-react'
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll'

const points = [
  'AI-assisted strategy and creative production',
  'Weekly transparent reporting dashboards',
  'Dedicated account manager, no outsourcing',
  'Month-to-month contracts – earn trust every month',
]

export default function About() {
  const { ref } = useAnimateOnScroll()

  return (
    <section id="about" className="section-padding bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Visual side */}
        <div className="animate-on-scroll relative">
          <div className="w-full aspect-square max-w-md mx-auto lg:mx-0 rounded-3xl bg-gradient-to-br from-brand-600 to-brand-900 flex items-center justify-center overflow-hidden">
            <div className="text-center text-white p-10">
              <div className="font-display text-7xl font-extrabold mb-2">8+</div>
              <div className="text-white/70 text-lg">Years of growth marketing</div>
              <div className="mt-8 grid grid-cols-2 gap-4 text-left">
                {[['$40M+','Revenue Generated'], ['500+','Brands Served'], ['98%','Client Retention'], ['15+','Awards Won']].map(([n,l]) => (
                  <div key={l} className="bg-white/10 rounded-xl p-4">
                    <div className="font-display font-bold text-2xl">{n}</div>
                    <div className="text-white/60 text-xs mt-1">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Floating badge */}
          <div className="absolute -bottom-4 -right-4 md:right-0 bg-accent text-white rounded-2xl p-4 shadow-lg shadow-orange-400/30">
            <div className="font-display font-bold text-xl">Top 1%</div>
            <div className="text-white/80 text-xs">Google Partner Agency</div>
          </div>
        </div>

        {/* Text side */}
        <div className="animate-on-scroll" style={{ transitionDelay: '200ms' }}>
          <span className="text-brand-600 text-sm font-semibold uppercase tracking-widest">Who We Are</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mt-3 mb-6">
            A Team Obsessed With Your Growth
          </h2>
          <p className="text-slate-500 leading-relaxed mb-6">
            NexaGrow was founded on a simple belief: marketing should directly drive revenue. We built our agency around that principle — every campaign, every automation, every piece of content is mapped back to business outcomes.
          </p>
          <p className="text-slate-500 leading-relaxed mb-8">
            Our team blends deep human expertise with the latest AI tools to give clients the speed of automation without sacrificing strategic thinking.
          </p>
          <ul className="space-y-3">
            {points.map(p => (
              <li key={p} className="flex items-center gap-3 text-slate-700 text-sm">
                <CheckCircle size={18} className="text-brand-600 flex-shrink-0" />
                {p}
              </li>
            ))}
          </ul>
          <a href="#contact" className="mt-8 inline-flex items-center gap-2 bg-brand-600 text-white font-semibold px-7 py-3 rounded-full hover:bg-brand-700 transition-colors">
            Meet the Team
          </a>
        </div>
      </div>
    </section>
  )
}
