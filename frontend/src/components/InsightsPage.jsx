import { COINS, TREND_CONFIG } from '../data/coins'

// ─── INSIGHT CARD ─────────────────────────────────────────────────────────────
function InsightCard({ emoji, title, body, accentColor, tag, delay = 0 }) {
  return (
    <div
      className="rounded-2xl border glass border-[#00f0ff]/20 shadow-neon p-5 relative overflow-hidden glass-hover animate-fade-in-up"
      style={{
        background:           'transparent',
        backdropFilter:       'blur(40px)',
        animationDelay:       `${delay}ms`,
        animationFillMode:    'both',
      }}
    >
      <div
        className="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-3xl pointer-events-none"
        style={{ background: accentColor, opacity: 0.12 }}
      />
      <div className="absolute top-0 left-0 h-[2px] w-full" style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }} />

      <div className="flex items-start gap-3 relative z-10">
        <div
          className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xl"
          style={{ background: `${accentColor}18`, border: `1px solid ${accentColor}44` }}
        >
          {emoji}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1.5">
            <h4 className="text-sm font-bold text-white">{title}</h4>
            <span
              className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
              style={{ color: accentColor, background: `${accentColor}18`, border: `1px solid ${accentColor}33` }}
            >
              {tag}
            </span>
          </div>
          <p className="text-[13px] text-white/55 leading-relaxed">{body}</p>
        </div>
      </div>
    </div>
  )
}

// ─── COIN SUMMARY CARD ────────────────────────────────────────────────────────
function CoinSummaryCard({ coinKey, coin, delay = 0 }) {
  const cfg = TREND_CONFIG[coin.trend]

  return (
    <div
      className="rounded-2xl border p-5 relative overflow-hidden glass-hover animate-fade-in-up"
      style={{
        borderColor:       cfg.colorBorder,
        background:        `linear-gradient(135deg, ${cfg.colorDim} 0%, rgba(255,255,255,0.02) 100%)`,
        backdropFilter:    'blur(40px)',
        boxShadow:         `0 0 32px ${cfg.colorGlow}`,
        animationDelay:    `${delay}ms`,
        animationFillMode: 'both',
      }}
    >
      <div className="absolute -bottom-8 -right-8 w-28 h-28 rounded-full blur-3xl" style={{ background: cfg.color, opacity: 0.1 }} />

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{coin.emoji}</span>
          <div>
            <p className="text-sm font-bold text-white">{coin.label}</p>
            <p className="text-[11px] text-white/40">{coinKey}</p>
          </div>
        </div>
        <div
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-bold"
          style={{ color: cfg.color, borderColor: cfg.colorBorder, background: cfg.colorDim }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: cfg.color }} />
          {cfg.label}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Sentiment', val: coin.sentiment, suf: '%' },
          { label: 'Hype',      val: coin.hype,      suf: ''  },
          { label: 'Pump %',    val: coin.pumpProb,  suf: '%' },
        ].map(({ label, val, suf }) => (
          <div key={label} className="text-center">
            <p
              className="text-xl font-black"
              style={{ color: cfg.color, fontFamily: "'Orbitron', monospace" }}
            >
              {val}{suf}
            </p>
            <p className="text-[10px] text-white/35 mt-0.5 tracking-wider uppercase">{label}</p>
          </div>
        ))}
      </div>

      <p className="mt-4 text-[12px] text-white/50 leading-relaxed border-t border-white/[0.07] pt-4">
        {coin.explanation.slice(0, 120)}…
      </p>
    </div>
  )
}

// ─── EXPORT ───────────────────────────────────────────────────────────────────
export default function InsightsPage() {
  const insights = [
    {
      emoji: '🚀', tag: 'Opportunity',
      title: 'DOGE shows early accumulation pattern',
      body:  'On-chain data indicates long-term holders are accumulating DOGE at current prices. Exchange outflows have increased 22% in the last 48 hours, a historically bullish signal.',
      accentColor: '#00f0ff',
    },
    {
      emoji: '⚠️', tag: 'Warning',
      title: 'PEPE experiencing social cooldown',
      body:  'Post-hype fatigue is setting in for PEPE. Social mentions have declined 40% from the peak. Historically, meme coins in this phase see further correction before potential recovery.',
      accentColor: '#ff00aa',
    },
    {
      emoji: '🔥', tag: 'Signal',
      title: 'SHIB burn rate accelerating',
      body:  'The Shiba Inu ecosystem burned 18% more tokens this week compared to last. Sustained burn rate increases often precede price appreciation as circulating supply tightens.',
      accentColor: '#aa00ff',
    },
    {
      emoji: '🧠', tag: 'AI Prediction',
      title: 'Cross-coin sentiment divergence detected',
      body:  'Our NLP model detects an unusually wide sentiment gap between DOGE (+84) and PEPE (+41). This divergence historically resolves within 5–7 days as capital rotates between meme assets.',
      accentColor: '#0088ff',
    },
    {
      emoji: '📊', tag: 'Macro',
      title: 'Meme coin sector volume up 34%',
      body:  'Total meme coin trading volume rose 34% week-over-week, outperforming the broader crypto market. Retail interest, measured by Google Trends data, is at a 6-month high.',
      accentColor: '#0088ff',
    },
    {
      emoji: '🔗', tag: 'On-Chain',
      title: 'Whale wallets quietly accumulating DOGE',
      body:  'Three wallets holding over 10M DOGE each have increased their positions in the last 72 hours. This type of quiet accumulation by large holders often precedes retail FOMO.',
      accentColor: '#00f0ff',
    },
  ]

  return (
    <div className="flex flex-col gap-5 animate-fade-in">
      <div>
        <h2
          className="text-xl font-black text-white tracking-tight"
          style={{ fontFamily: "'Orbitron', monospace" }}
        >
          Insights
        </h2>
        <p className="text-xs text-white/35 mt-1">AI-generated signals and market intelligence</p>
      </div>

      {/* Coin summary row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {Object.entries(COINS).map(([key, coin], i) => (
          <CoinSummaryCard key={key} coinKey={key} coin={coin} delay={i * 80} />
        ))}
      </div>

      {/* Insight cards */}
      <div>
        <h3 className="text-xs font-semibold tracking-[0.18em] uppercase text-white/35 mb-4">
          Latest Signals
        </h3>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {insights.map((ins, i) => (
            <InsightCard key={i} {...ins} delay={i * 70} />
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="rounded-2xl border border-white/[0.07] px-5 py-4 flex items-start gap-3" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <span className="text-lg shrink-0 mt-0.5">⚠️</span>
        <p className="text-[12px] text-white/30 leading-relaxed">
          <strong className="text-white/50">Disclaimer:</strong> CoinTrackr predictions are generated by AI models trained on social sentiment and on-chain data.
          They are for informational purposes only and do not constitute financial advice. Always do your own research before making any investment decisions.
        </p>
      </div>
    </div>
  )
}
