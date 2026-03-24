//src/components/Dashboard.jsx
import { useEffect, useState } from "react";
import { fetchCoinData } from "../api/redditApi";
import { COINS } from "../data/coins";
import { MetricCard, TrendStatusCard } from "./MetricCard";
import ChartsSection from "./ChartsSection";
import AlertsPanel from "./AlertsPanel";
import ExplanationBox from "./ExplanationBox";
import CoinListTable from "./CoinListTable";
import GlobalTicker from "./GlobalTicker";

export default function Dashboard({ selectedCoin }) {
  const [realTimeData, setRealTimeData] = useState(null);

  const coinStatic = COINS[selectedCoin] || COINS["DOGE"];

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchCoinData(selectedCoin);
        console.log("FINAL DATA:", result);
        setRealTimeData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    loadData();
  }, [selectedCoin]);

  // ✅ Metrics
  const sentimentScore = realTimeData
    ? Math.round(realTimeData.sentiment_score || 0)
    : coinStatic.sentiment;

  const hypeScore = realTimeData
    ? Math.round(realTimeData.hype_score || 0)
    : coinStatic.hype;

  const pumpProb = realTimeData
    ? Math.round(realTimeData.pump_probability || 0)
    : coinStatic.pumpProb;

  // ✅ Trend logic
  const trend = realTimeData
    ? realTimeData.sentiment_score > 60
      ? "bullish"
      : realTimeData.sentiment_score < 40
        ? "bearish"
        : "neutral"
    : coinStatic.trend;

  // ✅ Alerts
  const alerts = realTimeData?.alerts
    ? realTimeData.alerts.map((a) => ({
      type: a.type,
      msg: a.text,
    }))
    : coinStatic.alerts;

  // ✅ AI Explanation Text
  const explanationText =
    realTimeData?.ai_analysis || coinStatic.explanation;

  return (
    <div className="flex flex-col gap-6 animate-fade-in pb-10">
      
      {/* Ticker at the top */}
      <GlobalTicker />

      {/* Top Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Sentiment Analysis"
          value={sentimentScore}
          suffix="%"
          sub="Live AI Sentiment Score"
          accentColor="#00f0ff"
          icon="🧠"
          delay={0}
        />

        <MetricCard
          title="Hype Index"
          value={hypeScore}
          suffix="%"
          sub="Social Mention Velocity"
          accentColor="#aa00ff"
          icon="🔥"
          delay={100}
        />

        <MetricCard
          title="Risk Analysis"
          value={pumpProb}
          suffix="%"
          sub="Real-Time Pump Risk"
          accentColor="#ff00aa"
          icon="⚡"
          delay={200}
        />

        <TrendStatusCard trend={trend} delay={300} />
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Panel */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <ExplanationBox
            text={explanationText}
            trend={trend}
          />
          <AlertsPanel alerts={alerts} />
        </div>

        {/* Right Panel */}
        <div className="lg:col-span-2">
          <ChartsSection
            coin={{ ...coinStatic, ...realTimeData, trend }}
            liveData={realTimeData}
          />
        </div>

      </div>

      {/* Vast Data Table */}
      <CoinListTable />
    </div>
  );
}