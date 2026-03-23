import { useEffect, useState } from "react";
import { fetchCoinData } from "../api/redditApi";

export default function Dashboard({ selectedCoin }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchCoinData(selectedCoin);
      console.log("FINAL DATA:", result); // 🔥 DEBUG
      setData(result);
    };

    loadData();
  }, [selectedCoin]);

  return (
    <div className="text-white">

      <h2 className="text-2xl font-bold mb-6">
        🚀 {selectedCoin} Analysis
      </h2>

      {data && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          <Card title="Sentiment Score" value={`${Math.round(data.sentiment_score)}%`} />
          <Card title="Hype Score" value={`${Math.round(data.hype_score)}%`} />
          <Card title="Pump Probability" value={`${Math.round(data.pump_probability)}%`} />
          <SignalCard signal={data.signal} />

        </div>
      )}

    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
      <h3 className="text-sm text-white/50">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

function SignalCard({ signal }) {
  const color =
    signal.includes("BUY")
      ? "text-green-400"
      : signal.includes("SELL")
      ? "text-red-400"
      : "text-yellow-400";

  return (
    <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
      <h3 className="text-sm text-white/50">Signal</h3>
      <p className={`text-2xl font-bold ${color}`}>{signal}</p>
    </div>
  );
}