import { useEffect, useState } from 'react'
import { useAnimatedNumber } from '../hooks/useAnimatedNumber'
import { TREND_CONFIG } from '../data/coins'

// ─── GENERIC METRIC CARD ──────────────────────────────────────────────────────
export function MetricCard({ title, value, suffix = '', sub, accentColor, icon, delay = 0 }) {
  const [visible, setVisible] = useState(false)
  const animated = useAnimatedNumber(value)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  return (
    <div
      className="relative overflow-hidden rounded-2xl border glass border-[#00f0ff]/20 shadow-neon p-5 cursor-default glass-hover"
      style={{
        background:           'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
        backdropFilter:       'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        boxShadow:            `0 4px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.07)`,
        opacity:              visible ? 1 : 0,
        transform:            visible ? 'translateY(0)' : 'translateY(16px)',
        transition:           `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms, box-shadow 0.3s ease, border-color 0.3s ease, scale 0.25s ease`,
      }}
    >
      {/* Glow orb */}
      <div
        className="absolute -top-8 -right-8 w-28 h-28 rounded-full blur-3xl pointer-events-none"
        style={{ background: accentColor, opacity: 0.15 }}
      />

      {/* Header row */}
      <div className="flex items-start justify-between mb-4">
        <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-white/35">
          {title}
        </span>
        <span className="text-lg leading-none">{icon}</span>
      </div>

      {/* Value */}
      <div className="flex items-end gap-1">
        <span
          className="text-[2.6rem] font-black leading-none tracking-tighter"
          style={{ color: accentColor, fontFamily: "'Orbitron', monospace" }}
        >
          {animated}{suffix}
        </span>
      </div>

      {/* Sub-label */}
      {sub && (
        <p className="mt-2.5 text-[11px] text-white/30 leading-snug">{sub}</p>
      )}

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 h-[2px] w-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
          opacity: 0.5,
        }}
      />
    </div>
  )
}

// ─── TREND STATUS CARD ────────────────────────────────────────────────────────
export function TrendStatusCard({ trend, delay = 0 }) {
  const [visible, setVisible] = useState(false)
  const cfg = TREND_CONFIG[trend]

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  return (
    <div
      className="relative overflow-hidden rounded-2xl border p-5 cursor-default glass-hover"
      style={{
        borderColor:          cfg.colorBorder,
        background:           `linear-gradient(135deg, ${cfg.colorDim} 0%, rgba(255,255,255,0.02) 100%)`,
        backdropFilter:       'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        boxShadow:            `0 4px 32px rgba(0,0,0,0.45), 0 0 28px ${cfg.colorGlow}`,
        opacity:              visible ? 1 : 0,
        transform:            visible ? 'translateY(0)' : 'translateY(16px)',
        transition:           `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
      }}
    >
      {/* Glow orb */}
      <div
        className="absolute -top-8 -right-8 w-28 h-28 rounded-full blur-3xl pointer-events-none"
        style={{ background: cfg.color, opacity: 0.22 }}
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-white/35">
          Trend Status
        </span>
        <span className="text-lg leading-none">📊</span>
      </div>

      {/* Status row */}
      <div className="flex items-center gap-3">
        <span
          className="w-3 h-3 rounded-full shrink-0 pulse-ring"
          style={{ background: cfg.color }}
        />
        <span
          className="text-[2.1rem] font-black leading-none tracking-tight"
          style={{ color: cfg.color, fontFamily: "'Orbitron', monospace" }}
        >
          {cfg.label}
        </span>
      </div>

      <p className="mt-2.5 text-[11px] text-white/30">Market sentiment direction</p>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 h-[2px] w-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${cfg.color}, transparent)`,
          opacity: 0.55,
        }}
      />
    </div>
  )
}
