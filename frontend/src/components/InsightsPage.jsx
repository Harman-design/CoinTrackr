import { useEffect, useState } from "react";
import { COINS, TREND_CONFIG } from '../data/coins'
import { fetchCoinData } from "../api/redditApi";

// ─── INSIGHT CARD ─────────────────────────────
function InsightCard({ emoji, title, body, accentColor, tag, delay = 0 }) {
  return (
    <div
      className="rounded-2xl border glass border-white/10 shadow-neon p-6 relative overflow-hidden group hover:scale-[1.02] transition-all duration-500 animate-fade-in-up"
      style={{
        background: 'transparent',
        backdropFilter: 'blur(40px)',
        animationDelay: `${delay}ms`,
        animationFillMode: 'both',
      }}
    >
      <div
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[40px] group-hover:scale-150 transition-transform duration-700"
        style={{ background: accentColor, opacity: 0.15 }}
      />
      <div
        className="absolute bottom-0 left-0 w-full h-[2px] opacity-50 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
      />

      <div className="flex gap-4 relative z-10">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-3xl shadow-[0_0_15px_currentColor]"
          style={{ background: `${accentColor}10`, border: `1px solid ${accentColor}40`, color: accentColor }}
        >
          <span className="drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">{emoji}</span>
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start mb-1">
            <h4 className="text-white font-bold tracking-widest uppercase font-orbitron group-hover:text-shadow transition-all" style={{ '--tw-text-shadow': `0 0 10px ${accentColor}` }}>
              {title}
            </h4>
            <span 
              className="text-[10px] font-black tracking-widest font-orbitron uppercase border px-2 py-0.5 rounded shadow-[0_0_8px_currentColor]" 
              style={{ color: accentColor, borderColor: `${accentColor}50`, background: `${accentColor}10` }}
            >
              {tag}
            </span>
          </div>
          <p className="text-white/60 text-sm leading-relaxed mt-2 font-syne">{body}</p>
        </div>
      </div>
    </div>
  );
}

function CoinSummaryCard({ coinKey, coin, delay = 0 }) {
  const cfg = TREND_CONFIG[coin?.trend] || TREND_CONFIG["neutral"];

  return (
    <div
      className="rounded-2xl border p-6 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500 cursor-default animate-fade-in-up"
      style={{
        borderColor: cfg.colorBorder,
        background: `linear-gradient(135deg, ${cfg.colorDim}, rgba(255,255,255,0.02))`,
        boxShadow: `0 0 20px ${cfg.colorGlow}`,
        animationDelay: `${delay}ms`,
        animationFillMode: 'both',
      }}
    >
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none mix-blend-overlay z-0" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
          <h3 className="text-white font-bold tracking-widest uppercase font-orbitron text-lg">{coin.label}</h3>
          <span className="text-2xl drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">{coin.emoji}</span>
        </div>

        <div className="flex flex-col gap-2 mb-4 font-orbitron tracking-wider text-xs">
          <div className="flex justify-between">
            <span className="text-white/40">AI Score</span>
            <span className="font-bold text-[#00f0ff] drop-shadow-[0_0_5px_#00f0ff]">{coin.sentiment}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/40">Hype Index</span>
            <span className="font-bold text-[#aa00ff] drop-shadow-[0_0_5px_#aa00ff]">{coin.hype}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/40">Risk Profiler</span>
            <span className="font-bold text-[#ff00aa] drop-shadow-[0_0_5px_#ff00aa]">{coin.pumpProb}%</span>
          </div>
        </div>

        <p className="text-xs text-white/50 leading-relaxed font-syne border-t border-white/5 pt-3">
          {coin.explanation?.slice(0, 110)}...
        </p>
      </div>
    </div>
  );
}

export default function InsightsPage() {

  const [liveCoins, setLiveCoins] = useState({});

  // 🔥 FETCH LIVE DATA
  useEffect(() => {
    const loadData = async () => {
      const updated = {};

      for (const key of Object.keys(COINS)) {
        try {
          const data = await fetchCoinData(key);

          updated[key] = {
            ...COINS[key],   // static UI
            ...data,         // live data

            // ✅ map fields like dashboard
            sentiment: Math.round(data?.sentiment_score || COINS[key].sentiment),
            hype: Math.round(data?.hype_score || COINS[key].hype),
            pumpProb: Math.round(data?.pump_probability || COINS[key].pumpProb),

            // ✅ compute trend
            trend:
              data?.sentiment_score > 60
                ? "bullish"
                : data?.sentiment_score < 40
                ? "bearish"
                : "neutral",
          };

        } catch (err) {
          updated[key] = COINS[key];
        }
      }

      setLiveCoins(updated);
    };

    loadData();
  }, []);

  // ✅ use live OR fallback
  const coinsToRender =
    Object.keys(liveCoins).length ? liveCoins : COINS;

  // 🔥 AUTO-GENERATED INSIGHTS
  const insights = Object.entries(coinsToRender).map(([key, coin]) => ({
    emoji: coin.emoji,
    tag: coin.trend.toUpperCase(),
    title: `${coin.label} intelligence`,
    body:
      coin.ai_analysis ||
      `${coin.label} shows an active ${coin.trend} neural sentiment mapping with a global hype velocity of ${coin.hype}. Scanning structural patterns suggests ongoing accumulation cycles.`,
    accentColor: TREND_CONFIG[coin.trend]?.color || "#00f0ff",
  }));

  return (
    <div className="flex flex-col gap-8 animate-fade-in pb-10 mt-5">

      <div className="border-l-4 border-[#aa00ff] pl-4 shadow-[inset_4px_0_10px_rgba(170,0,255,0.2)] py-1">
        <h2 
          className="text-2xl font-black text-white tracking-[0.2em] uppercase font-orbitron"
          style={{ textShadow: '0 0 10px rgba(170,0,255,0.5)' }}
        >
          Neural Insights Center
        </h2>
        <p className="text-xs text-[#aa00ff] mt-2 font-orbitron tracking-widest uppercase opacity-80">
          AI-generated signal synthesis and market predictions
        </p>
      </div>

      {/* 🔥 LIVE COIN SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(coinsToRender).map(([key, coin], i) => (
          <CoinSummaryCard key={key} coinKey={key} coin={coin} delay={i * 150} />
        ))}
      </div>

      {/* 🔥 LIVE INSIGHTS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-2">
        {insights.map((ins, i) => (
          <InsightCard key={i} {...ins} delay={300 + (i * 150)} />
        ))}
      </div>

    </div>
  )
}