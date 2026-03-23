# CoinTrackr 🚀

> **Track the Pulse of Crypto Hype** — An AI-powered crypto trend prediction dashboard.

![CoinTrackr](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38BDF8?style=flat-square&logo=tailwindcss)
![Recharts](https://img.shields.io/badge/Recharts-2-FF6384?style=flat-square)

---

## ✨ Features

- **Real-time sentiment tracking** for DOGE, PEPE, and SHIBA
- **AI-powered metrics** — Sentiment Score, Hype Index, Pump Probability
- **Interactive charts** — Area charts, Pie/Donut, Radar, Bar, Line (via Recharts)
- **Live alerts panel** with bullish/bearish/neutral signals
- **AI analysis explanations** per coin
- **Trends page** — cross-coin comparison, radar charts, hype leaderboard
- **Insights page** — AI-generated market signals and intelligence
- **Collapsible sidebar** with active state indicators
- **Mobile responsive** with bottom navigation bar
- **Dark theme** with glassmorphism, neon accents, and animated counters

---

## 🗂️ Project Structure

```
cointrackr/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── data/
    │   └── coins.js          ← All mock data + config constants
    ├── hooks/
    │   └── useAnimatedNumber.js  ← Animated counter hook
    ├── icons/
    │   └── index.jsx         ← All SVG icon components
    └── components/
        ├── Navbar.jsx         ← Top navigation bar
        ├── Sidebar.jsx        ← Collapsible desktop sidebar
        ├── CoinSelector.jsx   ← DOGE / PEPE / SHIBA toggle
        ├── MetricCard.jsx     ← Animated metric + trend status cards
        ├── ChartsSection.jsx  ← Area, Pie, Line charts (Recharts)
        ├── ChartTooltip.jsx   ← Shared custom Recharts tooltip
        ├── AlertsPanel.jsx    ← Live signal alert cards
        ├── ExplanationBox.jsx ← AI analysis explanation panel
        ├── StatsBar.jsx       ← Price / market cap quick stats
        ├── Dashboard.jsx      ← Main dashboard page composition
        ├── TrendsPage.jsx     ← Cross-coin trends & comparisons
        └── InsightsPage.jsx   ← AI insights & market signals
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# → http://localhost:5173
```

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🎨 Design System

| Token       | Value        | Usage                        |
|-------------|--------------|------------------------------|
| `bullish`   | `#00ff88`    | Positive / upward trend      |
| `bearish`   | `#ff3366`    | Negative / downward trend    |
| `neutral`   | `#ffd700`    | Sideways / uncertain         |
| `hype`      | `#ff9900`    | Hype score accent            |
| `accent`    | `#00ccff`    | Sentiment / info accents     |
| `base`      | `#060810`    | Background                   |

**Fonts:**
- Display / numbers: `Orbitron` (Google Fonts)
- Body / UI text: `Syne` (Google Fonts)

---

## 🔌 Connecting Real Data

To connect real data, replace the mock values in `src/data/coins.js` with API calls to:

- **CoinGecko API** — price, market cap, volume
- **LunarCrush API** — social sentiment, mentions, hype score
- **Santiment API** — on-chain data, whale tracking
- **Twitter/X API** — real-time mention scraping

---

## 📄 License

MIT — free to use and modify.
