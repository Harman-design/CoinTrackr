import { useState, useEffect } from "react";

const BASE_URL = "http://localhost:8000";

export default function useCoinData(selectedCoin) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch(`${BASE_URL}/coins/analyze/${selectedCoin}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("API error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();

    const interval = setInterval(fetchData, 5000); // auto refresh
    return () => clearInterval(interval);

  }, [selectedCoin]);

  return { data, loading };
}