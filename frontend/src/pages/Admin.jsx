import { useState, useEffect } from 'react'
import axios from 'axios'
import { Users, Mail, Phone, Calendar, Search, Download, RefreshCw, Loader2, Zap } from 'lucide-react'

export default function Admin() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const services = ['all', 'SEO & Content Marketing', 'Paid Media (PPC)', 'Social Media Marketing',
    'AI & Marketing Automation', 'Email Marketing', 'Analytics & CRO', 'Full-Service Package']

  async function fetchLeads() {
    setLoading(true)
    try {
      const res = await axios.get('/api/leads')
      setLeads(res.data)
    } catch { /* silent */ }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchLeads() }, [])

  const filtered = leads.filter(l => {
    const matchSearch = [l.full_name, l.email, l.phone, l.message]
      .join(' ').toLowerCase().includes(search.toLowerCase())
    const matchService = filter === 'all' || l.service === filter
    return matchSearch && matchService
  })

  function downloadCSV() {
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Service', 'Message', 'Date']
    const rows = filtered.map(l => [l.id, l.full_name, l.email, l.phone, l.service, l.message, l.created_at])
    const csv = [headers, ...rows].map(r => r.map(v => `"${String(v || '').replace(/"/g, '""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'nexagrow-leads.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-brand-900 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 font-display font-bold text-lg">
          <Zap size={18} className="text-accent" fill="currentColor" />
          NexaGrow Admin
        </div>
        <a href="/" className="text-sm text-white/60 hover:text-white transition-colors">← Back to site</a>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="font-display text-2xl font-bold text-slate-900">Lead Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">All contact form submissions</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { icon: Users, label: 'Total Leads', value: leads.length, color: 'text-brand-600' },
            { icon: Calendar, label: 'This Week', value: leads.filter(l => {
              const d = new Date(l.created_at)
              const now = new Date()
              const week = new Date(now.getTime() - 7 * 24 * 3600 * 1000)
              return d >= week
            }).length, color: 'text-green-600' },
            { icon: Mail, label: 'Unique Emails', value: new Set(leads.map(l => l.email)).size, color: 'text-accent' },
            { icon: Phone, label: 'With Phone', value: leads.filter(l => l.phone).length, color: 'text-purple-600' },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
              <div className={`${color} mb-1`}><Icon size={20} /></div>
              <div className="font-display font-bold text-2xl text-slate-900">{value}</div>
              <div className="text-slate-500 text-xs mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm">
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search leads…"
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 rounded-lg border border-slate-200 text-sm outline-none focus:border-brand-400"
              />
            </div>
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="px-3 py-2.5 bg-slate-50 rounded-lg border border-slate-200 text-sm outline-none text-slate-700"
            >
              {services.map(s => <option key={s} value={s}>{s === 'all' ? 'All Services' : s}</option>)}
            </select>
            <button onClick={fetchLeads} className="p-2.5 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors" title="Refresh">
              <RefreshCw size={16} className="text-slate-600" />
            </button>
            <button onClick={downloadCSV} className="flex items-center gap-2 bg-brand-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-brand-700 transition-colors">
              <Download size={15} /> Export CSV
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={28} className="animate-spin text-brand-400" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
              <Users size={40} className="mx-auto mb-3 opacity-40" />
              <p className="text-sm">No leads found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-left text-xs uppercase tracking-wide">
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Phone</th>
                    <th className="px-4 py-3">Service</th>
                    <th className="px-4 py-3">Message</th>
                    <th className="px-4 py-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map(lead => (
                    <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-slate-900">{lead.full_name}</td>
                      <td className="px-4 py-3 text-slate-600">{lead.email}</td>
                      <td className="px-4 py-3 text-slate-600">{lead.phone}</td>
                      <td className="px-4 py-3">
                        <span className="bg-brand-50 text-brand-700 text-xs px-2 py-1 rounded-full">{lead.service}</span>
                      </td>
                      <td className="px-4 py-3 text-slate-500 max-w-xs truncate">{lead.message}</td>
                      <td className="px-4 py-3 text-slate-400 whitespace-nowrap">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
