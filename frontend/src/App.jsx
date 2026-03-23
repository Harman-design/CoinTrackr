import { useState } from 'react'
import Navbar       from './components/Navbar'
import Sidebar      from './components/Sidebar'
import CoinSelector from './components/CoinSelector'
import Dashboard    from './components/Dashboard'
import TrendsPage   from './components/TrendsPage'
import InsightsPage from './components/InsightsPage'
import { ClockIcon  } from './icons'

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
      className="md:hidden fixed bottom-0 left-0 right-0 border-t border-white/[0.08] z-50 flex"
      style={{
        background:           'rgba(6,8,16,0.95)',
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
            style={{ color: isActive ? '#00ff88' : 'rgba(255,255,255,0.3)' }}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] font-semibold tracking-wide">{label}</span>
            {isActive && (
              <span className="absolute bottom-0 w-8 h-[2px] rounded-full" style={{ background: '#00ff88' }} />
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
    <div className="hidden sm:flex items-center gap-2 text-xs text-white/30 border border-white/[0.08] rounded-full px-3 py-1.5">
      <ClockIcon className="w-3 h-3" />
      Updated {formatted}
    </div>
  )
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [activeNav,    setActiveNav]    = useState('dashboard')
  const [selectedCoin, setSelectedCoin] = useState('DOGE')
  const [collapsed,    setCollapsed]    = useState(false)

  return (
    <div className="relative flex flex-col h-screen overflow-hidden bg-base">

      {/* Ambient background */}
      <div className="fixed inset-0 bg-grid pointer-events-none" />
      <div
        className="fixed top-0 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,255,136,0.055) 0%, transparent 70%)' }}
      />
      <div
        className="fixed bottom-0 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,204,255,0.055) 0%, transparent 70%)' }}
      />
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(255,153,0,0.025) 0%, transparent 70%)' }}
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
