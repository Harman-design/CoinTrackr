import { COINS, TREND_CONFIG } from '../data/coins'

export default function LunaticCrash({ onContinue }) {
  return (
    <div className="min-h-screen bg-base flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      {/* Immersive Holographic Backgrounds */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div 
        className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none" 
        style={{ background: 'radial-gradient(circle, rgba(0,240,255,0.08) 0%, transparent 60%)' }} 
      />
      <div 
        className="absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none" 
        style={{ background: 'radial-gradient(circle, rgba(170,0,255,0.06) 0%, transparent 60%)' }} 
      />

      <div className="glass rounded-[2rem] w-full max-w-5xl p-6 sm:p-10 relative z-10 animate-fade-in-up flex flex-col h-[85vh]">
        {/* Header */}
        <div className="text-center mb-8 shrink-0">
          <h1 
            className="text-3xl sm:text-5xl font-black font-orbitron text-transparent bg-clip-text uppercase tracking-[0.1em]" 
            style={{ backgroundImage: 'linear-gradient(135deg, #fff, #00f0ff)', textShadow: '0 0 20px rgba(0,240,255,0.4)' }}
          >
            LUNATIC CRASH
          </h1>
          <p className="text-[#00f0ff] font-orbitron tracking-[0.2em] text-xs mt-3 uppercase opacity-80">
            Global Market Intelligence
          </p>
        </div>

        {/* Coin List Scrollable Area */}
        <div className="flex-1 overflow-y-auto pr-2 mb-6 flex flex-col gap-4" style={{ overscrollBehavior: 'contain' }}>
          {Object.entries(COINS).map(([key, coin]) => {
            const cfg = TREND_CONFIG[coin.trend]
            return (
              <div 
                key={key} 
                className="glass rounded-2xl p-5 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-300 hover:scale-[1.01]" 
                style={{ borderColor: cfg.colorDim }}
              >
                
                {/* Coin Info */}
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{coin.emoji}</div>
                  <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      {coin.label}
                      <span 
                        className="text-[10px] font-orbitron px-2 py-0.5 rounded border opacity-80 tracking-widest" 
                        style={{ color: cfg.color, borderColor: cfg.colorDim, background: cfg.bgClass }}
                      >
                        {coin.symbol}
                      </span>
                    </h2>
                    <p className="text-xs text-white/50 mt-1 max-w-md hidden md:block">
                      {coin.explanation.slice(0, 80)}...
                    </p>
                  </div>
                </div>

                {/* Market Stats */}
                <div className="grid grid-cols-2 lg:flex items-center gap-6 sm:gap-10 shrink-0 w-full sm:w-auto mt-2 sm:mt-0">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/40 font-orbitron tracking-widest uppercase">Price</span>
                    <span className="text-lg font-bold font-orbitron">{coin.price}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/40 font-orbitron tracking-widest uppercase">Change</span>
                    <span 
                      className="text-lg font-bold font-orbitron" 
                      style={{ color: coin.change.startsWith('+') ? '#00f0ff' : '#ff00aa' }}
                    >
                      {coin.change}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/40 font-orbitron tracking-widest uppercase">Trend</span>
                    <span className="text-sm font-bold flex items-center gap-1.5" style={{ color: cfg.color }}>
                      {cfg.emoji} {cfg.label}
                    </span>
                  </div>
                </div>

              </div>
            )
          })}
        </div>
        
        {/* Footer Button */}
        <div className="shrink-0 mt-auto flex justify-center pt-2">
          <button 
            onClick={onContinue}
            className="px-10 py-4 rounded-xl text-base font-bold tracking-widest font-orbitron hover:scale-[1.02] transition-all uppercase"
            style={{ background: '#00f0ff', color: '#050914', boxShadow: '0 0 20px rgba(0,240,255,0.4)' }}
          >
            Acknowledge & Enter Hub
          </button>
        </div>

      </div>
    </div>
  )
}
