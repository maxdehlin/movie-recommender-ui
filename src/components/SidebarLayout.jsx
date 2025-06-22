import { Outlet, useLocation, Link } from 'react-router-dom'
import { useState } from 'react'
import { ToastContainer } from './Toast'
import useToast from '../hooks/useToast'
import cx from 'clsx'

function SidebarLayout({ onLogout }) {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
  const { toasts, removeToast } = useToast()

  const navigation = [
    { name: 'Home', href: '/home', icon: '🏠' },
    { name: 'Movies', href: '/movies', icon: '🎬' },
  ]

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path)

  return (
    <div className='min-h-screen bg-gray-900 flex'>
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
      <nav
        className={cx(
          'fixed inset-y-0 left-0 z-50 backdrop-blur-xl border-r border-gray-600/30 flex flex-col transform transition-all duration-300 lg:translate-x-0 overflow-hidden',
          sidebarCollapsed ? 'w-16' : 'w-64',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        role='navigation'
        aria-label='Main navigation'
      >
        {/* Logo */}
        <div
          className={cx(
            'flex items-center border-b border-gray-600/30 transition-all duration-300',
            sidebarCollapsed ? 'justify-center p-4' : 'space-x-3 p-6'
          )}
        >
          <div className='w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center shadow-xl border-2 border-red-600/20'>
            <span className='text-gray-50 font-bold text-lg'>🎬</span>
          </div>
          {!sidebarCollapsed && (
            <div className='transition-opacity duration-200'>
              <h1 className='font-serif text-gray-50 text-xl font-bold tracking-wide whitespace-nowrap'>
                CinemaVault
              </h1>
              <p className='text-gray-400 text-xs font-light tracking-wide whitespace-nowrap'>
                AI-Powered Discovery
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className='flex-1 py-6' role='menu' aria-label='Main menu'>
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cx(
                'relative flex items-center py-3 font-medium text-sm transition-all duration-200 group touch-manipulation whitespace-nowrap',
                {
                  'bg-gray-800 text-gray-50': isActive(item.href),
                  'text-gray-400 hover:text-gray-50 hover:bg-gray-800/50 active:bg-gray-800':
                    !isActive(item.href),
                  'justify-center px-2': sidebarCollapsed,
                  'space-x-3 px-4': !sidebarCollapsed,
                }
              )}
              onClick={() => setIsMobileMenuOpen(false)}
              title={sidebarCollapsed ? item.name : undefined}
              aria-label={`Navigate to ${item.name}`}
              aria-current={isActive(item.href) ? 'page' : undefined}
              role='menuitem'
            >
              <span className='text-xl'>{item.icon}</span>
              {!sidebarCollapsed && (
                <span className='tracking-wide transition-opacity duration-200'>
                  {item.name}
                </span>
              )}
            </Link>
          ))}
        </div>

        {/* Toggle Button */}
        {/* <div className='p-4'>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className='w-full flex items-center justify-center p-2 text-gray-400 hover:text-gray-50 hover:bg-gray-800/60 rounded-lg transition-all duration-300'
          >
            <span
              className={`transform transition-transform duration-300 text-gray-600/30 ${
                sidebarCollapsed ? 'rotate-0' : 'rotate-180'
              }`}
            >
              ▶
            </span>
          </button>
        </div> */}

        {/* User Actions at Bottom */}
        <div
          className='border-t border-gray-600/30 relative'
          role='group'
          aria-label='User actions'
        >
          <Link
            to='/profile'
            className={cx(
              'relative flex items-center py-3 font-medium text-sm transition-all duration-200 group touch-manipulation whitespace-nowrap',
              sidebarCollapsed ? 'justify-center px-2' : 'space-x-3 px-4',
              isActive('/profile')
                ? 'bg-gray-800 text-gray-50'
                : 'text-gray-400 hover:text-gray-50 hover:bg-gray-800/50 active:bg-gray-800'
            )}
            onClick={() => setIsMobileMenuOpen(false)}
            title={sidebarCollapsed ? 'Profile' : undefined}
            aria-label='View your profile'
            aria-current={isActive('/profile') ? 'page' : undefined}
          >
            <span className='text-xl'>👤</span>
            {!sidebarCollapsed && (
              <span className='tracking-wide transition-opacity duration-200'>
                Profile
              </span>
            )}
          </Link>

          <button
            onClick={onLogout}
            className={cx(
              'relative w-full flex items-center py-3 bg-gradient-to-r from-red-600/40 to-red-700/40 hover:from-red-600/60 hover:to-red-700/60 active:from-red-600/70 active:to-red-700/70 text-gray-50 backdrop-blur-sm font-medium text-sm tracking-wide transition-all duration-200 group touch-manipulation whitespace-nowrap',
              sidebarCollapsed ? 'justify-center px-2' : 'space-x-3 px-4'
            )}
            title={sidebarCollapsed ? 'Sign Out' : undefined}
            aria-label='Sign out of your account'
          >
            <span className='text-xl'>🚪</span>
            {!sidebarCollapsed && (
              <span className='transition-opacity duration-200'>Sign Out</span>
            )}
          </button>
        </div>
      </nav>

      {/* Desktop Sidebar Toggle Button */}
      <div
        className={cx(
          'hidden lg:block fixed top-1/2 -translate-y-1/2 z-50 transition-all duration-300',
          sidebarCollapsed ? 'left-14' : 'left-62'
        )}
      >
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className={cx(
            'flex items-center justify-center p-2 text-gray-400 hover:text-gray-50 hover:bg-gray-800/60 rounded-lg transition-all duration-300 bg-gray-600 w-1 cursor-pointer',
            sidebarCollapsed ? 'h-2' : 'h-10'
          )}
        />
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
        className='lg:hidden fixed top-4 left-4 z-50 p-3 rounded-xl bg-gray-800/60 hover:bg-gray-800/80 text-gray-400 hover:text-gray-50 transition-all duration-300 border border-gray-600/30'
        aria-label={
          isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
        }
        aria-expanded={isMobileMenuOpen}
        aria-controls='mobile-navigation'
      >
        <svg
          className={cx(
            'w-6 h-6 transition-transform duration-300',
            isMobileMenuOpen && 'rotate-90'
          )}
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
      <div
        className={cx(
          'flex-1 transition-all duration-300',
          sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
        )}
      >
        <main className='relative z-10'>
          <Outlet />
        </main>
      </div>

      {/* Toast Container */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  )
}

export default SidebarLayout
