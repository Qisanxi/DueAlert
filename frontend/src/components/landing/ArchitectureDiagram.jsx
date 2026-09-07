/**
 * ArchitectureDiagram
 * Animated SVG showing the high-level architecture:
 *   UI (React) ─ REST API ─ FastAPI Backend ─ GenAI SDK ─ Gemini API
 *                              ├─ Firebase Auth + Firestore
 *                              └─ Google Gemini
 * Dots travel along the connection lines.
 */
export default function ArchitectureDiagram() {
  return (
    <div className="glow-card p-6 md:p-10">
      <svg viewBox="0 0 1100 420" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="archGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>

        {/* Connection lines (dashed, animated) */}
        <path
          d="M 250 130 L 450 130"
          stroke="url(#archGrad)"
          strokeWidth="2"
          strokeDasharray="6 4"
          className="flow-path"
          fill="none"
        />
        <path
          d="M 650 130 L 850 130"
          stroke="url(#archGrad)"
          strokeWidth="2"
          strokeDasharray="6 4"
          className="flow-path"
          fill="none"
        />
        <path
          d="M 550 200 L 550 250 L 320 250 L 320 300"
          stroke="url(#archGrad)"
          strokeWidth="2"
          strokeDasharray="6 4"
          className="flow-path"
          fill="none"
        />
        <path
          d="M 550 200 L 550 250 L 780 250 L 780 300"
          stroke="url(#archGrad)"
          strokeWidth="2"
          strokeDasharray="6 4"
          className="flow-path"
          fill="none"
        />

        {/* Animated dots on connections */}
        <circle r="4" fill="#22d3ee">
          <animateMotion dur="3s" repeatCount="indefinite" path="M 250 130 L 450 130" />
        </circle>
        <circle r="4" fill="#a78bfa">
          <animateMotion
            dur="3s"
            begin="-1.5s"
            repeatCount="indefinite"
            path="M 650 130 L 850 130"
          />
        </circle>
        <circle r="3.5" fill="#22d3ee">
          <animateMotion
            dur="3.5s"
            repeatCount="indefinite"
            path="M 550 200 L 550 250 L 320 250 L 320 300"
          />
        </circle>
        <circle r="3.5" fill="#a78bfa">
          <animateMotion
            dur="3.5s"
            begin="-1.75s"
            repeatCount="indefinite"
            path="M 550 200 L 550 250 L 780 250 L 780 300"
          />
        </circle>

        {/* UI Layer */}
        <g>
          <rect
            x="50"
            y="80"
            width="200"
            height="100"
            rx="14"
            fill="#0c1120"
            stroke="#7c3aed"
            strokeWidth="1.5"
          />
          <text
            x="150"
            y="115"
            textAnchor="middle"
            fill="#a78bfa"
            fontFamily="Space Grotesk, sans-serif"
            fontSize="13"
            fontWeight="600"
          >
            DUEALERT UI
          </text>
          <text x="150" y="140" textAnchor="middle" fill="#e6e9f2" fontFamily="Inter, sans-serif" fontSize="12">
            React 19 + Vite
          </text>
          <text x="150" y="158" textAnchor="middle" fill="#64748b" fontFamily="Inter, sans-serif" fontSize="10">
            Tailwind · TanStack Query
          </text>
        </g>

        {/* REST API label */}
        <text x="350" y="120" textAnchor="middle" fill="#64748b" fontFamily="JetBrains Mono, monospace" fontSize="10">
          REST API
        </text>

        {/* Backend */}
        <g>
          <rect
            x="450"
            y="80"
            width="200"
            height="120"
            rx="14"
            fill="#0c1120"
            stroke="#22d3ee"
            strokeWidth="1.5"
          />
          <text
            x="550"
            y="115"
            textAnchor="middle"
            fill="#22d3ee"
            fontFamily="Space Grotesk, sans-serif"
            fontSize="13"
            fontWeight="600"
          >
            FASTAPI BACKEND
          </text>
          <text x="550" y="138" textAnchor="middle" fill="#e6e9f2" fontFamily="Inter, sans-serif" fontSize="11">
            Authentication
          </text>
          <text x="550" y="155" textAnchor="middle" fill="#e6e9f2" fontFamily="Inter, sans-serif" fontSize="11">
            Student Management
          </text>
          <text x="550" y="172" textAnchor="middle" fill="#e6e9f2" fontFamily="Inter, sans-serif" fontSize="11">
            Dashboard APIs
          </text>
          <text x="550" y="189" textAnchor="middle" fill="#e6e9f2" fontFamily="Inter, sans-serif" fontSize="11">
            CSV Processing
          </text>
        </g>

        {/* GenAI label */}
        <text x="750" y="120" textAnchor="middle" fill="#64748b" fontFamily="JetBrains Mono, monospace" fontSize="10">
          GenAI SDK
        </text>

        {/* Firebase */}
        <g>
          <rect
            x="220"
            y="300"
            width="200"
            height="100"
            rx="14"
            fill="#0c1120"
            stroke="#a78bfa"
            strokeWidth="1.5"
          />
          <text
            x="320"
            y="335"
            textAnchor="middle"
            fill="#a78bfa"
            fontFamily="Space Grotesk, sans-serif"
            fontSize="13"
            fontWeight="600"
          >
            FIREBASE
          </text>
          <text x="320" y="358" textAnchor="middle" fill="#e6e9f2" fontFamily="Inter, sans-serif" fontSize="11">
            Authentication
          </text>
          <text x="320" y="375" textAnchor="middle" fill="#e6e9f2" fontFamily="Inter, sans-serif" fontSize="11">
            Firestore
          </text>
          <text x="320" y="392" textAnchor="middle" fill="#64748b" fontFamily="Inter, sans-serif" fontSize="10">
            Auth &amp; data store
          </text>
        </g>

        {/* Gemini */}
        <g>
          <rect
            x="680"
            y="300"
            width="200"
            height="100"
            rx="14"
            fill="#0c1120"
            stroke="#22d3ee"
            strokeWidth="1.5"
          />
          <text
            x="780"
            y="335"
            textAnchor="middle"
            fill="#22d3ee"
            fontFamily="Space Grotesk, sans-serif"
            fontSize="13"
            fontWeight="600"
          >
            GOOGLE GEMINI
          </text>
          <text x="780" y="358" textAnchor="middle" fill="#e6e9f2" fontFamily="Inter, sans-serif" fontSize="11">
            AI Analysis
          </text>
          <text x="780" y="375" textAnchor="middle" fill="#e6e9f2" fontFamily="Inter, sans-serif" fontSize="11">
            Risk + Messages
          </text>
          <text x="780" y="392" textAnchor="middle" fill="#64748b" fontFamily="Inter, sans-serif" fontSize="10">
            gemini-2.5-flash
          </text>
        </g>

        {/* Gemini API (right) */}
        <g>
          <rect
            x="850"
            y="80"
            width="200"
            height="100"
            rx="14"
            fill="#0c1120"
            stroke="#22d3ee"
            strokeWidth="1.5"
          />
          <text
            x="950"
            y="115"
            textAnchor="middle"
            fill="#22d3ee"
            fontFamily="Space Grotesk, sans-serif"
            fontSize="13"
            fontWeight="600"
          >
            GEMINI API
          </text>
          <text x="950" y="140" textAnchor="middle" fill="#e6e9f2" fontFamily="Inter, sans-serif" fontSize="12">
            Risk + Prediction
          </text>
          <text x="950" y="158" textAnchor="middle" fill="#64748b" fontFamily="Inter, sans-serif" fontSize="10">
            Personalized reminders
          </text>
        </g>
      </svg>
    </div>
  )
}
