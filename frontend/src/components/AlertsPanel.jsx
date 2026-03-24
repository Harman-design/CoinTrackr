//frontend/src/components/AlertsPanel.jsx
import { ALERT_STYLE } from '../data/coins'

function AlertCard({ alert, index }) {
  const style = ALERT_STYLE[alert.type] || ALERT_STYLE["neutral"];
  const isBullish = alert.type === 'bullish';
  const isBearish = alert.type === 'bearish';
  const accentHex = isBullish ? '#00f0ff' : isBearish ? '#ff00aa' : '#aa00ff';

  return (
    <div
      className="group flex items-center gap-4 rounded-xl border px-5 py-4 transition-all duration-300 hover:scale-[1.02] animate-fade-in-up relative overflow-hidden"
      style={{
        borderColor:  `${accentHex}50`,
        background:   `linear-gradient(135deg, ${accentHex}10 0%, transparent 100%)`,
        boxShadow:    `0 0 15px ${accentHex}15, inset 0 0 10px ${accentHex}05`,
        animationDelay: `${index * 80}ms`,
        animationFillMode: 'both',
      }}
    >
      {/* Hover glow line underneath */}
      <div 
        className="absolute bottom-0 left-0 w-full h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${accentHex}, transparent)` }} 
      />

      <div 
        className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-[0_0_10px_currentColor] border"
        style={{ color: accentHex, background: `${accentHex}15`, borderColor: `${accentHex}40` }}
      >
        <span className="text-sm drop-shadow-[0_0_5px_currentColor] h-full w-full flex items-center mt-[-1px] ml-[-1px] justify-center">{style.icon}</span>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1">
          <p className="text-[9px] font-orbitron text-white/40 tracking-widest uppercase font-bold">
            SIGNAL: {alert.type}
          </p>
        </div>
        <p className="text-sm font-syne text-white text-shadow-sm font-semibold">{alert.msg}</p>
      </div>

      <div
        className="w-1 h-8 rounded-full shrink-0 shadow-[0_0_10px_currentColor] opacity-70 group-hover:opacity-100 transition-opacity"
        style={{ background: accentHex, color: accentHex }}
      />
    </div>
  )
}

export default function AlertsPanel({ alerts }) {
  return (
    <div
      className="rounded-2xl border glass border-[#00f0ff]/20 shadow-neon p-6 flex flex-col hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] transition-shadow duration-500"
      style={{
        background:           'transparent',
        backdropFilter:       'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-3">
        <div>
          <h3 className="text-sm font-bold text-white tracking-widest font-orbitron uppercase">System Alerts</h3>
          <p className="text-[9px] font-orbitron tracking-widest text-[#00f0ff] uppercase mt-1 opacity-80">Real-time macro signal streams</p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="flex items-center gap-2 text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded border shadow-[0_0_10px_currentColor]"
            style={{
              color:       '#00f0ff',
              borderColor: 'rgba(0,240,255,0.3)',
              background:  'rgba(0,240,255,0.05)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse shadow-[0_0_5px_#00f0ff]" />
            Live
          </span>
        </div>
      </div>

      {/* Alert cards */}
      <div className="flex flex-col gap-3">
        {alerts.map((alert, i) => (
          <AlertCard key={i} alert={alert} index={i} />
        ))}
      </div>
    </div>
  )
}
