import { UserPlus, BrainCircuit, MessageSquareHeart, Send } from 'lucide-react'

/**
 * FlowDiagram
 * A simple 4-step USER journey (not a system flow).
 * Consumer-friendly language, horizontal on desktop, vertical on mobile.
 * Keeps the animated traveling dots concept from the original design.
 */

const STEPS = [
  {
    n: 1,
    icon: UserPlus,
    title: 'Add Your Students',
    desc: 'Upload a CSV list or add students one by one. Takes 2 minutes.',
  },
  {
    n: 2,
    icon: BrainCircuit,
    title: "AI Spots Who'll Delay",
    desc: "DueAlert studies each student's pattern and flags the ones likely to pay late.",
  },
  {
    n: 3,
    icon: MessageSquareHeart,
    title: 'Review Reminders',
    desc: "Personalized Hinglish messages — one per student. Tweak if you want, send as-is if you don't.",
  },
  {
    n: 4,
    icon: Send,
    title: 'Send & Track',
    desc: 'One tap to WhatsApp parents. Watch payments move from pending → paid in real time.',
  },
]

export default function FlowDiagram() {
  return (
    <div className="relative">
      {/* Desktop: horizontal connecting line with animated dots */}
      <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-brand-300 via-accent-300 to-brand-300">
        <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
          <line
            x1="0"
            y1="1"
            x2="100%"
            y2="1"
            stroke="url(#flowLineGrad)"
            strokeWidth="2"
            strokeDasharray="6 6"
            className="flow-path"
          />
          <defs>
            <linearGradient id="flowLineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#14B8A6" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#14B8A6" />
            </linearGradient>
          </defs>
          {/* Animated dots traveling along the line */}
          {[0, 1.3, 2.6].map((delay, i) => (
            <circle key={i} r="4" fill="#0F766E">
              <animate
                attributeName="cx"
                values="0;1000"
                dur="5s"
                begin={`${delay * -1}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                dur="5s"
                begin={`${delay * -1}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </svg>
      </div>

      {/* Mobile: vertical connecting line */}
      <div className="md:hidden absolute left-8 top-12 bottom-12 w-0.5 bg-gradient-to-b from-brand-300 via-accent-300 to-brand-300" />

      {/* Steps grid */}
      <div className="relative grid md:grid-cols-4 gap-6 md:gap-4">
        {STEPS.map((step) => {
          const Icon = step.icon
          return (
            <div key={step.n} className="relative flex md:block items-start gap-4 md:gap-0">
              {/* Numbered icon circle */}
              <div className="relative z-10 flex-shrink-0 md:mx-auto">
                <div className="h-16 w-16 md:h-24 md:w-24 rounded-2xl bg-white border-2 border-brand-200 shadow-lg shadow-brand-600/10 flex items-center justify-center group hover:border-brand-500 hover:shadow-brand-600/20 transition-all">
                  <Icon className="h-7 w-7 md:h-10 md:w-10 text-brand-700" />
                </div>
                <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-accent-500 text-white text-xs font-bold flex items-center justify-center shadow-md">
                  {step.n}
                </div>
              </div>

              {/* Text */}
              <div className="md:text-center md:mt-5 flex-1">
                <h3 className="font-bold text-ink2-900 text-base md:text-lg mb-1">{step.title}</h3>
                <p className="text-sm text-ink2-500 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
