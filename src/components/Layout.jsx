import { Outlet, useLocation, Link } from 'react-router-dom'
import { useState } from 'react'

function Layout({ onLogout }) {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: '🏠' },
    { name: 'Rate Movies', href: '/rate', icon: '⭐' },
    { name: 'Watchlist', href: '/watchlist', icon: '❤️' },
    { name: 'Profile', href: '/profile', icon: '👤' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <div className='min-h-screen bg-charcoal'>
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

      {/* Header - Cinema Style */}
      <header className='relative z-50 backdrop-blur-xl bg-charcoal-light/90 border-b border-gray-600/30 shadow-2xl'>
        <div className='max-w-7xl mx-auto px-6 lg:px-8'>
          <div className='flex items-center justify-between h-20'>
            {/* Logo with Film Reel Design */}
            <Link to='/dashboard' className='flex items-center space-x-4 group'>
              <div className='relative'>
                <div className='w-12 h-12 bg-gradient-to-br from-crimson to-crimson-dark rounded-full flex items-center justify-center shadow-xl group-hover:shadow-crimson/30 transition-all duration-500 border-2 border-crimson/20 group-hover:border-crimson/40'>
                  <div className='absolute inset-2 rounded-full border border-cream/20'></div>
                  <div className='absolute inset-3 rounded-full border border-cream/10'></div>
                  <span className='text-cream font-bold text-xl relative z-10'>
                    🎬
                  </span>
                </div>
                {/* Film sprocket holes */}
                <div className='absolute -left-1 top-1 w-2 h-2 bg-teal/30 rounded-full animate-pulse'></div>
                <div className='absolute -right-1 bottom-1 w-2 h-2 bg-crimson/30 rounded-full animate-pulse'></div>
              </div>
              <div>
                <h1 className='text-2xl font-serif text-cream tracking-wide font-bold'>
                  CinemaVault
                </h1>
                <p className='text-sm text-muted-gray font-light tracking-wide hidden sm:block'>
                  AI-Powered Discovery
                </p>
              </div>
            </Link>

            {/* Desktop Navigation - Film Strip Style */}
            <nav className='hidden md:flex items-center space-x-2'>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative px-6 py-3 rounded-2xl font-medium text-sm transition-all duration-500 hover:scale-105 group overflow-hidden ${
                    isActive(item.href)
                      ? 'bg-gradient-to-r from-teal/20 to-crimson/20 text-cream border border-teal/30 shadow-xl shadow-teal/10'
                      : 'text-muted-gray hover:text-cream hover:bg-charcoal-light/60 backdrop-blur-sm border border-transparent hover:border-gray-600/30'
                  }`}
                >
                  {/* Film strip perforations */}
                  <div className='absolute left-1 top-1/2 w-1 h-1 bg-current opacity-20 rounded-full transform -translate-y-1/2'></div>
                  <div className='absolute right-1 top-1/2 w-1 h-1 bg-current opacity-20 rounded-full transform -translate-y-1/2'></div>

                  <span className='relative z-10 flex items-center space-x-2'>
                    <span className='text-lg group-hover:animate-pulse'>
                      {item.icon}
                    </span>
                    <span className='tracking-wide'>{item.name}</span>
                  </span>

                  {/* Hover glow effect */}
                  <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000'></div>
                </Link>
              ))}
            </nav>

            {/* User Menu - Crimson Accent */}
            <div className='flex items-center space-x-4'>
              <button
                onClick={onLogout}
                className='relative px-6 py-3 bg-gradient-to-r from-crimson/20 to-crimson-dark/20 hover:from-crimson/30 hover:to-crimson-dark/30 text-cream border border-crimson/30 hover:border-crimson/50 rounded-2xl transition-all duration-500 hover:scale-105 backdrop-blur-sm font-medium text-sm tracking-wide shadow-xl hover:shadow-crimson/20 group overflow-hidden'
              >
                <span className='relative z-10'>Sign Out</span>
                <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000'></div>
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className='md:hidden p-3 rounded-xl bg-charcoal-light/60 hover:bg-charcoal-light/80 text-muted-gray hover:text-cream transition-all duration-300 border border-gray-600/30 hover:border-gray-500/50 backdrop-blur-sm'
              >
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation - Cinema Theme */}
          {isMobileMenuOpen && (
            <div className='md:hidden py-6 border-t border-gray-600/30 animate-fade-in'>
              <nav className='flex flex-col space-y-3'>
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`relative px-6 py-4 rounded-2xl font-medium text-sm transition-all duration-300 group ${
                      isActive(item.href)
                        ? 'bg-gradient-to-r from-teal/20 to-crimson/20 text-cream border border-teal/30 shadow-lg'
                        : 'text-muted-gray hover:text-cream hover:bg-charcoal-light/60 border border-transparent hover:border-gray-600/30'
                    }`}
                  >
                    <div className='flex items-center space-x-3'>
                      <span className='text-xl group-hover:animate-pulse'>
                        {item.icon}
                      </span>
                      <span className='tracking-wide'>{item.name}</span>
                    </div>
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content with Cinematic Depth */}
      <main className='relative z-10'>
        <Outlet />
      </main>

      {/* Ambient Bottom Glow */}
      <div className='fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-crimson/5 via-teal/5 to-transparent pointer-events-none'></div>
    </div>
  )
}

export default Layout
