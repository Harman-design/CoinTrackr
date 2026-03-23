//frontend/src/components/AlertsPanel.jsx
import { ALERT_STYLE } from '../data/coins'

function AlertCard({ alert, index }) {
  const style = ALERT_STYLE[alert.type] || ALERT_STYLE["neutral"];

  return (
    <div
      className={`
        flex items-start gap-3 rounded-xl border px-4 py-3
        transition-all duration-200 hover:brightness-110 hover:scale-[1.01]
        animate-fade-in-up
      `}
      style={{
        borderColor:  alert.type === 'bullish' ? 'rgba(0,240,255,0.6)'
                    : alert.type === 'bearish' ? 'rgba(255,0,170,0.6)'
                    : 'rgba(170,0,255,0.6)',
        background:   alert.type === 'bullish' ? 'linear-gradient(90deg, rgba(0,240,255,0.15) 0%, rgba(0,240,255,0.02) 100%)'
                    : alert.type === 'bearish' ? 'linear-gradient(90deg, rgba(255,0,170,0.15) 0%, rgba(255,0,170,0.02) 100%)'
                    : 'linear-gradient(90deg, rgba(170,0,255,0.15) 0%, rgba(170,0,255,0.02) 100%)',
        boxShadow:    alert.type === 'bullish' ? '0 0 15px rgba(0,240,255,0.15), inset 0 0 10px rgba(0,240,255,0.05)'
                    : alert.type === 'bearish' ? '0 0 15px rgba(255,0,170,0.15), inset 0 0 10px rgba(255,0,170,0.05)'
                    : '0 0 15px rgba(170,0,255,0.15), inset 0 0 10px rgba(170,0,255,0.05)',
        animationDelay: `${index * 80}ms`,
        animationFillMode: 'both',
      }}
    >
      <span className="text-sm mt-0.5 shrink-0">{style.icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white/80 leading-snug">{alert.msg}</p>
        <p className="text-[10px] text-white/30 mt-1 uppercase tracking-wider font-semibold">
          {alert.type}
        </p>
      </div>
      <div
        className="w-[3px] h-full rounded-full shrink-0 self-stretch shadow-neon"
        style={{
          background: alert.type === 'bullish' ? '#00f0ff'
                    : alert.type === 'bearish' ? '#ff00aa'
                    : '#aa00ff',
          boxShadow: `0 0 10px ${alert.type === 'bullish' ? '#00f0ff' : alert.type === 'bearish' ? '#ff00aa' : '#aa00ff'}`,
          opacity: 0.9,
        }}
      />
    </div>
  )
}

export default function AlertsPanel({ alerts }) {
  return (
    <div
      className="rounded-2xl border glass border-[#00f0ff]/20 shadow-neon p-5 flex flex-col"
      style={{
        background:           'transparent',
        backdropFilter:       'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-white tracking-wide">Live Alerts</h3>
          <p className="text-[11px] text-white/35 mt-0.5">Real-time signal updates</p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border"
            style={{
              color:       '#00f0ff',
              borderColor: 'rgba(0,240,255,0.35)',
              background:  'rgba(0,240,255,0.08)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse" />
            Live
          </span>
        </div>
      </div>

      {/* Alert cards */}
      <div className="flex flex-col gap-2.5">
        {alerts.map((alert, i) => (
          <AlertCard key={i} alert={alert} index={i} />
        ))}
      </div>
    </div>
  )
}
