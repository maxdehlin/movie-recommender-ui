import React, { useState } from 'react'
import api from '../utils/api'

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await api.devLogin()
      if (result.success && result.token) {
        // Store the token in localStorage
        localStorage.setItem('authToken', result.token)
        onLogin()
      } else {
        setError(result.error || 'Login failed')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDevLogin = async () => {
    setIsLoading(true)
    setError('')

    try {
      const result = await api.devLogin()
      if (result.success && result.token) {
        // Store the token in localStorage
        localStorage.setItem('authToken', result.token)
        onLogin()
      } else {
        setError('Development login failed')
      }
    } catch (err) {
      console.error('Development login error:', err)
      setError(`Development login failed: ${err.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gray-900 flex items-center justify-center p-8'>
      {/* Film Strip Background Pattern */}
      <div className='fixed inset-0 opacity-5'>
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #dc2626 0px, #dc2626 4px, transparent 4px, transparent 24px)`,
            backgroundSize: '32px 32px',
          }}
        ></div>
      </div>

      {/* Cinematic Grain Overlay */}
      <div className='fixed inset-0 opacity-30 pointer-events-none'>
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(220, 38, 38, 0.1) 0%, transparent 2px), radial-gradient(circle at 75% 75%, rgba(20, 184, 166, 0.1) 0%, transparent 2px)`,
            backgroundSize: '4px 4px',
          }}
        ></div>
      </div>

      {/* Floating Film Elements */}
      <div className='fixed inset-0 pointer-events-none'>
        <div className='absolute top-20 left-10 w-4 h-4 bg-red-600/20 rounded-full animate-float'></div>
        <div className='absolute top-40 right-20 w-3 h-3 bg-teal-500/20 rounded-full animate-float-delay'></div>
        <div className='absolute bottom-32 left-1/4 w-2 h-2 bg-red-600/15 rounded-full animate-float'></div>
        <div className='absolute bottom-20 right-1/3 w-5 h-5 bg-teal-500/15 rounded-full animate-float-delay'></div>
      </div>

      <div className='relative z-10 w-full max-w-lg'>
        {/* Main Login Card */}
        <div className='bg-gray-900-light/80 backdrop-blur-xl border border-gray-600/40 rounded-3xl shadow-2xl overflow-hidden'>
          {/* Header */}
          <div className='relative px-8 py-12 text-center'>
            {/* Logo */}
            <div className='relative inline-block mb-8'>
              <div className='w-20 h-20 bg-gradient-to-br from-red-600 via-red-600-dark to-teal-500 rounded-full flex items-center justify-center shadow-2xl mx-auto border-4 border-gray-600/30'>
                <span className='text-gray-50 text-3xl font-bold relative z-10'>
                  🎬
                </span>
              </div>
            </div>

            <h1 className='text-4xl font-serif text-gray-50 mb-4 tracking-wide leading-tight'>
              Welcome to
              <span className='block text-teal-500 italic'>CinemaVault</span>
            </h1>
            <p className='text-gray-400 text-lg font-light leading-relaxed'>
              Enter the archive of cinematic excellence, where AI meets artistry
            </p>
          </div>

          {/* Login Form */}
          <div className='px-8 pb-12'>
            {error && (
              <div className='mb-8 p-6 bg-red-600/10 border border-red-600/30 rounded-2xl text-gray-50 animate-fade-in shadow-lg'>
                <div className='flex items-center space-x-4'>
                  <div className='w-6 h-6 rounded-full bg-red-600/20 flex items-center justify-center'>
                    <div className='w-3 h-3 bg-red-600 rounded-full animate-pulse'></div>
                  </div>
                  <span className='font-medium'>{error}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className='space-y-8'>
              <div className='space-y-6'>
                <div className='relative group'>
                  <label className='block text-sm font-medium text-gray-400 mb-3 tracking-wide uppercase'>
                    Username
                  </label>
                  <div className='relative'>
                    <input
                      type='text'
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className='w-full px-6 py-4 bg-gray-900/60 border border-gray-600/40 rounded-2xl text-gray-50 placeholder-gray-400 focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal/20 transition-all duration-300 backdrop-blur-sm text-lg tracking-wide group-hover:border-gray-500/50'
                      placeholder='Enter your username'
                    />
                    {/* Decorative film perforations */}
                    <div className='absolute right-4 top-1/2 transform -translate-y-1/2 flex space-x-1'>
                      <div className='w-1 h-1 bg-teal-500/30 rounded-full'></div>
                      <div className='w-1 h-1 bg-red-600/30 rounded-full'></div>
                    </div>
                  </div>
                </div>

                <div className='relative group'>
                  <label className='block text-sm font-medium text-gray-400 mb-3 tracking-wide uppercase'>
                    Password
                  </label>
                  <div className='relative'>
                    <input
                      type='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className='w-full px-6 py-4 bg-gray-900/60 border border-gray-600/40 rounded-2xl text-gray-50 placeholder-gray-400 focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal/20 transition-all duration-300 backdrop-blur-sm text-lg tracking-wide group-hover:border-gray-500/50'
                      placeholder='Enter your password'
                    />
                    {/* Decorative film perforations */}
                    <div className='absolute right-4 top-1/2 transform -translate-y-1/2 flex space-x-1'>
                      <div className='w-1 h-1 bg-red-600/30 rounded-full'></div>
                      <div className='w-1 h-1 bg-teal-500/30 rounded-full'></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='space-y-4'>
                <button
                  type='submit'
                  disabled={isLoading}
                  className='relative w-full px-8 py-5 bg-gradient-to-r from-teal-500 to-teal-500-dark hover:from-teal-500-dark hover:to-teal-500 text-gray-900 rounded-2xl font-bold text-lg transition-all duration-500 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-teal-500/30 group overflow-hidden'
                >
                  <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000'></div>
                  <span className='relative z-10 flex items-center justify-center space-x-3'>
                    {isLoading ? (
                      <>
                        <div className='w-6 h-6 border-3 border-gray-900/30 border-t-charcoal rounded-full animate-spin'></div>
                        <span>Accessing Archive...</span>
                      </>
                    ) : (
                      <>
                        <span>Enter CinemaVault</span>
                        <svg
                          className='w-6 h-6'
                          fill='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path d='M8 5v14l11-7z' />
                        </svg>
                      </>
                    )}
                  </span>
                </button>

                <div className='relative'>
                  <div className='absolute inset-0 flex items-center'>
                    <div className='w-full border-t border-gray-600/30'></div>
                  </div>
                  <div className='relative flex justify-center text-sm'>
                    <span className='px-4 bg-gray-900-light text-gray-400 font-medium tracking-wider'>
                      OR
                    </span>
                  </div>
                </div>

                <button
                  type='button'
                  onClick={handleDevLogin}
                  disabled={isLoading}
                  className='relative w-full px-8 py-5 bg-gradient-to-r from-red-600/20 to-red-600-dark/20 hover:from-red-600/30 hover:to-red-600-dark/30 border border-red-600/30 hover:border-red-600/50 text-gray-50 rounded-2xl font-semibold text-lg transition-all duration-500 hover:scale-105 disabled:opacity-50 shadow-xl hover:shadow-red-600/20 backdrop-blur-sm group overflow-hidden'
                >
                  <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000'></div>
                  <span className='relative z-10 flex items-center justify-center space-x-3'>
                    <span>Demo Access</span>
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
                        d='M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z'
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Feature Preview */}
        <div className='mt-12 text-center'>
          <div className='grid grid-cols-3 gap-6'>
            <div className='text-center space-y-3'>
              <div className='w-12 h-12 bg-teal-500/10 rounded-full flex items-center justify-center mx-auto border border-teal-500/20'>
                <span className='text-teal-500 text-xl'>🤖</span>
              </div>
              <div>
                <h3 className='text-gray-50 font-serif text-lg'>AI Curator</h3>
                <p className='text-gray-400 text-sm'>
                  Intelligent recommendations
                </p>
              </div>
            </div>

            <div className='text-center space-y-3'>
              <div className='w-12 h-12 bg-red-600/10 rounded-full flex items-center justify-center mx-auto border border-red-600/20'>
                <span className='text-red-600 text-xl'>🎭</span>
              </div>
              <div>
                <h3 className='text-gray-50 font-serif text-lg'>
                  Cinema Archive
                </h3>
                <p className='text-gray-400 text-sm'>Vast film collection</p>
              </div>
            </div>

            <div className='text-center space-y-3'>
              <div className='w-12 h-12 bg-teal-500/10 rounded-full flex items-center justify-center mx-auto border border-teal-500/20'>
                <span className='text-teal-500 text-xl'>⭐</span>
              </div>
              <div>
                <h3 className='text-gray-50 font-serif text-lg'>Rate & Save</h3>
                <p className='text-gray-400 text-sm'>Personal watchlist</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes float-delay {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-delay {
          animation: float-delay 3s ease-in-out infinite 1.5s;
        }
      `}</style>
    </div>
  )
}

export default LoginPage
