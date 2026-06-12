import { Zap } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 font-display font-bold text-xl mb-4">
              <Zap size={20} className="text-accent" fill="currentColor" />
              NexaGrow
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              AI-powered digital marketing that turns data into growth. We measure success in revenue, not impressions.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4">Services</h4>
            <ul className="space-y-2 text-white/50 text-sm">
              {['SEO & Content','Paid Media','Social Media','AI Automation','Email Marketing'].map(s => (
                <li key={s}><a href="#services" className="hover:text-white transition-colors">{s}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2 text-white/50 text-sm">
              <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Results</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="/admin" className="hover:text-white transition-colors">Admin</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between gap-3 text-white/30 text-xs">
          <span>© {new Date().getFullYear()} NexaGrow. All rights reserved.</span>
          <span>Built with React, Node.js & Tailwind CSS</span>
        </div>
      </div>
    </footer>
  )
}
