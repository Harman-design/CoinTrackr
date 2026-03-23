// ─── COIN MOCK DATA ────────────────────────────────────────────────────────────

export const COINS = {
  DOGE: {
    label:      "Dogecoin",
    symbol:     "DOGE",
    emoji:      "🐶",
    sentiment:  84,
    hype:       91,
    pumpProb:   73,
    trend:      "bullish",
    price:      "$0.1842",
    change:     "+12.4%",
    marketCap:  "$26.1B",
    volume24h:  "$3.4B",
    explanation:
      "DOGE is trending due to a rapid surge in social mentions and overwhelmingly positive sentiment. " +
      "Influencer activity on X has spiked 3× in the last 24 hours. On-chain data shows increasing " +
      "wallet activity and a notable drop in exchange supply, suggesting accumulation by long-term holders.",
    alerts: [
      { type: "bullish", msg: "Early spike detected across social channels 🚀" },
      { type: "bullish", msg: "Whale wallet movement: +$4.2M inflow detected 🐋" },
      { type: "neutral", msg: "RSI approaching overbought — monitor closely 👁️" },
    ],
    mentionData: [
      { t: "Mon", mentions: 1200, baseline: 900  },
      { t: "Tue", mentions: 1900, baseline: 920  },
      { t: "Wed", mentions: 1600, baseline: 880  },
      { t: "Thu", mentions: 2800, baseline: 950  },
      { t: "Fri", mentions: 3700, baseline: 1000 },
      { t: "Sat", mentions: 5100, baseline: 1050 },
      { t: "Sun", mentions: 7400, baseline: 1100 },
    ],
    sentimentData: [
      { name: "Positive", value: 61 },
      { name: "Neutral",  value: 23 },
      { name: "Negative", value: 16 },
    ],
    priceHistory: [
      { t: "Mon", price: 0.158 },
      { t: "Tue", price: 0.162 },
      { t: "Wed", price: 0.155 },
      { t: "Thu", price: 0.169 },
      { t: "Fri", price: 0.171 },
      { t: "Sat", price: 0.178 },
      { t: "Sun", price: 0.184 },
    ],
  },

  PEPE: {
    label:      "Pepe",
    symbol:     "PEPE",
    emoji:      "🐸",
    sentiment:  41,
    hype:       38,
    pumpProb:   22,
    trend:      "bearish",
    price:      "$0.00000912",
    change:     "-8.7%",
    marketCap:  "$3.8B",
    volume24h:  "$842M",
    explanation:
      "PEPE is losing momentum following its brief hype cycle. Sentiment turned sharply negative after a " +
      "large holder sold a significant position. Social volume on Reddit and Telegram is declining week-over-week, " +
      "and on-chain fear metrics are elevated. A recovery requires a clear catalyst.",
    alerts: [
      { type: "bearish", msg: "Social volume down 40% — momentum fading ⚠️"         },
      { type: "bearish", msg: "Large holder sell-off detected on-chain 🔴"            },
      { type: "neutral", msg: "Watching for reversal signal near key support zone 👁️" },
    ],
    mentionData: [
      { t: "Mon", mentions: 4200, baseline: 3800 },
      { t: "Tue", mentions: 3800, baseline: 3750 },
      { t: "Wed", mentions: 3100, baseline: 3600 },
      { t: "Thu", mentions: 2600, baseline: 3400 },
      { t: "Fri", mentions: 1900, baseline: 3200 },
      { t: "Sat", mentions: 1400, baseline: 3000 },
      { t: "Sun", mentions: 980,  baseline: 2800 },
    ],
    sentimentData: [
      { name: "Positive", value: 28 },
      { name: "Neutral",  value: 30 },
      { name: "Negative", value: 42 },
    ],
    priceHistory: [
      { t: "Mon", price: 0.0000101 },
      { t: "Tue", price: 0.0000098 },
      { t: "Wed", price: 0.0000096 },
      { t: "Thu", price: 0.0000094 },
      { t: "Fri", price: 0.0000093 },
      { t: "Sat", price: 0.0000091 },
      { t: "Sun", price: 0.0000091 },
    ],
  },

  SHIBA: {
    label:      "Shiba Inu",
    symbol:     "SHIB",
    emoji:      "🐕",
    sentiment:  67,
    hype:       61,
    pumpProb:   48,
    trend:      "neutral",
    price:      "$0.00002341",
    change:     "+1.2%",
    marketCap:  "$13.8B",
    volume24h:  "$1.1B",
    explanation:
      "SHIB is in a consolidation phase with mixed signals from the market. Community engagement remains " +
      "steady across Reddit and Discord. On-chain metrics suggest quiet accumulation at current price levels, " +
      "and the SHIB burn rate increased 18% this week — but no clear breakout catalyst has emerged yet.",
    alerts: [
      { type: "neutral", msg: "Consolidating — watching for breakout above resistance 🔍" },
      { type: "bullish", msg: "Token burn rate increased 18% this week 🔥"               },
      { type: "neutral", msg: "Community activity holding steady on Discord 📊"           },
    ],
    mentionData: [
      { t: "Mon", mentions: 2100, baseline: 2000 },
      { t: "Tue", mentions: 2400, baseline: 2050 },
      { t: "Wed", mentions: 2200, baseline: 2100 },
      { t: "Thu", mentions: 2700, baseline: 2050 },
      { t: "Fri", mentions: 2500, baseline: 2100 },
      { t: "Sat", mentions: 2900, baseline: 2150 },
      { t: "Sun", mentions: 3100, baseline: 2200 },
    ],
    sentimentData: [
      { name: "Positive", value: 44 },
      { name: "Neutral",  value: 33 },
      { name: "Negative", value: 23 },
    ],
    priceHistory: [
      { t: "Mon", price: 0.0000228 },
      { t: "Tue", price: 0.0000231 },
      { t: "Wed", price: 0.0000229 },
      { t: "Thu", price: 0.0000235 },
      { t: "Fri", price: 0.0000233 },
      { t: "Sat", price: 0.0000237 },
      { t: "Sun", price: 0.0000234 },
    ],
  },
}

// ─── TREND CONFIG ──────────────────────────────────────────────────────────────

export const TREND_CONFIG = {
  bullish: {
    color:       "#00f0ff",
    colorDim:    "rgba(0,240,255,0.15)",
    colorBorder: "rgba(0,240,255,0.35)",
    colorGlow:   "rgba(0,240,255,0.12)",
    bgClass:     "bg-[#00f0ff14]",
    borderClass: "border-[#00f0ff55]",
    dotClass:    "bg-[#00f0ff]",
    label:       "Bullish",
    emoji:       "🟢",
  },
  bearish: {
    color:       "#ff00aa",
    colorDim:    "rgba(255,0,170,0.15)",
    colorBorder: "rgba(255,0,170,0.35)",
    colorGlow:   "rgba(255,0,170,0.12)",
    bgClass:     "bg-[#ff00aa14]",
    borderClass: "border-[#ff00aa55]",
    dotClass:    "bg-[#ff00aa]",
    label:       "Bearish",
    emoji:       "🔴",
  },
  neutral: {
    color:       "#aa00ff",
    colorDim:    "rgba(170,0,255,0.15)",
    colorBorder: "rgba(170,0,255,0.35)",
    colorGlow:   "rgba(170,0,255,0.12)",
    bgClass:     "bg-[#aa00ff14]",
    borderClass: "border-[#aa00ff55]",
    dotClass:    "bg-[#aa00ff]",
    label:       "Neutral",
    emoji:       "🟡",
  },
}

// ─── PIE CHART COLORS ──────────────────────────────────────────────────────────

export const PIE_COLORS = ["#00f0ff", "#aa00ff", "#ff00aa"]

// ─── ALERT STYLE MAP ───────────────────────────────────────────────────────────

export const ALERT_STYLE = {
  bullish: {
    border: "border-[#00f0ff55]",
    bg:     "bg-[#00f0ff0a]",
    text:   "text-[#00f0ff]",
    icon:   "🟢",
  },
  bearish: {
    border: "border-[#ff00aa55]",
    bg:     "bg-[#ff00aa0a]",
    text:   "text-[#ff00aa]",
    icon:   "🔴",
  },
  neutral: {
    border: "border-[#aa00ff55]",
    bg:     "bg-[#aa00ff0a]",
    text:   "text-[#aa00ff]",
    icon:   "🟡",
  },
}
