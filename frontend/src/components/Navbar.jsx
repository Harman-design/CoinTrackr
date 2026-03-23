import { LogoIcon, BellIcon } from '../icons'

export default function Navbar() {
  return (
    <header
      className="flex items-center justify-between px-5 py-3 border-b border-white/10 shrink-0 z-50"
      style={{
        background:       'rgba(6,8,16,0.85)',
        backdropFilter:   'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
      }}
    >
      {/* LEFT — Brand */}
      <div className="flex items-center gap-3">
        <LogoIcon size={30} />
        <div>
          <h1
            className="text-[15px] font-black text-white tracking-tight leading-none"
            style={{ fontFamily: "'Orbitron', monospace" }}
          >
            CoinTrackr
          </h1>
          <p className="text-[10px] text-white/35 mt-0.5 tracking-[0.18em] uppercase font-syne">
            Track the Pulse of Crypto Hype
          </p>
        </div>
      </div>

      {/* RIGHT — Status + avatar */}
      <div className="flex items-center gap-2">
        {/* Live badge */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-white/50 bg-white/[0.04] border border-white/10 px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
          Live
        </div>

        {/* Bell */}
        <button className="w-8 h-8 rounded-xl flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/[0.06] transition-all duration-200 relative">
          <BellIcon />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#ff3366]" />
        </button>

        {/* Avatar */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-black shrink-0"
          style={{ background: 'linear-gradient(135deg, #00ff88, #00ccff)' }}
        >
          CT
        </div>
      </div>
    </header>
  )
}
