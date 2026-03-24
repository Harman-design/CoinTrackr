import { VAST_COINS } from '../data/vastCoins';
import { TREND_CONFIG } from '../data/coins';
import { useState } from 'react';

export default function CoinListTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: 'marketCap', direction: 'desc' });

  const formatPrice = (price) => {
    if (price < 0.001) return '$' + price.toFixed(8);
    if (price < 1) return '$' + price.toFixed(4);
    return '$' + price.toFixed(2);
  };

  const handleSort = (key) => {
    let direction = 'desc';
    if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

  const parseVal = (val, key) => {
    if (key === 'name' || key === 'symbol' || key === 'trend') {
      return (val || '').toString().toLowerCase();
    }
    if (typeof val === 'number') return val;
    if (typeof val === 'string') {
      const num = parseFloat(val);
      if (val.includes('B')) return num * 1e9;
      if (val.includes('M')) return num * 1e6;
      if (val.includes('K')) return num * 1e3;
      return isNaN(num) ? 0 : num;
    }
    return 0;
  };

  const sortedCoins = [...VAST_COINS].sort((a, b) => {
    const valA = parseVal(a[sortConfig.key], sortConfig.key);
    const valB = parseVal(b[sortConfig.key], sortConfig.key);
    if (valA < valB) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (valA > valB) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  }).filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4 animate-fade-in-up mt-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black text-white tracking-widest uppercase font-orbitron" style={{ textShadow: '0 0 10px rgba(0,240,255,0.5)' }}>
            Market Intelligence
          </h2>
          <p className="text-xs text-white/40 mt-1 uppercase tracking-widest font-orbitron">
            Deep-scan analyzing all tracked assets
          </p>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search assets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[#00f0ff0a] border border-[#00f0ff33] rounded-full px-4 py-1.5 text-sm text-white focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] transition-all font-orbitron"
          />
        </div>
      </div>

      <div className="rounded-2xl border glass border-[#00f0ff]/20 shadow-neon overflow-hidden overflow-x-auto w-full">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-[#050914]/80 backdrop-blur-md border-b border-[#00f0ff]/20 text-[10px] uppercase font-orbitron tracking-widest text-white/50">
              <th className="p-4 cursor-pointer hover:text-[#00f0ff] transition-colors" onClick={() => handleSort('marketCap')}>#</th>
              <th className="p-4 cursor-pointer hover:text-[#00f0ff] transition-colors" onClick={() => handleSort('name')}>Asset</th>
              <th className="p-4 cursor-pointer hover:text-[#00f0ff] transition-colors text-right" onClick={() => handleSort('price')}>Price</th>
              <th className="p-4 cursor-pointer hover:text-[#00f0ff] transition-colors text-right" onClick={() => handleSort('change1h')}>1h %</th>
              <th className="p-4 cursor-pointer hover:text-[#00f0ff] transition-colors text-right" onClick={() => handleSort('change24h')}>24h %</th>
              <th className="p-4 cursor-pointer hover:text-[#00f0ff] transition-colors text-right" onClick={() => handleSort('change7d')}>7d %</th>
              <th className="p-4 cursor-pointer hover:text-[#00f0ff] transition-colors text-right" onClick={() => handleSort('volume')}>24h Vol</th>
              <th className="p-4 cursor-pointer hover:text-[#00f0ff] transition-colors text-right" onClick={() => handleSort('marketCap')}>Market Cap</th>
              <th className="p-4 cursor-pointer hover:text-[#00f0ff] transition-colors text-center" onClick={() => handleSort('sentiment')}>AI Sentiment</th>
              <th className="p-4 cursor-pointer hover:text-[#00f0ff] transition-colors text-center" onClick={() => handleSort('hype')}>Social Hype</th>
              <th className="p-4 text-center">Trend Rank</th>
            </tr>
          </thead>
          <tbody className="text-sm font-syne divide-y divide-white/5">
            {sortedCoins.map((coin, index) => {
              const cfg = TREND_CONFIG[coin.trend] || TREND_CONFIG['neutral'];
              return (
                <tr key={coin.symbol} className="hover:bg-[#00f0ff]/5 transition-colors group">
                  <td className="p-4 text-white/30 font-orbitron text-xs font-bold">{index + 1}</td>
                  <td className="p-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{coin.emoji}</span>
                      <div className="flex flex-col">
                        <span className="font-bold text-white tracking-wide">{coin.name}</span>
                        <span className="text-[10px] text-white/40 font-orbitron">{coin.symbol}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-right font-orbitron tracking-wider text-white">
                    {formatPrice(coin.price)}
                  </td>
                  <td className={`p-4 text-right font-bold ${coin.change1h >= 0 ? 'text-[#00f0ff]' : 'text-[#ff00aa]'}`}>
                    {coin.change1h > 0 ? '+' : ''}{coin.change1h}%
                  </td>
                  <td className={`p-4 text-right font-bold ${coin.change24h >= 0 ? 'text-[#00f0ff]' : 'text-[#ff00aa]'}`}>
                    {coin.change24h > 0 ? '+' : ''}{coin.change24h}%
                  </td>
                  <td className={`p-4 text-right font-bold ${coin.change7d >= 0 ? 'text-[#00f0ff]' : 'text-[#ff00aa]'}`}>
                    {coin.change7d > 0 ? '+' : ''}{coin.change7d}%
                  </td>
                  <td className="p-4 text-right font-orbitron text-white/80">${coin.volume}</td>
                  <td className="p-4 text-right font-orbitron text-white/80">${coin.marketCap}</td>
                  <td className="p-4 text-center">
                    <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded border border-[#00f0ff]/20 bg-[#00f0ff]/5">
                      <span className="text-xs font-bold text-[#00f0ff] font-orbitron">{coin.sentiment}</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded border border-[#aa00ff]/20 bg-[#aa00ff]/5">
                      <span className="text-xs font-bold text-[#aa00ff] font-orbitron">{coin.hype}</span>
                    </div>
                  </td>
                  <td className="p-4 text-center relative group-hover:scale-110 transition-transform">
                    <div 
                      className="inline-flex px-2 py-0.5 rounded text-[10px] font-orbitron uppercase font-bold tracking-widest shadow-[0_0_10px_currentColor]"
                      style={{ color: cfg.color, borderColor: cfg.colorBorder, backgroundColor: cfg.bgClass, border: `1px solid ${cfg.colorBorder}` }}
                    >
                      {cfg.label}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
