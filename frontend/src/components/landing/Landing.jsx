import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'

import LandingNavbar from './LandingNavbar'
import FlowDiagram from './FlowDiagram'
import ArchitectureDiagram from './ArchitectureDiagram'
import Reveal from './Reveal'

// lucide-react v1 dropped brand icons (including Github).
// Inline the GitHub mark so we don't depend on an external icon pack.
function GithubIcon({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.94c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.4-3.88-1.4-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.74 1.27 3.4.97.1-.76.4-1.27.74-1.56-2.56-.3-5.26-1.28-5.26-5.7 0-1.26.45-2.3 1.2-3.1-.12-.3-.52-1.48.1-3.08 0 0 .97-.3 3.2 1.18a11.1 11.1 0 0 1 5.82 0c2.23-1.48 3.2-1.18 3.2-1.18.62 1.6.22 2.78.1 3.08.75.8 1.2 1.84 1.2 3.1 0 4.43-2.7 5.4-5.27 5.69.4.35.78 1.05.78 2.12v3.14c0 .31.2.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z" />
    </svg>
  )
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-ink-900 text-slate-200 landing-scrollbar">
      <LandingNavbar />

      {/* ============== HERO ============== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
        <div className="aurora-bg" />
        <div className="absolute inset-0 grid-bg" />

        <div className="relative max-w-5xl mx-auto px-6 z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-gem-400/30 bg-gem-500/10 px-4 py-1.5 text-xs font-medium text-gem-400 mb-10 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
            <Sparkles className="h-3.5 w-3.5" />
            Built with Google Gemini
          </div>

          {/* Logo / Title — big, bold, with gradient on "Alert" */}
          <h1 className="font-display text-7xl sm:text-8xl lg:text-9xl font-bold tracking-tight text-white mb-8 leading-none">
            Due<span className="text-gradient">Alert</span>
          </h1>

          {/* 2-3 line tagline */}
          <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-4">
            AI-powered fee collection for coaching centers.
          </p>
          <p className="text-base md:text-lg text-slate-500 max-w-xl mx-auto leading-relaxed mb-12">
            Gemini analyzes payment risk, predicts pay dates, and writes personalized Hinglish
            reminders — so you stop chasing fees and start collecting them.
          </p>

          {/* CTAs — Launch App is the star */}
          <div className="flex flex-wrap justify-center items-center gap-4">
            <Link
              to="/login"
              className="btn-landing-primary text-base md:text-lg !px-10 !py-4 group"
            >
              Launch App
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="https://github.com/Qisanxi/DueAlert"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-landing-ghost text-base md:text-lg !px-8 !py-4"
            >
              <GithubIcon className="h-5 w-5" />
              View Source
            </a>
          </div>

          {/* Scroll hint */}
          <div className="mt-20 flex flex-col items-center gap-2 text-slate-600 text-[11px] uppercase tracking-[0.25em]">
            <span>See how it works</span>
            <svg
              className="h-5 w-5 animate-bounce text-gem-400/70"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* ============== USER FLOW DIAGRAM ============== */}
      <section id="flow" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-gem-400">
              // How It Works
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mt-3 leading-tight">
              From sign-up to payment.
              <br />
              <span className="text-gradient">In 9 automated steps.</span>
            </h2>
            <p className="mt-4 text-slate-400 text-base md:text-lg">
              Follow the dots — Gemini AI handles the analysis, you handle the judgment.
            </p>
          </Reveal>
          <Reveal>
            <FlowDiagram />
          </Reveal>
        </div>
      </section>

      {/* ============== ARCHITECTURE DIAGRAM ============== */}
      <section id="architecture" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-800/30 to-ink-900" />
        <div className="relative max-w-7xl mx-auto px-6">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              // Architecture
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mt-3 leading-tight">
              Built on a modern
              <br />
              <span className="text-gradient">AI-first stack.</span>
            </h2>
          </Reveal>
          <Reveal>
            <ArchitectureDiagram />
          </Reveal>
        </div>
      </section>

      {/* ============== FINAL CTA ============== */}
      <section className="py-28 relative overflow-hidden">
        <div className="aurora-bg" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight">
              Ready to stop
              <br />
              <span className="text-gradient">chasing fees?</span>
            </h2>
          </Reveal>
          <Reveal>
            <div className="mt-12 flex justify-center">
              <Link
                to="/login"
                className="btn-landing-primary text-base md:text-lg !px-12 !py-5 group"
              >
                Launch App
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============== MINIMAL FOOTER ============== */}
      <footer className="border-t border-white/5 bg-ink-900 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 DueAlert · Built for the Build with Gemini XPRIZE Hackathon 2026</p>
          <p className="font-mono">Google Gemini · Firebase · FastAPI · React</p>
        </div>
      </footer>
    </div>
  )
}
