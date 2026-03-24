//src/components/ChartsSection.jsx
import {
  LineChart, Line, AreaChart, Area,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'

import { TREND_CONFIG, PIE_COLORS } from '../data/coins'
import ChartTooltip from './ChartTooltip'

// ─── MENTION GROWTH CHART ─────────────────────────────────────
function MentionChart({ coin }) {
  const cfg = TREND_CONFIG[coin?.trend] || TREND_CONFIG["neutral"]

  return (
    <div className="rounded-2xl border glass border-[#00f0ff]/20 shadow-neon p-5 hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] transition-shadow duration-500 group">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-sm font-bold text-white tracking-widest uppercase font-orbitron group-hover:text-[#00f0ff] transition-colors">Mention Velocity</h3>
          <p className="text-[9px] text-white/40 tracking-widest font-orbitron uppercase mt-0.5">7-day social media volume curve</p>
        </div>
        <span
          className="text-[10px] px-2.5 py-1 rounded border font-bold font-orbitron shadow-[0_0_10px_currentColor] animate-pulse"
          style={{
            color: cfg.color,
            borderColor: cfg.colorBorder,
            background: cfg.colorDim,
          }}
        >
          {coin.change}
        </span>
      </div>

      <ResponsiveContainer width="100%" height={190}>
        <AreaChart data={coin.mentionData || []}>
          <defs>
            <linearGradient id="colorMentions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={cfg.color} stopOpacity={0.5}/>
              <stop offset="95%" stopColor={cfg.color} stopOpacity={0}/>
            </linearGradient>
            <filter id="glowMentions" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="t" stroke="rgba(255,255,255,0.2)" tick={{ fontSize: 10, fontFamily: "'Space Grotesk', monospace", fill: 'rgba(255,255,255,0.5)' }} tickLine={false} axisLine={false} />
          <YAxis stroke="rgba(255,255,255,0.2)" tick={{ fontSize: 10, fontFamily: "'Space Grotesk', monospace", fill: 'rgba(255,255,255,0.5)' }} tickLine={false} axisLine={false} />
          <Tooltip content={<ChartTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '5 5' }} />

          <Area
            type="monotone"
            dataKey="mentions"
            stroke={cfg.color}
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorMentions)"
            animationDuration={2000}
            animationEasing="ease-in-out"
            style={{ filter: "url(#glowMentions)" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

// ─── SENTIMENT DISTRIBUTION ───────────────────────────────────
function SentimentChart({ coin }) {
  return (
    <div className="rounded-2xl border glass border-[#00f0ff]/20 shadow-neon p-5 hover:shadow-[0_0_30px_rgba(170,0,255,0.2)] transition-shadow duration-500 group">
      <h3 className="text-sm font-bold text-white mb-1 tracking-widest uppercase font-orbitron group-hover:text-[#aa00ff] transition-colors">AI Concept Analysis</h3>
      <p className="text-[9px] text-white/40 tracking-widest font-orbitron uppercase mb-4">Neural sentiment breakdown map</p>

      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <defs>
            <filter id="glowPie" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <Pie
            data={coin.sentimentData}
            dataKey="value"
            innerRadius={50}
            outerRadius={75}
            paddingAngle={3}
            animationDuration={2000}
            animationEasing="ease-out"
            stroke="transparent"
          >
            {coin.sentimentData.map((_, i) => (
              <Cell key={i} fill={PIE_COLORS[i]} style={{ filter: "url(#glowPie)", outline: "none" }} />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

// ─── PRICE HISTORY ────────────────────────────────────────────
function PriceChart({ coin }) {
  const cfg = TREND_CONFIG[coin.trend]

  return (
    <div className="rounded-2xl border glass border-[#00f0ff]/20 shadow-neon p-6 hover:shadow-[0_0_40px_rgba(0,240,255,0.2)] transition-shadow duration-500 group">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h3 className="text-sm font-bold text-white tracking-widest uppercase font-orbitron group-hover:text-[#00f0ff] transition-colors">Asset Price Projection</h3>
          <p className="text-[9px] text-white/40 tracking-widest font-orbitron uppercase mt-0.5">Historical trend tracking algorithm</p>
        </div>
        <span className="font-orbitron font-black text-2xl tracking-wider" style={{ color: cfg.color, textShadow: `0 0 15px ${cfg.color}` }}>
          {coin.price}
        </span>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={coin.priceHistory}>
          <defs>
            <filter id="glowLine" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id="lineColor" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fff" stopOpacity={0.8}/>
              <stop offset="100%" stopColor={cfg.color} stopOpacity={1}/>
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.03)" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="t" stroke="rgba(255,255,255,0.2)" tick={{ fontSize: 10, fontFamily: "'Space Grotesk', monospace", fill: 'rgba(255,255,255,0.5)' }} tickLine={false} axisLine={false} padding={{ left: 10, right: 10 }} />
          <YAxis domain={['auto', 'auto']} stroke="rgba(255,255,255,0.2)" tick={{ fontSize: 10, fontFamily: "'Space Grotesk', monospace", fill: 'rgba(255,255,255,0.5)' }} tickLine={false} axisLine={false} />
          <Tooltip content={<ChartTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '4 4' }} />

          <Line
            type="monotone"
            dataKey="price"
            stroke="url(#lineColor)"
            strokeWidth={4}
            dot={{ r: 4, fill: '#050914', stroke: cfg.color, strokeWidth: 2 }}
            activeDot={{ r: 7, fill: '#fff', stroke: cfg.color, strokeWidth: 2, filter: "url(#glowLine)" }}
            animationDuration={2500}
            animationEasing="ease-out"
            style={{ filter: "url(#glowLine)" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

// ─── MAIN EXPORT ──────────────────────────────────────────────
export default function ChartsSection({ coin, liveData }) {

  // ✅ MENTION DATA (backend OR fallback)
  const mentionData = liveData?.mentions_growth
    ? liveData.mentions_growth.map((v, i) => ({
        t: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i],
        mentions: v,
        baseline: v * 0.6
      }))
    : coin.mentionData

  // ✅ SENTIMENT DATA
  const sentimentData = liveData?.sentiment_distribution
    ? [
        { name: "Positive", value: liveData.sentiment_distribution.positive },
        { name: "Neutral", value: liveData.sentiment_distribution.neutral },
        { name: "Negative", value: liveData.sentiment_distribution.negative }
      ]
    : coin.sentimentData

  // ✅ PRICE DATA
  const priceHistory = liveData?.price_history
    ? liveData.price_history.map((v, i) => ({
        t: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i],
        price: v
      }))
    : coin.priceHistory

  // 🔥 MERGE DATA (NO UI CHANGE)
  const mergedCoin = {
    ...coin,
    mentionData,
    sentimentData,
    priceHistory
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
      <MentionChart coin={mergedCoin} />
      <SentimentChart coin={mergedCoin} />
      <div className="xl:col-span-2">
        <PriceChart coin={mergedCoin} />
      </div>
    </div>
  )
}