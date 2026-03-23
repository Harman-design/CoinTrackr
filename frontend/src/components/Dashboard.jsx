import { useEffect, useState } from "react";
import { fetchCoinData } from "../api/redditApi";
import { COINS } from "../data/coins";
import { MetricCard, TrendStatusCard } from "./MetricCard";
import ChartsSection from "./ChartsSection";
import AlertsPanel from "./AlertsPanel";
import ExplanationBox from "./ExplanationBox";

export default function Dashboard({ selectedCoin }) {
  const [realTimeData, setRealTimeData] = useState(null);
  const coinStatic = COINS[selectedCoin] || COINS["DOGE"];

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchCoinData(selectedCoin);
      console.log("FINAL DATA:", result);
      setRealTimeData(result);
    };

    loadData();
  }, [selectedCoin]);

  // Merge realistic static data with real-time API data if available
  const sentimentScore = realTimeData ? Math.round(realTimeData.sentiment_score || 0) : coinStatic.sentiment;
  const hypeScore = realTimeData ? Math.round(realTimeData.hype_score || 0) : coinStatic.hype;
  const pumpProb = realTimeData ? Math.round(realTimeData.pump_probability || 0) : coinStatic.pumpProb;
  const trend = realTimeData && realTimeData.signal 
                ? (realTimeData.signal.includes("BUY") ? "bullish" : realTimeData.signal.includes("SELL") ? "bearish" : "neutral") 
                : coinStatic.trend;

  // Real-time alerts/risks combination
  const alerts = realTimeData && realTimeData.signal ? [
    { type: trend, msg: `LIVE SIGNAL: ${realTimeData.signal} detected via J.A.R.V.I.S sentiment analysis ⚡` },
    ...coinStatic.alerts
  ] : coinStatic.alerts;

  return (
    <div className="flex flex-col gap-6 animate-fade-in pb-10">
      
      {/* Top Metrics Row */}
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

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Explanations + Alerts (Real Time Risks) */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <ExplanationBox 
            text={realTimeData ? `J.A.R.V.I.S Real-Time Uplink Active. The market is currently showing a ${trend} trend. Risk probability is calculated at ${pumpProb}% based on live social streams. ${coinStatic.explanation}` : coinStatic.explanation} 
            trend={trend} 
          />
          <AlertsPanel alerts={alerts} />
        </div>

        {/* Right Col: Charts (Mention Growth, Sentiment, Price) */}
        <div className="lg:col-span-2">
          {/* We pass coinStatic to ChartsSection as it contains the history datasets */}
          <ChartsSection coin={coinStatic} />
        </div>

      </div>

    </div>
  );
}