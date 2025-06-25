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
    <div className='min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950'>
      {/* Background Pattern */}
      <div
        className='absolute inset-0 opacity-30'
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.02'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Header */}
      <header className='relative z-50 backdrop-blur-xl bg-white/5 border-b border-white/10 shadow-lg'>
        <div className='max-w-7xl mx-auto px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            {/* Logo */}
            <Link to='/dashboard' className='flex items-center space-x-3 group'>
              <div className='w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-indigo-500/25 transition-all duration-300 bg-no-repeat'>
                <span className='text-white font-bold text-lg'>🎬</span>
              </div>
              <div>
                <h1 className='text-xl font-bold text-white tracking-tight'>
                  MovieRecs
                </h1>
                <p className='text-xs text-white/50 font-medium hidden sm:block'>
                  AI-Powered Recommendations
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className='hidden md:flex items-center space-x-1'>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 hover:scale-105 bg-no-repeat ${
                    isActive(item.href)
                      ? 'bg-gradient-to-r from-indigo-500/30 to-purple-500/30 text-white border border-indigo-400/30 shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className='mr-2'>{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* User Menu */}
            <div className='flex items-center space-x-4'>
              <button
                onClick={onLogout}
                className='px-4 py-2 bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/30 hover:to-pink-500/30 text-white border border-red-500/30 hover:border-red-400/50 rounded-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm font-medium text-sm tracking-wide shadow-lg hover:shadow-red-500/20 bg-no-repeat'
              >
                Sign Out
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className='md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors duration-200'
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

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className='md:hidden py-4 border-t border-white/10'>
              <nav className='flex flex-col space-y-2'>
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                      isActive(item.href)
                        ? 'bg-gradient-to-r from-indigo-500/30 to-purple-500/30 text-white border border-indigo-400/30'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span className='mr-3'>{item.icon}</span>
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className='relative z-10'>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
