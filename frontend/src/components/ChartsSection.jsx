//frontend/src/components/ChartsSection.jsx
import {
  LineChart, Line, AreaChart, Area,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import { TREND_CONFIG, PIE_COLORS } from '../data/coins'
import ChartTooltip from './ChartTooltip'

// ─── MENTION GROWTH CHART ─────────────────────────────────────────────────────
function MentionChart({ coin }) {
  const cfg = TREND_CONFIG[coin.trend]

  return (
    <div
      className="rounded-2xl border border-white/[0.08] p-5"
      style={{
        background:           'rgba(255,255,255,0.025)',
        backdropFilter:       'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-sm font-bold text-white tracking-wide">Mention Growth</h3>
          <p className="text-[11px] text-white/35 mt-0.5">7-day social media mentions</p>
        </div>
        <span
          className="text-xs px-2.5 py-1 rounded-full border font-bold"
          style={{
            color:       cfg.color,
            borderColor: cfg.colorBorder,
            background:  cfg.colorDim,
          }}
        >
          {coin.change}
        </span>
      </div>

      <ResponsiveContainer width="100%" height={190}>
        <AreaChart data={coin.mentionData || []} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
          <defs>
            <linearGradient id={`mentionGrad-${coin.symbol}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor={cfg.color} stopOpacity={0.28} />
              <stop offset="100%" stopColor={cfg.color} stopOpacity={0}    />
            </linearGradient>
            <linearGradient id={`baseGrad-${coin.symbol}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="rgba(255,255,255,0.15)" stopOpacity={0.15} />
              <stop offset="100%" stopColor="rgba(255,255,255,0.15)" stopOpacity={0}    />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis
            dataKey="t"
            tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: "'Syne', sans-serif" }}
            axisLine={false} tickLine={false}
          />
          <YAxis
            tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: "'Syne', sans-serif" }}
            axisLine={false} tickLine={false} width={44}
          />
          <Tooltip content={<ChartTooltip />} />
          <Area
            type="monotone" dataKey="baseline" name="Avg Baseline"
            stroke="rgba(255,255,255,0.2)" strokeWidth={1.5} strokeDasharray="4 3"
            fill={`url(#baseGrad-${coin.symbol})`} dot={false}
          />
          <Area
            type="monotone" dataKey="mentions" name="Mentions"
            stroke={cfg.color} strokeWidth={2.5}
            fill={`url(#mentionGrad-${coin.symbol})`}
            dot={{ fill: cfg.color, r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: cfg.color, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

// ─── SENTIMENT DISTRIBUTION CHART ────────────────────────────────────────────
function SentimentChart({ coin }) {
  return (
    <div
      className="rounded-2xl border border-white/[0.08] p-5"
      style={{
        background:           'rgba(255,255,255,0.025)',
        backdropFilter:       'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <div className="mb-5">
        <h3 className="text-sm font-bold text-white tracking-wide">Sentiment Distribution</h3>
        <p className="text-[11px] text-white/35 mt-0.5">Positive / Neutral / Negative split</p>
      </div>

      <div className="flex items-center gap-4">
        {/* Donut */}
        <div className="shrink-0" style={{ width: 150, height: 150 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={coin.sentimentData}
                cx="50%" cy="50%"
                innerRadius={44} outerRadius={68}
                paddingAngle={3}
                dataKey="value"
                startAngle={90} endAngle={-270}
              >
                {coin.sentimentData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i]} opacity={0.9} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Breakdown bars */}
        <div className="flex flex-col gap-3.5 flex-1">
          {coin.sentimentData.map((d, i) => (
            <div key={d.name}>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: PIE_COLORS[i] }} />
                  <span className="text-white/55">{d.name}</span>
                </div>
                <span className="font-bold" style={{ color: PIE_COLORS[i] }}>
                  {d.value}%
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-white/[0.07]">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${d.value}%`, background: PIE_COLORS[i] }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── PRICE HISTORY CHART ──────────────────────────────────────────────────────
function PriceChart({ coin }) {
  const cfg = TREND_CONFIG[coin.trend]
  const min  = Math.min(...coin.priceHistory.map(d => d.price)) * 0.998
  const max  = Math.max(...coin.priceHistory.map(d => d.price)) * 1.002

  return (
    <div
      className="rounded-2xl border border-white/[0.08] p-5"
      style={{
        background:           'rgba(255,255,255,0.025)',
        backdropFilter:       'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-sm font-bold text-white tracking-wide">Price History</h3>
          <p className="text-[11px] text-white/35 mt-0.5">7-day price movement</p>
        </div>
        <span
          className="font-black text-base"
          style={{ color: cfg.color, fontFamily: "'Orbitron', monospace" }}
        >
          {coin.price}
        </span>
      </div>

      <ResponsiveContainer width="100%" height={140}>
        <LineChart data={coin.priceHistory} margin={{ top: 4, right: 4, bottom: 0, left: -14 }}>
          <defs>
            <linearGradient id={`priceGrad-${coin.symbol}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor={cfg.color} stopOpacity={0.4} />
              <stop offset="100%" stopColor="#00ccff"   stopOpacity={1}   />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis
            dataKey="t"
            tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }}
            axisLine={false} tickLine={false}
          />
          <YAxis
            domain={[min, max]}
            tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 9 }}
            axisLine={false} tickLine={false} width={54}
            tickFormatter={(v) => v.toFixed(v < 0.001 ? 8 : 4)}
          />
          <Tooltip content={<ChartTooltip />} />
          <Line
            type="monotone" dataKey="price" name="Price"
            stroke={`url(#priceGrad-${coin.symbol})`}
            strokeWidth={2.5}
            dot={{ fill: cfg.color, r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: cfg.color, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

// ─── EXPORT ───────────────────────────────────────────────────────────────────
export default function ChartsSection({ coin }) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
      <MentionChart   coin={coin} />
      <SentimentChart coin={coin} />
      <div className="xl:col-span-2">
        <PriceChart coin={coin} />
      </div>
    </div>
  )
}
