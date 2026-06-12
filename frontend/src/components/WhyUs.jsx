import { Clock, Target, Cpu, Shield } from 'lucide-react'
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll'

const reasons = [
  { icon: Target, title: 'Revenue-First Mindset', desc: 'Every campaign is tied to a revenue goal. No fluff metrics, no vanity plays.' },
  { icon: Cpu,    title: 'AI-Augmented Execution', desc: 'We use the latest AI tools to move 3× faster while maintaining strategic quality.' },
  { icon: Clock,  title: 'Rapid Iteration', desc: 'Weekly sprints mean you see impact fast. No 6-month waiting periods.' },
  { icon: Shield, title: 'Transparent Accountability', desc: 'Real-time dashboards so you always know exactly where your budget is going.' },
]

export default function WhyUs() {
  const { ref } = useAnimateOnScroll()

  return (
    <section id="results" className="section-padding bg-brand-900" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-on-scroll">
          <span className="text-accent text-sm font-semibold uppercase tracking-widest">Why NexaGrow</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            What Sets Us Apart
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Most agencies promise results. We engineer them.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reasons.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className="animate-on-scroll glass rounded-2xl p-8 hover:bg-white/10 transition-colors"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                <Icon size={22} className="text-accent" />
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-2">{title}</h3>
              <p className="text-white/60 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
