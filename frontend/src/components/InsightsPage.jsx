import { useEffect, useState } from "react";
import { COINS, TREND_CONFIG } from '../data/coins'
import { fetchCoinData } from "../api/redditApi";

// ─── INSIGHT CARD ─────────────────────────────
function InsightCard({ emoji, title, body, accentColor, tag, delay = 0 }) {
  return (
    <div
      className="rounded-2xl border glass border-[#00f0ff]/20 shadow-neon p-5 relative overflow-hidden glass-hover animate-fade-in-up"
      style={{
        background: 'transparent',
        backdropFilter: 'blur(40px)',
        animationDelay: `${delay}ms`,
        animationFillMode: 'both',
      }}
    >
      <div
        className="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-3xl"
        style={{ background: accentColor, opacity: 0.12 }}
      />

      <div className="flex gap-3 relative z-10">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
          style={{ background: `${accentColor}18`, border: `1px solid ${accentColor}44` }}
        >
          {emoji}
        </div>

        <div>
          <h4 className="text-white font-bold">{title}</h4>
          <p className="text-white/55 text-sm">{body}</p>
          <span style={{ color: accentColor }}>{tag}</span>
        </div>
      </div>
    </div>
  );
}
function CoinSummaryCard({ coinKey, coin, delay = 0 }) {
  const cfg = TREND_CONFIG[coin?.trend] || TREND_CONFIG["neutral"];

  return (
    <div
      className="rounded-2xl border p-5 glass-hover"
      style={{
        borderColor: cfg.colorBorder,
        background: `linear-gradient(135deg, ${cfg.colorDim}, rgba(255,255,255,0.02))`,
        boxShadow: `0 0 20px ${cfg.colorGlow}`,
      }}
    >
      <h3 className="text-white font-bold">{coin.label}</h3>

      <div className="text-sm text-white/60 mt-2">
        <p>Sentiment: {coin.sentiment}%</p>
        <p>Hype: {coin.hype}</p>
        <p>Pump: {coin.pumpProb}%</p>
      </div>

      <p className="text-xs text-white/40 mt-3">
        {coin.explanation?.slice(0, 100)}
      </p>
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
    title: `${coin.label} is ${coin.trend}`,
    body:
      coin.ai_analysis ||
      `${coin.label} shows ${coin.trend} sentiment with hype ${coin.hype}.`,
    accentColor: TREND_CONFIG[coin.trend]?.color || "#00f0ff",
  }));

  return (
    <div className="flex flex-col gap-5 animate-fade-in">

      <div>
        <h2 className="text-xl font-black text-white">Insights</h2>
        <p className="text-xs text-white/35">
          AI-generated signals
        </p>
      </div>

      {/* 🔥 LIVE COIN SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {Object.entries(coinsToRender).map(([key, coin], i) => (
          <CoinSummaryCard key={key} coinKey={key} coin={coin} delay={i * 80} />
        ))}
      </div>

      {/* 🔥 LIVE INSIGHTS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {insights.map((ins, i) => (
          <InsightCard key={i} {...ins} delay={i * 70} />
        ))}
      </div>

    </div>
  )
}