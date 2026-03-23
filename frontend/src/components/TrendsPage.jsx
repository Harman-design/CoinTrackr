import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell,
} from 'recharts'
import { COINS, TREND_CONFIG } from '../data/coins'
import ChartTooltip from './ChartTooltip'

// ─── COMPARISON BAR CHART ─────────────────────────────────────────────────────
function ComparisonBar() {
  const data = Object.entries(COINS).map(([key, coin]) => ({
    coin:      key,
    Sentiment: coin.sentiment,
    Hype:      coin.hype,
    Pump:      coin.pumpProb,
  }))

  const COLORS = { Sentiment: '#00ccff', Hype: '#ff9900', Pump: '#00ff88' }

  return (
    <div
      className="rounded-2xl border border-white/[0.08] p-5"
      style={{ background: 'rgba(255,255,255,0.025)', backdropFilter: 'blur(20px)' }}
    >
      <h3 className="text-sm font-bold text-white mb-1">Coin Comparison</h3>
      <p className="text-[11px] text-white/35 mb-5">Sentiment · Hype · Pump across all coins</p>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barCategoryGap="30%" barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis
            dataKey="coin"
            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12, fontFamily: "'Orbitron', monospace" }}
            axisLine={false} tickLine={false}
          />
          <YAxis
            tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }}
            axisLine={false} tickLine={false} width={36}
          />
          <Tooltip content={<ChartTooltip />} />
          {Object.entries(COLORS).map(([key, color]) => (
            <Bar key={key} dataKey={key} fill={color} radius={[4, 4, 0, 0]} opacity={0.85} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

// ─── RADAR CHART ──────────────────────────────────────────────────────────────
function CoinRadar({ coin, coinKey }) {
  const cfg = TREND_CONFIG[coin.trend]
  const data = [
    { metric: 'Sentiment', val: coin.sentiment  },
    { metric: 'Hype',      val: coin.hype       },
    { metric: 'Pump%',     val: coin.pumpProb   },
    { metric: 'Volume',    val: Math.round((parseFloat(coin.volume24h) / 4) * 10) },
    { metric: 'Community', val: Math.round(coin.sentiment * 0.9) },
  ]

  return (
    <div
      className="rounded-2xl border border-white/[0.08] p-5"
      style={{ background: 'rgba(255,255,255,0.025)', backdropFilter: 'blur(20px)' }}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">{coin.emoji}</span>
        <div>
          <h3 className="text-sm font-bold text-white">{coin.label}</h3>
          <p className="text-[11px]" style={{ color: cfg.color }}>{cfg.label}</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <RadarChart data={data} margin={{ top: 0, right: 20, bottom: 0, left: 20 }}>
          <PolarGrid stroke="rgba(255,255,255,0.07)" />
          <PolarAngleAxis
            dataKey="metric"
            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
          />
          <Radar
            dataKey="val" name={coinKey}
            stroke={cfg.color} fill={cfg.color} fillOpacity={0.18}
            strokeWidth={2}
          />
          <Tooltip content={<ChartTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}

// ─── HYPE LEADERBOARD ─────────────────────────────────────────────────────────
function HypeLeaderboard() {
  const sorted = Object.entries(COINS).sort(([, a], [, b]) => b.hype - a.hype)

  return (
    <div
      className="rounded-2xl border border-white/[0.08] p-5"
      style={{ background: 'rgba(255,255,255,0.025)', backdropFilter: 'blur(20px)' }}
    >
      <h3 className="text-sm font-bold text-white mb-1">Hype Leaderboard</h3>
      <p className="text-[11px] text-white/35 mb-5">Ranked by current hype score</p>
      <div className="flex flex-col gap-3">
        {sorted.map(([key, coin], i) => {
          const cfg = TREND_CONFIG[coin.trend]
          return (
            <div key={key} className="flex items-center gap-4">
              <span
                className="text-sm font-black w-5 shrink-0"
                style={{
                  color: i === 0 ? '#ffd700' : i === 1 ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.25)',
                  fontFamily: "'Orbitron', monospace",
                }}
              >
                {i + 1}
              </span>
              <span className="text-lg shrink-0">{coin.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-bold text-white">{key}</span>
                  <span className="text-sm font-black" style={{ color: cfg.color, fontFamily: "'Orbitron', monospace" }}>
                    {coin.hype}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/[0.07]">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${coin.hype}%`,
                      background: `linear-gradient(90deg, ${cfg.color}99, ${cfg.color})`,
                    }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── EXPORT ───────────────────────────────────────────────────────────────────
export default function TrendsPage() {
  return (
    <div className="flex flex-col gap-5 animate-fade-in">
      <div>
        <h2
          className="text-xl font-black text-white tracking-tight"
          style={{ fontFamily: "'Orbitron', monospace" }}
        >
          Trends
        </h2>
        <p className="text-xs text-white/35 mt-1">Cross-coin trend analysis and comparisons</p>
      </div>

      <ComparisonBar />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {Object.entries(COINS).map(([key, coin]) => (
          <CoinRadar key={key} coin={coin} coinKey={key} />
        ))}
      </div>

      <HypeLeaderboard />
    </div>
  )
}
