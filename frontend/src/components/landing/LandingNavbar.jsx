import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, ShieldCheck, ArrowRight } from 'lucide-react'

// lucide-react v1 dropped brand icons (including Github).
// Inline the GitHub mark so we don't depend on an external icon pack.
function GithubIcon({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.94c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.4-3.88-1.4-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.74 1.27 3.4.97.1-.76.4-1.27.74-1.56-2.56-.3-5.26-1.28-5.26-5.7 0-1.26.45-2.3 1.2-3.1-.12-.3-.52-1.48.1-3.08 0 0 .97-.3 3.2 1.18a11.1 11.1 0 0 1 5.82 0c2.23-1.48 3.2-1.18 3.2-1.18.62 1.6.22 2.78.1 3.08.75.8 1.2 1.84 1.2 3.1 0 4.43-2.7 5.4-5.27 5.69.4.35.78 1.05.78 2.12v3.14c0 .31.2.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z" />
    </svg>
  )
}

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
