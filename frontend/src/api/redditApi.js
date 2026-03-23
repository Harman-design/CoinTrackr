const BASE_URL = "http://127.0.0.1:8000";

export const fetchCoinData = async (coin) => {
  try {
    const res = await fetch(
      `${BASE_URL}/reddit?coin=${coin.toLowerCase()}`
    );

    const data = await res.json();
    console.log("API RESPONSE:", data); // 🔥 DEBUG

    return data;
  } catch (err) {
    console.error("API Error:", err);
    return null;
  }
};