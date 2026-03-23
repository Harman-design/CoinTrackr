import { TREND_CONFIG } from '../data/coins'

export default function ExplanationBox({ text, trend }) {
  const cfg = TREND_CONFIG[trend]

  return (
    <div
      className="rounded-2xl border p-5 relative overflow-hidden"
      style={{
        borderColor:          cfg.colorBorder,
        background:           `linear-gradient(135deg, ${cfg.colorDim} 0%, rgba(255,255,255,0.02) 100%)`,
        backdropFilter:       'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow:            `0 0 40px ${cfg.colorGlow}`,
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 w-full h-[2px]"
        style={{ background: `linear-gradient(90deg, ${cfg.color}, transparent)` }}
      />

      {/* Corner glow */}
      <div
        className="absolute -top-10 -left-10 w-32 h-32 rounded-full blur-3xl pointer-events-none"
        style={{ background: cfg.color, opacity: 0.1 }}
      />

      <div className="flex items-start gap-4 relative z-10">
        {/* Icon bubble */}
        <div
          className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-lg mt-0.5"
          style={{
            background: `linear-gradient(135deg, ${cfg.colorDim}, rgba(255,255,255,0.05))`,
            border: `1px solid ${cfg.colorBorder}`,
          }}
        >
          🤖
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <p
              className="text-[10px] font-bold tracking-[0.2em] uppercase"
              style={{ color: cfg.color }}
            >
              AI Analysis
            </p>
            <span
              className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
              style={{
                color:      cfg.color,
                background: cfg.colorDim,
                border:     `1px solid ${cfg.colorBorder}`,
              }}
            >
              {cfg.label}
            </span>
          </div>
          <p className="text-[13px] text-white/65 leading-relaxed">{text}</p>
        </div>
      </div>
    </div>
  )
}
