/**
 * FlowDiagram
 * Animated SVG showing the 9-step DueAlert user flow.
 * - 5 nodes on top row (left → right)
 * - 4 nodes on bottom row (right → left), plus a final completion dot
 * - 5 staggered dots travel along the path on an infinite loop
 *
 * Pure inline SVG + SMIL animations — no runtime deps.
 */

const NODES = [
  // row 1 (top, y=80)
  {
    id: 'signup',
    n: 1,
    title: 'Sign Up',
    sub: 'Create admin account',
    x: 90, y: 80,
    accent: 'gem',
  },
  {
    id: 'verify',
    n: 2,
    title: 'Verify Email',
    sub: 'Firebase Auth confirmation',
    x: 330, y: 80,
    accent: 'gem',
  },
  {
    id: 'setup',
    n: 3,
    title: 'Institution Setup',
    sub: 'Name your coaching center',
    x: 570, y: 80,
    accent: 'gem',
  },
  {
    id: 'students',
    n: 4,
    title: 'Add Students / CSV',
    sub: 'Manual entry or bulk import',
    x: 810, y: 80,
    accent: 'gem',
  },
  {
    id: 'gemini',
    n: 5,
    title: 'Gemini AI Analysis',
    sub: 'Risk score + payment date',
    x: 1050, y: 80,
    accent: 'cyan',
    highlight: true,
  },
  // row 2 (bottom, y=380)
  {
    id: 'reminder',
    n: 6,
    title: 'Hinglish Reminder',
    sub: 'Personalized parent message',
    x: 1050, y: 380,
    accent: 'gem',
  },
  {
    id: 'whatsapp',
    n: 7,
    title: 'WhatsApp Reminder',
    sub: 'Copy & send to parent',
    x: 810, y: 380,
    accent: 'gem',
  },
  {
    id: 'track',
    n: 8,
    title: 'Track Status',
    sub: 'pending → sent → replied → paid',
    x: 570, y: 380,
    accent: 'gem',
  },
  {
    id: 'dashboard',
    n: 9,
    title: 'Dashboard Updates',
    sub: 'Live KPIs & collection rate',
    x: 330, y: 380,
    accent: 'cyan',
    highlight: true,
  },
]

// The path the dots travel along (S-curve: right along top, down, left along bottom)
const PATH_D = 'M 90 80 L 1050 80 L 1050 380 L 90 380'

// Small inline icon set so we don't depend on lucide inside SVG
function NodeIcon({ id }) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }
  switch (id) {
    case 'signup':
      return (
        <g {...common}>
          <circle r="14" cy="-2" cx="0" />
          <path d="M -14 14 a14 14 0 0 1 28 0" />
        </g>
      )
    case 'verify':
      return (
        <g {...common}>
          <rect x="-14" y="-10" width="28" height="20" rx="2" />
          <path d="M -14 -10 L 0 2 L 14 -10" />
        </g>
      )
    case 'setup':
      return (
        <g {...common}>
          <path d="M -12 12 L -12 -4 L 0 -12 L 12 -4 L 12 12 Z" />
          <path d="M -4 12 L -4 4 L 4 4 L 4 12" />
        </g>
      )
    case 'students':
      return (
        <g {...common}>
          <path d="M -10 -8 h8 l3 4 h9 v12 h-20 z" />
          <path d="M -4 4 v-4 M 0 4 v-4 M 4 4 v-4" />
        </g>
      )
    case 'gemini':
      return (
        <g {...common}>
          <path d="M -8 -10 a8 8 0 0 1 16 0 c0 6 -8 8 -8 14 c0 -6 -8 -8 -8 -14 z" />
          <circle cx="0" cy="-10" r="2" fill="currentColor" />
        </g>
      )
    case 'reminder':
      return (
        <g {...common}>
          <path d="M -14 -8 h28 v14 h-18 l-6 6 v-6 h-4 z" />
          <path d="M -8 -2 h12 M -8 2 h8" />
        </g>
      )
    case 'whatsapp':
      return (
        <g {...common}>
          <path d="M 0 -14 a12 12 0 0 1 12 12 a12 12 0 0 1 -12 12 a12 12 0 0 1 -12 -12 a12 12 0 0 1 12 -12 z" />
          <path d="M -5 -5 q5 -3 10 0 q5 3 0 6 q-5 3 -10 0 z" fill="currentColor" />
        </g>
      )
    case 'track':
      return (
        <g {...common}>
          <path d="M -10 -8 l4 4 l10 -10" />
          <path d="M 0 14 a8 8 0 0 1 -8 -8 v-4" />
          <path d="M 0 14 a8 8 0 0 0 8 -8 v-4" />
        </g>
      )
    case 'dashboard':
      return (
        <g {...common}>
          <rect x="-14" y="-10" width="28" height="20" rx="2" />
          <path d="M -10 0 l4 4 l3 -3 l4 5" />
          <circle cx="-8" cy="6" r="1" fill="currentColor" />
        </g>
      )
    default:
      return null
  }
}

function Node({ node, delay }) {
  const strokeColor = node.accent === 'cyan' ? '#22d3ee' : '#7c3aed'
  const textColor = node.accent === 'cyan' ? '#22d3ee' : '#e6e9f2'
  const iconColor = node.accent === 'cyan' ? '#22d3ee' : '#a78bfa'
  return (
    <g
      className="flow-node animate-node-pulse"
      style={{ animationDelay: `${delay}s` }}
    >
      <circle
        cx={node.x}
        cy={node.y}
        r={node.highlight ? 42 : 38}
        fill="#0c1120"
        stroke={strokeColor}
        strokeWidth={node.highlight ? 2.5 : 2}
      />
      <g transform={`translate(${node.x},${node.y})`} style={{ color: iconColor }}>
        <NodeIcon id={node.id} />
      </g>
      <text
        x={node.x}
        y={node.y + 68}
        textAnchor="middle"
        fill={textColor}
        fontFamily="Space Grotesk, sans-serif"
        fontSize="15"
        fontWeight={node.highlight ? 700 : 600}
      >
        {node.n}. {node.title}
      </text>
      <text
        x={node.x}
        y={node.y + 88}
        textAnchor="middle"
        fill="#64748b"
        fontFamily="Inter, sans-serif"
        fontSize="11"
      >
        {node.sub}
      </text>
    </g>
  )
}

export default function FlowDiagram() {
  // 5 staggered traveling dots
  const dots = [
    { r: 7, fill: 'url(#dotGrad)', begin: '0s', dur: '8s' },
    { r: 5, fill: '#22d3ee', opacity: 0.9, begin: '-1.6s', dur: '8s' },
    { r: 5, fill: '#a78bfa', opacity: 0.9, begin: '-3.2s', dur: '8s' },
    { r: 4, fill: '#ffffff', opacity: 0.85, begin: '-4.8s', dur: '8s' },
    { r: 4, fill: '#22d3ee', opacity: 0.7, begin: '-6.4s', dur: '8s' },
  ]

  return (
    <div className="glow-card p-6 md:p-10 overflow-x-auto">
      <div className="min-w-[920px]">
        <svg viewBox="0 0 1180 460" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="pathGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
            <radialGradient id="dotGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
            </radialGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Visible dashed flow path */}
          <path
            d={PATH_D}
            fill="none"
            stroke="url(#pathGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            className="flow-path"
            opacity="0.55"
          />

          {/* Invisible path for dot motion */}
          <path id="flowPathDots" d={PATH_D} fill="none" stroke="none" />

          {/* Nodes */}
          {NODES.map((node, i) => (
            <Node key={node.id} node={node} delay={i * 0.4} />
          ))}

          {/* Final completion check node */}
          <g className="flow-node">
            <circle cx="90" cy="380" r="14" fill="#22d3ee" opacity="0.9" filter="url(#glow)" />
            <path
              d="M 84 380 l4 4 l8 -8"
              fill="none"
              stroke="#0c1120"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text
              x="90"
              y="448"
              textAnchor="middle"
              fill="#64748b"
              fontFamily="Inter, sans-serif"
              fontSize="11"
            >
              Collection complete
            </text>
          </g>

          {/* Traveling dots */}
          {dots.map((d, i) => (
            <circle
              key={i}
              r={d.r}
              fill={d.fill}
              opacity={d.opacity ?? 1}
              filter={i === 0 ? 'url(#glow)' : undefined}
            >
              <animateMotion dur={d.dur} begin={d.begin} repeatCount="indefinite">
                <mpath href="#flowPathDots" />
              </animateMotion>
            </circle>
          ))}
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-400 justify-center">
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-gem-400" /> Admin workflow steps
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" /> AI-powered steps (Gemini)
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-white animate-pulse" /> Live data pulse
        </span>
      </div>
    </div>
  )
}
