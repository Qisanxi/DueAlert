import { TrendingUp, AlertTriangle, MessageCircle, CheckCircle2, IndianRupee } from 'lucide-react'

/**
 * ProductMockup
 * A CSS-built preview of the DueAlert dashboard inside a browser window frame.
 * Gives consumers a concrete sense of what they're signing up for — way better
 * than abstract architecture diagrams.
 */
export default function ProductMockup() {
  return (
    <div className="relative">
      {/* Glow behind the mockup */}
      <div
        aria-hidden="true"
        className="absolute -inset-4 bg-gradient-to-br from-brand-400/20 via-accent-400/20 to-brand-400/20 rounded-3xl blur-2xl opacity-70"
      />

      {/* Browser window frame */}
      <div className="relative bg-white rounded-2xl shadow-2xl shadow-ink2-900/10 border border-warm-200 overflow-hidden">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-4 py-3 bg-warm-100 border-b border-warm-200">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-amber-400" />
          <span className="h-3 w-3 rounded-full bg-green-400" />
          <div className="ml-3 flex-1 max-w-xs bg-white rounded-md px-3 py-1 text-[10px] text-ink2-500 border border-warm-200 font-mono">
            duealert-bbb61.web.app/dashboard
          </div>
        </div>

        {/* Dashboard content */}
        <div className="p-5 bg-warm-50">
          {/* Header row */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-ink2-500 font-semibold">
                Sharma Tutorials
              </div>
              <div className="text-base font-bold text-ink2-900">Fee Collection Dashboard</div>
            </div>
            <div className="text-[10px] text-white bg-brand-700 px-2.5 py-1 rounded-full font-medium">
              Live
            </div>
          </div>

          {/* Stat tiles */}
          <div className="grid grid-cols-3 gap-2.5 mb-4">
            <StatTile
              icon={IndianRupee}
              label="Collected"
              value="₹4.2L"
              sub="+18% this month"
              tone="brand"
            />
            <StatTile
              icon={AlertTriangle}
              label="High Risk"
              value="23"
              sub="Need follow-up"
              tone="accent"
            />
            <StatTile
              icon={CheckCircle2}
              label="Paid"
              value="142"
              sub="This cycle"
              tone="green"
            />
          </div>

          {/* Mini bar chart */}
          <div className="bg-white rounded-xl border border-warm-200 p-4 mb-3">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[11px] font-semibold text-ink2-700">Weekly Collections</div>
              <div className="text-[10px] text-brand-700 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> +24%
              </div>
            </div>
            <div className="flex items-end gap-1.5 h-16">
              {[40, 55, 35, 70, 50, 85, 95].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-gradient-to-t from-brand-600 to-brand-400"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-1.5 text-[9px] text-ink2-500">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                <span key={i}>{d}</span>
              ))}
            </div>
          </div>

          {/* Sample reminder preview */}
          <div className="bg-white rounded-xl border border-warm-200 p-3.5">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-6 w-6 rounded-full bg-brand-100 flex items-center justify-center">
                <MessageCircle className="h-3 w-3 text-brand-700" />
              </div>
              <div className="text-[11px] font-semibold text-ink2-700">
                AI Reminder · Ready to send
              </div>
              <div className="ml-auto text-[9px] text-ink2-500">Risk: 72/100</div>
            </div>
            <p className="text-[11px] text-ink2-700 leading-relaxed italic">
              "Namaste Sharma ji, Aarav ke March ka fee ₹4,500 pending hai. Hum samajhte hain ki
              kabhi kabhi delay ho jata hai — jab convenient ho kar dijiye. 🙏"
            </p>
          </div>
        </div>
      </div>

      {/* Floating badge: AI Analyzing */}
      <div className="absolute -left-4 top-1/3 hidden md:flex items-center gap-2 bg-white rounded-xl shadow-xl border border-warm-200 px-3 py-2 animate-pulse-soft">
        <div className="h-7 w-7 rounded-lg bg-brand-100 flex items-center justify-center">
          <TrendingUp className="h-3.5 w-3.5 text-brand-700" />
        </div>
        <div>
          <div className="text-[10px] text-ink2-500">AI Predicted</div>
          <div className="text-xs font-bold text-ink2-900">Pays by Mar 18</div>
        </div>
      </div>

      {/* Floating badge: WhatsApp ready */}
      <div className="absolute -right-4 bottom-1/4 hidden md:flex items-center gap-2 bg-white rounded-xl shadow-xl border border-warm-200 px-3 py-2">
        <div className="h-7 w-7 rounded-lg bg-green-100 flex items-center justify-center">
          <MessageCircle className="h-3.5 w-3.5 text-green-600" />
        </div>
        <div>
          <div className="text-[10px] text-ink2-500">Ready on</div>
          <div className="text-xs font-bold text-ink2-900">WhatsApp</div>
        </div>
      </div>
    </div>
  )
}

function StatTile({ icon: Icon, label, value, sub, tone }) {
  const tones = {
    brand: { bg: 'bg-brand-50', icon: 'text-brand-700', value: 'text-brand-800' },
    accent: { bg: 'bg-accent-50', icon: 'text-accent-600', value: 'text-accent-600' },
    green: { bg: 'bg-green-50', icon: 'text-green-600', value: 'text-green-700' },
  }
  const t = tones[tone] || tones.brand
  return (
    <div className="bg-white rounded-xl border border-warm-200 p-2.5">
      <div className="flex items-center gap-1.5 mb-1">
        <div className={`h-5 w-5 rounded ${t.bg} flex items-center justify-center`}>
          <Icon className={`h-3 w-3 ${t.icon}`} />
        </div>
        <span className="text-[9px] uppercase tracking-wide text-ink2-500 font-medium">{label}</span>
      </div>
      <div className={`text-lg font-bold ${t.value}`}>{value}</div>
      <div className="text-[9px] text-ink2-500">{sub}</div>
    </div>
  )
}
