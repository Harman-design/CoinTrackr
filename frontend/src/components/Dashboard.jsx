//frontend/src/components/Dashboard.jsx
import { useState, useEffect } from "react";
import { TREND_CONFIG } from "../data/coins";
import { MetricCard, TrendStatusCard } from "./MetricCard";
import ChartsSection from "./ChartsSection";
import AlertsPanel from "./AlertsPanel";
import ExplanationBox from "./ExplanationBox";
import StatsBar from "./StatsBar";

import useCoinData from "../hooks/useCoinData";

export default function Dashboard({ selectedCoin }) {
  // ✅ ALL HOOKS FIRST
  const { data, loading } = useCoinData(selectedCoin);

  const [renderKey, setRenderKey] = useState(selectedCoin);

  useEffect(() => {
    setRenderKey(selectedCoin);
  }, [selectedCoin]);

  // ✅ AFTER hooks → conditions
  if (loading) return <div>Loading...</div>;
  if (!data) return <div>Error loading data</div>;

  // 🔥 DERIVED DATA FROM BACKEND

  const sentimentBase = data.sentiment;

  const sentimentData = [
    { name: "Positive", value: Math.round(sentimentBase * 100) },
    { name: "Neutral", value: Math.round((1 - sentimentBase) * 60) },
    { name: "Negative", value: Math.round((1 - sentimentBase) * 40) },
  ];

  const mentionData = Array.from({ length: 7 }, (_, i) => ({
    t: `Day ${i + 1}`,
    mentions: Math.round(data.growth * 1000 * (0.7 + Math.random() * 0.6)),
    baseline: 500,
  }));

  const basePrice = 0.0001;

  const priceHistory = Array.from({ length: 7 }, (_, i) => ({
    t: `Day ${i + 1}`,
    price: basePrice * (1 + data.pump_probability * (i / 10)),
  }));

  // ✅ BEFORE coin object
  const rawSignal = data.signal?.toLowerCase();

  const trend = rawSignal?.includes("bullish")
    ? "bullish"
    : rawSignal?.includes("bearish")
      ? "bearish"
      : "neutral";

  // 🔥 MAP DATA
  const coin = {
    label: selectedCoin,
    symbol: selectedCoin,
    emoji:
      selectedCoin === "DOGE" ? "🐶" : selectedCoin === "PEPE" ? "🐸" : "🚀",

    price: "--",
    change: `${(data.growth * 100).toFixed(1)}%`,

    sentiment: (((data.sentiment + 1) / 2) * 100).toFixed(1),
    hype: data.hype_score.toFixed(2),
    pumpProb: (data.pump_probability * 100).toFixed(1),

    trend: trend,

    alerts: [
      { msg: data.explanation, type: trend }, // ✅ use normalized trend
      { msg: `${data.posts_analysed} posts analysed`, type: "neutral" },
    ],

    explanation: data.explanation,

    sentimentData,
    mentionData,
    priceHistory,

    marketCap: "Derived",
    volume24h: "Derived",
  };

  const cfg = TREND_CONFIG[coin.trend] || TREND_CONFIG["neutral"];

  return (
    <div key={renderKey} className="flex flex-col gap-5">
      {/* ── Page header ───────────────────────────────────────────── */}
      <div
        className="rounded-2xl border border-white/[0.08] px-5 py-4 flex items-center justify-between flex-wrap gap-4 animate-fade-in"
        style={{
          background: `linear-gradient(135deg, ${cfg.colorDim} 0%, rgba(255,255,255,0.02) 100%)`,
          backdropFilter: "blur(20px)",
          borderColor: cfg.colorBorder,
          boxShadow: `0 0 40px ${cfg.colorGlow}`,
        }}
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl">{coin.emoji}</span>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2
                className="text-xl font-black text-white tracking-tight leading-none"
                style={{ fontFamily: "'Orbitron', monospace" }}
              >
                {coin.label}
              </h2>
              <span
                className="text-[11px] px-2.5 py-0.5 rounded-full border font-bold tracking-wide"
                style={{
                  color: cfg.color,
                  borderColor: cfg.colorBorder,
                  background: cfg.colorDim,
                }}
              >
                {coin.symbol}
              </span>
            </div>
            <p className="text-[11px] text-white/35 mt-1">
              Real-time trend prediction dashboard
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p
              className="text-2xl font-black text-white leading-none"
              style={{ fontFamily: "'Orbitron', monospace" }}
            >
              {coin.price}
            </p>
            <p
              className="text-sm font-bold mt-0.5 text-right"
              style={{ color: cfg.color }}
            >
              {coin.change} (24h)
            </p>
          </div>
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl border"
            style={{ borderColor: cfg.colorBorder, background: cfg.colorDim }}
          >
            {cfg.emoji}
          </div>
        </div>
      </div>

      {/* ── Quick stats bar ───────────────────────────────────────── */}
      <StatsBar coin={coin} />

      {/* ── Metric cards ─────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Sentiment Score"
          value={coin.sentiment}
          suffix="%"
          icon="💬"
          accentColor="#00ccff"
          sub="NLP-based social sentiment"
          delay={0}
        />
        <MetricCard
          title="Hype Score"
          value={coin.hype}
          suffix=""
          icon="🔥"
          accentColor="#ff9900"
          sub="Volume-weighted hype index"
          delay={80}
        />
        <MetricCard
          title="Pump Probability"
          value={coin.pumpProb}
          suffix="%"
          icon="🚀"
          accentColor={cfg.color}
          sub="ML-predicted 24h pump chance"
          delay={160}
        />
        <TrendStatusCard trend={coin.trend} delay={240} />
      </div>

      {/* ── Charts ───────────────────────────────────────────────── */}
      <ChartsSection coin={coin} />

      {/* ── Alerts + Explanation ─────────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <AlertsPanel alerts={coin.alerts} />
        <ExplanationBox text={coin.explanation} trend={coin.trend} />
      </div>
    </div>
  );
}
