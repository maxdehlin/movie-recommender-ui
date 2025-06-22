import { Outlet, useLocation, Link } from 'react-router-dom'
import { useState } from 'react'

function SidebarLayout({ onLogout }) {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigation = [
    { name: 'Home', href: '/home', icon: '🏠' },
    { name: 'Movies', href: '/movies', icon: '🎬' },
  ]

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path)

  return (
    <div className='min-h-screen bg-charcoal flex'>
      {/* Film Strip Background Pattern */}
      <div className='fixed inset-0 opacity-5'>
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, #dc2626 0px, #dc2626 2px, transparent 2px, transparent 20px), repeating-linear-gradient(90deg, #14b8a6 0px, #14b8a6 2px, transparent 2px, transparent 20px)`,
            backgroundSize: '20px 20px',
          }}
        ></div>
      </div>

      {/* Cinematic Grain Overlay */}
      <div className='fixed inset-0 opacity-20 pointer-events-none'>
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(220, 38, 38, 0.1) 0%, transparent 2px)`,
            backgroundSize: '3px 3px',
          }}
        ></div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-charcoal-light/95 backdrop-blur-xl border-r border-gray-600/30 flex flex-col transform transition-transform duration-300 lg:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className='flex items-center space-x-3 p-6 border-b border-gray-600/30'>
          <div className='w-10 h-10 bg-gradient-to-br from-crimson to-crimson-dark rounded-full flex items-center justify-center shadow-xl border-2 border-crimson/20'>
            <span className='text-cream font-bold text-lg'>🎬</span>
          </div>
          <div>
            <h1 className='font-serif text-cream text-xl font-bold tracking-wide'>
              CinemaVault
            </h1>
            <p className='text-muted-gray text-xs font-light tracking-wide'>
              AI-Powered Discovery
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className='flex-1 px-4 py-6 space-y-2'>
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`relative flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-500 hover:scale-105 group overflow-hidden touch-manipulation ${
                isActive(item.href)
                  ? 'bg-gradient-to-r from-teal/20 to-crimson/20 text-cream border border-teal/30 shadow-lg shadow-teal/10'
                  : 'text-muted-gray hover:text-cream hover:bg-charcoal-light/60 backdrop-blur-sm border border-transparent hover:border-gray-600/30'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {/* Film strip perforations */}
              <div className='absolute left-1 top-1/2 w-1 h-1 bg-current opacity-20 rounded-full transform -translate-y-1/2'></div>
              <div className='absolute right-1 top-1/2 w-1 h-1 bg-current opacity-20 rounded-full transform -translate-y-1/2'></div>

              <span className='relative z-10 text-xl group-hover:animate-pulse'>
                {item.icon}
              </span>
              <span className='relative z-10 tracking-wide'>{item.name}</span>

              {/* Hover glow effect */}
              <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000'></div>
            </Link>
          ))}
        </nav>

        {/* User Actions at Bottom */}
        <div className='p-4 space-y-2 border-t border-gray-600/30'>
          <Link
            to='/profile'
            className={`relative flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-500 hover:scale-105 group overflow-hidden touch-manipulation ${
              isActive('/profile')
                ? 'bg-gradient-to-r from-teal/20 to-crimson/20 text-cream border border-teal/30 shadow-lg shadow-teal/10'
                : 'text-muted-gray hover:text-cream hover:bg-charcoal-light/60 backdrop-blur-sm border border-transparent hover:border-gray-600/30'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {/* Film strip perforations */}
            <div className='absolute left-1 top-1/2 w-1 h-1 bg-current opacity-20 rounded-full transform -translate-y-1/2'></div>
            <div className='absolute right-1 top-1/2 w-1 h-1 bg-current opacity-20 rounded-full transform -translate-y-1/2'></div>

            <span className='relative z-10 text-xl group-hover:animate-pulse'>
              👤
            </span>
            <span className='relative z-10 tracking-wide'>Profile</span>

            {/* Hover glow effect */}
            <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000'></div>
          </Link>

          <button
            onClick={onLogout}
            className='relative w-full flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-crimson/20 to-crimson-dark/20 hover:from-crimson/30 hover:to-crimson-dark/30 text-cream border border-crimson/30 hover:border-crimson/50 rounded-xl transition-all duration-500 hover:scale-105 backdrop-blur-sm font-medium text-sm tracking-wide shadow-lg hover:shadow-crimson/20 group overflow-hidden touch-manipulation'
          >
            <span className='relative z-10 text-xl group-hover:animate-pulse'>
              🚪
            </span>
            <span className='relative z-10'>Sign Out</span>

            {/* Hover glow effect */}
            <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000'></div>
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className='fixed inset-0 bg-black/50 z-40 lg:hidden'
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className='lg:hidden fixed top-4 left-4 z-50 p-3 rounded-xl bg-charcoal-light/60 hover:bg-charcoal-light/80 text-muted-gray hover:text-cream transition-all duration-300 border border-gray-600/30'
      >
        <svg
          className={`w-6 h-6 transition-transform duration-300 ${
            isMobileMenuOpen ? 'rotate-90' : ''
          }`}
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          {isMobileMenuOpen ? (
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M6 18L18 6M6 6l12 12'
            />
          ) : (
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16M4 18h16'
            />
          )}
        </svg>
      </button>

      {/* Main Content */}
      <div className='flex-1 lg:ml-64'>
        <main className='relative z-10'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default SidebarLayout
