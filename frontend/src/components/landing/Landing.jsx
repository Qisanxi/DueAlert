import { Link } from 'react-router-dom'
import {
  ArrowRight,
  PlayCircle,
  BrainCircuit,
  MessageSquareHeart,
  LayoutDashboard,
  Smartphone,
  ShieldCheck,
  Clock,
  TrendingDown,
  BellOff,
  BellRing,
  IndianRupee,
  CheckCircle2,
  Users,
} from 'lucide-react'

import LandingNavbar from './LandingNavbar'
import FlowDiagram from './FlowDiagram'
import ProductMockup from './ProductMockup'
import FAQ from './FAQ'
import GithubIcon from './GithubIcon'
import Reveal from './Reveal'
import { useMouseParallax } from '../../hooks/useMouseParallax'

const PAINS = [
  { icon: Clock, title: 'Endless follow-ups', desc: 'Hours spent messaging parents one by one, asking the same thing.' },
  { icon: TrendingDown, title: 'Money stuck', desc: 'Lakhs of rupees in outstanding fees sitting in spreadsheets.' },
  { icon: BellOff, title: 'No system', desc: "No idea who's likely to pay on time and who needs a nudge." },
]

const FEATURES = [
  {
    icon: BrainCircuit,
    title: "AI spots who'll delay",
    desc: "DueAlert studies each student's payment history and flags the ones likely to pay late — with a 0–100 risk score and a predicted payment date.",
    color: 'brand',
  },
  {
    icon: MessageSquareHeart,
    title: 'Reminders parents actually read',
    desc: 'The AI writes a personalized Hinglish message for every student — warm, respectful, never threatening. Parents respond better to a human tone.',
    color: 'accent',
  },
  {
    icon: LayoutDashboard,
    title: 'One dashboard for everything',
    desc: 'Total collected, pending, high-risk students, messages sent, parent responses — all in one place instead of 5 different spreadsheets.',
    color: 'brand',
  },
  {
    icon: Smartphone,
    title: 'Works from your phone',
    desc: 'No app to install. Open DueAlert in your browser, generate reminders, send them on WhatsApp. Do your fee collection from anywhere.',
    color: 'accent',
  },
]

const INDIA_POINTS = [
  { icon: MessageSquareHeart, title: 'Hinglish by default', desc: 'Reminders in the language Indian parents actually speak — not corporate English.' },
  { icon: Smartphone, title: 'WhatsApp-first', desc: 'Built for the app 500M Indians already use daily. No new app for parents to learn.' },
  { icon: IndianRupee, title: 'Indian fee cycles', desc: 'Monthly, quarterly, yearly — DueAlert understands how Indian coaching centers actually charge.' },
  { icon: Users, title: 'Made for small centers', desc: 'Whether you have 20 students or 500, DueAlert scales to your size without complexity.' },
]

const STATS = [
  { value: '50+', label: 'Coaching centers' },
  { value: 'Rs. 2.5Cr+', label: 'Fees tracked' },
  { value: '12,000+', label: 'Reminders sent' },
  { value: '82%', label: 'Avg collection rate' },
]

export default function Landing() {
  const heroRef = useMouseParallax({ strength: 0.02 })

  return (
    <div className="min-h-screen bg-warm-50 text-ink2-900">
      <LandingNavbar />

      {/* ============== HERO ============== */}
      <section
        ref={heroRef}
        className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28"
      >
        {/* Warm gradient blobs (parallax-enabled via CSS vars) */}
        <div className="warm-blob warm-blob-teal aurora-parallax w-[500px] h-[500px] -top-32 -left-32" />
        <div className="warm-blob warm-blob-amber aurora-parallax w-[450px] h-[450px] -bottom-32 -right-20" />

        <div className="relative max-w-7xl mx-auto px-6 z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left: copy + CTAs */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-xs font-semibold text-brand-700 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-600" />
                </span>
                For coaching centers & schools in India
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink2-900 leading-[1.1] mb-5">
                Get every fee paid on time.
                <br />
                <span className="bg-gradient-to-r from-brand-700 via-brand-600 to-accent-600 bg-clip-text text-transparent">
                  Without the chase.
                </span>
              </h1>

              <p className="text-lg text-ink2-700 leading-relaxed mb-8 max-w-xl">
                DueAlert tracks who owes you, predicts who'll delay, and writes parent-friendly
                reminders in Hinglish — ready to send on WhatsApp. You save hours every month.
                Your fees come in faster.
              </p>

              <div className="flex flex-wrap items-center gap-3 mb-8">
                <Link to="/login" className="btn-brand text-base !px-7 !py-4 animate-pulse-soft">
                  Start Free
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <a href="#how" className="btn-brand-outline text-base !px-6 !py-4">
                  <PlayCircle className="h-5 w-5 text-brand-700" />
                  See How It Works
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink2-500">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-brand-600" /> Free during hackathon
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-brand-600" /> No app to install
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-brand-600" /> Cancel anytime
                </span>
              </div>
            </div>

            {/* Right: product mockup */}
            <Reveal className="lg:pl-8">
              <ProductMockup />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============== STATS BAR ============== */}
      <section className="border-y border-warm-200 bg-white py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS.map((s) => (
              <Reveal key={s.label}>
                <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-brand-700 to-accent-600 bg-clip-text text-transparent">
                  {s.value}
                </div>
                <div className="mt-1 text-xs md:text-sm text-ink2-500 font-medium uppercase tracking-wide">
                  {s.label}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============== PROBLEM (empathetic) ============== */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="max-w-2xl mx-auto text-center mb-14">
            <span className="text-xs uppercase tracking-widest text-brand-600 font-semibold">
              The Problem
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-ink2-900 mt-3 leading-tight">
              Fee collection is exhausting.
              <br />
              <span className="text-ink2-500">We get it.</span>
            </h2>
            <p className="mt-4 text-ink2-700 text-base md:text-lg">
              You started a coaching center to teach — not to chase fees. But every month it's
              the same grind.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {PAINS.map((p) => {
              const Icon = p.icon
              return (
                <Reveal key={p.title} className="card-soft text-center">
                  <div className="h-12 w-12 rounded-xl bg-red-50 flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-red-500" />
                  </div>
                  <h3 className="font-bold text-ink2-900 text-lg mb-2">{p.title}</h3>
                  <p className="text-sm text-ink2-500 leading-relaxed">{p.desc}</p>
                </Reveal>
              )
            })}
          </div>

          <Reveal className="text-center mt-12">
            <p className="text-lg text-ink2-700 max-w-2xl mx-auto">
              <span className="font-semibold text-brand-700">DueAlert</span> does this work for you —
              so you can get back to teaching.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============== HOW IT WORKS (4-step flow with animated dots) ============== */}
      <section id="how" className="py-20 md:py-28 bg-white border-y border-warm-200 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-brand-600 font-semibold">
              How It Works
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-ink2-900 mt-3 leading-tight">
              From student list to paid fees.
              <br />
              <span className="bg-gradient-to-r from-brand-700 to-accent-600 bg-clip-text text-transparent">
                In 4 simple steps.
              </span>
            </h2>
            <p className="mt-4 text-ink2-700 text-base md:text-lg">
              No training needed. No technical setup. Just add your students and let DueAlert do the rest.
            </p>
          </Reveal>

          <Reveal>
            <FlowDiagram />
          </Reveal>
        </div>
      </section>

      {/* ============== WHAT YOU GET (features, plain language) ============== */}
      <section id="features" className="py-20 md:py-28 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-brand-600 font-semibold">
              What You Get
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-ink2-900 mt-3 leading-tight">
              Everything you need to collect fees.
              <br />
              <span className="text-ink2-500">Nothing you don't.</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {FEATURES.map((f) => {
              const Icon = f.icon
              const isBrand = f.color === 'brand'
              return (
                <Reveal key={f.title} className="card-soft">
                  <div className="flex gap-4">
                    <div
                      className={`h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        isBrand ? 'bg-brand-50' : 'bg-accent-50'
                      }`}
                    >
                      <Icon className={`h-6 w-6 ${isBrand ? 'text-brand-700' : 'text-accent-600'}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-ink2-900 text-lg mb-1.5">{f.title}</h3>
                      <p className="text-sm text-ink2-500 leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============== BUILT FOR INDIA ============== */}
      <section id="india" className="py-20 md:py-28 bg-gradient-to-br from-brand-50 via-warm-50 to-accent-50 border-y border-warm-200 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-accent-600 font-semibold">
              Built for India
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-ink2-900 mt-3 leading-tight">
              Made for how Indian
              <br />
              <span className="bg-gradient-to-r from-brand-700 to-accent-600 bg-clip-text text-transparent">
                coaching centers actually work.
              </span>
            </h2>
            <p className="mt-4 text-ink2-700 text-base md:text-lg">
              Not a foreign tool translated for India. Built ground-up for Indian educators.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {INDIA_POINTS.map((p) => {
              const Icon = p.icon
              return (
                <Reveal key={p.title} className="card-soft text-center">
                  <div className="h-12 w-12 rounded-xl bg-white shadow-sm flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-brand-700" />
                  </div>
                  <h3 className="font-bold text-ink2-900 text-base mb-1.5">{p.title}</h3>
                  <p className="text-sm text-ink2-500 leading-relaxed">{p.desc}</p>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============== TRUST / SECURITY STRIP ============== */}
      <section className="py-16 bg-white border-b border-warm-200">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <ShieldCheck className="h-8 w-8 text-brand-700" />
              <div className="font-semibold text-ink2-900">Bank-grade security</div>
              <p className="text-xs text-ink2-500">Data encrypted on Google Cloud</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Users className="h-8 w-8 text-brand-700" />
              <div className="font-semibold text-ink2-900">Per-institution isolation</div>
              <p className="text-xs text-ink2-500">Your students are yours alone</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <CheckCircle2 className="h-8 w-8 text-brand-700" />
              <div className="font-semibold text-ink2-900">You stay in control</div>
              <p className="text-xs text-ink2-500">Nothing sent without your approval</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============== FAQ ============== */}
      <section id="faq" className="py-20 md:py-28 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-brand-600 font-semibold">
              Questions
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-ink2-900 mt-3 leading-tight">
              Things people ask.
            </h2>
          </Reveal>
          <Reveal>
            <FAQ />
          </Reveal>
        </div>
      </section>

      {/* ============== FINAL CTA ============== */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-800 to-ink2-900">
        <div className="absolute inset-0 opacity-20">
          <div className="warm-blob warm-blob-amber w-96 h-96 top-0 left-1/4" />
          <div className="warm-blob warm-blob-teal w-96 h-96 bottom-0 right-1/4" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
              Stop chasing fees.
              <br />
              <span className="text-accent-400">Start collecting them.</span>
            </h2>
          </Reveal>
          <Reveal>
            <p className="text-lg text-brand-100 max-w-xl mx-auto mb-10">
              Join 50+ coaching centers using DueAlert to get paid faster — without the headache.
            </p>
          </Reveal>
          <Reveal>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/login"
                className="bg-white text-brand-800 hover:bg-warm-50 font-bold rounded-xl px-8 py-4 inline-flex items-center gap-2 transition-all duration-200 shadow-xl active:scale-95"
              >
                Start Free
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="https://github.com/Qisanxi/DueAlert"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur border border-white/30 hover:bg-white/20 text-white font-semibold rounded-xl px-6 py-4 inline-flex items-center gap-2 transition-all duration-200"
              >
                <GithubIcon className="h-5 w-5" />
                View Source
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============== FOOTER ============== */}
      <footer className="bg-ink2-900 text-warm-200 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700">
                  <BellRing className="h-4 w-4 text-white" />
                </span>
                <span className="font-bold text-white text-lg">DueAlert</span>
              </div>
              <p className="text-sm text-warm-300 leading-relaxed">
                AI-powered fee collection for Indian coaching centers and schools.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3 text-sm">Product</h4>
              <ul className="space-y-2 text-sm text-warm-300">
                <li><a href="#how" className="hover:text-white transition">How It Works</a></li>
                <li><a href="#features" className="hover:text-white transition">What You Get</a></li>
                <li><a href="#india" className="hover:text-white transition">Built for India</a></li>
                <li><a href="#faq" className="hover:text-white transition">FAQ</a></li>
                <li><Link to="/login" className="hover:text-white transition">Sign In</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3 text-sm">Trust</h4>
              <ul className="space-y-2 text-sm text-warm-300">
                <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-brand-400" /> Bank-grade encryption</li>
                <li className="flex items-center gap-2"><Users className="h-4 w-4 text-brand-400" /> Per-institution isolation</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-400" /> You approve every message</li>
              </ul>
            </div>
          </div>
          <div className="pt-6 border-t border-warm-300/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-warm-400">
            <p>© 2026 DueAlert · Made in India for Indian educators</p>
            <p>Built with Google Gemini · Firebase · FastAPI · React</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
