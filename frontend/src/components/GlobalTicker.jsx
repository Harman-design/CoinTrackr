export default function GlobalTicker() {
  return (
    <div className="w-full bg-[#00f0ff]/5 border-y border-[#00f0ff]/20 py-2 overflow-hidden flex relative items-center mb-6">
      <div className="absolute left-0 w-8 h-full bg-gradient-to-r from-[#050914] to-transparent z-10" />
      <div className="absolute right-0 w-8 h-full bg-gradient-to-l from-[#050914] to-transparent z-10" />
      
      <div className="flex animate-[shimmer_20s_linear_infinite] whitespace-nowrap text-xs font-orbitron tracking-widest text-white/50" style={{ animation: 'ticker 30s linear infinite' }}>
        <span className="mx-4"><span className="text-[#00f0ff] font-bold">SYS_STATUS:</span> ONLINE</span>
        <span className="mx-4 text-white/20">|</span>
        <span className="mx-4"><span className="text-[#aa00ff] font-bold">ASSETS_TRACKED:</span> 5,241</span>
        <span className="mx-4 text-white/20">|</span>
        <span className="mx-4"><span className="text-[#ff00aa] font-bold">24H_GLOBAL_VOL:</span> $14.2B</span>
        <span className="mx-4 text-white/20">|</span>
        <span className="mx-4"><span className="text-[#00f0ff] font-bold">MEME_DOMINANCE:</span> 4.2%</span>
        <span className="mx-4 text-white/20">|</span>
        <span className="mx-4"><span className="text-[#aa00ff] font-bold">GLOBAL_SENTIMENT:</span> EXTREME GREED</span>
        <span className="mx-4 text-white/20">|</span>
        <span className="mx-4"><span className="text-white font-bold">LAST_SCAN:</span> {new Date().toLocaleTimeString()}</span>
        <span className="mx-4 text-white/20">|</span>
        {/* DUPLICATE FOR SEAMLESS LOOP */}
        <span className="mx-4"><span className="text-[#00f0ff] font-bold">SYS_STATUS:</span> ONLINE</span>
        <span className="mx-4 text-white/20">|</span>
        <span className="mx-4"><span className="text-[#aa00ff] font-bold">ASSETS_TRACKED:</span> 5,241</span>
        <span className="mx-4 text-white/20">|</span>
        <span className="mx-4"><span className="text-[#ff00aa] font-bold">24H_GLOBAL_VOL:</span> $14.2B</span>
        <span className="mx-4 text-white/20">|</span>
        <span className="mx-4"><span className="text-[#00f0ff] font-bold">MEME_DOMINANCE:</span> 4.2%</span>
        <span className="mx-4 text-white/20">|</span>
        <span className="mx-4"><span className="text-[#aa00ff] font-bold">GLOBAL_SENTIMENT:</span> EXTREME GREED</span>
        <span className="mx-4 text-white/20">|</span>
        <span className="mx-4"><span className="text-white font-bold">LAST_SCAN:</span> {new Date().toLocaleTimeString()}</span>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </div>
  );
}
