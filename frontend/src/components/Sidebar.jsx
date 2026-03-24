import { DashboardIcon, TrendsIcon, InsightsIcon, DetectorIcon, ChevronLeftIcon, ChevronRightIcon } from '../icons'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', Icon: DashboardIcon },
  { id: 'trends',    label: 'Trends',    Icon: TrendsIcon    },
  { id: 'insights',  label: 'Insights',  Icon: InsightsIcon  },
  { id: 'detector',  label: 'Detector',  Icon: DetectorIcon  },
]

export default function Sidebar({ active, setActive, collapsed, setCollapsed }) {
  return (
    <aside
      className="hidden md:flex flex-col shrink-0 border-r border-white/[0.07] transition-all duration-300 ease-in-out overflow-hidden"
      style={{
        width:            collapsed ? 60 : 196,
        background:       'rgba(255,255,255,0.02)',
        backdropFilter:   'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
      }}
    >
      {/* Collapse toggle */}
      <div className={`flex ${collapsed ? 'justify-center' : 'justify-end'} pt-5 px-3 pb-4`}>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-white/25 hover:text-white/60 hover:bg-white/[0.07] transition-all duration-200"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRightIcon className="w-3.5 h-3.5" /> : <ChevronLeftIcon className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-1 px-2 flex-1">
        {NAV_ITEMS.map(({ id, label, Icon }) => {
          const isActive = active === id

          return (
            <button
              key={id}
              onClick={() => setActive(id)}
              title={collapsed ? label : undefined}
              className={`
                relative flex items-center gap-3 rounded-xl text-sm font-semibold
                transition-all duration-200 group overflow-hidden
                ${collapsed ? 'justify-center px-0 py-2.5' : 'px-3 py-2.5'}
                ${isActive
                  ? 'text-white'
                  : 'text-white/35 hover:text-white/70 hover:bg-white/[0.05]'
                }
              `}
              style={isActive ? {
                background: 'linear-gradient(135deg, rgba(0,240,255,0.14) 0%, rgba(0,136,255,0.07) 100%)',
                boxShadow:  'inset 0 1px 0 rgba(255,255,255,0.08)',
              } : {}}
            >
              {/* Active left bar */}
              {isActive && (
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full"
                  style={{ background: 'linear-gradient(180deg, #00f0ff, #0088ff)' }}
                />
              )}

              {/* Hover glow */}
              {isActive && (
                <span
                  className="absolute inset-0 opacity-20 rounded-xl pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse at left center, #00f0ff 0%, transparent 70%)' }}
                />
              )}

              <Icon className="w-4 h-4 shrink-0" />

              {!collapsed && (
                <span className="truncate">{label}</span>
              )}

              {/* Active dot for collapsed */}
              {isActive && collapsed && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#00f0ff]" />
              )}
            </button>
          )
        })}
      </nav>

      {/* Bottom hint */}
      {!collapsed && (
        <div className="px-4 pb-5 mt-auto">
          <div className="rounded-xl border border-white/[0.07] p-3 bg-white/[0.02]">
            <p className="text-[10px] text-white/30 leading-relaxed">
              AI-powered predictions. Not financial advice.
            </p>
          </div>
        </div>
      )}
    </aside>
  )
}
