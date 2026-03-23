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
    <div className="rounded-2xl border glass border-[#00f0ff]/20 shadow-neon p-5">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-sm font-bold text-white">Mention Growth</h3>
          <p className="text-[11px] text-white/35">7-day social media mentions</p>
        </div>
        <span
          className="text-xs px-2 py-1 rounded-full border font-bold"
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
          <CartesianGrid stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="t" stroke="rgba(255,255,255,0.3)" />
          <YAxis stroke="rgba(255,255,255,0.3)" />
          <Tooltip content={<ChartTooltip />} />

          <Area
            type="monotone"
            dataKey="mentions"
            stroke={cfg.color}
            fill={cfg.color}
            fillOpacity={0.2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

// ─── SENTIMENT DISTRIBUTION ───────────────────────────────────
function SentimentChart({ coin }) {
  return (
    <div className="rounded-2xl border glass border-[#00f0ff]/20 shadow-neon p-5">
      <h3 className="text-sm font-bold text-white mb-4">Sentiment Distribution</h3>

      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={coin.sentimentData}
            dataKey="value"
            innerRadius={40}
            outerRadius={70}
          >
            {coin.sentimentData.map((_, i) => (
              <Cell key={i} fill={PIE_COLORS[i]} />
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
    <div className="rounded-2xl border glass border-[#00f0ff]/20 shadow-neon p-5">
      <div className="flex justify-between mb-4">
        <h3 className="text-sm font-bold text-white">Price History</h3>
        <span style={{ color: cfg.color }}>{coin.price}</span>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={coin.priceHistory}>
          <CartesianGrid stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="t" stroke="rgba(255,255,255,0.3)" />
          <YAxis stroke="rgba(255,255,255,0.3)" />
          <Tooltip content={<ChartTooltip />} />

          <Line
            type="monotone"
            dataKey="price"
            stroke={cfg.color}
            strokeWidth={2}
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