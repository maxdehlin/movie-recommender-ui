import { Outlet, useLocation, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Layout({ onLogout }) {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const navigation = [
    { name: 'Home', href: '/home', icon: '🏠' },
    { name: 'Rate Movies', href: '/rate', icon: '⭐' },
    { name: 'Watchlist', href: '/watchlist', icon: '❤️' },
    { name: 'Profile', href: '/profile', icon: '👤' },
  ]

  const isActive = (path) => location.pathname === path

  // Handle scroll for sticky header effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  return (
    <div className='min-h-screen bg-gray-900'>
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

      {/* Enhanced Header - Cinema Style with Mobile Optimization */}
      <header
        className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${
          isScrolled
            ? 'backdrop-blur-xl bg-gray-800/95 border-b border-gray-600/50 shadow-2xl py-2'
            : 'backdrop-blur-xl bg-gray-800/90 border-b border-gray-600/30 shadow-2xl py-4'
        }
      `}
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            {/* Logo - Mobile Optimized */}
            <Link
              to='/home'
              className='flex items-center space-x-3 group flex-shrink-0'
            >
              <div className='relative'>
                <div
                  className={`
                  ${isScrolled ? 'w-10 h-10' : 'w-12 h-12'} 
                  bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center 
                  shadow-xl group-hover:shadow-red-600/30 transition-all duration-500 
                  border-2 border-red-600/20 group-hover:border-red-600/40
                  touch-manipulation
                `}
                >
                  <span
                    className={`text-gray-50 font-bold relative z-10 ${
                      isScrolled ? 'text-lg' : 'text-xl'
                    }`}
                  >
                    🎬
                  </span>
                </div>
              </div>
              <div className='hidden sm:block'>
                <h1
                  className={`font-serif text-gray-50 tracking-wide font-bold transition-all duration-300 ${
                    isScrolled ? 'text-xl' : 'text-2xl'
                  }`}
                >
                  CinemaVault
                </h1>
                <p
                  className={`text-gray-400 font-light tracking-wide transition-all duration-300 ${
                    isScrolled ? 'text-xs' : 'text-sm'
                  }`}
                >
                  AI-Powered Discovery
                </p>
              </div>
            </Link>

            {/* Desktop Navigation - Film Strip Style */}
            <nav className='hidden lg:flex items-center space-x-1'>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative px-4 py-2 rounded-xl font-medium text-sm transition-all duration-500 hover:scale-105 group overflow-hidden touch-manipulation ${
                    isActive(item.href)
                      ? 'bg-gradient-to-r from-teal-500/20 to-red-600/20 text-gray-50 border border-teal-500/30 shadow-lg shadow-teal-500/10'
                      : 'text-gray-400 hover:text-gray-50 hover:bg-gray-800/60 backdrop-blur-sm border border-transparent hover:border-gray-600/30'
                  }`}
                >
                  {/* Film strip perforations */}
                  <div className='absolute left-1 top-1/2 w-1 h-1 bg-current opacity-20 rounded-full transform -translate-y-1/2'></div>
                  <div className='absolute right-1 top-1/2 w-1 h-1 bg-current opacity-20 rounded-full transform -translate-y-1/2'></div>

                  <span className='relative z-10 flex items-center space-x-2'>
                    <span className='text-base group-hover:animate-pulse'>
                      {item.icon}
                    </span>
                    <span className='tracking-wide hidden xl:inline'>
                      {item.name}
                    </span>
                  </span>

                  {/* Hover glow effect */}
                  <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000'></div>
                </Link>
              ))}
            </nav>

            {/* Mobile Navigation Pills - Visible on tablet */}
            <nav className='hidden md:flex lg:hidden items-center space-x-1'>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative p-3 rounded-xl font-medium text-sm transition-all duration-500 hover:scale-105 group overflow-hidden touch-manipulation ${
                    isActive(item.href)
                      ? 'bg-gradient-to-r from-teal-500/20 to-red-600/20 text-gray-50 border border-teal-500/30 shadow-lg shadow-teal-500/10'
                      : 'text-gray-400 hover:text-gray-50 hover:bg-gray-800/60 backdrop-blur-sm border border-transparent hover:border-gray-600/30'
                  }`}
                >
                  <span className='text-lg group-hover:animate-pulse'>
                    {item.icon}
                  </span>
                </Link>
              ))}
            </nav>

            {/* User Actions */}
            <div className='flex items-center space-x-3'>
              <button
                onClick={onLogout}
                className='hidden sm:block relative px-4 py-2 bg-gradient-to-r from-red-600/20 to-red-700/20 hover:from-red-600/30 hover:to-red-700/30 text-gray-50 border border-red-600/30 hover:border-red-600/50 rounded-xl transition-all duration-500 hover:scale-105 backdrop-blur-sm font-medium text-sm tracking-wide shadow-lg hover:shadow-red-600/20 group overflow-hidden touch-manipulation'
              >
                <span className='relative z-10'>Sign Out</span>
                <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000'></div>
              </button>

              {/* Mobile menu button - Enhanced */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className='md:hidden p-3 rounded-xl bg-gray-800/60 hover:bg-gray-800/80 text-gray-400 hover:text-gray-50 transition-all duration-300 border border-gray-600/30 hover:border-gray-500/50 backdrop-blur-sm touch-manipulation active:scale-95'
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
            </div>
          </div>

          {/* Enhanced Mobile Navigation - Bottom Sheet Style */}
          {isMobileMenuOpen && (
            <div className='md:hidden mt-4 pb-6 border-t border-gray-600/30 animate-fade-in-up'>
              <nav className='flex flex-col space-y-2 mt-4'>
                {navigation.map((item, index) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`relative px-6 py-4 rounded-2xl font-medium text-base transition-all duration-300 group touch-manipulation active:scale-95 opacity-0 animate-slide-in-right ${
                      isActive(item.href)
                        ? 'bg-gradient-to-r from-teal-500/20 to-red-600/20 text-gray-50 border border-teal-500/30 shadow-lg'
                        : 'text-gray-400 hover:text-gray-50 hover:bg-gray-800/60 border border-transparent hover:border-gray-600/30'
                    }`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: 'forwards',
                    }}
                  >
                    <div className='flex items-center space-x-4'>
                      <span className='text-2xl group-hover:animate-pulse'>
                        {item.icon}
                      </span>
                      <span className='tracking-wide font-medium'>
                        {item.name}
                      </span>
                    </div>
                  </Link>
                ))}

                {/* Mobile Sign Out */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    onLogout()
                  }}
                  className='mt-4 px-6 py-4 bg-gradient-to-r from-red-600/20 to-red-700/20 hover:from-red-600/30 hover:to-red-700/30 text-gray-50 border border-red-600/30 hover:border-red-600/50 rounded-2xl transition-all duration-300 font-medium text-base tracking-wide shadow-lg hover:shadow-red-600/20 group overflow-hidden touch-manipulation active:scale-95 opacity-0 animate-slide-in-right'
                  style={{
                    animationDelay: '400ms',
                    animationFillMode: 'forwards',
                  }}
                >
                  <div className='flex items-center space-x-4'>
                    <span className='text-2xl'>🚪</span>
                    <span className='relative z-10'>Sign Out</span>
                  </div>
                  <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000'></div>
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content with proper top padding for fixed header */}
      <main className='relative z-10 pt-20 sm:pt-24'>
        <Outlet />
      </main>

      {/* Ambient Bottom Glow */}
      <div className='fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-red-600/5 via-teal-500/5 to-transparent pointer-events-none'></div>

      {/* Floating action styles for mobile */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.4s ease-out;
        }
      `}</style>
    </div>
  )
}

export default Layout
