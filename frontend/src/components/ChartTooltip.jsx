// Shared custom tooltip for all Recharts charts
export default function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null

  return (
    <div
      className="rounded-xl border border-[#00f0ff]/30 px-4 py-3 text-xs shadow-[0_0_20px_rgba(0,240,255,0.2)] glass backdrop-blur-xl"
      style={{
        background: 'linear-gradient(135deg, rgba(5,9,20,0.95), rgba(0,240,255,0.05))',
      }}
    >
      <div className="absolute top-0 left-4 w-12 h-px bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent" />
      <div className="absolute bottom-0 right-4 w-12 h-px bg-gradient-to-r from-transparent via-[#aa00ff] to-transparent" />

      {label && (
        <p className="text-[#00f0ff] mb-2 font-black tracking-widest font-orbitron text-[10px] uppercase border-b border-white/5 pb-1">
          {label}
        </p>
      )}
      <div className="flex flex-col gap-1.5">
        {payload.map((entry) => (
          <div key={entry.name} className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0 shadow-[0_0_8px_currentColor]"
                style={{ background: entry.color, color: entry.color }}
              />
              <span className="text-white/70 font-orbitron text-[10px] tracking-widest uppercase">{entry.name}:</span>
            </div>
            <span className="font-bold text-white text-sm" style={{ textShadow: `0 0 10px ${entry.color}` }}>
              {entry.value?.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
