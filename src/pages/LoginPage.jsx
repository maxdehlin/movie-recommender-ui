import React from 'react'
import api from '../utils/api'

const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const isDevelopment = import.meta.env.DEV

function LoginPage({ onLogin }) {
  const handleGoogleLogin = () => {
    window.location.href = `${BACKEND_URL}/auth/google/login`
    console.log('BACKEND_URL', BACKEND_URL)
  }

  const handleDevLogin = async () => {
    try {
      const data = await api.devLogin()
      localStorage.setItem('authToken', data.access_token)
      onLogin()
    } catch (error) {
      console.error('Development login failed:', error)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 relative overflow-hidden w-screen flex items-center justify-center'>
      {/* Background Pattern */}
      <div
        className='absolute inset-0 opacity-20'
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.02'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Animated background elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-4 -left-4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute top-1/3 -right-4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000'></div>
        <div className='absolute -bottom-8 left-1/3 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000'></div>
      </div>

      <div className='relative z-10 max-w-md w-full mx-6'>
        <div className='backdrop-blur-2xl bg-white/8 rounded-3xl border border-white/15 p-8 shadow-2xl'>
          <div className='text-center space-y-8'>
            {/* Logo */}
            <div className='space-y-4'>
              <div className='w-20 h-20 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg'>
                <span className='text-white font-bold text-2xl'>🎬</span>
              </div>
              <div>
                <h1 className='text-3xl font-bold text-white tracking-tight'>
                  Welcome to MovieRecs
                </h1>
                <p className='text-white/70 mt-2'>
                  Sign in to get personalized movie recommendations
                </p>
              </div>
            </div>

            {/* Login Buttons */}
            <div className='space-y-4'>
              <button
                onClick={handleGoogleLogin}
                className='w-full relative px-6 py-4 bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/20 hover:border-white/30 rounded-2xl font-semibold text-white transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center space-x-3 group'
              >
                <img
                  src='https://www.google.com/favicon.ico'
                  alt='Google'
                  className='w-5 h-5'
                />
                <span>Sign in with Google</span>
              </button>

              {isDevelopment && (
                <button
                  onClick={handleDevLogin}
                  className='w-full relative px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg border border-emerald-400/30 overflow-hidden group bg-no-repeat'
                >
                  <div className='absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300'></div>
                  <span className='relative z-10 drop-shadow-sm'>
                    Quick Dev Login
                  </span>
                </button>
              )}
            </div>

            {/* Features */}
            <div className='pt-6 border-t border-white/10'>
              <div className='grid grid-cols-3 gap-4'>
                <div className='text-center space-y-2'>
                  <div className='w-10 h-10 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mx-auto'>
                    <span className='text-lg'>⭐</span>
                  </div>
                  <p className='text-white/60 text-xs font-medium'>
                    Rate Movies
                  </p>
                </div>
                <div className='text-center space-y-2'>
                  <div className='w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center mx-auto'>
                    <span className='text-lg'>🤖</span>
                  </div>
                </div>
                <div className='text-center space-y-2'>
                  <div className='w-10 h-10 bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-xl flex items-center justify-center mx-auto'>
                    <span className='text-lg'>✨</span>
                  </div>
                  <p className='text-white/60 text-xs font-medium'>
                    Personalized
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
