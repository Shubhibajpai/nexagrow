import { ArrowRight, TrendingUp, Users, Award } from 'lucide-react'

const stats = [
  { icon: TrendingUp, value: '340%', label: 'Avg. ROI boost' },
  { icon: Users,     value: '500+', label: 'Brands scaled' },
  { icon: Award,     value: '8 yrs', label: 'Industry expertise' },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-brand-900 via-brand-700 to-slate-900 pt-16">
      {/* Background grid decoration */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      {/* Floating orbs */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-accent/20 blur-3xl animate-float" />
      <div className="absolute bottom-1/4 left-1/4 w-56 h-56 rounded-full bg-brand-500/30 blur-3xl animate-float" style={{ animationDelay: '3s' }} />

      <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <span className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-8 backdrop-blur-sm border border-white/10">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            AI-Powered Digital Marketing
          </span>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-6">
            Grow Faster With
            <span className="block text-gradient bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent">
              Data & AI
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 max-w-xl mb-10 leading-relaxed">
            NexaGrow combines performance marketing with AI automation to deliver measurable revenue growth — not just traffic.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#contact"
              className="group flex items-center justify-center gap-2 bg-accent text-white font-semibold px-8 py-4 rounded-full hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/30 text-base">
              Get Free Strategy Call
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#services"
              className="flex items-center justify-center gap-2 bg-white/10 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/20 transition-all backdrop-blur-sm border border-white/10 text-base">
              See Our Services
            </a>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-8 mt-16 pt-10 border-t border-white/10">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <Icon size={18} className="text-accent" />
                </div>
                <div>
                  <div className="font-display font-bold text-white text-xl">{value}</div>
                  <div className="text-white/50 text-xs">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
