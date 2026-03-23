import { useState } from 'react'

export default function AuthPage({ onLogin, initialIsLogin = false }) {
  const [isLogin, setIsLogin] = useState(initialIsLogin)

  const handleSubmit = (e) => {
    e.preventDefault()
    onLogin()
  }

  return (
    <div className="min-h-screen bg-base flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid pointer-events-none" />
      <div 
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none" 
        style={{ background: 'radial-gradient(circle, rgba(0,240,255,0.08) 0%, transparent 70%)' }} 
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none" 
        style={{ background: 'radial-gradient(circle, rgba(0,136,255,0.06) 0%, transparent 70%)' }} 
      />
      
      <div className="glass rounded-3xl w-full max-w-md p-8 relative z-10 animate-fade-in-up">
        <div className="text-center mb-8">
          <div 
            className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center neon-border-green" 
            style={{ background: 'rgba(0,240,255,0.1)' }}
          >
             <span className="text-3xl">⚡</span>
          </div>
          <h1 className="text-2xl font-bold font-orbitron text-white">CoinTrackr</h1>
          <p className="text-sm text-white/50 mt-1">
            {isLogin ? 'Welcome back, trader.' : 'Join the pulse of the market.'}
          </p>
        </div>

        <div className="flex bg-white/5 rounded-full p-1 mb-8">
          <button 
            type="button"
            className={`flex-1 py-2 text-sm font-semibold rounded-full transition-all ${isLogin ? 'bg-bullish text-base' : 'text-white/60 hover:text-white'}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button 
            type="button"
            className={`flex-1 py-2 text-sm font-semibold rounded-full transition-all ${!isLogin ? 'bg-bullish text-base' : 'text-white/60 hover:text-white'}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-semibold text-white/60 mb-1 ml-1" htmlFor="name">
                Name
              </label>
              <input 
                required
                id="name"
                type="text" 
                placeholder="John Doe"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-bullish focus:ring-1 focus:ring-bullish transition-all"
              />
            </div>
          )}
          
          <div>
            <label className="block text-xs font-semibold text-white/60 mb-1 ml-1" htmlFor="contact">
              Mobile or Email ID
            </label>
            <input 
              required
              id="contact"
              type="text" 
              placeholder={isLogin ? "user@example.com" : "you@crypto.net or +1234..."}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-bullish focus:ring-1 focus:ring-bullish transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/60 mb-1 ml-1" htmlFor="pass">
              Password
            </label>
            <input 
              required
              id="pass"
              type="password" 
              placeholder="••••••••"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-bullish focus:ring-1 focus:ring-bullish transition-all"
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-3 mt-4 rounded-xl bg-bullish text-base font-bold text-sm tracking-wide hover:shadow-neon transition-all hover:scale-[1.02]"
          >
            {isLogin ? 'Enter Dashboard' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  )
}
