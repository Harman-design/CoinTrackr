import { TREND_CONFIG } from '../data/coins'

export default function ExplanationBox({ text, trend }) {
  const cfg = TREND_CONFIG[trend]

  return (
    <div
      className="rounded-2xl border p-6 relative overflow-hidden group hover:shadow-[0_0_40px_rgba(0,240,255,0.2)] transition-shadow duration-500"
      style={{
        borderColor:          cfg.colorBorder,
        background:           `linear-gradient(135deg, ${cfg.colorDim} 0%, rgba(255,255,255,0.02) 100%)`,
        backdropFilter:       'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        boxShadow:            `0 0 30px ${cfg.colorGlow}`,
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 w-full h-[2px] opacity-70 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${cfg.color}, transparent)` }}
      />

      {/* Corner glow */}
      <div
        className="absolute -top-10 -left-10 w-40 h-40 rounded-full blur-[40px] pointer-events-none group-hover:scale-125 transition-transform duration-700"
        style={{ background: cfg.color, opacity: 0.15 }}
      />
      
      {/* Ambient Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none z-0 mix-blend-overlay" />

      <div className="flex items-start gap-4 relative z-10">
        {/* Icon bubble */}
        <div
          className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
          style={{
            background: `linear-gradient(135deg, ${cfg.colorDim}, rgba(255,255,255,0.05))`,
            border: `1px solid ${cfg.colorBorder}`,
            boxShadow: `0 0 15px ${cfg.colorGlow}`,
          }}
        >
          <span className="drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] flex items-center h-[90%] w-[90%] justify-center">🤖</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-3 border-b border-white/5 pb-2">
            <h3
              className="text-xs font-black tracking-widest uppercase font-orbitron group-hover:text-shadow transition-all"
              style={{ color: cfg.color, '--tw-text-shadow': `0 0 10px ${cfg.color}` }}
            >
              Neural Agent Analysis
            </h3>
            <span
              className="text-[9px] px-2 py-0.5 rounded shadow-[0_0_8px_currentColor] font-orbitron uppercase tracking-widest font-black"
              style={{
                color:      cfg.color,
                background: `${cfg.color}15`,
                border:     `1px solid ${cfg.colorBorder}`,
              }}
            >
              {cfg.label}
            </span>
          </div>
          <p className="text-sm font-syne text-white/70 leading-relaxed drop-shadow-md">{text}</p>
        </div>
      </div>
    </div>
  )
}
