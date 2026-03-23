//frontend/src/components/CoinSelector.jsx
import { COINS, TREND_CONFIG } from '../data/coins'

export default function CoinSelector({ selected, setSelected }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {Object.entries(COINS).map(([key, coin]) => {
        const isSelected = selected === key
        const cfg        = TREND_CONFIG[coin.trend]

        return (
          <button
            key={key}
            onClick={() => setSelected(key)}
            className={`
              relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold
              tracking-wide transition-all duration-250 border overflow-hidden
              ${isSelected
                ? 'text-[#050914] border-transparent scale-105'
                : 'text-white/50 border-white/10 hover:border-white/20 hover:text-white/80 hover:scale-[1.02]'
              }
            `}
            style={
              isSelected
                ? {
                    background: 'linear-gradient(135deg, #00f0ff, #0088ff)',
                    boxShadow:  '0 4px 22px rgba(0,240,255,0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
                  }
                : { background: 'rgba(255,255,255,0.04)' }
            }
          >
            {/* Subtle shimmer on active */}
            {isSelected && (
              <span
                className="absolute inset-0 opacity-30"
                style={{
                  background:
                    'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 2.5s ease-in-out infinite',
                }}
              />
            )}

            <span className="text-base leading-none relative z-10">{coin.emoji}</span>
            <div className="relative z-10">
              <div className="leading-tight">{key}</div>
              {isSelected && (
                <div className="text-[9px] opacity-70 font-semibold leading-none mt-0.5 tracking-wider">
                  {coin.change}
                </div>
              )}
            </div>
          </button>
        )
      })}
    </div>
  )
}
