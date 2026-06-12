import { useState, useEffect } from 'react'
import { Menu, X, Zap } from 'lucide-react'

const links = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Results', href: '#results' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
       
        <a href="/" className="flex items-center gap-2 font-display font-bold text-xl text-brand-600">
          <Zap size={22} className="text-accent" fill="currentColor" />
          NexaGrow
        </a>

        
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-md font-medium text-black hover:text-brand-600 transition-colors">
              {l.label}
            </a>
          ))}
          <a href="#contact" className="bg-brand-600 text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-brand-700 transition-colors">
            Free Strategy Call
          </a>
        </div>

       
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

  
      {open && (
        <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 space-y-3">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block text-sm font-medium text-slate-700 py-1">
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="block bg-brand-600 text-white text-sm font-semibold px-5 py-2 rounded-full text-center mt-2">
            Free Strategy Call
          </a>
        </div>
      )}
    </nav>
  )
}
