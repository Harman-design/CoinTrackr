const BASE_URL = "http://localhost:8000";

export async function fetchCoinData(coin) {
  try {
    const res = await fetch(`${BASE_URL}/coins/analyze/${coin}`);
    if (!res.ok) throw new Error("API error");

    return await res.json();
  } catch (err) {
    console.error("Fetch error:", err);
    return null;
  }
}