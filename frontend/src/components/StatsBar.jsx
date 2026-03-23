//frontend/src/components/StatsBar.jsx
import { TREND_CONFIG } from '../data/coins'

function StatPill({ label, value, color }) {
  return (
    <div
      className="flex flex-col gap-0.5 px-4 py-2.5 rounded-xl border border-white/[0.07]"
      style={{ background: 'rgba(255,255,255,0.03)' }}
    >
      <span className="text-[10px] text-white/35 tracking-widest uppercase font-semibold">{label}</span>
      <span
        className="text-sm font-bold"
        style={{ color: color || '#fff', fontFamily: "'Orbitron', monospace" }}
      >
        {value}
      </span>
    </div>
  )
}

export default function StatsBar({ coin }) {
  const cfg = TREND_CONFIG[coin.trend]

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <StatPill label="Price"      value={coin.price}     color="#fff"       />
      <StatPill label="24h Change" value={coin.change}    color={cfg.color}  />
      <StatPill label="Market Cap" value={coin.marketCap} color="rgba(255,255,255,0.7)" />
      <StatPill label="24h Volume" value={coin.volume24h} color="rgba(255,255,255,0.7)" />
    </div>
  )
}
