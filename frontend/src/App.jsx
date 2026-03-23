import { useState, useEffect } from 'react'
import Navbar       from './components/Navbar'
import Sidebar      from './components/Sidebar'
import CoinSelector from './components/CoinSelector'
import Dashboard    from './components/Dashboard'
import TrendsPage   from './components/TrendsPage'
import InsightsPage from './components/InsightsPage'
import AuthPage     from './components/AuthPage'
import LunaticCrash from './components/LunaticCrash'
import { ClockIcon  } from './icons'

function SplashScreen() {
  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#010502] overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none" 
        style={{ background: 'radial-gradient(circle, rgba(0,240,255,0.15) 0%, transparent 60%)', animation: 'pulse-slow 3s infinite' }} 
      />
      
      <div className="relative text-center animate-fade-in-up z-10" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
        <div className="relative inline-block mb-8" style={{ animation: 'float 3s ease-in-out infinite' }}>
          <div 
            className="w-32 h-32 rounded-[2rem] mx-auto flex items-center justify-center glass" 
            style={{ 
              boxShadow: '0 0 50px rgba(0,240,255,0.4), inset 0 0 20px rgba(0,240,255,0.5)',
              border: '2px solid rgba(0,240,255,0.6)'
            }}
          >
            <span className="text-3xl font-orbitron font-black text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #fff, #00f0ff)' }}>
              CTRKR
            </span>
          </div>
        </div>
        <h1 
          className="text-4xl sm:text-5xl font-black font-orbitron text-white tracking-[0.2em] uppercase mb-4" 
          style={{ textShadow: '0 0 30px rgba(0,240,255,0.8), 0 0 10px rgba(0,240,255,0.5)' }}
        >
          COINTRACKR
        </h1>
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-1.5 h-1 items-end justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-bounce" style={{ animationDelay: '0s' }} />
            <div className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-bounce" style={{ animationDelay: '0.15s' }} />
            <div className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-bounce" style={{ animationDelay: '0.3s' }} />
          </div>
          <p className="text-[#00f0ff] font-orbitron tracking-[0.3em] text-xs uppercase opacity-80 mt-2">
            Predicting Crypto Trends Through Social Intelligence
          </p>
        </div>
      </div>
    </div>  
  )
}

// ─── MOBILE NAV BAR (bottom) ──────────────────────────────────────────────────
import { DashboardIcon, TrendsIcon, InsightsIcon } from './icons'

const MOBILE_NAV = [
  { id: 'dashboard', label: 'Dashboard', Icon: DashboardIcon },
  { id: 'trends',    label: 'Trends',    Icon: TrendsIcon    },
  { id: 'insights',  label: 'Insights',  Icon: InsightsIcon  },
]

function MobileBottomNav({ active, setActive }) {
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 border-t glass border-[#00f0ff]/20 shadow-neon z-50 flex"
      style={{
        background:           'rgba(5,9,20,0.95)',
        backdropFilter:       'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
      }}
    >
      {MOBILE_NAV.map(({ id, label, Icon }) => {
        const isActive = active === id
        return (
          <button
            key={id}
            onClick={() => setActive(id)}
            className="flex-1 flex flex-col items-center gap-1 py-3 transition-all duration-200"
            style={{ color: isActive ? '#00f0ff' : 'rgba(255,255,255,0.3)' }}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] font-semibold tracking-wide">{label}</span>
            {isActive && (
              <span className="absolute bottom-0 w-8 h-[2px] rounded-full" style={{ background: '#00f0ff' }} />
            )}
          </button>
        )
      })}
    </nav>
  )
}

// ─── TIME DISPLAY ─────────────────────────────────────────────────────────────
function TimeStamp() {
  const now = new Date()
  const formatted = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  return (
    <div className="hidden sm:flex items-center gap-2 text-xs text-white/30 border glass border-[#00f0ff]/20 shadow-neon rounded-full px-3 py-1.5">
      <ClockIcon className="w-3 h-3" />
      Updated {formatted}
    </div>
  )
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [activeNav,      setActiveNav]      = useState('dashboard')
  const [selectedCoin,   setSelectedCoin]   = useState('DOGE')
  const [collapsed,      setCollapsed]      = useState(false)
  const [isLoggedIn,     setIsLoggedIn]     = useState(false)
  const [showSplash,     setShowSplash]     = useState(true)
  const [hasSeenLunatic, setHasSeenLunatic] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  if (showSplash) {
    return <SplashScreen />
  }

  if (!isLoggedIn) {
    return <AuthPage onLogin={() => setIsLoggedIn(true)} initialIsLogin={false} />
  }

  if (isLoggedIn && !hasSeenLunatic) {
    return <LunaticCrash onContinue={() => setHasSeenLunatic(true)} />
  }

  return (
    <div className="relative flex flex-col h-screen overflow-hidden bg-base">

      {/* Ambient background */}
      <div className="fixed inset-0 bg-grid pointer-events-none" />
      <div
        className="fixed top-0 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,240,255,0.08) 0%, transparent 70%)' }}
      />
      <div
        className="fixed bottom-0 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(170,0,255,0.06) 0%, transparent 70%)' }}
      />
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,136,255,0.04) 0%, transparent 70%)' }}
      />

      {/* Navbar */}
      <Navbar />

      {/* Body */}
      <div className="relative flex flex-1 overflow-hidden z-10">

        {/* Sidebar (desktop) */}
        <Sidebar
          active={activeNav}
          setActive={setActiveNav}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto pb-20 md:pb-6">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-5 pt-5">

            {/* Top toolbar — only shown for Dashboard */}
            {activeNav === 'dashboard' && (
              <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
                <CoinSelector
                  selected={selectedCoin}
                  setSelected={setSelectedCoin}
                />
                <TimeStamp />
              </div>
            )}

            {/* Page content */}
            {activeNav === 'dashboard' && (
              <Dashboard selectedCoin={selectedCoin} />
            )}
            {activeNav === 'trends' && <TrendsPage />}
            {activeNav === 'insights' && <InsightsPage />}

          </div>
        </main>
      </div>

      {/* Mobile bottom nav */}
      <MobileBottomNav active={activeNav} setActive={setActiveNav} />
    </div>
  )
}
