import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, BellRing, ArrowRight } from 'lucide-react'

const LINKS = [
  { href: '#how', label: 'How It Works' },
  { href: '#features', label: 'What You Get' },
  { href: '#india', label: 'Built for India' },
  { href: '#faq', label: 'FAQ' },
]

export default function LandingNavbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-lg bg-warm-50/80 border-b border-warm-200">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 shadow-md shadow-brand-600/30">
            <BellRing className="h-5 w-5 text-white" />
          </span>
          <span className="font-bold text-xl tracking-tight text-ink2-900">DueAlert</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7 text-sm text-ink2-700 font-medium">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hover:text-brand-700 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm font-semibold text-ink2-700 hover:text-brand-700 px-3 py-2"
          >
            Sign In
          </Link>
          <Link to="/login" className="btn-brand !px-5 !py-2 text-sm">
            Start Free
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden p-2 rounded-lg border border-warm-200 text-ink2-700"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden px-6 bg-warm-50 border-b border-warm-200 overflow-hidden transition-[max-height] duration-400 ${
          open ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="py-4 flex flex-col gap-1 text-ink2-700 text-sm font-medium">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-2.5 border-b border-warm-200 last:border-0"
            >
              {l.label}
            </a>
          ))}
          <div className="flex gap-3 pt-4">
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="btn-brand-outline flex-1 text-sm justify-center !py-2.5"
            >
              Sign In
            </Link>
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="btn-brand flex-1 text-sm justify-center !py-2.5"
            >
              Start Free
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
