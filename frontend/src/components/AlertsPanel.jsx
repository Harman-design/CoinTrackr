import { ALERT_STYLE } from '../data/coins'

function AlertCard({ alert, index }) {
  const style = ALERT_STYLE[alert.type]

  return (
    <div
      className={`
        flex items-start gap-3 rounded-xl border px-4 py-3
        transition-all duration-200 hover:brightness-110 hover:scale-[1.01]
        animate-fade-in-up
      `}
      style={{
        borderColor:  style.border.replace('border-[', '').replace(']', ''),
        background:   style.bg.replace('bg-[', 'rgba(').replace(']', ')'),
        borderColor:  alert.type === 'bullish' ? 'rgba(0,255,136,0.33)'
                    : alert.type === 'bearish' ? 'rgba(255,51,102,0.33)'
                    : 'rgba(255,215,0,0.33)',
        background:   alert.type === 'bullish' ? 'rgba(0,255,136,0.05)'
                    : alert.type === 'bearish' ? 'rgba(255,51,102,0.05)'
                    : 'rgba(255,215,0,0.05)',
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
      {/* Right accent bar */}
      <div
        className="w-[2px] h-full rounded-full shrink-0 self-stretch"
        style={{
          background: alert.type === 'bullish' ? '#00ff88'
                    : alert.type === 'bearish' ? '#ff3366'
                    : '#ffd700',
          opacity: 0.6,
        }}
      />
    </div>
  )
}

export default function AlertsPanel({ alerts }) {
  return (
    <div
      className="rounded-2xl border border-white/[0.08] p-5 flex flex-col"
      style={{
        background:           'rgba(255,255,255,0.025)',
        backdropFilter:       'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
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
              color:       '#00ff88',
              borderColor: 'rgba(0,255,136,0.35)',
              background:  'rgba(0,255,136,0.08)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
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
