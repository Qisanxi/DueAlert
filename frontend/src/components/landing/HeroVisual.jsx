import { TrendingUp, AlertTriangle, MessageCircle, CalendarClock } from 'lucide-react'

/**
 * HeroVisual
 * Floating stat cards on the right side of the hero section.
 * Pure decorative — no data fetched.
 */
export default function HeroVisual() {
  return (
    <div className="lg:col-span-5 relative h-[420px] hidden lg:block">
      {/* Base card */}
      <div className="absolute inset-0 rounded-3xl border border-white/5 bg-gradient-to-br from-ink-700/60 to-ink-800/60 backdrop-blur-md" />

      {/* Collection rate card */}
      <div className="absolute top-8 left-8 right-8 animate-float-y">
        <div className="glow-card p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-slate-400">Collection Rate</span>
            <span className="text-xs text-emerald-400 inline-flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> +18.4%
            </span>
          </div>
          <div className="mt-2 flex items-end gap-2">
            <span className="font-display text-4xl font-bold text-white">82%</span>
            <span className="text-slate-500 text-sm pb-1">this month</span>
          </div>
          <div className="mt-3 h-2 rounded-full bg-ink-600 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-gem-500 to-cyan-400"
              style={{ width: '82%' }}
            />
          </div>
        </div>
      </div>

      {/* High-risk students card */}
      <div className="absolute top-44 left-4 w-64 animate-float-y-delay-1">
        <div className="glow-card p-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-rose-500/20 flex items-center justify-center">
              <AlertTriangle className="h-4 w-4 text-rose-400" />
            </div>
            <div>
              <div className="text-xs text-slate-400">High-Risk Students</div>
              <div className="font-display text-xl font-bold text-white">23</div>
            </div>
          </div>
        </div>
      </div>

      {/* AI reminder preview card */}
      <div className="absolute top-56 right-4 w-72 animate-float-y-delay-2">
        <div className="glow-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <MessageCircle className="h-3.5 w-3.5 text-cyan-400" />
            <span className="text-xs text-slate-400">AI Reminder Preview</span>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed">
            "Namaste Sharma ji, Aarav ke March ka fee ₹4,500 pending hai. Hum samajhte hain ki
            kabhi kabhi delay ho jata hai — jab convenient ho kar dijiye. 🙏"
          </p>
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
            <span>Risk Score: 72/100</span>
            <span className="text-cyan-400">Gemini 2.5 Flash</span>
          </div>
        </div>
      </div>

      {/* Predicted pay date card */}
      <div className="absolute bottom-6 left-12 animate-float-y-delay-1">
        <div className="glow-card p-3 flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
            <CalendarClock className="h-4 w-4 text-cyan-400" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400">Predicted Pay Date</div>
            <div className="text-sm font-semibold text-white">Mar 18, 2026</div>
          </div>
        </div>
      </div>
    </div>
  )
}
