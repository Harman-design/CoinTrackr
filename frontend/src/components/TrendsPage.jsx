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

  const COLORS = { Sentiment: '#00f0ff', Hype: '#bc13fe', Pump: '#ffea00' }

  return (
    <div
      className="rounded-2xl border glass border-[#00f0ff]/20 shadow-neon p-6 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] transition-shadow duration-500 group"
    >
      <h3 className="text-sm font-bold text-white tracking-widest uppercase font-orbitron group-hover:text-[#00f0ff] transition-colors">Macro Comparison Matrix</h3>
      <p className="text-[9px] text-white/40 tracking-widest font-orbitron uppercase mt-0.5 mb-6">Cross-asset sentiment, hype, and risk profiling</p>
      
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} barCategoryGap="25%" barGap={6}>
          <defs>
            <filter id="glowBar" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
          <XAxis
            dataKey="coin"
            tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12, fontFamily: "'Space Grotesk', monospace" }}
            axisLine={false} tickLine={false}
          />
          <YAxis
            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11, fontFamily: "'Space Grotesk', monospace" }}
            axisLine={false} tickLine={false} width={36}
          />
          <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(0,240,255,0.05)' }} />
          {Object.entries(COLORS).map(([key, color]) => (
            <Bar 
              key={key} 
              dataKey={key} 
              fill={color} 
              radius={[4, 4, 0, 0]} 
              opacity={0.9} 
              animationDuration={2000} 
              animationEasing="ease-out"
              style={{ filter: 'url(#glowBar)' }}
            />
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
      className="rounded-2xl border glass border-[#00f0ff]/20 shadow-neon p-6 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(0,240,255,0.2)] transition-all duration-500 group"
    >
      <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">{coin.emoji}</span>
          <div>
            <h3 className="text-sm font-bold text-white tracking-widest uppercase font-orbitron">{coin.label}</h3>
            <p className="text-[10px] tracking-widest font-orbitron font-bold" style={{ color: cfg.color, textShadow: `0 0 5px ${cfg.color}` }}>{cfg.label}</p>
          </div>
        </div>
      </div>
{/* Added gap fix layout */}
      <ResponsiveContainer width="100%" height={220}>
        <RadarChart data={data} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
          <defs>
            <filter id={`glowRadar-${coinKey}`} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <PolarGrid stroke="rgba(255,255,255,0.1)" strokeDasharray="3 3"/>
          <PolarAngleAxis
            dataKey="metric"
            tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 10, fontFamily: "'Space Grotesk', monospace" }}
          />
          <Radar
            dataKey="val" name={coinKey}
            stroke={cfg.color} fill={cfg.color} fillOpacity={0.15}
            strokeWidth={3}
            animationDuration={2500}
            animationEasing="ease-in-out"
            style={{ filter: `url(#glowRadar-${coinKey})` }}
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
      className="rounded-2xl border glass border-[#00f0ff]/20 shadow-neon p-6 hover:shadow-[0_0_30px_rgba(170,0,255,0.2)] transition-shadow duration-500 group"
    >
      <h3 className="text-sm font-bold text-white tracking-widest uppercase font-orbitron group-hover:text-[#aa00ff] transition-colors mb-1">Global Hype Leaders</h3>
      <p className="text-[9px] text-white/40 tracking-widest font-orbitron uppercase mb-6">Real-time social velocity rankings</p>
      
      <div className="flex flex-col gap-4">
        {sorted.map(([key, coin], i) => {
          const cfg = TREND_CONFIG[coin.trend]
          return (
            <div key={key} className="flex items-center gap-5 p-3 rounded-xl hover:bg-[#00f0ff]/5 transition-colors border border-transparent hover:border-[#00f0ff]/20">
              <span
                className="text-xl font-black w-6 shrink-0 text-center"
                style={{
                  color: i === 0 ? '#aa00ff' : i === 1 ? '#00f0ff' : 'rgba(255,255,255,0.3)',
                  fontFamily: "'Space Grotesk', monospace",
                  textShadow: i < 2 ? `0 0 10px ${i === 0 ? '#aa00ff' : '#00f0ff'}` : 'none'
                }}
              >
                #{i + 1}
              </span>
              <span className="text-3xl shrink-0 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">{coin.emoji}</span>
              <div className="flex-1 min-w-0 pr-4">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-bold text-white font-orbitron tracking-widest">{key}</span>
                  <span className="text-lg font-black" style={{ color: cfg.color, fontFamily: "'Space Grotesk', monospace", textShadow: `0 0 8px ${cfg.color}` }}>
                    {coin.hype}%
                  </span>
                </div>
                <div className="h-2.5 rounded-full bg-[#050914] border border-[#00f0ff]/20 overflow-hidden relative">
                  <div className="absolute inset-0 bg-grid opacity-50 z-0"/>
                  <div
                    className="h-full rounded-full transition-all duration-[2000ms] shadow-[0_0_10px_currentColor] z-10 relative"
                    style={{
                      width: `${coin.hype}%`,
                      background: `linear-gradient(90deg, transparent, ${cfg.color})`,
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
    <div className="flex flex-col gap-8 animate-fade-in pb-10 mt-5">
      <div className="border-l-4 border-[#00f0ff] pl-4 shadow-[inset_4px_0_10px_rgba(0,240,255,0.2)] py-1">
        <h2
          className="text-2xl font-black text-white tracking-[0.2em] uppercase font-orbitron"
          style={{ textShadow: '0 0 10px rgba(0,240,255,0.5)' }}
        >
          Trend Analytics Engine
        </h2>
        <p className="text-xs text-[#00f0ff] mt-2 font-orbitron tracking-widest uppercase opacity-80">
          Dimensional cross-asset behavior processing
        </p>
      </div>

      <ComparisonBar />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {Object.entries(COINS).map(([key, coin]) => (
          <CoinRadar key={key} coin={coin} coinKey={key} />
        ))}
      </div>

      <HypeLeaderboard />
    </div>
  )
}
