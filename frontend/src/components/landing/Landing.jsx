import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Check,
  FileSpreadsheet,
  Clock,
  LineChart,
  PencilLine,
  ShieldAlert,
  ExternalLink,
} from 'lucide-react'

import LandingNavbar from './LandingNavbar'
import HeroVisual from './HeroVisual'
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

/* ---------- Static content configs ---------- */

const PROBLEMS = [
  {
    icon: FileSpreadsheet,
    color: 'rose',
    title: 'Scattered spreadsheets',
    body: "Student fee data lives across multiple sheets and devices, with no single source of truth.",
  },
  {
    icon: Clock,
    color: 'amber',
    title: 'Manual follow-ups',
    body: 'Every overdue fee means a hand-typed message. Hours lost rewriting the same reminder.',
  },
  {
    icon: LineChart,
    color: 'gem',
    title: 'No risk visibility',
    body: 'No way to tell which student will actually pay on time and who needs a gentle nudge.',
  },
  {
    icon: PencilLine,
    color: 'cyan',
    title: 'No status tracking',
    body: 'Did the parent reply? Did they pay? Who knows — the spreadsheet wasn\u2019t updated.',
  },
]

const FEATURES = [
  {
    title: 'AI Payment-Risk Analysis',
    desc: 'Google Gemini evaluates each student\u2019s payment history and outputs a 0–100 risk score, a predicted payment date, and a personalized Hinglish reminder — in one call.',
    items: ['Risk score 0–100', 'Predicted payment date', 'Empathetic, non-threatening tone'],
    accent: 'gem',
  },
  {
    title: 'Collection Dashboard',
    desc: 'A single screen for total students, pending payments, messages sent, parent responses, paid count, total due, collected amount, collection rate, and high-risk students.',
    items: ['Real-time KPI overview', 'Recharts visualizations', 'Risk-stratified student view'],
    accent: 'cyan',
  },
  {
    title: 'Student Management',
    desc: 'Track every student\u2019s name, parent, phone, course, monthly fee, outstanding amount, due date, notes, payment status, AI risk score, predicted date, and generated message.',
    items: ['Manual entry + CSV import', 'Status state machine', 'AI-augmented records'],
    accent: 'emerald',
    badges: ['pending', 'message_sent', 'replied', 'paid'],
  },
  {
    title: 'Bulk CSV Upload',
    desc: 'Skip the manual entry. Prepare students in CSV format, drop the file in, and import dozens of records at once. A sample CSV ships with the repo for testing.',
    items: ['Drag-and-drop upload', 'Backend CSV format validation', 'Instant AI follow-up analysis'],
    accent: 'amber',
  },
  {
    title: 'WhatsApp-Ready Reminders',
    desc: 'Each generated message is designed to be copy-pasted into WhatsApp. Natural Hinglish tone, parent\u2019s name, student\u2019s context — respectful, warm, and useful.',
    quote: 'Not just an automated reminder — communication that feels personal.',
    accent: 'rose',
  },
  {
    title: 'Auth & Institution Isolation',
    desc: 'Firebase Authentication handles sign-up, login, email verification, and logout. Each institution operates in its own isolated context — student data stays scoped to the right center.',
    items: ['Email/password + verification', 'Per-institution data scoping', 'Firebase Admin SDK on backend'],
    accent: 'indigo',
  },
]

const USE_CASES = [
  { emoji: '📚', title: 'Coaching & Tuition Centers', body: 'Track monthly tuition fees across batches, identify parents who consistently delay, and send warm reminders in Hinglish — without the spreadsheet dance.' },
  { emoji: '🏫', title: 'Private Schools & Academies', body: 'Bulk-import entire classes via CSV, let Gemini flag high-risk accounts early in the cycle, and centralize fee status visibility for the admin office.' },
  { emoji: '🎓', title: 'Test Prep Institutes', body: 'JEE, NEET, UPSC, CAT — multi-batch institutes with quarterly installments can predict payment dates and prioritize follow-ups by AI risk score.' },
  { emoji: '⚽', title: 'Sports Academies', body: 'Cricket, football, swimming academies with monthly coaching dues can manage parent communication and payment tracking from one dashboard.' },
  { emoji: '🎵', title: 'Music & Dance Schools', body: 'Small studios with 20–100 students often rely on WhatsApp memory. DueAlert gives them a proper system with AI-drafted reminders ready to send.' },
  { emoji: '💻', title: 'Online Course Creators', body: 'For cohort-based courses with EMI payment plans, DueAlert can flag at-risk installments and personalize follow-ups based on each learner\u2019s payment history.' },
]

const TECH = {
  Frontend: ['React 19', 'Vite', 'React Router', 'TanStack Query', 'React Hook Form', 'Zod', 'Recharts', 'Lucide', 'Firebase Auth', 'Tailwind CSS'],
  Backend: ['Python', 'FastAPI', 'Uvicorn', 'Pydantic', 'Firebase Admin SDK', 'Firestore', 'Google GenAI SDK', 'Pandas', 'python-dotenv'],
  'Cloud & AI': ['Firebase Authentication', 'Cloud Firestore', 'Firebase Hosting', 'Google Gemini API', 'gemini-2.5-flash', 'Render (Backend)'],
}

const FLOW_STEPS = [
  { n: 1, text: 'Institution creates an account', accent: 'gem' },
  { n: 2, text: 'Email verification via Firebase', accent: 'gem' },
  { n: 3, text: 'Institution setup (name, details)', accent: 'gem' },
  { n: 4, text: 'Add students manually or via CSV', accent: 'gem' },
  { n: 5, text: 'Gemini analyzes payment risk', accent: 'cyan' },
  { n: 6, text: 'Personalized Hinglish reminder generated', accent: 'gem' },
  { n: 7, text: 'Send via WhatsApp to parent', accent: 'gem' },
  { n: 8, text: 'Track payment status changes', accent: 'gem' },
  { n: 9, text: 'Dashboard reflects collection progress', accent: 'cyan' },
]

const STATS = [
  { value: '9', label: 'Workflow steps' },
  { value: '0–100', label: 'AI risk score range' },
  { value: '4', label: 'Payment status states' },
  { value: '∞', label: 'CSV bulk import rows' },
]

/* ---------- Helpers ---------- */

const ACCENT_MAP = {
  rose:    { bg: 'bg-rose-500/15',    text: 'text-rose-300',    border: 'border-rose-400/30',    grad: 'from-rose-500/30 to-rose-600/10' },
  amber:   { bg: 'bg-amber-500/15',   text: 'text-amber-300',   border: 'border-amber-400/30',   grad: 'from-amber-500/30 to-amber-600/10' },
  emerald: { bg: 'bg-emerald-500/15', text: 'text-emerald-300', border: 'border-emerald-400/30', grad: 'from-emerald-500/30 to-emerald-600/10' },
  cyan:    { bg: 'bg-cyan-500/15',    text: 'text-cyan-300',    border: 'border-cyan-400/30',    grad: 'from-cyan-500/30 to-cyan-600/10' },
  gem:     { bg: 'bg-gem-500/15',     text: 'text-gem-300',     border: 'border-gem-400/30',     grad: 'from-gem-500/30 to-gem-600/10' },
  indigo:  { bg: 'bg-indigo-500/15',  text: 'text-indigo-300',  border: 'border-indigo-400/30',  grad: 'from-indigo-500/30 to-indigo-600/10' },
}

const BADGE_COLORS = {
  pending: 'bg-ink-600 text-slate-300',
  message_sent: 'bg-amber-500/20 text-amber-300',
  replied: 'bg-cyan-500/20 text-cyan-300',
  paid: 'bg-emerald-500/20 text-emerald-300',
}

/* ---------- Page ---------- */

export default function Landing() {
  return (
    <div className="min-h-screen bg-ink-900 text-slate-200 landing-scrollbar">
      <LandingNavbar />

      {/* ============== HERO ============== */}
      <section id="top" className="relative pt-32 pb-24 overflow-hidden">
        <div className="aurora-bg" />
        <div className="absolute inset-0 grid-bg" />
        <div className="relative max-w-7xl mx-auto px-6 z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-gem-400/30 bg-gem-500/10 px-3 py-1 text-xs font-medium text-gem-400 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                </span>
                Built for the Build with Gemini XPRIZE Hackathon 2026
              </div>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-white">
                Stop chasing fees.
                <br />
                <span className="text-gradient">Let AI collect smarter.</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed">
                DueAlert turns scattered spreadsheets and repetitive follow-ups into an AI-assisted
                fee collection workflow. Google Gemini analyzes payment risk, predicts likely payment
                dates, and writes personalized Hinglish reminders — all from one dashboard.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link to="/login" className="btn-landing-primary">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="https://github.com/Qisanxi/DueAlert"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-landing-ghost"
                >
                  <GithubIcon className="h-4 w-4" />
                  View Source
                </a>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-400">
                {['Google Gemini powered', 'Firebase Auth + Firestore', 'Open source'].map((t) => (
                  <span key={t} className="inline-flex items-center gap-2">
                    <Check className="h-4 w-4 text-cyan-400" /> {t}
                  </span>
                ))}
              </div>
            </div>

            <HeroVisual />
          </div>
        </div>
      </section>

      {/* ============== TRUST MARQUEE ============== */}
      <section className="py-8 border-y border-white/5 bg-ink-800/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs uppercase tracking-[0.3em] text-slate-500 mb-6">
            Powering a modern fee collection stack
          </p>
          <div className="overflow-hidden">
            <div className="animate-marquee flex gap-12 whitespace-nowrap text-slate-400 font-display text-xl w-max">
              {[...Array(2)].map((_, dup) => (
                <div key={dup} className="flex gap-12">
                  {['React 19', 'FastAPI', 'Google Gemini', 'Firebase Auth', 'Cloud Firestore', 'Vite', 'Tailwind CSS', 'TanStack Query', 'Render'].map((t) => (
                    <span key={t} className="inline-flex items-center gap-3">
                      {t} <span className="text-gem-400">•</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============== PROBLEM ============== */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-widest text-gem-400">// The Problem</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-3 leading-tight">
              Fee collection shouldn&apos;t be a spreadsheet marathon.
            </h2>
            <p className="mt-5 text-lg text-slate-400 leading-relaxed">
              For most coaching centers, fee collection is still a manual, repetitive grind.
              Administrators juggle spreadsheets, sticky notes, and individual parent messages —
              losing hours every month that should go to teaching.
            </p>
          </Reveal>

          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROBLEMS.map((p) => {
              const a = ACCENT_MAP[p.color]
              const Icon = p.icon
              return (
                <Reveal key={p.title} className="glow-card p-6">
                  <div className={`h-11 w-11 rounded-xl ${a.bg} flex items-center justify-center mb-4`}>
                    <Icon className={`h-5 w-5 ${a.text}`} />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white">{p.title}</h3>
                  <p className="mt-2 text-sm text-slate-400 leading-relaxed">{p.body}</p>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============== FEATURES ============== */}
      <section id="features" className="py-24 relative">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="relative max-w-7xl mx-auto px-6">
          <Reveal className="max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">// Features</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-3 leading-tight">
              Everything an administrator needs to collect fees — with AI doing the heavy lifting.
            </h2>
          </Reveal>

          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => {
              const a = ACCENT_MAP[f.accent]
              return (
                <Reveal key={f.title} className="glow-card p-7">
                  <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${a.grad} flex items-center justify-center mb-5 border ${a.border}`}>
                    <ShieldAlert className={`h-6 w-6 ${a.text}`} />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-white">{f.title}</h3>
                  <p className="mt-2 text-sm text-slate-400 leading-relaxed">{f.desc}</p>

                  {f.items && (
                    <ul className="mt-4 space-y-2 text-sm text-slate-300">
                      {f.items.map((it) => (
                        <li key={it} className="flex gap-2">
                          <span className="text-cyan-400">›</span> {it}
                        </li>
                      ))}
                    </ul>
                  )}

                  {f.badges && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {f.badges.map((b) => (
                        <span
                          key={b}
                          className={`text-[11px] font-mono px-2 py-1 rounded-md ${BADGE_COLORS[b]}`}
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  )}

                  {f.quote && (
                    <p className="mt-4 text-xs text-slate-500 italic border-l-2 border-gem-400/40 pl-3">
                      {f.quote}
                    </p>
                  )}
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============== HOW IT WORKS — FLOW DIAGRAM ============== */}
      <section id="how" className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-800/40 to-ink-900" />
        <div className="aurora-bg opacity-40" />
        <div className="relative max-w-7xl mx-auto px-6">
          <Reveal className="max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-widest text-gem-400">// How It Works</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-3 leading-tight">
              The user flow, end to end.
            </h2>
            <p className="mt-5 text-lg text-slate-400 leading-relaxed">
              Follow the dots. From sign-up to a fully updated dashboard — every step in the DueAlert
              workflow, with Gemini AI doing the analysis in the middle.{' '}
              <span className="text-slate-300">Watch the pulse travel through each node.</span>
            </p>
          </Reveal>

          <Reveal className="mt-16">
            <FlowDiagram />
          </Reveal>

          {/* Workflow text steps for accessibility / mobile */}
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {FLOW_STEPS.map((s) => (
              <div
                key={s.n}
                className={`text-sm text-slate-400 pl-3 border-l-2 ${
                  s.accent === 'cyan' ? 'border-cyan-400/60' : 'border-gem-400/40'
                }`}
              >
                <span className="text-white font-semibold">{s.n}.</span> {s.text}
              </div>
            ))}
          </div>

          {/* AI vs Manual comparison */}
          <Reveal className="mt-24">
            <div className="max-w-3xl mb-10">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">// AI vs Manual</span>
              <h3 className="font-display text-3xl md:text-4xl font-bold text-white mt-3 leading-tight">
                From manual grind to AI-assisted intelligence.
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Traditional */}
              <Reveal className="glow-card p-7 border-rose-500/20">
                <div className="flex items-center gap-3 mb-5">
                  <span className="h-9 w-9 rounded-lg bg-rose-500/15 flex items-center justify-center">
                    <ShieldAlert className="h-5 w-5 text-rose-400" />
                  </span>
                  <h4 className="font-display text-xl font-semibold text-white">Traditional Workflow</h4>
                </div>
                <ol className="space-y-3 text-sm text-slate-400">
                  {[
                    'Open spreadsheet, scan for overdue fees',
                    'Manually identify who needs follow-up',
                    'Decide who\u2019s likely to delay — by gut feel',
                    'Write each reminder by hand',
                    'Send messages one by one',
                    'Update records manually (if at all)',
                  ].map((t, i) => (
                    <li key={t} className="flex gap-3">
                      <span className="text-rose-400 font-mono">{String(i + 1).padStart(2, '0')}</span> {t}
                    </li>
                  ))}
                </ol>
                <div className="mt-5 pt-5 border-t border-white/5 text-xs text-rose-300/80">
                  ⏱ Hours per week lost on repetitive manual work
                </div>
              </Reveal>

              {/* DueAlert */}
              <Reveal
                className="glow-card p-7 border-cyan-400/30"
                style={{ boxShadow: '0 18px 60px -20px rgba(6,182,212,0.4)' }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="h-9 w-9 rounded-lg bg-cyan-500/15 flex items-center justify-center">
                    <Check className="h-5 w-5 text-cyan-400" />
                  </span>
                  <h4 className="font-display text-xl font-semibold text-white">DueAlert Workflow</h4>
                </div>
                <ol className="space-y-3 text-sm text-slate-300">
                  {[
                    'DueAlert loads student payment data',
                    'Gemini evaluates payment risk per student',
                    'Predicted payment date generated',
                    'Risk score 0–100 assigned',
                    'Personalized Hinglish message drafted',
                    'Admin reviews & sends via WhatsApp',
                    'Status auto-tracked on dashboard',
                  ].map((t, i) => (
                    <li key={t} className="flex gap-3">
                      <span className="text-cyan-400 font-mono">{String(i + 1).padStart(2, '0')}</span> {t}
                    </li>
                  ))}
                </ol>
                <div className="mt-5 pt-5 border-t border-white/5 text-xs text-cyan-300/80">
                  ⚡ AI handles analysis & drafting — admin handles judgment
                </div>
              </Reveal>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============== USE CASES ============== */}
      <section id="usecases" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-widest text-gem-400">// Use Cases</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-3 leading-tight">
              Built for any institution that collects recurring fees.
            </h2>
            <p className="mt-5 text-lg text-slate-400 leading-relaxed">
              Any organization that tracks students, monthly fees, and parent communication can plug
              into DueAlert&apos;s workflow.
            </p>
          </Reveal>

          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {USE_CASES.map((u) => (
              <Reveal key={u.title} className="glow-card p-7">
                <div className="text-3xl mb-3">{u.emoji}</div>
                <h3 className="font-display text-lg font-semibold text-white">{u.title}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">{u.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============== TECH STACK ============== */}
      <section id="tech" className="py-24 relative">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="relative max-w-7xl mx-auto px-6">
          <Reveal className="max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">// Tech Stack</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-3 leading-tight">
              A modern, cloud-native, AI-first stack.
            </h2>
          </Reveal>

          <div className="mt-14 grid lg:grid-cols-3 gap-5">
            {Object.entries(TECH).map(([group, items], idx) => {
              const letter = group[0]
              const accent = idx === 0 ? 'cyan' : idx === 1 ? 'emerald' : 'gem'
              const a = ACCENT_MAP[accent]
              return (
                <Reveal key={group} className="glow-card p-7">
                  <div className="flex items-center gap-3 mb-5">
                    <span className={`h-10 w-10 rounded-lg ${a.bg} flex items-center justify-center ${a.text} font-display font-bold`}>
                      {letter}
                    </span>
                    <h3 className="font-display text-xl font-semibold text-white">{group}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {items.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-mono px-3 py-1.5 rounded-md bg-ink-600 text-slate-300 border border-white/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {idx === 2 && (
                    <p className="mt-5 text-xs text-slate-500 leading-relaxed">
                      Every payment risk analysis triggers a real Gemini API call in production —
                      satisfying the hackathon&apos;s Gemini-call requirement.
                    </p>
                  )}
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============== ARCHITECTURE ============== */}
      <section id="architecture" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-800/30 to-ink-900" />
        <div className="relative max-w-7xl mx-auto px-6">
          <Reveal className="max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-widest text-gem-400">// Architecture</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-3 leading-tight">
              Clean separation of concerns.
            </h2>
            <p className="mt-5 text-lg text-slate-400 leading-relaxed">
              A React + Vite SPA talks to a FastAPI backend over REST. The backend orchestrates
              Firebase for auth & data, and Google Gemini for AI analysis.
            </p>
          </Reveal>

          <Reveal className="mt-14">
            <ArchitectureDiagram />
          </Reveal>
        </div>
      </section>

      {/* ============== STATS STRIP ============== */}
      <section className="py-16 border-y border-white/5 bg-ink-800/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((s) => (
              <Reveal key={s.label}>
                <div className="font-display text-4xl md:text-5xl font-bold text-gradient">{s.value}</div>
                <div className="mt-2 text-xs uppercase tracking-wider text-slate-500">{s.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============== CTA ============== */}
      <section className="py-28 relative overflow-hidden">
        <div className="aurora-bg" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight">
              Spend less time chasing fees.
              <br />
              <span className="text-gradient">More time running your institution.</span>
            </h2>
          </Reveal>
          <Reveal>
            <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
              Try DueAlert live, explore the source, or fork it for your own institution. Open source
              under the license in the repo.
            </p>
          </Reveal>
          <Reveal>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to="/login" className="btn-landing-primary">
                Launch App
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://duealert.onrender.com/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-landing-ghost"
              >
                <ExternalLink className="h-4 w-4" /> API Docs
              </a>
              <a
                href="https://github.com/Qisanxi/DueAlert"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-landing-ghost"
              >
                <GithubIcon className="h-4 w-4" /> Star on GitHub
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============== FOOTER ============== */}
      <footer className="border-t border-white/5 bg-ink-900">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid md:grid-cols-4 gap-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5">
                <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-gem-500 to-cyan-500">
                  <ShieldAlert className="h-5 w-5 text-white" />
                </span>
                <span className="font-display text-xl font-bold text-white">DueAlert</span>
              </div>
              <p className="mt-4 text-sm text-slate-400 max-w-md leading-relaxed">
                AI-powered fee collection assistant for coaching centers and educational institutions.
                Built for the Build with Gemini XPRIZE Hackathon 2026.
              </p>
              <p className="mt-4 text-xs text-slate-600">© 2026 DueAlert · Built by Sandeep Kumar</p>
            </div>

            <div>
              <h4 className="font-display text-sm font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2.5 text-sm text-slate-400">
                <li><a href="https://github.com/Qisanxi/DueAlert" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition">GitHub Repository</a></li>
                <li><a href="https://duealert.onrender.com/docs" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition">API Documentation</a></li>
                <li><a href="#features" className="hover:text-cyan-400 transition">Features</a></li>
                <li><a href="#how" className="hover:text-cyan-400 transition">How It Works</a></li>
                <li><a href="#architecture" className="hover:text-cyan-400 transition">Architecture</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display text-sm font-semibold text-white mb-4">Live</h4>
              <ul className="space-y-2.5 text-sm text-slate-400">
                <li><Link to="/login" className="hover:text-cyan-400 transition">Sign In</Link></li>
                <li><a href="https://duealert.onrender.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition">Backend (Render)</a></li>
                <li><a href="#usecases" className="hover:text-cyan-400 transition">Use Cases</a></li>
                <li><a href="#tech" className="hover:text-cyan-400 transition">Tech Stack</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>Licensed under the terms included in the repository.</p>
            <p className="font-mono">Built with Google Gemini · Firebase · FastAPI · React</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
