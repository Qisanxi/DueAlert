# DueAlert Landing Page

A self-contained, animated marketing landing page for DueAlert — the AI-powered fee collection assistant for coaching centers.

## ✨ What's included

A single, dependency-light `index.html` file (no build step required) featuring:

- **Hero** with animated aurora background, floating stat cards, and live demo CTA
- **Problem section** explaining the manual fee-collection grind
- **Features grid** covering all 6 core capabilities (AI risk analysis, dashboard, student management, CSV upload, WhatsApp reminders, auth & isolation)
- **Animated user-flow diagram** — the centerpiece — with SVG nodes and traveling dots that flow through the entire 9-step workflow:
  1. Sign Up → 2. Verify Email → 3. Institution Setup → 4. Add Students / CSV → 5. Gemini AI Analysis → 6. Hinglish Reminder → 7. WhatsApp Send → 8. Track Status → 9. Dashboard Updates
- **AI vs Manual workflow comparison**
- **Use cases** for coaching centers, schools, test prep, sports academies, music/dance schools, online course creators
- **Tech stack** breakdown (frontend / backend / cloud & AI)
- **Architecture diagram** with animated data-flow dots
- **Stats strip**, **CTA section**, and **footer** with all live links

## 🎨 Design

- Dark, modern, Gemini-inspired gradient theme (purple → cyan)
- Tailwind CSS via CDN (no build step)
- Google Fonts: Inter (body), Space Grotesk (display), JetBrains Mono (code)
- Scroll-reveal animations via IntersectionObserver
- Fully responsive with a mobile hamburger menu
- Animated SVG flow diagrams with traveling pulse dots

## 🚀 Running locally

Just open `landing/index.html` in a browser, or serve it with any static file server:

```bash
cd landing
python3 -m http.server 8000
# Visit http://localhost:8000
```

No installation, no build step, no dependencies to install.

## 🔗 Links referenced

- Live frontend: https://duealert-bbb61.web.app
- Backend API docs: https://duealert.onrender.com/docs
- Repository: https://github.com/Qisanxi/DueAlert

## 📁 File

```
landing/
└── index.html   # The complete landing page (self-contained)
```

Built for the Build with Gemini XPRIZE Hackathon 2026.
