// Shared custom tooltip for all Recharts charts
export default function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null

  return (
    <div
      className="rounded-xl border border-white/10 px-3.5 py-2.5 text-xs shadow-2xl"
      style={{
        background:           'rgba(8,10,20,0.92)',
        backdropFilter:       'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      {label && (
        <p className="text-white/40 mb-1.5 font-semibold tracking-wide">{label}</p>
      )}
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ background: entry.color }}
          />
          <span className="text-white/60">{entry.name}:</span>
          <span className="font-bold text-white">{entry.value?.toLocaleString()}</span>
        </div>
      ))}
    </div>
  )
}
