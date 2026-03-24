import { useState } from 'react';
import { VAST_COINS } from '../data/vastCoins';
import { TREND_CONFIG } from '../data/coins';

export default function DetectorPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const calculateLifecycle = (sentiment, hype) => {
    const score = (sentiment + hype) / 2;
    if (score > 85) return { stage: "Peak", color: "#ffea00", borderColor: "rgba(255,234,0,0.4)" };
    if (score > 60) return { stage: "Growing", color: "#00f0ff", borderColor: "rgba(0,240,255,0.4)" };
    if (score < 40) return { stage: "Declining", color: "#ff00aa", borderColor: "rgba(255,0,170,0.4)" };
    return { stage: "Early Stage", color: "#aa00ff", borderColor: "rgba(170,0,255,0.4)" };
  };

  const getBotScore = (symbol) => {
    // Deterministic pseudo-random generation based on string
    let sum = 0;
    for (let i = 0; i < symbol.length; i++) {
      sum += symbol.charCodeAt(i);
    }
    const artificial = (sum * 7) % 45; // Max 45% fake hype
    const organic = 100 - artificial;
    return { organic, artificial };
  };

  const filteredCoins = VAST_COINS.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 animate-fade-in pb-10 mt-5">
      <div className="border-l-4 border-[#ffea00] pl-4 shadow-[inset_4px_0_10px_rgba(255,234,0,0.2)] py-1">
        <h2 
          className="text-2xl font-black text-white tracking-[0.2em] uppercase font-orbitron"
          style={{ textShadow: '0 0 10px rgba(255,234,0,0.5)' }}
        >
          Fake Hype Detector
        </h2>
        <p className="text-xs text-[#ffea00] mt-2 font-orbitron tracking-widest uppercase opacity-80">
          Advanced Bot Activity & Trend Life-Cycle Analysis
        </p>
      </div>

      <div className="flex justify-end">
        <input
          type="text"
          placeholder="Scan asset..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-[#00f0ff0a] border border-[#00f0ff33] rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] transition-all font-orbitron"
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredCoins.map((coin, index) => {
          const cfg = TREND_CONFIG[coin.trend] || TREND_CONFIG["neutral"];
          const { organic, artificial } = getBotScore(coin.symbol);
          const lifecycle = calculateLifecycle(coin.sentiment, coin.hype);

          return (
            <div 
              key={coin.symbol} 
              className="rounded-2xl border glass border-white/10 shadow-neon p-5 flex flex-col md:flex-row items-center gap-6 group hover:shadow-[0_0_30px_rgba(255,234,0,0.15)] transition-all duration-500"
              style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.02), rgba(0,0,0,0.2)' }}
            >
              
              {/* Asset Info */}
              <div className="flex items-center gap-4 w-full md:w-1/4">
                <span className="text-4xl drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">{coin.emoji}</span>
                <div className="flex flex-col">
                  <span className="font-bold text-white tracking-widest uppercase font-orbitron text-lg group-hover:text-shadow transition-all" style={{ '--tw-text-shadow': `0 0 10px ${cfg.color}` }}>
                    {coin.name}
                  </span>
                  <span className="text-[10px] text-white/40 font-orbitron tracking-widest">{coin.symbol}</span>
                </div>
              </div>

              {/* Bot vs Organic Score */}
              <div className="w-full md:w-2/4 flex flex-col gap-2 border-l border-white/10 pl-6">
                <div className="flex items-center justify-between font-orbitron text-[10px] tracking-widest font-black uppercase">
                  <span className="text-[#00f0ff]">Organic: {organic}%</span>
                  <span className="text-white/40">Bot Activity</span>
                  <span className="text-[#ff00aa]">Artificial: {artificial}%</span>
                </div>
                <div className="h-2 rounded-full flex overflow-hidden border border-white/10 shadow-[0_0_8px_rgba(0,0,0,0.5)]">
                  <div 
                    className="h-full shadow-[0_0_10px_#00f0ff]" 
                    style={{ width: `${organic}%`, background: 'linear-gradient(90deg, #0088ff, #00f0ff)' }} 
                  />
                  <div 
                    className="h-full shadow-[0_0_10px_#ff00aa]" 
                    style={{ width: `${artificial}%`, background: 'linear-gradient(90deg, #aa00ff, #ff00aa)' }} 
                  />
                </div>
              </div>

              {/* Life-Cycle Stage */}
              <div className="w-full md:w-1/4 flex flex-col items-end gap-2 border-l border-white/10 pl-6">
                <span className="text-[9px] text-white/40 font-orbitron tracking-widest uppercase font-bold">Life-Cycle Stage</span>
                <div 
                  className="px-4 py-1.5 rounded border shadow-neon"
                  style={{ 
                    color: lifecycle.color, 
                    borderColor: lifecycle.borderColor, 
                    background: `${lifecycle.color}15`,
                    boxShadow: `0 0 15px ${lifecycle.color}40, inset 0 0 5px ${lifecycle.color}20`
                  }}
                >
                  <span className="text-sm font-black font-orbitron tracking-widest uppercase drop-shadow-[0_0_8px_currentColor]">
                    {lifecycle.stage}
                  </span>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
