import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, ShieldCheck, ArrowRight } from 'lucide-react'
import GithubIcon from './GithubIcon'

export default function LandingNavbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-ink-900/70 border-b border-white/5">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-gem-500 to-cyan-500 shadow-lg shadow-gem-600/30">
            <ShieldCheck className="h-5 w-5 text-white" />
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-white">DueAlert</span>
        </Link>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com/Qisanxi/DueAlert"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-landing-ghost !px-4 !py-2 text-sm"
            aria-label="GitHub"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <Link to="/login" className="btn-landing-primary !px-5 !py-2 text-sm inline-flex items-center gap-2">
            Launch App
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden p-2 rounded-lg border border-white/10 text-slate-200"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden px-6 bg-ink-800/95 border-b border-white/5 overflow-hidden transition-[max-height] duration-400 ${
          open ? 'max-h-72' : 'max-h-0'
        }`}
      >
        <div className="py-4 flex flex-col gap-3 text-slate-300 text-sm">
          <a
            href="https://github.com/Qisanxi/DueAlert"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="btn-landing-ghost !px-4 !py-2.5 text-sm inline-flex items-center justify-center gap-2"
          >
            <GithubIcon className="h-4 w-4" /> View Source
          </a>
          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className="btn-landing-primary !px-4 !py-2.5 text-sm inline-flex items-center justify-center gap-2"
          >
            Launch App <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  )
}
